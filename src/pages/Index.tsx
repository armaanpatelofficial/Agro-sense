import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/hooks/useWeather';
import { useSensorData } from '@/hooks/useSensorData';
import StatCard from '@/components/StatCard';
import { Sprout, Droplets, Heart, CloudSun, ThermometerSun, Wind, FlaskConical, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const growthStages = ['Germination', 'Tillering', 'Stem Extension', 'Heading', 'Grain Filling', 'Ripening'];

function getCropQuality(moisture: number): { label: string; color: 'success' | 'warning' | 'destructive' } {
  if (moisture >= 40 && moisture <= 70) return { label: 'Excellent', color: 'success' };
  if (moisture >= 25 && moisture < 40) return { label: 'Good', color: 'warning' };
  return { label: 'Average', color: 'destructive' };
}

function getGrowthStage(startDate: string): { stage: string; day: number; total: number } {
  const start = new Date(startDate);
  const now = new Date();
  const daysPassed = Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86400000));
  const total = 140;
  const stageIndex = Math.min(5, Math.floor((daysPassed / total) * 6));
  return { stage: growthStages[stageIndex], day: daysPassed, total };
}

export default function Home() {
  const { profile } = useAuth();
  const weather = useWeather();
  const { data } = useSensorData();
  const quality = getCropQuality(data.soilMoisture);
  const growth = getGrowthStage(profile.cropStartDate);

  const needsWater = data.soilMoisture < 35;
  const needsFertilizer = growth.day > 0 && growth.day % 20 < 1;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {profile.name.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's your farm overview for today</p>
      </motion.div>

      {/* Crop & Soil Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Crop" value={profile.crop} icon={<Sprout className="w-5 h-5" />} color="primary" />
        <StatCard title="Growth Stage" value={growth.stage} icon={<Sprout className="w-5 h-5" />} color="success" />
        <StatCard title="Soil Moisture" value={data.soilMoisture} unit="%" icon={<Droplets className="w-5 h-5" />} color={data.soilMoisture < 40 ? 'warning' : 'info'} live />
        <StatCard title="Crop Quality" value={quality.label} icon={<Heart className="w-5 h-5" />} color={quality.color} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Needs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" /> What Your Crop Needs
          </h2>
          <div className="space-y-3">
            <div className={`flex items-start gap-3 p-4 rounded-xl ${needsWater ? 'bg-warning/10' : 'bg-success/10'}`}>
              <Droplets className={`w-5 h-5 mt-0.5 ${needsWater ? 'text-warning' : 'text-success'}`} />
              <div>
                <p className="font-medium text-foreground">Water Requirement</p>
                <p className="text-sm text-muted-foreground">
                  {needsWater ? 'Soil is dry — irrigation recommended now' : 'Soil moisture is adequate — no irrigation needed'}
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-xl ${needsFertilizer ? 'bg-warning/10' : 'bg-muted'}`}>
              <FlaskConical className={`w-5 h-5 mt-0.5 ${needsFertilizer ? 'text-warning' : 'text-muted-foreground'}`} />
              <div>
                <p className="font-medium text-foreground">Fertilizer</p>
                <p className="text-sm text-muted-foreground">
                  {needsFertilizer ? 'NPK fertilizer application due this week' : 'No fertilizer needed right now'}
                </p>
              </div>
            </div>
            {data.soilMoisture < 20 && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10">
                <AlertTriangle className="w-5 h-5 mt-0.5 text-destructive" />
                <div>
                  <p className="font-medium text-foreground">Warning: Severe Dryness</p>
                  <p className="text-sm text-muted-foreground">Soil moisture critically low — immediate irrigation needed</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Weather */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-info" /> Weather — {profile.farmLocation}
          </h2>
          <div className="flex items-center gap-6 mb-6">
            <span className="text-5xl">{weather.icon}</span>
            <div>
              <p className="text-4xl font-bold text-foreground">{weather.temperature}°C</p>
              <p className="text-muted-foreground">{weather.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-muted">
              <Droplets className="w-4 h-4 mx-auto text-info mb-1" />
              <p className="text-lg font-semibold text-foreground">{weather.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted">
              <Wind className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-semibold text-foreground">{weather.windSpeed} km/h</p>
              <p className="text-xs text-muted-foreground">Wind</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted">
              <CloudSun className="w-4 h-4 mx-auto text-warning mb-1" />
              <p className="text-lg font-semibold text-foreground">{weather.rainChance}%</p>
              <p className="text-xs text-muted-foreground">Rain Chance</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
