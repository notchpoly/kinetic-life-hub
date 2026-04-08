import { Check, Zap, Shield, Crown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Essential',
    price: '19.99',
    icon: <Shield className="w-6 h-6" />,
    features: ['Unlimited Video Library', 'Basic Goal Tracking', 'Community Access', 'Nutrition Basics', 'Weekly Newsletter'],
    popular: false,
    color: 'bg-muted'
  },
  {
    name: 'Elite',
    price: '49.99',
    icon: <Zap className="w-6 h-6" />,
    features: ['Everything in Essential', 'Personalized Workout Plans', 'Live Coaching Sessions', 'Advanced Analytics', 'Priority Support'],
    popular: true,
    color: 'bg-primary text-primary-foreground'
  },
  {
    name: 'Pro Athlete',
    price: '99.99',
    icon: <Crown className="w-6 h-6" />,
    features: ['Everything in Elite', '1-on-1 Personal Training', 'Custom Meal Plans', 'Biometric Data Integration', 'Access to Elite Events'],
    popular: false,
    color: 'bg-muted'
  }
];

export default function MembershipPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 uppercase tracking-widest font-bold">Pricing Plans</Badge>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-6">Invest in <span className="text-primary italic">Yourself</span></h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">Choose the plan that fits your ambition. No long-term contracts, cancel anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative flex flex-col border-none shadow-2xl transition-transform hover:scale-105 ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge className="px-6 py-1 text-sm font-bold uppercase rounded-full">Most Popular</Badge>
              </div>
            )}
            <CardHeader className={`p-8 rounded-t-3xl ${plan.color}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${plan.popular ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                {plan.icon}
              </div>
              <CardTitle className="text-2xl font-black uppercase">{plan.name}</CardTitle>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">${plan.price}</span>
                <span className="text-sm opacity-80">/month</span>
              </div>
            </CardHeader>
            <CardContent className="p-8 flex-grow">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button className={`w-full h-12 rounded-xl text-lg font-bold ${plan.popular ? '' : 'variant-outline'}`} variant={plan.popular ? 'default' : 'outline'}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-24 text-center">
        <p className="text-sm text-muted-foreground mb-8">Trusted by athletes from over 50 countries</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale">
           <span className="text-2xl font-black uppercase tracking-tighter">NIKE</span>
           <span className="text-2xl font-black uppercase tracking-tighter">ADIDAS</span>
           <span className="text-2xl font-black uppercase tracking-tighter">PUMA</span>
           <span className="text-2xl font-black uppercase tracking-tighter">REEBOK</span>
           <span className="text-2xl font-black uppercase tracking-tighter">UNDER ARMOUR</span>
        </div>
      </div>
    </div>
  );
}