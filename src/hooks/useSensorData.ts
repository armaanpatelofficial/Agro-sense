import { useState, useEffect, useCallback } from 'react';

export interface SensorData {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  batteryLevel: number;
  pumpStatus: 'on' | 'off';
  pumpMode: 'auto' | 'manual';
  rainDetected: boolean;
  lastUpdated: Date;
}

const randomInRange = (min: number, max: number) =>
  Math.round((Math.random() * (max - min) + min) * 10) / 10;

export function useSensorData() {
  const [data, setData] = useState<SensorData>({
    soilMoisture: 62,
    temperature: 28,
    humidity: 65,
    batteryLevel: 87,
    pumpStatus: 'off',
    pumpMode: 'auto',
    rainDetected: false,
    lastUpdated: new Date(),
  });

  // Simulate live sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const moisture = Math.max(15, Math.min(95, prev.soilMoisture + randomInRange(-3, 3)));
        const shouldPump = prev.pumpMode === 'auto' && moisture < 40 && !prev.rainDetected;
        return {
          ...prev,
          soilMoisture: moisture,
          temperature: Math.max(18, Math.min(42, prev.temperature + randomInRange(-0.5, 0.5))),
          humidity: Math.max(30, Math.min(95, prev.humidity + randomInRange(-2, 2))),
          batteryLevel: Math.max(10, prev.batteryLevel - randomInRange(0, 0.1)),
          pumpStatus: shouldPump ? 'on' : prev.pumpMode === 'auto' ? 'off' : prev.pumpStatus,
          rainDetected: Math.random() > 0.97 ? !prev.rainDetected : prev.rainDetected,
          lastUpdated: new Date(),
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const togglePump = useCallback(() => {
    setData((prev) => ({
      ...prev,
      pumpStatus: prev.pumpStatus === 'on' ? 'off' : 'on',
    }));
  }, []);

  const setPumpMode = useCallback((mode: 'auto' | 'manual') => {
    setData((prev) => ({ ...prev, pumpMode: mode }));
  }, []);

  return { data, togglePump, setPumpMode };
}
