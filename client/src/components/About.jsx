import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';

const About = () => {
  const features = [
    'Clean & Spacious Rooms',
    'Hygienic Kitchen & Food Court',
    'High-Speed WiFi Access',
    'Daily Laundry Service',
    '24/7 CCTV Security',
    'Student & Professional Friendly'
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">About Us</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              A Comfortable Home in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Heart of Surat</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Established with a vision to provide a safe, comfortable, and homely environment, Mogal Krupa PG is the preferred choice for students and working professionals in Surat. We blend the warmth of a home with the convenience of premium amenities.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-500 flex-shrink-0" size={20} />
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-start gap-3">
                <Phone className="text-amber-500 mt-1" size={24} />
                <div>
                  <p className="text-sm text-slate-500 font-medium">Call Us Now</p>
                  <p className="text-lg font-bold text-slate-800">063547 97745</p>
                </div>
              </div>
              <div className="w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-start gap-3">
                <MapPin className="text-amber-500 mt-1" size={24} />
                <div>
                  <p className="text-sm text-slate-500 font-medium">Location</p>
                  <p className="text-sm font-medium text-slate-800">Varsha Rd, Matavadi, Surat</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="relative">
              {/* Abstract decorative shape instead of real image for placeholder */}
              <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 via-rose-100 to-teal-100"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                    <h3 className="text-3xl font-bold text-slate-800/50">Mogal Krupa PG<br/>Premium Accommodation</h3>
                </div>
              </div>
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-xl">
                    5+
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Years of</p>
                    <p className="text-slate-500 text-sm">Excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
