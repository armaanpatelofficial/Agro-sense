import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  color?: 'primary' | 'warning' | 'destructive' | 'info' | 'success';
  live?: boolean;
}

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
  success: 'bg-success/10 text-success',
};

export default function StatCard({ title, value, unit, icon, color = 'primary', live }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-5 flex items-start gap-4"
    >
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          {title}
          {live && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-xs text-success">Live</span>
            </span>
          )}
        </p>
        <p className="text-2xl font-bold text-foreground mt-1">
          {value}
          {unit && <span className="text-base font-medium text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>
    </motion.div>
  );
}
