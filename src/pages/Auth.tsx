import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, Github, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
  };

  return (
    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d42866c4-5ccc-4305-8064-ff5330b9f9e5/strength-program-009c1770-1775401321146.webp" 
          alt="Auth" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <blockquote className="text-3xl font-black italic uppercase leading-tight">
            "The only bad workout is the one that didn't happen."
          </blockquote>
          <p className="mt-4 font-bold">- Vitality Community</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Dumbbell className="text-primary-foreground w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              {isLogin ? 'Welcome Back' : 'Join the Elite'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin ? 'Enter your credentials to access your dashboard.' : 'Start your transformation journey today.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" className="rounded-xl h-11 gap-2">
               <Github className="w-4 h-4" /> Github
             </Button>
             <Button variant="outline" className="rounded-xl h-11 gap-2">
               <Mail className="w-4 h-4" /> Google
             </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground font-bold">Or continue with</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="h-11 rounded-xl" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="alex@example.com" className="h-11 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && <button type="button" className="text-xs text-primary font-bold hover:underline">Forgot password?</button>}
              </div>
              <Input id="password" type="password" placeholder="••••••••" className="h-11 rounded-xl" required />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold mt-4 uppercase tracking-wider">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}