import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, Coffee, ShieldCheck } from 'lucide-react';

const FoodCourt = () => {
  return (
    <section id="food-court" className="py-24 relative overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-rose-500 font-bold uppercase tracking-wider mb-2"
          >
            Mogal Krupa Food Court
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-800"
          >
            Delicious <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">Home-Cooked Meals</span> 🍽️
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Utensils className="text-rose-500" /> Meal Timings
              </h3>
              
              <div className="space-y-4">
                {[
                  { meal: 'Breakfast', time: '7:30 AM - 9:00 AM', desc: 'Poha, Upma, Thepla, Tea/Coffee' },
                  { meal: 'Lunch', time: '12:00 PM - 2:00 PM', desc: 'Gujarati Thali: Roti, Sabzi, Dal, Rice' },
                  { meal: 'Dinner', time: '7:30 PM - 9:30 PM', desc: 'Kathiyawadi special, Khichdi Kadhi' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-100 hover:bg-rose-100/50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{item.meal}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center gap-2 text-rose-600 font-semibold bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                      <Clock size={16} /> {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { icon: ShieldCheck, title: 'Hygienic Kitchen', desc: 'Cleanliness is our top priority' },
              { icon: Coffee, title: 'Gujarati Cuisine', desc: 'Authentic local taste' },
              { icon: Utensils, title: 'Pure Veg', desc: '100% vegetarian meals' },
              { icon: Clock, title: 'Timely Service', desc: 'Fresh hot food on time' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-slate-50">
                <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500 mb-4">
                  <feature.icon size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{feature.title}</h4>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoodCourt;
