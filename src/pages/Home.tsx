import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Users, Apple } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  { icon: <TrendingUp className="w-6 h-6 text-primary" />, title: 'Progress Tracking', desc: 'Visualize your journey with detailed analytics.' },
  { icon: <Play className="w-6 h-6 text-primary" />, title: 'HD Workouts', desc: 'Over 500+ classes for all fitness levels.' },
  { icon: <Apple className="w-6 h-6 text-primary" />, title: 'Nutrition Guides', desc: 'Delicious recipes and personalized meal plans.' },
  { icon: <Users className="w-6 h-6 text-primary" />, title: 'Community', desc: 'Join groups and share your success stories.' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/hero-fitness-15d63bf4-1775401321505.webp" 
            alt="Hero Fitness" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        
        <div className="container relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
          >
            FUEL YOUR <span className="text-primary italic">AMBITION</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90"
          >
            Elite workouts, personalized nutrition, and a community that pushes you to be your absolute best.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 rounded-full text-lg font-bold" asChild>
              <Link to="/auth">Start Your Journey</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-lg font-bold bg-white/10 backdrop-blur border-white/20 hover:bg-white/20" asChild>
              <Link to="/workouts">View Programs</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-12 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-primary">50k+</p>
              <p className="text-sm text-muted-foreground uppercase font-bold">Members</p>
            </div>
            <div>
              <p className="text-3xl font-black text-primary">200+</p>
              <p className="text-sm text-muted-foreground uppercase font-bold">Trainers</p>
            </div>
            <div>
              <p className="text-3xl font-black text-primary">1k+</p>
              <p className="text-sm text-muted-foreground uppercase font-bold">Programs</p>
            </div>
            <div>
              <p className="text-3xl font-black text-primary">4.9/5</p>
              <p className="text-sm text-muted-foreground uppercase font-bold">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">WHY CHOOSE VITALITY?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to transform your body and mind in one powerful platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-card border hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight uppercase">Ready to join the elite?</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Don't wait for "someday". Start today and get a personalized 7-day workout plan for free. Join our community and discover your true potential.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-muted overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                   </div>
                 ))}
               </div>
               <p className="text-sm font-bold">Join 50k+ active members</p>
            </div>
            <Button size="lg" variant="secondary" className="h-12 px-8 rounded-full text-lg font-bold" asChild>
              <Link to="/auth">Sign Up Now</Link>
            </Button>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
             <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/gym-interior-1f96c2f8-1775401324494.webp" alt="Gym" className="object-cover w-full h-full" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
}