'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'रामप्रसाद यादव',
    role: 'किसान, कानपुर',
    image: '/images/testimonial-1.jpg',
    content: 'अजय अनमोल जी के नेतृत्व में हमें अपने खेतों के लिए सिंचाई सुविधा मिली। आज हमारी फसल दोगुनी हो गई है। किसान आंदोलन ने हमारी जिंदगी बदल दी।',
    rating: 5
  },
  {
    id: 2,
    name: 'सरिता देवी',
    role: 'ग्राम प्रधान, उन्नाव',
    image: '/images/testimonial-2.jpg',
    content: 'ट्रांस गंगा सिटी के निर्माण से हमारे गांव का पूरा चेहरा बदल गया। सड़कें, बिजली, पानी - सब कुछ उपलब्ध हुआ। अजय जी का धन्यवाद।',
    rating: 5
  },
  {
    id: 3,
    name: 'मोहन लाल',
    role: 'किसान नेता, लखनऊ',
    image: '/images/testimonial-3.jpg',
    content: 'MSP आंदोलन में अजय जी का नेतृत्व अद्वितीय था। उन्होंने साबित किया कि एक सच्चा नेता किसानों की आवाज बन सकता है।',
    rating: 5
  },
  {
    id: 4,
    name: 'प्रेम सिंह',
    role: 'युवा किसान, इटावा',
    image: '/images/testimonial-4.jpg',
    content: 'किसान आंदोलन ने मुझे आधुनिक कृषि तकनीक सीखने का मौका दिया। आज मैं ऑर्गेनिक खेती करके अच्छी आमदनी कमा रहा हूं।',
    rating: 5
  }
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50/50 relative overflow-hidden">
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
          <span className="inline-block px-4 py-1.5 bg-kisan-saffron/10 text-kisan-saffron rounded-full text-sm font-semibold mb-4">
            किसानों की आवाज
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            क्या कहते हैं <span className="text-kisan-green">हमारे किसान</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative"
          >
            <Quote className="absolute top-8 left-8 w-12 h-12 text-kisan-green/10" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-kisan-green/20 shadow-lg">
                  <img 
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = '<div class="flex items-center justify-center h-full bg-kisan-green text-white text-2xl font-bold">' + testimonials[currentIndex].name.charAt(0) + '</div>';
                    }}
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-kisan-wheat fill-kisan-wheat" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentIndex].content}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-kisan-green font-medium">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-kisan-green hover:bg-kisan-green hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-kisan-green w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-kisan-green hover:bg-kisan-green hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
