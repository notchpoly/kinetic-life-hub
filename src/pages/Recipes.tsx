import { useState } from 'react';
import { Search, Utensils, Clock, Star, Heart, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const recipes = [
  {
    id: 1,
    title: 'Quinoa Energy Salad',
    time: '15 min',
    calories: '320 kcal',
    rating: 4.8,
    category: 'Breakfast',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/recipe-salad-9785b358-1775401320571.webp'
  },
  {
    id: 2,
    title: 'Green Protein Smoothie',
    time: '5 min',
    calories: '250 kcal',
    rating: 4.9,
    category: 'Snack',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/recipe-smoothie-83da5ae2-1775401321628.webp'
  },
  {
    id: 3,
    title: 'Grilled Salmon Bowl',
    time: '25 min',
    calories: '450 kcal',
    rating: 4.7,
    category: 'Lunch',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/gym-interior-1f96c2f8-1775401324494.webp'
  },
];

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Vegan'];

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Healthy Recipes</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Nutrition is 70% of the game. Fuel your body with the best ingredients.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search recipes..." className="pl-10 h-12 bg-muted/50 border-none rounded-xl shadow-inner" />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-card rounded-3xl overflow-hidden border group"
          >
            <div className="relative h-64">
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <Button size="icon" variant="ghost" className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
                <Heart className="w-5 h-5" />
              </Button>
              <Badge className="absolute bottom-4 left-4 bg-primary text-primary-foreground font-bold">
                {recipe.category}
              </Badge>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{recipe.title}</h3>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  {recipe.rating}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium mb-6">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {recipe.time}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {recipe.calories}</span>
              </div>
              <Button className="w-full rounded-xl gap-2">
                 <Utensils className="w-4 h-4" /> View Recipe
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}