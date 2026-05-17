'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/effect-coverflow';

const galleryImages = [
  {
    id: 1,
    src: '/images/gallery-1.jpg',
    title: 'ट्रांस गंगा सिटी का शिलान्यास',
    description: 'पूर्व मुख्यमंत्री अखिलेश यादव जी के साथ ट्रांस गंगा सिटी का शिलान्यास समारोह',
    category: 'movement'
  },
  {
    id: 2,
    src: '/images/gallery-2.jpg',
    title: 'किसान महापंचायत',
    description: 'लखनऊ में आयोजित ऐतिहासिक किसान महापंचायत में हजारों किसानों की उपस्थिति',
    category: 'meeting'
  },
  {
    id: 3,
    src: '/images/gallery-3.jpg',
    title: 'सम्मान समारोह',
    description: 'अखिलेश यादव जी द्वारा अजय अनमोल जी को ट्रांस गंगा सिटी योगदान के लिए सम्मानित किया गया',
    category: 'award'
  },
  {
    id: 4,
    src: '/images/gallery-4.jpg',
    title: 'जनसभा',
    description: 'कानपुर में विशाल जनसभा का आयोजन - किसानों की समस्याओं पर चर्चा',
    category: 'rally'
  },
  {
    id: 5,
    src: '/images/gallery-5.jpg',
    title: 'खेत में किसानों के बीच',
    description: 'अजय अनमोल जी सीधे खेत में किसानों से मिलते हुए',
    category: 'movement'
  },
  {
    id: 6,
    src: '/images/gallery-6.jpg',
    title: 'युवा किसान सम्मेलन',
    description: 'युवा किसानों को कृषि के आधुनिक तकनीक से अवगत कराते हुए',
    category: 'meeting'
  },
  {
    id: 7,
    src: '/images/gallery-7.jpg',
    title: 'धरना प्रदर्शन',
    description: 'किसानों के अधिकारों के लिए शांतिपूर्ण धरना प्रदर्शन',
    category: 'rally'
  },
  {
    id: 8,
    src: '/images/gallery-8.jpg',
    title: 'कृषि प्रदर्शनी',
    description: 'आधुनिक कृषि यंत्रों की प्रदर्शनी का आयोजन',
    category: 'other'
  }
];

export default function MediaGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'सभी' },
    { id: 'movement', label: 'आंदोलन' },
    { id: 'meeting', label: 'बैठक' },
    { id: 'award', label: 'सम्मान' },
    { id: 'rally', label: 'रैली' },
  ];

  const filtered = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-kisan-green/10 text-kisan-green rounded-full text-sm font-semibold mb-4">
            फोटो गैलरी
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            यादगार <span className="text-kisan-saffron">पल</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            किसान आंदोलन के ऐतिहासिक क्षणों की झलक
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-kisan-saffron text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-kisan-saffron'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full py-12"
          >
            {filtered.map((image) => (
              <SwiperSlide key={image.id} className="max-w-lg">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-kisan-green/10 to-kisan-saffron/10">
                    <img 
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const parent = target.parentElement;
                        target.style.display = 'none';
                        if (parent) {
                          parent.innerHTML = '<div class="flex items-center justify-center h-full text-6xl">📸</div>';
                        }
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-kisan-green text-white flex items-center justify-center hover:bg-kisan-green-dark transition-colors shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-kisan-green text-white flex items-center justify-center hover:bg-kisan-green-dark transition-colors shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Grid Gallery */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.slice(0, 4).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(image)}
              className="relative rounded-xl overflow-hidden cursor-pointer group aspect-square"
            >
              <img 
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  const parent = target.parentElement;
                  target.style.display = 'none';
                  if (parent) {
                    parent.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 text-4xl">🖼️</div>';
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-white/70 mt-2">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}