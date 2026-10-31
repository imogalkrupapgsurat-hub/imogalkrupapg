import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Wind, Shield, Droplets, Shirt, Car, BookOpen, Tv, Trash2, BatteryCharging } from 'lucide-react';

const Amenities = () => {
  const amenities = [
    { icon: Wifi, label: 'Free High-Speed WiFi' },
    { icon: Wind, label: 'AC Rooms Available' },
    { icon: Shield, label: '24/7 CCTV Security' },
    { icon: Droplets, label: '24/7 Hot Water' },
    { icon: Shirt, label: 'Laundry Service' },
    { icon: Car, label: 'Spacious Parking' },
    { icon: BookOpen, label: 'Quiet Study Room' },
    { icon: Tv, label: 'Common TV Area' },
    { icon: Trash2, label: 'Daily Housekeeping' },
    { icon: BatteryCharging, label: 'Power Backup' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h4 className="text-teal-600 font-bold uppercase tracking-wider mb-2">Premium Facilities</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Everything You Need</h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {amenities.map((amenity, idx) => (
            <motion.div 
              key={idx}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-slate-100 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100/50 transition-all cursor-pointer group"
            >
              <div className="bg-white p-4 rounded-full shadow-sm group-hover:bg-teal-500 group-hover:text-white text-teal-600 transition-colors">
                <amenity.icon size={32} />
              </div>
              <span className="font-semibold text-slate-700 text-sm group-hover:text-teal-700">{amenity.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;
