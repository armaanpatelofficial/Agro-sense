import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Droplets, CloudRain, FlaskConical, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'low_moisture' | 'rain' | 'fertilizer' | 'fault';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialAlerts: Alert[] = [
  { id: '1', type: 'low_moisture', title: 'Low Soil Moisture', message: 'Soil moisture dropped to 28%. Auto-irrigation activated.', time: '10 min ago', read: false },
  { id: '2', type: 'rain', title: 'Rain Detected', message: 'Rain detected — irrigation paused to conserve water.', time: '1 hr ago', read: false },
  { id: '3', type: 'fertilizer', title: 'Fertilizer Reminder', message: 'NPK fertilizer application is due for your Tomato crop.', time: '3 hrs ago', read: false },
  { id: '4', type: 'fault', title: 'Sensor Warning', message: 'Moisture sensor #2 showing intermittent readings. Check wiring.', time: '5 hrs ago', read: true },
  { id: '5', type: 'low_moisture', title: 'Moisture Restored', message: 'Soil moisture back to 58%. Irrigation stopped.', time: 'Yesterday', read: true },
  { id: '6', type: 'rain', title: 'Rain Forecast', message: 'Light rain expected tomorrow. Irrigation schedule adjusted.', time: 'Yesterday', read: true },
];

const typeConfig = {
  low_moisture: { icon: Droplets, bg: 'bg-warning/10', border: 'border-l-warning', iconColor: 'text-warning' },
  rain: { icon: CloudRain, bg: 'bg-info/10', border: 'border-l-info', iconColor: 'text-info' },
  fertilizer: { icon: FlaskConical, bg: 'bg-success/10', border: 'border-l-success', iconColor: 'text-success' },
  fault: { icon: AlertTriangle, bg: 'bg-destructive/10', border: 'border-l-destructive', iconColor: 'text-destructive' },
};

export default function Notifications() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const markRead = (id: string) => setAlerts((a) => a.map((x) => x.id === id ? { ...x, read: true } : x));
  const dismiss = (id: string) => setAlerts((a) => a.filter((x) => x.id !== id));
  const markAllRead = () => setAlerts((a) => a.map((x) => ({ ...x, read: true })));

  const unread = alerts.filter((a) => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" /> Notifications
          </h1>
          <p className="text-muted-foreground">{unread} unread alert{unread !== 1 && 's'}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert) => {
            const cfg = typeConfig[alert.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                onClick={() => markRead(alert.id)}
                className={`glass-card rounded-xl p-4 flex items-start gap-4 border-l-4 cursor-pointer transition-colors ${cfg.border} ${
                  !alert.read ? cfg.bg : ''
                }`}
              >
                <div className={`p-2.5 rounded-xl ${cfg.bg}`}>
                  <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-semibold text-foreground ${!alert.read ? '' : 'opacity-70'}`}>{alert.title}</p>
                    <button onClick={(e) => { e.stopPropagation(); dismiss(alert.id); }} className="text-muted-foreground hover:text-foreground p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                </div>
                {!alert.read && <span className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0" />}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {alerts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">All caught up!</p>
            <p className="text-sm">No notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
