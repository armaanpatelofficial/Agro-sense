import { motion } from 'framer-motion';
import { HelpCircle, Droplets, Zap, Bell, Sprout, Settings, MessageCircle } from 'lucide-react';

const faqs = [
  { icon: Droplets, q: 'How does auto-irrigation work?', a: 'When in AUTO mode, the system reads soil moisture sensors every few seconds. If moisture drops below 40%, the water pump turns on automatically. It stops when moisture reaches 65% or rain is detected.' },
  { icon: Zap, q: 'What is the difference between AUTO and MANUAL mode?', a: 'AUTO mode lets the IoT sensors control the pump based on soil conditions. MANUAL mode gives you full control — you can turn the pump on or off anytime from the Dashboard.' },
  { icon: Bell, q: 'What alerts will I receive?', a: 'You\'ll get alerts for low soil moisture, rain detection, fertilizer reminders, and sensor faults. Alerts are color-coded: green for good, yellow for warnings, red for critical issues.' },
  { icon: Sprout, q: 'How is crop quality estimated?', a: 'Crop quality is estimated based on soil moisture levels and growth stage. Consistent moisture between 50-80% typically results in excellent crop quality.' },
  { icon: Settings, q: 'Can I change my crop details?', a: 'Yes! Go to your Profile page to update your crop type, farm location, and crop start date anytime.' },
];

export default function Help() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" /> Help & FAQs
        </h1>
        <p className="text-muted-foreground">Everything you need to know about AgroSense</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <faq.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{faq.q}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6 text-center">
        <MessageCircle className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Need More Help?</h3>
        <p className="text-muted-foreground mt-2">Contact your local AgroSense support team or reach out via the farmer helpline.</p>
        <p className="text-primary font-semibold mt-3">📞 1800-AGRO-HELP</p>
      </motion.div>
    </div>
  );
}
