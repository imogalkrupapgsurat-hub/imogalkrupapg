import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CheckCircle,
    Clock,
    Leaf,
    Flame,
    Star,
    RefreshCw,
    Phone,
    ChevronRight,
    Utensils,
    Heart,
} from 'lucide-react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';
import { useContent } from '../context/ContentContext';

const foodFeatures = [
    {
        icon: Leaf,
        title: 'તાજું અને શુદ્ધ શાકભાજી',
        desc: 'દરરોજ સવારે માર્કેટમાંથી ખરીદેલા તાજા શાકભાજી. પ્રિઝર્વેટિવ્સ વગર શુદ્ધ વાનગીઓ.',
    },
    {
        icon: Flame,
        title: 'સમયસર ગરમા-ગરમ ભોજન',
        desc: 'નિયત સમયે ગરમા-ગરમ ફૂલકા રોટલી અને સ્વાદિષ્ટ ગુજરાતી ભોજન તૈયાર.',
    },
    {
        icon: Star,
        title: 'અસલ સુરતી સ્વાદ',
        desc: 'સુરતના જમણની વાત જ અલગ! સ્વાદિષ્ટ દાળ, શાક, કઢી, ખીચડી અને પાપડ-સંભારો.',
    },
    {
        icon: CheckCircle,
        title: 'ચોખ્ખું-ચણાક કિચન',
        desc: 'સ્ટેનલેસ સ્ટીલ રસોડું, RO શુદ્ધ પાણી અને દરરોજ સંપૂર્ણ સેનિટાઈઝેશન.',
    },
];

export default function FoodCourtPage() {
    const { content } = useContent();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/mealplans')
            .then((r) => setPlans(Array.isArray(r.data?.data) ? r.data.data : []))
            .catch(() => setPlans([]))
            .finally(() => setLoading(false));
    }, []);

    const allTimings = (plans || [])
        .flatMap((p) => p.timings || [])
        .reduce((acc, t) => {
            if (!acc.find((x) => x.meal === t.meal)) acc.push(t);
            return acc;
        }, []);

    return (
        <PageWrapper>
            {/* PAGE HERO */}
            <section className="py-24 px-6 relative overflow-hidden hero-pattern">
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-navy-700 to-black/90" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-orange-100 text-sm mb-4"
                    >
                        <Link
                            to="/"
                            className="hover:text-white transition-colors"
                        >
                            હોમ
                        </Link>
                        <span className="mx-2">›</span> ફૂડ કોર્ટ
                    </motion.p>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-yellow-200 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3"
                    >
                        ✦ "
                        {content.surtiSlogan || 'સુરતનું જમણ અને કાશીનું મરણ'}"
                        ✦
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl sm:text-6xl font-bold text-white font-serif"
                    >
                        {content.foodCourtHeading || 'અમારું ફૂડ કોર્ટ 🍛'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-orange-100 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
                    >
                        પધારો! ઘર જેવું જ પૌષ્ટિક અને લિજ્જતદાર દેશી ગુજરાતી
                        ભોજન — પ્રેમપૂર્વક પીરસવામાં આવે છે.
                    </motion.p>
                </div>
            </section>

            {/* INTRO */}
            <section className="bg-cream py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                            ઘરનો સ્વાદ, સુરતમાં
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-3 mb-5 font-serif leading-snug">
                            {content.foodCourtTagline ||
                                'માતાના હાથના સ્વાદ જેવું મીઠું જમણ 🏠'}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                            {content.foodCourtDesc ||
                                'મોગલ કૃપા PG ની સૌથી મોટી ખાસિયત અમારું ફૂડ કોર્ટ છે! સુરતમાં બહાર રહેતા છોકરાઓને સૌથી મોટો વાંધો ખાવાનો આવે છે. અમારો સંકલ્પ છે કે કોઈ પણ વિદ્યાર્થી કે નોકરિયાત ભાઈને હોસ્ટેલનું બેસ્વાદ ખાવાનું ન ખાવું પડે.'}
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                            અહીં દરરોજ બપોરે અને સાંજે તાજી રોટલી, ભાખરી, મોસમ
                            પ્રમાણે શાકભાજી, દાળ, ભાત અને રવિવારે સ્પેશિયલ
                            મિષ્ટાન્ન કે ફરસાણ પીરસાય છે.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                'શુદ્ધ શાકાહારી',
                                'રોજ તાજી રસોઈ',
                                'અમર્યાદિત થાળી',
                                'પ્રેમપૂર્વક પીરસણ',
                            ].map((b, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1.5 bg-white border border-gray-100 text-navy-900 text-xs font-semibold px-4 py-2 rounded-full shadow-sm"
                                >
                                    <CheckCircle
                                        size={13}
                                        className="text-green-500"
                                    />{' '}
                                    {b}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {foodFeatures.map((f, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                            >
                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                                    <f.icon
                                        size={18}
                                        className="text-amber-600"
                                    />
                                </div>
                                <h4 className="font-bold text-navy-900 text-sm mb-1">
                                    {f.title}
                                </h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* MEAL PLANS */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                            માસિક પ્લાન અને દરો
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-navy-900 mt-3 font-serif">
                            મીલ પ્લાન્સ (જમવાના પ્લાન)
                        </h2>
                        <p className="text-gray-400 text-sm mt-3">
                            તમારી જરૂરિયાત અનુસાર અનુકૂળ પ્લાન પસંદ કરો
                        </p>
                    </motion.div>

                    {loading && (
                        <div className="flex items-center justify-center py-16 text-gray-400">
                            <RefreshCw
                                size={22}
                                className="animate-spin mr-2"
                            />{' '}
                            મીલ પ્લાન્સ લોડ થઈ રહ્યા છે...
                        </div>
                    )}

                    {!loading && (plans?.length || 0) === 0 && (
                        <div className="text-center py-16 text-gray-400">
                            <p className="font-semibold">
                                હાલમાં કોઈ પ્લાન લિસ્ટેડ નથી.
                            </p>
                            <p className="text-sm mt-2">
                                માહિતી માટે કૃપા કરીને ફોન કરો.
                            </p>
                            <a
                                href={`tel:${content.phone?.replace(/[^0-9+]/g, '') || '+916354797745'}`}
                                className="inline-block mt-4 text-accent text-sm font-semibold hover:underline"
                            >
                                ફોન કરો: {content.phone || '+91 63547 97745'}
                            </a>
                        </div>
                    )}

                    {!loading && (plans?.length || 0) > 0 && (
                        <div
                            className={`grid gap-8 max-w-5xl mx-auto ${
                                (plans?.length || 0) === 1
                                    ? 'grid-cols-1 max-w-sm'
                                    : (plans?.length || 0) === 2
                                      ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
                                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            }`}
                        >
                            {plans.map((plan, i) => (
                                <motion.div
                                    key={plan._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }}
                                    whileHover={{ y: -8 }}
                                    className={`relative rounded-2xl overflow-hidden shadow-lg border-2 transition-all ${
                                        plan.isPopular
                                            ? 'border-accent scale-[1.03]'
                                            : 'border-gray-100'
                                    }`}
                                >
                                    {plan.isPopular && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className="flex items-center gap-1 bg-white text-accent text-xs font-bold px-3 py-1 rounded-full shadow">
                                                <Star
                                                    size={10}
                                                    className="fill-current"
                                                />{' '}
                                                સૌથી વધુ લોકપ્રિય
                                            </span>
                                        </div>
                                    )}

                                    <div
                                        className={`h-32 bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                                    >
                                        <div className="text-center text-white">
                                            <p className="text-4xl sm:text-5xl font-bold font-serif">
                                                ₹
                                                {Number(
                                                    plan.price,
                                                ).toLocaleString()}
                                            </p>
                                            <p className="text-sm opacity-90 mt-0.5">
                                                દર{' '}
                                                {plan.per === 'month'
                                                    ? 'મહિને'
                                                    : plan.per === 'day'
                                                      ? 'દિવસે'
                                                      : 'અઠવાડિયે'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6">
                                        <h3 className="font-bold text-navy-900 text-xl mb-1 font-serif">
                                            {plan.name}
                                        </h3>
                                        {plan.description && (
                                            <p className="text-gray-400 text-xs mb-4">
                                                {plan.description}
                                            </p>
                                        )}

                                        {(plan.items?.length || 0) > 0 && (
                                            <ul className="space-y-2 mb-5">
                                                {(plan.items || []).map((item, j) => (
                                                    <li
                                                        key={j}
                                                        className="flex items-start gap-2 text-sm text-gray-600"
                                                    >
                                                        <CheckCircle
                                                            size={14}
                                                            className="text-green-500 shrink-0 mt-0.5"
                                                        />{' '}
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {(plan.timings?.length || 0) > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {(plan.timings || []).map((t, j) => (
                                                    <span
                                                        key={j}
                                                        className="flex items-center gap-1 text-[10px] bg-amber-50 border border-amber-100 text-amber-700 px-2 py-1 rounded-full font-semibold"
                                                    >
                                                        <Clock size={9} />{' '}
                                                        {t.meal === 'Breakfast'
                                                            ? 'નાસ્તો'
                                                            : t.meal === 'Lunch'
                                                              ? 'બપોરનું ભોજન'
                                                              : t.meal ===
                                                                  'Dinner'
                                                                ? 'સાંજનું ભોજન'
                                                                : t.meal}
                                                        : {t.time}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <Link
                                            to="/contact"
                                            className={`flex items-center justify-center gap-1.5 w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                                                plan.isPopular
                                                    ? 'bg-accent hover:bg-red-600 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-navy-900'
                                            }`}
                                        >
                                            આ પ્લાન પસંદ કરો{' '}
                                            <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* MEAL TIMINGS SCHEDULE */}
            {!loading && (allTimings?.length || 0) > 0 && (
                <section className="bg-cream py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                                દૈનિક સમયપત્રક
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-3 font-serif">
                                જમવાનો સમય
                            </h2>
                        </motion.div>
                        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-navy-900 text-white">
                                        <th className="text-left px-6 py-4 font-semibold">
                                            સમય/ભોજન
                                        </th>
                                        <th className="text-left px-6 py-4 font-semibold">
                                            <Clock
                                                size={13}
                                                className="inline mr-1"
                                            />
                                            સમયગાળો
                                        </th>
                                        <th className="text-left px-6 py-4 font-semibold hidden sm:table-cell">
                                            શું પીરસાય છે?
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTimings.map((m, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className={
                                                i % 2 === 0
                                                    ? 'bg-white'
                                                    : 'bg-amber-50/40'
                                            }
                                        >
                                            <td className="px-6 py-4 font-semibold text-navy-900">
                                                {m.meal === 'Breakfast'
                                                    ? 'સવારનો નાસ્તો'
                                                    : m.meal === 'Lunch'
                                                      ? 'બપોરનું જમણ'
                                                      : m.meal === 'Dinner'
                                                        ? 'સાંજનું જમણ'
                                                        : m.meal}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">
                                                {m.time}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                                                {m.items ||
                                                    'સ્વાદિષ્ટ ગુજરાતી વાનગીઓ'}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* SEE YOU STRIP */}
            <section className="bg-gradient-to-l from-navy-900 via-navy-700 to-black py-14 px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="text-yellow-200 text-sm font-semibold tracking-wider mb-2">
                        ✦ "પેટ ભરીને જમો અને આનંદથી રહો!" ✦
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-3">
                        જમવાની બાબતે કંઈ પણ પૂછવું હોય તો નિઃસંકોચ સંપર્ક કરો
                    </h2>
                    <p className="text-white/80 text-sm mb-7">
                        {content.seeYouLine ||
                            'આવો, એકવાર મોગલ કૃપા PG નું જમણ ટેસ્ટ કરી જુઓ — પછી બીજે ક્યાંય નહિ ગમે!'}
                    </p>
                    <a
                        href={`tel:${content.phone?.replace(/[^0-9+]/g, '') || '+916354797745'}`}
                        className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-3.5 rounded-full hover:-translate-y-1 transition-all shadow-xl"
                    >
                        <Phone size={16} /> ફોન કરો:{' '}
                        {content.phone || '+91 63547 97745'}
                    </a>
                </motion.div>
            </section>
        </PageWrapper>
    );
}
