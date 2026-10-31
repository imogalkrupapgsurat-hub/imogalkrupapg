import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowDown,
    ShieldCheck,
    Utensils,
    Home as HomeIcon,
    Star,
    CheckCircle,
    ChevronRight,
    MapPin,
    Sparkles,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { testimonials } from '../data/testimonials';
import { useContent } from '../context/ContentContext';

const stats = [
    { value: '50+', label: 'ખુશ રહેવાસીઓ' },
    { value: '5+', label: 'વર્ષનો અનુભવ' },
    { value: '3', label: 'ટાઇમ જમવાનું' },
    { value: '4.8★', label: 'Google રેટિંગ' },
];
const features = [
    {
        icon: HomeIcon,
        title: 'આરામદાયક રૂમ',
        desc: 'AC અને Non-AC રૂમ — અટેચ બાથ, વોર્ડરોબ, ફ્રી WiFi અને દરરોજ સફાઈ. ચોખ્ખું-ચટાક!',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: Utensils,
        title: 'ઘર જેવું જમવાનું',
        desc: 'તાજું ગુજરાતી ઘરનું જમવાનું — રોટલી, દાળ, ભાત, શાક, સલાડ. દિવસમાં ૩ ટાઇમ. સુરતી સ્વાદ!',
        color: 'bg-amber-50 text-amber-600',
    },
    {
        icon: ShieldCheck,
        title: 'સેફ અને સિક્યોર',
        desc: '24/7 CCTV, સિક્યોર એન્ટ્રી અને ડેડિકેટેડ કેરટેકર. માતા-પિતાને ટેન્શન ફ્રી!',
        color: 'bg-green-50 text-green-600',
    },
];

export default function HomePage() {
    const { content } = useContent();

    return (
        <PageWrapper>
            {/* HERO */}
            <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-navy-900 hero-pattern pt-24 pb-16 px-6">
                <div className="absolute top-20 -left-20 w-80 h-80 bg-pink-800 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-40 right-0 w-72 h-72 bg-navy-700 rounded-full blur-3xl animate-blob delay-2000" />
                <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob delay-4000" />

                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
                                <Sparkles size={14} className="text-gold" />{' '}
                                {content.heroBadge ||
                                    '✦ પધારો, મોગલ કૃપા PG માં ✦'}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.7 }}
                            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white font-serif leading-[1.1] mb-6"
                        >
                            {content.heroTitleLine1 || 'તમારું બીજું'}
                            <br />
                            <span className="text-gradient-gold">
                                {content.heroTitleLine2 || 'ઘર, સુરતમાં 🏠'}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed "
                        >
                            {content.heroSubtitle ||
                                'આરામદાયક રહેવાનું · ઘર જેવું જમવાનું · ૨૪/૭ સુરક્ષા · ફ્રી WiFi'}
                            <br className="hidden sm:block" />
                            <span className="text-gold/80 text-sm mx-2">
                                {content.heroLocation ||
                                    'વરાછા, સુરત, ગુજરાત · કેમ છો? મજામાં! 😊'}
                            </span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                        >
                            <Link
                                to="/rooms"
                                className="px-8 py-4 bg-accent hover:bg-red-600 text-white font-semibold rounded-full shadow-xl shadow-accent/30 transition-all hover:-translate-y-1 text-center"
                            >
                                રૂમ જુઓ
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all hover:-translate-y-1 backdrop-blur-sm text-center"
                            >
                                સંપર્ક કરો
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.85 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-2.5"
                        >
                            {[
                                'AC રૂમ',
                                'ઘરનું જમવાનું',
                                '૨૪/૭ સુરક્ષા',
                                'ફ્રી WiFi',
                                'પાવર બેકઅપ',
                            ].map((b, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs px-3 py-1.5 rounded-full"
                                >
                                    <CheckCircle
                                        size={12}
                                        className="text-green-400 shrink-0"
                                    />{' '}
                                    {b}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="lg:col-span-5 relative flex justify-center"
                    >
                        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                            <img
                                src="/images/mogal-maa.jpg"
                                alt="મોગલ કૃપા PG"
                                className="w-full h-[380px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-bold text-lg font-serif">
                                            મોગલ કૃપા PG &amp; ફૂડ કોર્ટ
                                        </p>
                                        <span className="flex items-center gap-1 bg-gold text-navy-900 font-bold text-xs px-2.5 py-1 rounded-full">
                                            <Star
                                                size={12}
                                                className="fill-navy-900"
                                            />{' '}
                                            4.8★
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-200 flex items-center gap-1">
                                        <MapPin
                                            size={12}
                                            className="text-gold"
                                        />{' '}
                                        માતાવાડી, વરાછા, સુરત
                                    </p>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: 'easeInOut',
                            }}
                            className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white/90 backdrop-blur-md text-navy-900 rounded-2xl p-3.5 shadow-xl border border-white/50 hidden sm:flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                <Utensils size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-xs">
                                    ઘરનું જમવાનું
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    ગુજરાતી થાળી ૩ ટાઇમ 🍛
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 5,
                                ease: 'easeInOut',
                            }}
                            className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-navy-900/90 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-xl border border-white/20 hidden sm:flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-xs">
                                    ૨૪/૭ સુરક્ષા
                                </p>
                                <p className="text-[10px] text-gray-400">
                                    CCTV &amp; કેરટેકર
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* STATS */}
            <section className="bg-navy-800">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <p className="text-3xl sm:text-4xl font-bold text-gold font-serif">
                                {s.value}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="bg-cream py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                            અમને કેમ પસંદ કરો?
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-navy-900 mt-3 font-serif">
                            બધું એક જ છત નીચે,
                            <br />
                            એકદમ ટોપ! 👌
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all"
                            >
                                <div
                                    className={`inline-flex p-4 rounded-2xl mb-5 ${f.color}`}
                                >
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-3 font-serif">
                                    {f.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                            શું કહે છે રહેવાસીઓ?
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-navy-900 mt-3 font-serif">
                            અમારા રહેવાસીઓના અનુભવ
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-cream rounded-2xl p-6 border border-gray-100"
                            >
                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: t.rating }).map(
                                        (_, s) => (
                                            <Star
                                                key={s}
                                                size={14}
                                                className="text-gold fill-gold"
                                            />
                                        ),
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white font-bold text-sm">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-navy-900 text-sm">
                                            {t.name}
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-black/90 via-pink-900 to-black/90  py-16 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                        રૂમ બુક કરવો છે? 🏠
                    </h2>
                    <p className="text-white/80 text-base mb-8">
                        {content.seeYouLine ||
                            'આજે જ તમારો આરામદાયક રૂમ બુક કરો. આવો, પધારો — મોગલ કૃપા PG માં!'}
                    </p>
                    <Link
                        to="/rooms"
                        className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-full hover:-translate-y-1 transition-all"
                    >
                        રૂમ જુઓ <ChevronRight size={18} />
                    </Link>
                </motion.div>
            </section>
        </PageWrapper>
    );
}
