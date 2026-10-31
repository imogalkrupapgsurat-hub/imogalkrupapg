import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Wind, Tv, Bath, BedDouble, Check } from 'lucide-react';

const Rooms = () => {
  const rooms = [
    {
      title: 'Single Occupancy',
      price: '₹8,000',
      description: 'Perfect for professionals seeking privacy and comfort.',
      color: 'from-blue-500 to-cyan-500',
      amenities: ['AC Room', 'Attached Bath', 'Free WiFi', 'Study Desk', 'Wardrobe']
    },
    {
      title: 'Double Sharing',
      price: '₹6,000',
      description: 'Ideal for friends or students looking to share space.',
      color: 'from-amber-500 to-orange-500',
      popular: true,
      amenities: ['AC/Non-AC', 'Common Bath', 'Free WiFi', 'Locker', 'Laundry']
    },
    {
      title: 'Triple Sharing',
      price: '₹5,000',
      description: 'Budget-friendly option with all essential amenities.',
      color: 'from-teal-500 to-emerald-500',
      amenities: ['Non-AC Room', 'Common Bath', 'Free WiFi', 'Locker', 'Study Area']
    }
  ];

  const icons = [
    { Icon: Wifi, label: 'WiFi' },
    { Icon: Wind, label: 'AC' },
    { Icon: Tv, label: 'TV' },
    { Icon: Bath, label: 'Bath' },
    { Icon: BedDouble, label: 'Bed' },
  ];

  return (
    <section id="rooms" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 font-bold uppercase tracking-wider mb-2"
          >
            Our Accommodation
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-800"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Perfect Room</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className={`bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative border-2 ${room.popular ? 'border-amber-400' : 'border-transparent hover:border-amber-200'} transition-all`}
            >
              {room.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{room.title}</h3>
              <p className="text-slate-500 mb-6 text-sm h-10">{room.description}</p>
              
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="text-4xl font-extrabold text-slate-800">{room.price}</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>

              <div className="flex justify-between mb-8 text-slate-400">
                {icons.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 group">
                    <item.Icon size={20} className="group-hover:text-amber-500 transition-colors" />
                    <span className="text-[10px] uppercase font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>

              <ul className="space-y-4 mb-8">
                {room.amenities.map((amenity, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="bg-amber-100 p-1 rounded-full text-amber-600">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 font-medium">{amenity}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className={`block w-full py-3 px-4 rounded-xl text-center font-bold text-white bg-gradient-to-r ${room.color} hover:opacity-90 transition-opacity shadow-lg`}>
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
