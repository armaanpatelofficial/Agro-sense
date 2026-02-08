import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', farmLocation: '', crop: 'Tomato', cropStartDate: '', password: '' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const crops = ['Tomato', 'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Onion', 'Potato', 'Maize'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.farmLocation) {
      setError('Please fill all required fields'); return;
    }
    signup(form);
    navigate('/');
  };

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Join AgroSense</h1>
          <p className="text-muted-foreground mt-2">Set up your farm profile</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {error && <p className="text-sm text-destructive mb-4 bg-destructive/10 p-3 rounded-lg">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
              <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" placeholder="Rajesh Kumar" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" placeholder="farmer@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Farm Location *</label>
              <input type="text" value={form.farmLocation} onChange={(e) => update('farmLocation', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" placeholder="Nashik, Maharashtra" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Crop</label>
                <select value={form.crop} onChange={(e) => update('crop', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition">
                  {crops.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Start Date</label>
                <input type="date" value={form.cropStartDate} onChange={(e) => update('cropStartDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password *</label>
              <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
