'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AchievementsSection from '@/components/AchievementsSection';
import MediaGallery from '@/components/MediaGallery';
import VideoSection from '@/components/VideoSection';
import MembershipSection from '@/components/MembershipSection';
import ImpactSection from '@/components/ImpactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsSection from '@/components/StatsSection';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <AchievementsSection />
      <MediaGallery />
      <VideoSection />
      <ImpactSection />
      <TestimonialsSection />
      <MembershipSection />
    </motion.div>
  );
}
