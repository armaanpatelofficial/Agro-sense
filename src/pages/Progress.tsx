import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Droplets, CalendarDays, BarChart3 } from 'lucide-react';

const qualityData = [
  { week: 'W1', quality: 55, moisture: 45 },
  { week: 'W2', quality: 60, moisture: 52 },
  { week: 'W3', quality: 65, moisture: 60 },
  { week: 'W4', quality: 62, moisture: 55 },
  { week: 'W5', quality: 70, moisture: 62 },
  { week: 'W6', quality: 75, moisture: 65 },
  { week: 'W7', quality: 78, moisture: 68 },
  { week: 'W8', quality: 82, moisture: 70 },
];

const waterUsage = [
  { day: 'Mon', liters: 120 },
  { day: 'Tue', liters: 95 },
  { day: 'Wed', liters: 140 },
  { day: 'Thu', liters: 80 },
  { day: 'Fri', liters: 110 },
  { day: 'Sat', liters: 60 },
  { day: 'Sun', liters: 45 },
];

const growthStages = [
  { name: 'Germination', days: '1–12', done: true },
  { name: 'Tillering', days: '13–35', done: true },
  { name: 'Stem Extension', days: '36–65', done: true },
  { name: 'Heading', days: '66–85', done: false, current: true },
  { name: 'Grain Filling', days: '86–115', done: false },
  { name: 'Ripening', days: '116–140', done: false },
];

export default function Progress() {
  const { profile } = useAuth();
  const start = new Date(profile.cropStartDate);
  const now = new Date();
  const daysPassed = Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86400000));
  const totalDays = 140;
  const pct = Math.min(100, Math.round((daysPassed / totalDays) * 100));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Crop Progress</h1>
        <p className="text-muted-foreground">{profile.crop} — Day {daysPassed} of {totalDays}</p>
      </div>

      {/* Progress Bar */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Growth Timeline
          </h2>
          <span className="text-sm font-bold text-primary">{pct}% complete</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} className="h-full bg-primary rounded-full" />
        </div>

        {/* Timeline */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {growthStages.map((s) => (
            <div key={s.name} className={`text-center p-3 rounded-xl text-sm ${
              s.current ? 'bg-primary/15 border-2 border-primary' :
              s.done ? 'bg-success/10' : 'bg-muted'
            }`}>
              <p className={`font-semibold ${s.current ? 'text-primary' : s.done ? 'text-success' : 'text-muted-foreground'}`}>{s.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.days}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Graph */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Crop Quality Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 10% 88%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="quality" stroke="hsl(142 55% 32%)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(142 55% 32%)' }} name="Quality %" />
              <Line type="monotone" dataKey="moisture" stroke="hsl(200 75% 50%)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Moisture %" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Water Usage */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-info" /> Water Usage (This Week)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={waterUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 10% 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="liters" fill="hsl(200 75% 50%)" radius={[6, 6, 0, 0]} name="Liters" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total: <strong className="text-foreground">650 L</strong></span>
            <span className="text-muted-foreground">Avg: <strong className="text-foreground">93 L/day</strong></span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
