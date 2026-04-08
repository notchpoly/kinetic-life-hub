import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Flame, Target, Trophy, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const data = [
  { day: 'Mon', calories: 2100, steps: 8000 },
  { day: 'Tue', calories: 2300, steps: 12000 },
  { day: 'Wed', calories: 1900, steps: 9500 },
  { day: 'Thu', calories: 2500, steps: 11000 },
  { day: 'Fri', calories: 2200, steps: 13000 },
  { day: 'Sat', calories: 2800, steps: 15000 },
  { day: 'Sun', calories: 2400, steps: 10000 },
];

const StatCard = ({ title, value, icon, trend, label }: any) => (
  <Card className="overflow-hidden">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          <ArrowUpRight className="w-3 h-3" />
          {trend}%
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-black mt-1">{value}</h3>
      <p className="text-[10px] uppercase font-bold text-muted-foreground/60 mt-1">{label}</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex! You're crushing your goals this week.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold bg-muted px-4 py-2 rounded-full">
          <Calendar className="w-4 h-4 text-primary" />
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Calories" value="1,842" icon={<Flame />} trend={12} label="kcal burned today" />
        <StatCard title="Average Steps" value="11,204" icon={<TrendingUp />} trend={8} label="steps per day" />
        <StatCard title="Workouts" value="14" icon={<Target />} trend={25} label="sessions this month" />
        <StatCard title="Trophies" value="8" icon={<Trophy />} trend={0} label="achievements unlocked" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Activity Overview
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-primary" /> Calories</span>
                <span className="flex items-center gap-1 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-blue-500" /> Steps</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888822" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="calories" stroke="#ef4444" fillOpacity={1} fill="url(#colorCal)" strokeWidth={2} />
                <Area type="monotone" dataKey="steps" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Goals & Progress */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Protein Intake</span>
                  <span className="text-primary">120g / 150g</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Water Intake</span>
                  <span className="text-primary">2.4L / 3.0L</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Sleep</span>
                  <span className="text-primary">6.5h / 8h</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Coach Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic opacity-90">"You're making incredible progress, Alex! Don't forget to prioritize recovery tonight. Tomorrow's leg session is going to be intense."</p>
              <div className="mt-4 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">M</div>
                 <div>
                   <p className="text-xs font-bold">Coach Marcus</p>
                   <p className="text-[10px] opacity-70">Personal Trainer</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}