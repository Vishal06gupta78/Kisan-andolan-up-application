'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Heart, Shield, Sprout } from 'lucide-react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Target,
      title: 'लक्ष्य',
      description: 'प्रत्येक किसान को उसके अधिकार और सम्मान दिलाना'
    },
    {
      icon: Heart,
      title: 'समर्पण',
      description: 'किसानों की सेवा में पूर्ण समर्पण और निष्ठा'
    },
    {
      icon: Shield,
      title: 'सुरक्षा',
      description: 'किसानों के हितों की रक्षा और कानूनी सहायता'
    },
    {
      icon: Sprout,
      title: 'विकास',
      description: 'कृषि के आधुनिकीकरण और किसानों की आय में वृद्धि'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-green-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-kisan-green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-kisan-saffron rounded-full blur-3xl" />
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
            हमारे बारे में
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            किसानों की <span className="text-kisan-green">आवाज</span>,
            <br />
            <span className="text-kisan-saffron">अजय अनमोल</span> के नेतृत्व में
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            किसान आंदोलन उत्तर प्रदेश एक ऐसा संगठन है जो किसानों के अधिकारों के लिए लगातार संघर्षरत है। 
            अध्यक्ष अजय अनमोल के कुशल नेतृत्व में, हमने कई ऐतिहासिक उपलब्धियां हासिल की हैं।
          </p>
        </motion.div>

        {/* Leader Profile */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <div className="aspect-[4/5] bg-gradient-to-br from-kisan-green to-kisan-green-dark relative">
                <img 
                  src="/images/IMG_3698.jpeg" 
                  alt="अजय अनमोल - किसान आंदोलन अध्यक्ष"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-white text-6xl font-black">अजय अनमोल</div>';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-black text-white mb-2">अजय अनमोल</h3>
                  <p className="text-kisan-wheat font-semibold text-lg">अध्यक्ष, किसान आंदोलन उत्तर प्रदेश</p>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-kisan-saffron/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-kisan-green/20 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ट्रांस गंगा सिटी - एक सपना साकार</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                पूर्व मुख्यमंत्री अखिलेश यादव जी द्वारा ट्रांस गंगा सिटी कानपुर/उन्नाव के निर्माण में 
                अजय अनमोल जी के अथक प्रयासों और योगदान को सम्मानित किया गया। यह परियोजना किसानों के 
                लिए एक नए युग की शुरुआत है।
              </p>
              <div className="flex items-center gap-3 text-kisan-green font-semibold">
                <span className="w-2 h-2 bg-kisan-green rounded-full animate-pulse" />
                कानपुर / उन्नाव क्षेत्र का विकास
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">किसानों के लिए संघर्ष</h3>
              <p className="text-gray-600 leading-relaxed">
                अजय अनमोल जी ने हमेशा किसानों की समस्याओं को मुख्यधारा में लाने का काम किया है। 
                MSP, सिंचाई सुविधाएं, और कृषि ऋण माफी जैसे मुद्दों पर उनकी आवाज हमेशा बुलंद रही है।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-kisan-green/5 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-kisan-green">35+</div>
                <div className="text-sm text-gray-600">वर्षों का अनुभव</div>
              </div>
              <div className="bg-kisan-saffron/5 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-kisan-saffron">15+</div>
                <div className="text-sm text-gray-600">जिलों में सक्रिय</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-kisan-green/20 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-kisan-green to-kisan-green-dark rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
 