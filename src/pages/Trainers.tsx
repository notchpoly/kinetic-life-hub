import { Star, Instagram, Twitter, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const trainers = [
  {
    id: 1,
    name: 'Marcus Chen',
    specialty: 'Strength & Conditioning',
    bio: 'Former athlete with 10+ years experience in powerlifting and functional fitness.',
    rating: 4.9,
    reviews: 128,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/trainer-male-52f68b45-1775401322018.webp',
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    specialty: 'Yoga & Mindfulness',
    bio: 'Certified yoga instructor focusing on mobility, flexibility, and mental well-being.',
    rating: 5.0,
    reviews: 94,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/trainer-female-7395ef8a-1775401321723.webp',
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: 3,
    name: 'David Miller',
    specialty: 'HIIT & Weight Loss',
    bio: 'Transformational coach dedicated to helping busy professionals reach their weight goals.',
    rating: 4.8,
    reviews: 215,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/hero-fitness-15d63bf4-1775401321505.webp',
    availability: ['Everyday']
  }
];

export default function TrainersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">Elite Trainers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Work with the best in the industry. Our certified professionals are here to guide your transformation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {trainers.map(trainer => (
          <Card key={trainer.id} className="overflow-hidden group border-none bg-transparent shadow-none">
            <CardContent className="p-0 space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <Badge className="bg-primary mb-2">{trainer.specialty}</Badge>
                  <h3 className="text-2xl font-black uppercase italic mb-1">{trainer.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {trainer.rating} ({trainer.reviews} reviews)
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <p className="text-muted-foreground leading-relaxed italic">"{trainer.bio}"</p>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-xs uppercase font-bold text-muted-foreground">Availability</p>
                    <div className="flex gap-1">
                       {trainer.availability.map(day => <Badge key={day} variant="secondary" className="text-[10px]">{day}</Badge>)}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8"><Instagram className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8"><Twitter className="w-4 h-4" /></Button>
                  </div>
                </div>
                <Button className="w-full rounded-2xl h-12 text-lg font-bold uppercase tracking-wider group">
                  Book Session <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking CTA */}
      <section className="mt-24 bg-muted rounded-[40px] p-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-6 uppercase">Not sure who to choose?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Take our 2-minute trainer matching quiz and we'll pair you with the perfect coach based on your goals and schedule.</p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg font-bold">Start Matchmaker Quiz</Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </section>
    </div>
  );
}