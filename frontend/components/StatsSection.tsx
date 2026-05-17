'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, MapPin, Award, Heart } from 'lucide-react';

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString('hi-IN')}</span>;
}

export default function StatsSection() {
  const stats = [
    { icon: Users, value: 50000, suffix: '+', label: 'सक्रिय सदस्य', color: 'from-blue-500 to-blue-600' },
    { icon: MapPin, value: 15, suffix: '+', label: 'जिले शामिल', color: 'from-kisan-green to-green-600' },
    { icon: Award, value: 25, suffix: '+', label: 'बड़ी उपलब्धियां', color: 'from-kisan-saffron to-orange-600' },
    { icon: Heart, value: 100, suffix: '+', label: 'गांव जुड़े', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-kisan-green via-kisan-green-dark to-kisan-green relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kisan-wheat rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                <AnimatedCounter target={stat.value} />
                <span className="text-kisan-wheat">{stat.suffix}</span>
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}