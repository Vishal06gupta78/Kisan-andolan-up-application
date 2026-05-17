'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Sprout, Building2, Droplets, BookOpen, HeartPulse, Truck } from 'lucide-react';

const impacts = [
  {
    icon: Sprout,
    title: 'कृषि विकास',
    description: 'आधुनिक कृषि तकनीक का प्रसार और किसानों की आय में 40% वृद्धि',
    stat: '40%',
    statLabel: 'आय वृद्धि',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Building2,
    title: 'ट्रांस गंगा सिटी',
    description: 'कानपुर/उन्नाव में ट्रांस गंगा सिटी का विकास - 50,000+ परिवार लाभान्वित',
    stat: '50K+',
    statLabel: 'परिवार',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Droplets,
    title: 'सिंचाई सुविधा',
    description: '15 जिलों में नहरों की सफाई और नए सिंचाई स्रोतों का विकास',
    stat: '15',
    statLabel: 'जिले',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: BookOpen,
    title: 'शिक्षा अभियान',
    description: 'किसानों के बच्चों के लिए शिक्षा सहायता और छात्रवृत्ति कार्यक्रम',
    stat: '5,000+',
    statLabel: 'छात्र',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: HeartPulse,
    title: 'स्वास्थ्य शिविर',
    description: 'ग्रामीण क्षेत्रों में निःशुल्क स्वास्थ्य शिविर और चिकित्सा सहायता',
    stat: '200+',
    statLabel: 'शिविर',
    color: 'from-red-500 to-pink-600'
  },
  {
    icon: Truck,
    title: 'बाजार पहुंच',
    description: 'किसानों को सीधे बाजार से जोड़ना - मध्यस्थों की समाप्ति',
    stat: '30%',
    statLabel: 'लाभ वृद्धि',
    color: 'from-orange-500 to-amber-600'
  }
];

export default function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="impact" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-kisan-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-kisan-saffron rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-kisan-green/10 text-kisan-green rounded-full text-sm font-semibold mb-4">
            सामाजिक प्रभाव
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            हमारा <span className="text-kisan-saffron">प्रभाव</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            किसान आंदोलन ने उत्तर प्रदेश में किसानों की जिंदगी में लाई बड़ा बदलाव
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${impact.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <impact.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-black bg-gradient-to-r ${impact.color} bg-clip-text text-transparent`}>
                      {impact.stat}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{impact.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-kisan-green transition-colors">
                  {impact.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {impact.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-kisan-green to-kisan-green-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-kisan-wheat rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                इस परिवर्तन का हिस्सा बनें
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                किसान आंदोलन उत्तर प्रदेश से जुड़कर आप भी किसानों की सेवा में अपना योगदान दे सकते हैं
              </p>
              <motion.a
                href="#membership"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-kisan-green rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-shadow"
              >
                <TrendingUp className="w-5 h-5" />
                अभी शामिल हों
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
