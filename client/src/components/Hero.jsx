import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, CheckCircle } from 'lucide-react';

const Hero = () => {
  const badges = [
    '✓ AC Rooms',
    '✓ Homely Food',
    '✓ 24/7 Security',
    '✓ Free WiFi'
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Blobs */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 z-0"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        {/* Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {badges.map((badge, idx) => (
            <span key={idx} className="bg-white/80 backdrop-blur-sm text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm border border-amber-100 flex items-center gap-1">
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Main Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6"
        >
          Your Home <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
            Away from Home 🏠
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-600 max-w-3xl mb-10"
        >
          Comfortable stay | Hygienic Food | Safe Environment <br/> Located in the heart of Surat, Gujarat.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a href="#rooms" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all">
            Explore Rooms
          </a>
          <a href="#contact" className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-100 rounded-full font-semibold text-lg hover:bg-slate-50 hover:border-slate-200 transition-all">
            Contact Us
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-8 border-t border-slate-200/50 w-full max-w-4xl"
        >
          {[
            { value: '50+', label: 'Happy Residents' },
            { value: '5+', label: 'Years Experience' },
            { value: '3', label: 'Daily Meals' },
            { value: '4.8★', label: 'Rating' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</span>
              <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a 
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
          className="absolute bottom-8 text-amber-500"
        >
          <ArrowDown size={32} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
