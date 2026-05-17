'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Trophy, Calendar, MapPin, ChevronRight, X } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'ट्रांस गंगा सिटी का निर्माण',
    description: 'कानपुर/उन्नाव में ट्रांस गंगा सिटी के विकास में अहम योगदान। पूर्व मुख्यमंत्री अखिलेश यादव जी द्वारा विशेष सम्मान।',
    date: '2023',
    location: 'कानपुर / उन्नाव',
    category: 'development',
    impact: '50,000+ किसान परिवार लाभान्वित',
    image: '/images/achievement-1.jpg'
  },
  {
    id: 2,
    title: 'MSP आंदोलन की सफलता',
    description: 'किसानों को न्यूनतम समर्थन मूल्य की गारंटी दिलाने में सफलता। केंद्र सरकार को किसानों की मांग माननी पड़ी।',
    date: '2021',
    location: 'उत्तर प्रदेश',
    category: 'movement',
    impact: 'पूरे प्रदेश के किसान लाभान्वित',
    image: '/images/achievement-2.jpg'
  },
  {
    id: 3,
    title: 'सिंचाई सुविधा विस्तार',
    description: '15 जिलों में सिंचाई सुविधाओं के विस्तार के लिए सफल आंदोलन। नहरों की सफाई और नए कुएं खुदवाए गए।',
    date: '2022',
    location: '15 जिले',
    category: 'policy',
    impact: '100+ गांवों में सिंचाई सुविधा',
    image: '/images/achievement-3.jpg'
  },
  {
    id: 4,
    title: 'कृषि ऋण माफी अभियान',
    description: 'किसानों के कर्ज माफी के लिए बड़ा आंदोलन। सरकार को किसानों का कर्ज माफ करने के लिए मजबूर किया।',
    date: '2020',
    location: 'उत्तर प्रदेश',
    category: 'movement',
    impact: '10,000+ किसानों का कर्ज माफ',
    image: '/images/achievement-4.jpg'
  },
  {
    id: 5,
    title: 'किसान सम्मान समारोह',
    description: 'वार्षिक किसान सम्मान समारोह का आयोजन। उत्कृष्ट किसानों को पुरस्कृत किया गया।',
    date: '2023',
    location: 'लखनऊ',
    category: 'award',
    impact: '500+ किसान सम्मानित',
    image: '/images/achievement-5.jpg'
  },
  {
    id: 6,
    title: 'खाद और बीज सब्सिडी',
    description: 'किसानों को सस्ते दरों पर खाद और बीज उपलब्ध कराने के लिए सरकार से सब्सिडी दिलाई।',
    date: '2022',
    location: 'उत्तर प्रदेश',
    category: 'policy',
    impact: '50% सब्सिडी दर पर खाद उपलब्ध',
    image: '/images/achievement-6.jpg'
  }
];

const categories = [
  { id: 'all', label: 'सभी' },
  { id: 'development', label: 'विकास' },
  { id: 'movement', label: 'आंदोलन' },
  { id: 'policy', label: 'नीति' },
  { id: 'award', label: 'सम्मान' },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);

  const filtered = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory);

  return (
    <section id="achievements" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-kisan-saffron/10 text-kisan-saffron rounded-full text-sm font-semibold mb-4">
            उपलब्धियां
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            हमारी <span className="text-kisan-green">उपलब्धियां</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            किसानों के हित में किए गए संघर्ष और उपलब्धियां जो इतिहास में दर्ज हैं
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-kisan-green text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedAchievement(achievement)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl cursor-pointer transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-kisan-green/20 to-kisan-saffron/20" />
                <img 
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = '<div class="flex items-center justify-center h-full bg-gradient-to-br from-kisan-green to-kisan-green-dark text-white text-4xl">🏆</div>';
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-kisan-green">
                  {achievement.date}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  {achievement.location}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-kisan-green transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{achievement.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-kisan-saffron bg-kisan-saffron/10 px-3 py-1 rounded-full">
                    {achievement.impact}
                  </span>
                  <ChevronRight className="w-5 h-5 text-kisan-green group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedAchievement(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72">
              <img 
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-black text-white mb-2">{selectedAchievement.title}</h3>
                <div className="flex items-center gap-4 text-white/80">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedAchievement.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedAchievement.location}</span>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{selectedAchievement.description}</p>
              <div className="bg-kisan-green/5 rounded-xl p-6 border border-kisan-green/10">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-6 h-6 text-kisan-saffron" />
                  <span className="font-bold text-gray-900">प्रभाव</span>
                </div>
                <p className="text-kisan-green font-semibold">{selectedAchievement.impact}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
