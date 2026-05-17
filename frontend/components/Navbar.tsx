'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wheat, Phone, Users } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'मुख्य पृष्ठ', href: '#' },
  { name: 'हमारे बारे में', href: '#about' },
  { name: 'उपलब्धियां', href: '#achievements' },
  { name: 'गैलरी', href: '#gallery' },
  { name: 'वीडियो', href: '#videos' },
  { name: 'प्रभाव', href: '#impact' },
  { name: 'सदस्यता', href: '#membership' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-kisan-green/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-kisan-green to-kisan-green-dark rounded-full flex items-center justify-center shadow-lg"
            >
              <Wheat className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg leading-tight transition-colors ${scrolled ? 'text-kisan-green' : 'text-white'}`}>
                किसान आंदोलन
              </h1>
              <p className={`text-xs font-medium transition-colors ${scrolled ? 'text-kisan-saffron' : 'text-kisan-wheat'}`}>
                उत्तर प्रदेश
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-kisan-green/10 ${
                  scrolled ? 'text-gray-700 hover:text-kisan-green' : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.a
              href="#membership"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-kisan-saffron to-orange-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Users className="w-4 h-4" />
              सदस्य बनें
            </motion.a>
            <motion.a
              href="tel:+919999999999"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-kisan-green text-white rounded-full text-sm font-semibold shadow-lg"
            >
              <Phone className="w-4 h-4" />
              संपर्क करें
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-kisan-green' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-kisan-green/5 hover:text-kisan-green font-medium transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <a
                  href="#membership"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-kisan-saffron text-white rounded-xl font-semibold"
                >
                  <Users className="w-5 h-5" />
                  सदस्य बनें
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
