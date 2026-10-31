import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Phone,
    MapPin,
    Mail,
    Clock,
    MessageCircle,
    CheckCircle,
    Send,
    Loader,
} from 'lucide-react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';
import { useContent } from '../context/ContentContext';

export default function ContactPage() {
    const { content } = useContent();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('idle');

    const phoneNum = content.phone || '+91 63547 97745';
    const cleanPhone = phoneNum.replace(/[^0-9+]/g, '');
    const waNum = content.whatsapp || '916354797745';
    const emailAddr = content.email || 'mogalkrupapg@gmail.com';
    const addressTxt =
        content.address ||
        'વર્ષા રોડ, માતાવાડી, વર્ષા સોસાયટી ૧, અંબાવાડી, વરાછા, સુરત, ગુજરાત – ૩૯૫૦૧૦';
    const officeHoursTxt =
        content.officeHours ||
        'સોમ–શનિ: સવારે ૮ – રાત્રે ૧૦\nરવિવાર: સવારે ૯ – સાંજે ૮';

    const infoCards = [
        {
            icon: Phone,
            title: 'ફોન કરો',
            value: phoneNum,
            action: `tel:${cleanPhone}`,
            btn: 'કોલ કરો',
            btnCls: 'bg-green-500 hover:bg-green-600',
        },
        {
            icon: MessageCircle,
            title: 'વોટ્સએપ',
            value: 'સીધી વાતચીત કરો',
            action: `https://wa.me/${waNum}`,
            btn: 'WhatsApp ખોલો',
            btnCls: 'bg-green-500 hover:bg-green-600',
        },
        {
            icon: Mail,
            title: 'ઈમેલ',
            value: emailAddr,
            action: `mailto:${emailAddr}`,
            btn: 'ઈમેલ મોકલો',
            btnCls: 'bg-blue-500 hover:bg-blue-600',
        },
        {
            icon: Clock,
            title: 'ઓફિસ સમય',
            value: officeHoursTxt,
            action: null,
            btn: null,
            btnCls: '',
        },
    ];

    const change = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('/api/contact', form);
            setStatus('success');
            setForm({ name: '', phone: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    const inputCls =
        'w-full bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-gray-400';

    return (
        <PageWrapper>
            {/* PAGE HERO */}
            <section className="bg-navy-900 hero-pattern py-24 px-6 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-navy-700 to-black/90 opacity-90" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-400 text-sm mb-4"
                    >
                        <Link
                            to="/"
                            className="hover:text-gold transition-colors"
                        >
                            હોમ
                        </Link>{' '}
                        <span className="mx-2">›</span> સંપર્ક
                    </motion.p>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-gold text-xs uppercase tracking-widest font-semibold mb-3"
                    >
                        {content.welcomeLine ||
                            '✦ પધારો! અમે આપની સેવામાં હાજર છીએ ✦'}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl sm:text-6xl font-bold text-white font-serif"
                    >
                        અમારો સંપર્ક કરો
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
                    >
                        કોઈ પણ પ્રશ્ન હોય કે માહિતી જોઈતી હોય — ફોન કરો અથવા
                        મેસેજ મોકલો.
                    </motion.p>
                </div>
            </section>

            {/* MAIN SECTION */}
            <section className="bg-cream py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-bold text-navy-900 font-serif mb-2">
                            અમને સંદેશ મોકલો
                        </h2>
                        <p className="text-gray-500 text-xs mb-6">
                            વિગતો ભરો, અમે તમને થોડી જ વારમાં સામેથી ફોન કરીશું.
                        </p>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle
                                        size={32}
                                        className="text-green-500"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2 font-serif">
                                    સંદેશ મોકલાઈ ગયો છે! 🎉
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    ખૂબ ખૂબ આભાર! અમે ટૂંક સમયમાં તમારો સંપર્ક
                                    કરીશું.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-accent text-sm font-semibold hover:underline"
                                >
                                    બીજો સંદેશ મોકલો
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                                            તમારું પૂરું નામ *
                                        </label>
                                        <input
                                            required
                                            name="name"
                                            value={form.name}
                                            onChange={change}
                                            placeholder="દા.ત. રમેશભાઈ પટેલ"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                                            મોબાઈલ નંબર *
                                        </label>
                                        <input
                                            required
                                            name="phone"
                                            value={form.phone}
                                            onChange={change}
                                            placeholder="+91 XXXXX XXXXX"
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                                        ઈમેલ એડ્રેસ
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={change}
                                        placeholder="your@email.com"
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                                        સંદેશ / પ્રશ્ન
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={change}
                                        rows={4}
                                        placeholder="અમે તમને કેવી રીતે મદદ કરી શકીએ?"
                                        className={inputCls + ' resize-none'}
                                    />
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm">
                                        માફ કરશો, સંદેશ મોકલવામાં ક્ષતિ થઈ. કૃપા
                                        કરીને સીધો ફોન કરો.
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-red-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all"
                                >
                                    {status === 'loading' ? (
                                        <Loader
                                            size={18}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                    {status === 'loading'
                                        ? 'મોકલાઈ રહ્યો છે...'
                                        : 'સંદેશ મોકલો'}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* INFO CARDS */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-5"
                    >
                        {infoCards.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shrink-0">
                                    <c.icon size={20} className="text-gold" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                        {c.title}
                                    </p>
                                    <p className="text-sm font-semibold text-navy-900 mt-0.5 whitespace-pre-line">
                                        {c.value}
                                    </p>
                                </div>
                                {c.btn && (
                                    <a
                                        href={c.action}
                                        target={
                                            c.action?.startsWith('http')
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel="noreferrer"
                                        className={`shrink-0 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${c.btnCls}`}
                                    >
                                        {c.btn}
                                    </a>
                                )}
                            </motion.div>
                        ))}

                        {/* Address card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4"
                        >
                            <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin size={20} className="text-gold" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                    સરનામું (Address)
                                </p>
                                <p className="text-sm font-semibold text-navy-900 mt-0.5">
                                    {addressTxt}
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Varsha+Rd+Matavadi+Surat+395010"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block mt-2 text-accent text-xs font-semibold hover:underline"
                                >
                                    ગૂગલ મેપ્સ પર રસ્તો જુઓ →
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* MAP */}
            <section className="bg-white">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <iframe
                        title="Mogal Krupa PG Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14880.07609658963!2d72.86316864999999!3d21.22777795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f5e3a4e8c7b%3A0x1d9e9c0e4b0a1f6!2sVarachha%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-96 sm:h-[450px]"
                    />
                </motion.div>
            </section>

            {/* SEE YOU FOOTNOTE */}
            <div className="bg-navy-900 py-8 px-6 text-center text-white border-t border-navy-800">
                <p className="text-gold text-sm font-semibold">
                    {content.seeYouLine || '✦ આવજો! ફરી પધારજો! ✦'}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                    મોગલ કૃપા PG અને ફૂડ કોર્ટ, વરાછા, સુરત.
                </p>
            </div>
        </PageWrapper>
    );
}
