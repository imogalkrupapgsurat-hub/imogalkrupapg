import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    { label: 'Cozy Bedroom', color: 'from-amber-200 to-orange-300', span: 'col-span-1 md:col-span-2 row-span-2' },
    { label: 'Hygienic Kitchen', color: 'from-rose-200 to-pink-300', span: 'col-span-1 row-span-1' },
    { label: 'Common Area', color: 'from-teal-200 to-emerald-300', span: 'col-span-1 row-span-1' },
    { label: 'Dining Hall', color: 'from-blue-200 to-cyan-300', span: 'col-span-1 md:col-span-2 row-span-1' },
  ];

  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">Photo Gallery</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">A Glimpse of Home</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-[600px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className={`rounded-3xl overflow-hidden relative group cursor-pointer shadow-md ${img.span}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/10 group-hover:bg-transparent transition-colors">
                <h3 className="text-white text-2xl font-bold drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform">{img.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
