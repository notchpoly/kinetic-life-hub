-- Create trainers table
CREATE TABLE IF NOT EXISTS public.trainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    max_capacity INTEGER NOT NULL DEFAULT 10,
    availability TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.trainers ENABLE ROW LEVEL SECURITY;

-- Policies for trainers
CREATE POLICY "Allow public read access to trainers" ON public.trainers
    FOR SELECT USING (true);

-- Create trainer_assignments table
CREATE TABLE IF NOT EXISTS public.trainer_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id UUID NOT NULL REFERENCES public.trainers(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- A user can only have one active trainer at a time (business rule)
    CONSTRAINT one_active_trainer_per_user UNIQUE (user_id, status)
);

-- Note: The unique constraint 'one_active_trainer_per_user' above might be too strict 
-- if status is 'completed'. Let's refine it with a partial index instead.
ALTER TABLE public.trainer_assignments DROP CONSTRAINT IF EXISTS one_active_trainer_per_user;
CREATE UNIQUE INDEX IF NOT EXISTS idx_one_active_trainer_per_user 
ON public.trainer_assignments (user_id) 
WHERE status = 'active';

-- Enable RLS
ALTER TABLE public.trainer_assignments ENABLE ROW LEVEL SECURITY;

-- Policies for assignments
CREATE POLICY "Users can view their own assignments" ON public.trainer_assignments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assignments" ON public.trainer_assignments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to check trainer capacity
CREATE OR REPLACE FUNCTION check_trainer_capacity()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
    max_cap INTEGER;
BEGIN
    -- Get current active clients for the trainer
    SELECT COUNT(*) INTO current_count
    FROM public.trainer_assignments
    WHERE trainer_id = NEW.trainer_id AND status = 'active';

    -- Get trainer's max capacity
    SELECT max_capacity INTO max_cap
    FROM public.trainers
    WHERE id = NEW.trainer_id;

    IF current_count >= max_cap THEN
        RAISE EXCEPTION 'Trainer has reached maximum capacity (%)', max_cap;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to enforce capacity before insert
CREATE TRIGGER enforce_trainer_capacity_trigger
BEFORE INSERT ON public.trainer_assignments
FOR EACH ROW
EXECUTE FUNCTION check_trainer_capacity();

-- Function to handle completion and free up spot
CREATE OR REPLACE FUNCTION complete_training_session(assignment_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.trainer_assignments
    SET status = 'completed',
        completed_at = NOW(),
        updated_at = NOW()
    WHERE id = assignment_id AND status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed initial data
INSERT INTO public.trainers (name, specialty, bio, image_url, rating, reviews_count, max_capacity, availability)
VALUES 
('Marcus Chen', 'Strength & Conditioning', 'Former athlete with 10+ years experience in powerlifting and functional fitness.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/trainer-male-52f68b45-1775401322018.webp', 4.9, 128, 5, ARRAY['Mon', 'Wed', 'Fri']),
('Elena Rodriguez', 'Yoga & Mindfulness', 'Certified yoga instructor focusing on mobility, flexibility, and mental well-being.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/trainer-female-7395ef8a-1775401321723.webp', 5.0, 94, 8, ARRAY['Tue', 'Thu', 'Sat']),
('David Miller', 'HIIT & Weight Loss', 'Transformational coach dedicated to helping busy professionals reach their weight goals.', 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/hero-fitness-15d63bf4-1775401321505.webp', 4.8, 215, 12, ARRAY['Everyday'])
ON CONFLICT DO NOTHING;