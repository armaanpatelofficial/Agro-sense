import { useSensorData } from '@/hooks/useSensorData';
import { useWeather } from '@/hooks/useWeather';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from '@/components/StatCard';
import { Droplets, ThermometerSun, Sprout, BatteryMedium, Power, CloudRain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { data, togglePump, setPumpMode } = useSensorData();
  const weather = useWeather();
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring & control</p>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Soil Moisture" value={data.soilMoisture} unit="%" icon={<Droplets className="w-5 h-5" />} color={data.soilMoisture < 40 ? 'warning' : 'info'} live />
        <StatCard title="Temperature" value={weather.temperature} unit="°C" icon={<ThermometerSun className="w-5 h-5" />} color="warning" live />
        <StatCard title="Growth Stage" value="Vegetative" icon={<Sprout className="w-5 h-5" />} color="success" />
        <StatCard title="Battery" value={Math.round(data.batteryLevel)} unit="%" icon={<BatteryMedium className="w-5 h-5" />} color={data.batteryLevel < 30 ? 'destructive' : 'primary'} live />
      </div>

      {/* Control Panel */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Power className="w-5 h-5 text-primary" /> Water Pump Control
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mode Selection */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Pump Mode</p>
            <div className="flex gap-3">
              <button
                onClick={() => setPumpMode('auto')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                  data.pumpMode === 'auto'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Zap className="w-4 h-4 inline mr-2" />
                AUTO Mode
              </button>
              <button
                onClick={() => setPumpMode('manual')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                  data.pumpMode === 'manual'
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Power className="w-4 h-4 inline mr-2" />
                MANUAL Mode
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {data.pumpMode === 'auto'
                ? 'Pump automatically turns on when soil moisture drops below 40%'
                : 'You control the pump manually using the toggle'}
            </p>
          </div>

          {/* Pump Status & Toggle */}
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-muted">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${
              data.pumpStatus === 'on' ? 'bg-success text-success-foreground' : 'bg-muted-foreground/20 text-muted-foreground'
            }`}>
              <Power className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold text-foreground mb-1">
              Pump is {data.pumpStatus === 'on' ? 'ON' : 'OFF'}
            </p>
            {data.pumpMode === 'manual' && (
              <button
                onClick={togglePump}
                className={`mt-3 px-8 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  data.pumpStatus === 'on'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-success text-success-foreground'
                }`}
              >
                {data.pumpStatus === 'on' ? 'Turn OFF' : 'Turn ON'}
              </button>
            )}
            {data.pumpMode === 'auto' && (
              <p className="text-sm text-muted-foreground mt-2">Controlled by sensors</p>
            )}
          </div>
        </div>

        {data.rainDetected && (
          <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-info/10">
            <CloudRain className="w-5 h-5 text-info" />
            <p className="text-sm font-medium text-foreground">Rain detected — pump paused in auto mode</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
