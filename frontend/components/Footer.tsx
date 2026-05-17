'use client';

import { motion } from 'framer-motion';
import { Wheat, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-kisan-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-kisan-saffron rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-kisan-green to-kisan-green-dark rounded-full flex items-center justify-center">
                <Wheat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">किसान आंदोलन</h3>
                <p className="text-kisan-saffron text-sm">उत्तर प्रदेश</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              किसानों के अधिकारों के लिए संघर्षरत, अजय अनमोल के नेतृत्व में उत्तर प्रदेश का सबसे बड़ा किसान संगठन।
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Youtube, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-kisan-green transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-kisan-wheat">त्वरित लिंक</h4>
            <ul className="space-y-3">
              {[
                { name: 'मुख्य पृष्ठ', href: '#' },
                { name: 'हमारे बारे में', href: '#about' },
                { name: 'उपलब्धियां', href: '#achievements' },
                { name: 'गैलरी', href: '#gallery' },
                { name: 'वीडियो', href: '#videos' },
                { name: 'सदस्यता', href: '#membership' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-kisan-wheat transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-kisan-green rounded-full" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-kisan-wheat">संपर्क करें</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-kisan-green flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  किसान आंदोलन कार्यालय,<br />
                  कानपुर, उत्तर प्रदेश - 208001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-kisan-green flex-shrink-0" />
                <a href="tel:+919999999999" className="text-gray-400 hover:text-kisan-wheat transition-colors text-sm">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-kisan-green flex-shrink-0" />
                <a href="mailto:info@kisanandolanup.org" className="text-gray-400 hover:text-kisan-wheat transition-colors text-sm">
                  info@kisanandolanup.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-kisan-wheat">सूचनाएं पाएं</h4>
            <p className="text-gray-400 text-sm mb-4">
              किसान आंदोलन की नवीनतम जानकारी सीधे अपने इनबॉक्स में पाएं।
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="आपका ईमेल पता"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:border-kisan-green focus:outline-none transition-colors text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-kisan-saffron to-orange-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-shadow"
              >
                सब्सक्राइब करें
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2024 किसान आंदोलन उत्तर प्रदेश. सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-kisan-wheat transition-colors">गोपनीयता नीति</a>
            <a href="#" className="hover:text-kisan-wheat transition-colors">नियम और शर्तें</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-kisan-green text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-kisan-green-dark transition-colors z-40"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
