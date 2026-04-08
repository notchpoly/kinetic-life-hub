import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, LayoutDashboard, Dumbbell, Utensils, Users, Calendar, User, Menu, X, LogIn, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import WorkoutsPage from './pages/Workouts';
import RecipesPage from './pages/Recipes';
import CommunityPage from './pages/Community';
import TrainersPage from './pages/Trainers';
import MembershipPage from './pages/Membership';
import AuthPage from './pages/Auth';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Workouts', path: '/workouts', icon: <Dumbbell className="w-4 h-4" /> },
    { name: 'Recipes', path: '/recipes', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Community', path: '/community', icon: <Users className="w-4 h-4" /> },
    { name: 'Trainers', path: '/trainers', icon: <User className="w-4 h-4" /> },
    { name: 'Membership', path: '/membership', icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Dumbbell className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Vitality</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link to="/auth">Join Now</Link>
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    location.pathname === link.path ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
                  }`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              <Button asChild className="w-full mt-2">
                <Link to="/auth" onClick={() => setIsOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-muted py-12 border-t mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-primary w-6 h-6" />
            <span className="font-bold text-xl uppercase tracking-wider">Vitality</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Elevate your life with personalized fitness plans, nutrition guides, and a supportive community. Your journey to a healthier you starts here.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/workouts" className="hover:text-primary transition-colors">Workout Library</Link></li>
            <li><Link to="/recipes" className="hover:text-primary transition-colors">Healthy Recipes</Link></li>
            <li><Link to="/trainers" className="hover:text-primary transition-colors">Expert Trainers</Link></li>
            <li><Link to="/membership" className="hover:text-primary transition-colors">Membership Plans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">Get weekly motivation and healthy tips.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-background border rounded px-3 py-1 flex-1 text-sm outline-none focus:ring-1 focus:ring-primary" />
            <Button size="sm">Join</Button>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vitality Fitness. All rights reserved.
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/trainers" element={<TrainersPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;