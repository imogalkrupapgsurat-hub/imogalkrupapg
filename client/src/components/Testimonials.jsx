import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { name: 'Raj Sharma', role: 'Student', text: 'Best PG in Surat! The food is exactly like home and the rooms are always clean. Highly recommended for students.', rating: 5, color: 'bg-amber-100 text-amber-600' },
    { name: 'Priya Patel', role: 'IT Professional', text: 'Safe environment and very cooperative management. The WiFi speed is great for my work from home days.', rating: 5, color: 'bg-rose-100 text-rose-600' },
    { name: 'Amit Desai', role: 'Student', text: 'I have been living here for 2 years. The Gujarati thali is amazing. Truly feels like a home away from home.', rating: 4, color: 'bg-teal-100 text-teal-600' },
    { name: 'Neha Joshi', role: 'Working Professional', text: 'Value for money. The amenities provided are top-notch and the location is very convenient.', rating: 5, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">Testimonials</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">What Our Residents Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-slate-50 p-8 rounded-3xl relative border border-slate-100"
            >
              <Quote className="absolute top-6 right-6 text-slate-200" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 relative z-10 italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${review.color}`}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{review.name}</h4>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
