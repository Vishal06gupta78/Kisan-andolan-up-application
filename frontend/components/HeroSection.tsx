'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Play, Users, Award, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { icon: Users, value: '50,000+', label: 'सक्रिय सदस्य' },
    { icon: Award, value: '25+', label: 'बड़ी उपलब्धियां' },
    { icon: TrendingUp, value: '15+', label: 'जिलों में प्रभाव' },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-kisan-green/90 z-10" />
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-kisan-wheat/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 bg-kisan-saffron/20 backdrop-blur-sm border border-kisan-saffron/30 rounded-full text-kisan-wheat text-sm font-semibold mt-16">
            उत्तर प्रदेश का सबसे बड़ा किसान आंदोलन
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
        >
          <span className="block">किसान</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-kisan-wheat via-yellow-300 to-kisan-saffron">
            आंदोलन
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 font-bold text-white/90">
            उत्तर प्रदेश
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/80 mb-4 font-medium"
        >
          अध्यक्ष: <span className="text-kisan-wheat font-bold">अजय अनमोल</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
        >
          किसानों के अधिकारों के लिए संघर्षरत, ट्रांस गंगा सिटी कानपुर/उन्नाव के निर्माण में अहम योगदान
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="#membership"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-kisan-saffron to-orange-600 text-white rounded-full text-lg font-bold shadow-2xl hover:shadow-kisan-saffron/30 transition-shadow flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            सदस्यता लें
          </motion.a>
          <motion.a
            href="#videos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full text-lg font-bold hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            वीडियो देखें
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
            >
              <stat.icon className="w-6 h-6 text-kisan-wheat mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-sm">नीचे स्क्रॉल करें</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
