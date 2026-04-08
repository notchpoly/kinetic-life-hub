-- View to check trainer availability and current load
CREATE OR REPLACE VIEW public.trainer_availability_stats AS
SELECT 
    t.id AS trainer_id,
    t.name,
    t.max_capacity,
    COUNT(ta.id) FILTER (WHERE ta.status = 'active') AS active_clients,
    (t.max_capacity - COUNT(ta.id) FILTER (WHERE ta.status = 'active')) AS spots_remaining
FROM public.trainers t
LEFT JOIN public.trainer_assignments ta ON t.id = ta.trainer_id
GROUP BY t.id, t.name, t.max_capacity;

-- Grant access to the view
ALTER VIEW public.trainer_availability_stats OWNER TO postgres;
GRANT SELECT ON public.trainer_availability_stats TO anon, authenticated;