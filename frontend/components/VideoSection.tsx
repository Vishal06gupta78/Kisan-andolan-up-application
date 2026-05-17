'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, X, Film, Clock, Eye } from 'lucide-react';
import ReactPlayer from 'react-player';

const videos = [
  {
    id: 1,
    title: 'ट्रांस गंगा सिटी - अखिलेश यादव का सम्मान',
    description: 'पूर्व मुख्यमंत्री अखिलेश यादव जी द्वारा अजय अनमोल जी को ट्रांस गंगा सिटी कानपुर/उन्नाव के निर्माण में योगदान के लिए सम्मानित किया गया।',
    thumbnail: 'https://img.youtube.com/vi/x2aXl-jCDVE/mqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=x2aXl-jCDVE',
    duration: '5:30',
    views: '1.2M',
    category: 'award'
  },
  {
    id: 2,
    title: 'किसान महापंचायत - लखनऊ',
    description: 'उत्तर प्रदेश की सबसे बड़ी किसान महापंचायत में अजय अनमोल जी का ऐतिहासिक भाषण।',
    thumbnail: '/images/video-thumb-2.jpg',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '12:45',
    views: '850K',
    category: 'rally'
  },
  {
    id: 3,
    title: 'खेत में किसानों के साथ',
    description: 'अजय अनमोल जी सीधे खेत में किसानों की समस्याएं सुनते हुए और उनका समाधान करते हुए।',
    thumbnail: '/images/video-thumb-3.jpg',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '8:20',
    views: '620K',
    category: 'movement'
  },
  {
    id: 4,
    title: 'सिंचाई सुविधा विस्तार - जनहित में',
    description: '15 जिलों में सिंचाई सुविधाओं के विस्तार के लिए किए गए आंदोलन की पूरी कहानी।',
    thumbnail: '/images/video-thumb-4.jpg',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '15:10',
    views: '430K',
    category: 'movement'
  },
  {
    id: 5,
    title: 'कृषि ऋण माफी अभियान',
    description: 'किसानों के कर्ज माफी के लिए चलाए गए सफल अभियान की दस्तावेजी फिल्म।',
    thumbnail: '/images/video-thumb-5.jpg',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '10:55',
    views: '780K',
    category: 'movement'
  },
  {
    id: 6,
    title: 'युवा किसान सम्मेलन 2023',
    description: 'युवा किसानों को प्रोत्साहित करने और आधुनिक कृषि तकनीक से जोड़ने का समारोह।',
    thumbnail: '/images/video-thumb-6.jpg',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '7:40',
    views: '340K',
    category: 'meeting'
  }
];

const categories = [
  { id: 'all', label: 'सभी वीडियो' },
  { id: 'award', label: 'सम्मान' },
  { id: 'rally', label: 'रैली' },
  { id: 'movement', label: 'आंदोलन' },
  { id: 'meeting', label: 'बैठक' },
];

export default function VideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <section id="videos" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
            वीडियो गैलरी
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            वीडियो <span className="text-red-600">देखें</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            किसान आंदोलन की गौरवशाली यात्रा के वीडियो
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
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Featured Video */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group aspect-video bg-gray-900"
              onClick={() => setActiveVideo(filtered[0])}
            >
              <img 
                src={filtered[0].thumbnail}
                alt={filtered[0].title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-red-700 transition-colors"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3">
                  फीचर्ड
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{filtered[0].title}</h3>
                <p className="text-white/70 max-w-2xl">{filtered[0].description}</p>
                <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {filtered[0].duration}</span>
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {filtered[0].views} views</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((video, index) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setActiveVideo(video)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl cursor-pointer transition-all"
            >
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity group-hover:scale-105 duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-white text-4xl">🎬</div>';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium">
                  {video.duration}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {video.views}</span>
                  <Film className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <ReactPlayer
                url={activeVideo.url}
                width="100%"
                height="100%"
                controls
                playing
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 }
                  }
                }}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">{activeVideo.title}</h3>
              <p className="text-white/70 mt-1">{activeVideo.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
