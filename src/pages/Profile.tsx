import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, MapPin, Sprout, CalendarDays, Mail, LogOut, Save } from 'lucide-react';

export default function Profile() {
  const { profile, updateProfile, logout } = useAuth();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const crops = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Tomato', 'Onion', 'Potato'];

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your farm details</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4 pb-5 border-b border-border">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.farmLocation}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> Farmer Name</label>
            <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground" /> Email</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> Farm Location</label>
            <input type="text" value={form.farmLocation} onChange={(e) => update('farmLocation', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2"><Sprout className="w-4 h-4 text-muted-foreground" /> Crop</label>
              <select value={form.crop} onChange={(e) => update('crop', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition">
                {crops.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-muted-foreground" /> Start Date</label>
              <input type="date" value={form.cropStartDate} onChange={(e) => update('cropStartDate', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3">
          <button onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
            <Save className="w-4 h-4" /> {saved ? 'Saved ✓' : 'Save Changes'}
          </button>
          <button onClick={logout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
