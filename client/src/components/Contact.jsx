import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roomType: 'Single Occupancy',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', roomType: 'Single Occupancy', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h4 className="text-amber-500 font-bold uppercase tracking-wider mb-2">Get In Touch</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Book Your Stay Today</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2">Contact Information</h3>
              <p className="text-slate-300 mb-10">Fill up the form and our team will get back to you within 24 hours.</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-amber-400 backdrop-blur-sm">
                    <Phone />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Call Us</p>
                    <p className="font-semibold text-lg">063547 97745</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-rose-400 backdrop-blur-sm">
                    <Mail />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email Us</p>
                    <p className="font-semibold">info@mogalkrupapg.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-teal-400 backdrop-blur-sm shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Address</p>
                    <p className="font-semibold leading-relaxed">Varsha Rd, Matavadi, Varsha Society 1, Ambavadi, Varachha, Surat, Gujarat 395010</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10">
               {/* Map placeholder */}
               <div className="w-full h-48 bg-slate-700/50 rounded-2xl overflow-hidden border border-slate-600/50">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3719.673248695886!2d72.84646841538356!3d21.20511898711585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f0525944d13%3A0x6bba30f5ec834c0e!2sVarsha%20Society%201%2C%20Ambavadi%2C%20Varachha%2C%20Surat%2C%20Gujarat%20395006!5e0!3m2!1sen!2sin!4v1647890123456!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
               </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5 p-10 lg:p-16"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors" placeholder="+91 00000 00000" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Interested In</label>
                  <select value={formData.roomType} onChange={(e) => setFormData({...formData, roomType: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors">
                    <option>Single Occupancy</option>
                    <option>Double Sharing</option>
                    <option>Triple Sharing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Message *</label>
                <textarea required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors resize-none" placeholder="Tell us about your requirements..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-500 transition-colors shadow-lg disabled:opacity-70"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Send Message</>}
              </button>

              {status === 'success' && <p className="text-green-600 text-center font-medium">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600 text-center font-medium">Failed to send message. Try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
