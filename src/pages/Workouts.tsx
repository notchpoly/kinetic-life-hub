import { useState } from 'react';
import { Search, Play, Clock, Flame, Dumbbell, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const workouts = [
  { 
    id: 1, 
    title: 'Morning Yoga Flow', 
    duration: '25 min', 
    calories: '150 kcal', 
    level: 'Beginner', 
    category: 'Yoga',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/yoga-program-a322b4d9-1775401321954.webp'
  },
  { 
    id: 2, 
    title: 'Full Body Power', 
    duration: '45 min', 
    calories: '450 kcal', 
    level: 'Intermediate', 
    category: 'Strength',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/strength-program-009c1770-1775401321146.webp'
  },
  { 
    id: 3, 
    title: 'HIIT Cardio Blast', 
    duration: '30 min', 
    calories: '600 kcal', 
    level: 'Advanced', 
    category: 'Cardio',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/cardio-program-5ed9697a-1775401321116.webp'
  },
  { 
    id: 4, 
    title: 'Leg Day Intensity', 
    duration: '50 min', 
    calories: '400 kcal', 
    level: 'Advanced', 
    category: 'Strength',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/hero-fitness-15d63bf4-1775401321505.webp'
  },
  { 
    id: 5, 
    title: 'Mobility & Stretch', 
    duration: '20 min', 
    calories: '100 kcal', 
    level: 'All Levels', 
    category: 'Yoga',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/gym-interior-1f96c2f8-1775401324494.webp'
  },
];

const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Pilates'];

export default function WorkoutsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkouts = workouts.filter(w => 
    (selectedCategory === 'All' || w.category === selectedCategory) &&
    w.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Workout Library</h1>
          <p className="text-muted-foreground">Expert-led classes to help you achieve your goals.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search workouts..." 
            className="pl-10 h-12 bg-muted/50 border-none rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'secondary'}
            className="rounded-full px-6"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
        <Button variant="outline" className="ml-auto rounded-full gap-2">
           <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkouts.map((workout, index) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
              <img src={workout.image} alt={workout.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <Badge variant="secondary" className="bg-white/90 text-black font-bold uppercase text-[10px]">{workout.level}</Badge>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{workout.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {workout.duration}</div>
              <div className="flex items-center gap-1"><Flame className="w-4 h-4" /> {workout.calories}</div>
              <div className="flex items-center gap-1"><Dumbbell className="w-4 h-4" /> {workout.category}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}