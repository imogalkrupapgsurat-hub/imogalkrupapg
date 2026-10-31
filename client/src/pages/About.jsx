import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Shield,
    Sparkles,
    CheckCircle,
    MapPin,
    Heart,
    Users,
    Award,
    Coffee,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useContent } from '../context/ContentContext';

const stats = [
    { val: '૫૦+', label: 'ખુશ વિદ્યાર્થીઓ અને નોકરિયાત ભાઈઓ' },
    { val: '૫+', label: 'વર્ષનો અનોખો વિશ્વાસ' },
    { val: '૧૦૦%', label: 'ઘર જેવો સ્નેહ અને સ્વાદ' },
    { val: '૨૪/૭', label: 'સુરક્ષા અને સહાય' },
];

const values = [
    {
        icon: Heart,
        title: 'ઘર જેવો સ્નેહ',
        desc: 'ઘરથી દૂર પણ ઘર જેવો જ પ્રેમ અને પરિવાર જેવો માહોલ. કોઈ પણ અગવડ નહીં!',
    },
    {
        icon: Sparkles,
        title: 'એકદમ ચોખ્ખું-ચણાક',
        desc: 'દરરોજ રૂમ અને વોશરૂમની નિયમિત સફાઈ. શુદ્ધ અને આરોગ્યપ્રદ વાતાવરણ.',
    },
    {
        icon: Shield,
        title: 'પૂર્ણ સુરક્ષા અને શાંતિ',
        desc: 'CCTV કેમેરા, સિક્યોરિટી અને શાંત સ્ટડી એન્વાયર્નમેન્ટ જેથી તમે ભણવામાં ધ્યાન આપી શકો.',
    },
];

export default function AboutPage() {
    const { content } = useContent();

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
                        <span className="mx-2">›</span> અમારા વિશે
                    </motion.p>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-gold text-xs uppercase tracking-widest font-semibold mb-3"
                    >
                        {content.welcomeLine ||
                            '✦ આવો, પધારો! સુરતનું પોતાનું PG ✦'}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-6xl font-bold text-white font-serif leading-tight"
                    >
                        {content.aboutHeading || 'અમારા વિશે જાણો'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
                    >
                        વરાછા, સુરતમાં વિદ્યાર્થીઓ અને નોકરિયાતો માટે શાંત,
                        સુરક્ષિત અને ઘર જેવું શ્રેષ્ઠ રહેઠાણ.
                    </motion.p>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="bg-cream py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                            અમારી ઓળખ
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-2 mb-6 font-serif">
                            {content.aboutStoryTitle ||
                                '"કેમ છો? મજામાં!" — સુરતની ધરા પર તમારું ઉષ્માભર્યું સ્વાગત છે'}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                            {content.aboutStoryPara1 ||
                                'મોગલ કૃપા PG માત્ર એક રહેવાની જગ્યા નથી, પણ સુરત આવીને અભ્યાસ કરતા વિદ્યાર્થીઓ અને જોબ કરતા મિત્રો માટે એક હૂંફાળું આંગણું છે. અમે જાણીએ છીએ કે પોતાના વતન કે ગામથી દૂર રહેવું કેટલું અઘરું છે, એટલે જ અમે અહીં ઘર જેવી જ સુવિધાઓ અને પરિવાર જેવો માહોલ પૂરો પાડીએ છીએ.'}
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                            {content.aboutStoryPara2 ||
                                'સુરતી ખાણીપીણીની લિજ્જત અને સ્વચ્છતાની પૂરી કાળજી સાથે, અમારા પોતાના ફૂડ કોર્ટમાં દરરોજ સ્વાદિષ્ટ અને પૌષ્ટિક ગુજરાતી ભોજન પ્રેમપૂર્વક પીરસવામાં આવે છે.'}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {[
                                'શાંત વાતાવરણ',
                                'ચોવીસે કલાક પાણી અને વાઇફાઇ',
                                'સ્વચ્છ અને હવાદાર રૂમ',
                                'ઘર જેવી હૂંફ',
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 text-sm font-semibold text-navy-900 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                                >
                                    <CheckCircle
                                        size={16}
                                        className="text-green-500 shrink-0"
                                    />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/contact"
                            className="inline-block bg-accent hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-accent/20"
                        >
                            અમારો સંપર્ક કરો
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
                                alt="મોગલ કૃપા હોસ્ટેલ રૂમ"
                                className="w-full h-[420px] object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-navy-900 text-white p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs border border-white/10">
                            <p className="text-gold font-bold text-lg font-serif">
                                ૫+ વર્ષથી સુરતમાં
                            </p>
                            <p className="text-xs text-gray-300 mt-1">
                                સેંકડો પરિવારોનો ભરોસો અને સુરતનું અગ્રણી PG!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="bg-navy-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((s, i) => (
                        <div key={i} className="p-4">
                            <p className="text-3xl sm:text-4xl font-bold font-serif text-gold">
                                {s.val}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-300 mt-1">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* VALUES SECTION */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto text-center mb-14">
                    <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                        અમારા સંસ્કાર અને મૂલ્યો
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-2 font-serif">
                        શા માટે સૌ કોઈ કહે છે — "મોગલ કૃપા એટલે શ્રેષ્ઠ!"
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            className="bg-cream rounded-2xl p-8 border border-gray-100 shadow-sm text-center"
                        >
                            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <v.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-3 font-serif">
                                {v.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {v.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SEE YOU STRIP */}
            <section className="bg-gradient-to-r from-navy-900 to-navy-800 py-12 px-6 text-center text-white border-t border-navy-700">
                <p className="text-gold text-sm font-semibold tracking-wider mb-2">
                    ✦ સુરત આવો ત્યારે રૂબરૂ મુલાકાત જરૂર લેજો ✦
                </p>
                <h3 className="text-2xl font-serif font-bold">
                    {content.seeYouLine || '✦ આવજો! ફરી પધારજો! ✦'}
                </h3>
                <p className="text-gray-400 text-xs mt-2">
                    મોગલ કૃપા PG પરિવાર હંમેશા તમારી સેવામાં હાજર છે.
                </p>
            </section>
        </PageWrapper>
    );
}
