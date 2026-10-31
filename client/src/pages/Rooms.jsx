import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Wifi,
    Wind,
    BedDouble,
    Bath,
    Tv,
    CheckCircle,
    Users,
    Phone,
    RefreshCw,
    AlertTriangle,
    Zap,
    WashingMachine,
    Car,
    Coffee,
    Flame,
    Shield,
    Droplets,
    BookOpen,
    UtensilsCrossed,
    Star,
    ZoomIn,
    Eye,
    X,
} from 'lucide-react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';
import { useContent } from '../context/ContentContext';
import BookingModal from '../components/BookingModal';

const typeGradients = {
    AC: 'from-blue-500 to-indigo-700',
    'Non-AC': 'from-amber-500 to-orange-700',
};

const statusStyle = {
    Available: {
        cls: 'bg-green-100 text-green-700 border-green-200',
        dot: 'bg-green-500',
        text: 'ઉપલબ્ધ છે',
    },
    Full: {
        cls: 'bg-red-100 text-red-700 border-red-200',
        dot: 'bg-red-500',
        text: 'રૂમ ભરાઈ ગયો',
    },
    Maintenance: {
        cls: 'bg-amber-100 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        text: 'સમારકામ હેઠળ',
    },
};

const facilityGujaratiMap = {
    'free wifi': 'ફ્રી વાઇફાઇ',
    wifi: 'ફ્રી વાઇફાઇ',
    'attached bath': 'અટેચ બાથરૂમ',
    bath: 'અટેચ બાથરૂમ',
    wardrobe: 'પર્સનલ કબાટ (વોર્ડરોબ)',
    'study table': 'સ્ટડી ટેબલ & ખુરશી',
    table: 'સ્ટડી ટેબલ',
    tv: 'LED ટીવી',
    ac: 'એસી (AC)',
    fan: 'પંખો',
    'hot water': 'ગરમ પાણી (ગીઝર)',
    geyser: 'ગીઝર (ગરમ પાણી)',
    balcony: 'બાલ્કની',
    cctv: 'CCTV સુરક્ષા',
    'power backup': 'ઇન્વર્ટર પાવર બેકઅપ',
    housekeeping: 'દરરોજ સાફ-સફાઈ',
    cleaning: 'દરરોજ સાફ-સફાઈ',
    'laundry access': 'લોન્ડ્રી વ્યવસ્થા',
    laundry: 'લોન્ડ્રી વ્યવસ્થા',
    parking: 'વાહન પાર્કિંગ',
    'common kitchen': 'કોમન રસોડું',
    kitchen: 'રસોડું',
    'ro water': 'RO શુદ્ધ પીવાનું પાણી',
    water: 'શુદ્ધ પીવાનું પાણી',
};

const getGujaratiFacility = (feat) => {
    if (!feat) return '';
    const key = feat.toLowerCase().trim();
    return facilityGujaratiMap[key] || feat;
};

const featureIcon = (label) => {
    const l = (label || '').toLowerCase();
    if (l.includes('wifi') || l.includes('વાઇફાઇ') || l.includes('વાઈફાઈ'))
        return Wifi;
    if (
        l.includes('ac') ||
        l.includes('fan') ||
        l.includes('એસી') ||
        l.includes('પંખો') ||
        l.includes('કુલર')
    )
        return Wind;
    if (l.includes('bath') || l.includes('બાથ') || l.includes('ગીઝર'))
        return Bath;
    if (l.includes('tv') || l.includes('ટીવી')) return Tv;
    if (
        l.includes('power') ||
        l.includes('backup') ||
        l.includes('પાવર') ||
        l.includes('ઇન્વર્ટર') ||
        l.includes('લાઇટ')
    )
        return Zap;
    if (
        l.includes('wash') ||
        l.includes('laundry') ||
        l.includes('લોન્ડ્રી') ||
        l.includes('કપડાં')
    )
        return WashingMachine;
    if (
        l.includes('park') ||
        l.includes('પાર્કિંગ') ||
        l.includes('વાહન') ||
        l.includes('ગાડી')
    )
        return Car;
    if (l.includes('kitchen') || l.includes('cook') || l.includes('રસોડું'))
        return UtensilsCrossed;
    if (l.includes('coffee') || l.includes('tea') || l.includes('ચા'))
        return Coffee;
    if (l.includes('water') || l.includes('ro') || l.includes('પાણી'))
        return Droplets;
    if (
        l.includes('cctv') ||
        l.includes('secur') ||
        l.includes('સુરક્ષા') ||
        l.includes('કેમેરા')
    )
        return Shield;
    if (
        l.includes('study') ||
        l.includes('desk') ||
        l.includes('ટેબલ') ||
        l.includes('ખુરશી')
    )
        return BookOpen;
    if (l.includes('gas') || l.includes('heat') || l.includes('ગેસ'))
        return Flame;
    if (l.includes('balcony') || l.includes('terrace') || l.includes('બાલ્કની'))
        return Star;
    return CheckCircle;
};

const amenitiesGrid = [
    { icon: Wifi, label: 'ફ્રી હાઈ-સ્પીડ વાઇફાઇ' },
    { icon: Wind, label: 'AC / કુલર / પંખો' },
    { icon: Bath, label: 'ગરમ પાણી (ગીઝર)' },
    { icon: BedDouble, label: 'આરામદાયક ગાદલું અને પલંગ' },
    { icon: Tv, label: 'કોમન LED ટીવી' },
    { icon: CheckCircle, label: 'અલગ પર્સનલ કબાટ' },
    { icon: CheckCircle, label: 'દરરોજ સાફ-સફાઈ' },
    { icon: Zap, label: 'ઇન્વર્ટર પાવર બેકઅપ' },
];

export default function RoomsPage() {
    const { content } = useContent();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('All');
    const [expanded, setExpanded] = useState({});
    const [bookingRoom, setBookingRoom] = useState(null);
    const [photoPreviewRoom, setPhotoPreviewRoom] = useState(null);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setPhotoPreviewRoom(null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    useEffect(() => {
        axios
            .get('/api/rooms')
            .then((r) => setRooms(r.data.data))
            .catch(() =>
                setError(
                    'રૂમ લોડ કરવામાં અગવડ થઈ છે. કૃપા કરીને ફરી પ્રયાસ કરો.',
                ),
            )
            .finally(() => setLoading(false));
    }, []);

    const filtered =
        filter === 'All' ? rooms : rooms.filter((r) => r.type === filter);
    const toggleExpand = (id) =>
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

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
                        <span className="mx-2">›</span> રૂમ
                    </motion.p>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-gold text-xs uppercase tracking-widest font-semibold mb-3"
                    >
                        ✦ પધારો! તમારા મનપસંદ રૂમની પસંદગી કરો ✦
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl sm:text-6xl font-bold text-white font-serif"
                    >
                        અમારા આરામદાયક રૂમ
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto"
                    >
                        સિંગલ, ડબલ અને ટ્રિપલ શેરિંગ — AC અને Non-AC વિકલ્પો
                        સાથે સુરતનું સૌથી બજેટ-ફ્રેન્ડલી અને સ્વચ્છ PG.
                    </motion.p>
                </div>
            </section>

            {/* FILTER TABS */}
            <section className="bg-white border-b border-gray-100 py-5 px-6 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto flex gap-3 justify-center flex-wrap">
                    {[
                        { id: 'All', label: 'બધા જ રૂમ' },
                        { id: 'AC', label: 'AC રૂમ' },
                        { id: 'Non-AC', label: 'Non-AC રૂમ' },
                    ].map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                                filter === f.id
                                    ? 'bg-accent text-white shadow-md shadow-accent/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* ROOMS GRID */}
            <section className="bg-cream py-16 px-6 min-h-[50vh]">
                <div className="max-w-7xl mx-auto">
                    {loading && (
                        <div className="flex items-center justify-center py-24 text-gray-400">
                            <RefreshCw
                                size={24}
                                className="animate-spin mr-2"
                            />{' '}
                            રૂમ લોડ થઈ રહ્યા છે...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <AlertTriangle
                                size={42}
                                className="text-amber-400 mb-4"
                            />
                            <p className="text-gray-600 font-semibold text-lg mb-2">
                                {error}
                            </p>
                            <a
                                href={`tel:${content.phone?.replace(/[^0-9+]/g, '') || '+916354797745'}`}
                                className="mt-2 text-accent text-sm font-semibold hover:underline"
                            >
                                ફોન કરીને રૂમની વિગત મેળવો →
                            </a>
                        </div>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <BedDouble
                                size={42}
                                className="text-gray-300 mb-4"
                            />
                            <p className="text-gray-500 font-semibold text-lg">
                                હાલમાં {filter !== 'All' ? filter + ' ' : ''}કોઈ
                                રૂમ ઉપલબ્ધ નથી.
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                નવા રૂમની વિગત માટે કૃપા કરીને અમારો સંપર્ક કરો.
                            </p>
                            <Link
                                to="/contact"
                                className="mt-5 bg-accent text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors"
                            >
                                સંપર્ક કરો
                            </Link>
                        </div>
                    )}

                    {!loading && !error && filtered.length > 0 && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={filter}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                            >
                                {filtered.map((room, i) => {
                                    const st =
                                        statusStyle[room.status] ||
                                        statusStyle.Available;
                                    const showAll = !!expanded[room._id];
                                    const PREVIEW = 6;
                                    const hasMore =
                                        room.features.length > PREVIEW;

                                    return (
                                        <motion.div
                                            key={room._id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            whileHover={{
                                                y: -6,
                                                boxShadow:
                                                    '0 28px 48px -12px rgba(0,0,0,0.14)',
                                            }}
                                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all flex flex-col"
                                        >
                                            {/* Gradient / Image Banner */}
                                            <div
                                                onClick={() => {
                                                    if (room.image) setPhotoPreviewRoom(room);
                                                }}
                                                className={`h-52 bg-gradient-to-br ${typeGradients[room.type] || 'from-gray-500 to-gray-700'} relative flex items-end p-5 overflow-hidden ${
                                                    room.image ? 'cursor-pointer group' : ''
                                                }`}
                                            >
                                                {room.image && (
                                                    <>
                                                        <img
                                                            src={room.image}
                                                            alt={`Room ${room.roomNumber}`}
                                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        {/* Hover overlay hint */}
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 text-white font-semibold text-xs sm:text-sm backdrop-blur-[2px]">
                                                            <ZoomIn size={18} className="text-gold" />
                                                            <span>ફોટો મોટો જોવા ક્લિક કરો</span>
                                                        </div>
                                                        {/* Click to view badge */}
                                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20 shadow-md">
                                                                <Eye size={12} className="text-gold" /> ફોટો જુઓ
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                                                <div
                                                    className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${st.cls}`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${st.dot}`}
                                                    />
                                                    {st.text || room.status}
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <span
                                                        className={`text-xs font-bold px-3 py-1 rounded-full text-white ${room.type === 'AC' ? 'bg-blue-600/80' : 'bg-amber-500/80'} backdrop-blur-sm`}
                                                    >
                                                        {room.type} રૂમ
                                                    </span>
                                                </div>
                                                <div className="bg-black/25 backdrop-blur-sm rounded-2xl px-4 py-2.5 w-full flex justify-between items-center">
                                                    <div>
                                                        <p className="text-white/70 text-[10px] uppercase font-semibold tracking-wide">
                                                            માસિક ભાડું
                                                        </p>
                                                        <p className="text-white font-bold text-2xl font-serif leading-tight">
                                                            ₹
                                                            {room.rent.toLocaleString()}
                                                            <span className="text-sm font-normal opacity-80">
                                                                /મહિને
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-white/70 text-[10px] uppercase font-semibold tracking-wide">
                                                            બેડ સ્થિતિ
                                                        </p>
                                                        <p className="text-white font-bold text-lg font-serif">
                                                            {room.availableBeds}
                                                            /{room.totalBeds}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="font-bold text-navy-900 text-xl font-serif leading-tight">
                                                            રૂમ નં.{' '}
                                                            {room.roomNumber}
                                                        </h3>
                                                        <p className="text-gray-400 text-xs mt-0.5">
                                                            {room.floor} માળ
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5">
                                                        <Users
                                                            size={13}
                                                            className="text-gray-400"
                                                        />
                                                        <span className="text-xs font-semibold text-navy-900">
                                                            {room.availableBeds}{' '}
                                                            બેડ ખાલી
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Bed occupancy bar */}
                                                <div className="flex gap-1.5 mb-4">
                                                    {Array.from({
                                                        length: room.totalBeds,
                                                    }).map((_, j) => (
                                                        <div
                                                            key={j}
                                                            className={`flex-1 h-2.5 rounded-full transition-colors ${j < room.availableBeds ? 'bg-green-400' : 'bg-gray-200'}`}
                                                            title={
                                                                j <
                                                                room.availableBeds
                                                                    ? 'ઉપલબ્ધ'
                                                                    : 'બુક થયેલ'
                                                            }
                                                        />
                                                    ))}
                                                </div>

                                                {room.description && (
                                                    <p className="text-gray-500 text-xs leading-relaxed mb-4 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                                                        {room.description}
                                                    </p>
                                                )}

                                                {/* Facilities */}
                                                {room.features &&
                                                    room.features.length >
                                                        0 && (
                                                        <div className="mb-4">
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                                                                ઉપલબ્ધ સગવડો
                                                                (Facilities)
                                                            </p>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {(showAll
                                                                    ? room.features
                                                                    : room.features.slice(
                                                                          0,
                                                                          PREVIEW,
                                                                      )
                                                                ).map(
                                                                    (feat) => {
                                                                        const Icon =
                                                                            featureIcon(
                                                                                feat,
                                                                            );
                                                                        const gujName =
                                                                            getGujaratiFacility(
                                                                                feat,
                                                                            );
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    feat
                                                                                }
                                                                                className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 group hover:border-accent hover:bg-accent/5 transition-colors"
                                                                            >
                                                                                <div className="w-6 h-6 bg-navy-900 group-hover:bg-accent rounded-lg flex items-center justify-center shrink-0 transition-colors">
                                                                                    <Icon
                                                                                        size={
                                                                                            11
                                                                                        }
                                                                                        className="text-gold group-hover:text-white transition-colors"
                                                                                    />
                                                                                </div>
                                                                                <span
                                                                                    className="text-xs font-semibold text-gray-700 group-hover:text-accent transition-colors leading-tight truncate"
                                                                                    title={
                                                                                        gujName
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        gujName
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                            {hasMore && (
                                                                <button
                                                                    onClick={() =>
                                                                        toggleExpand(
                                                                            room._id,
                                                                        )
                                                                    }
                                                                    className="mt-3 w-full text-center text-xs font-semibold text-accent hover:text-red-600 transition-colors py-1.5 border border-accent/20 hover:border-accent rounded-xl bg-accent/5 hover:bg-accent/10"
                                                                >
                                                                    {showAll
                                                                        ? 'ઓછું જુઓ ▲'
                                                                        : `બધી ${room.features.length} સુવિધાઓ જુઓ ▼`}
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}

                                                {/* Actions */}
                                                <div className="flex gap-2 mt-auto pt-2">
                                                    {room.status ===
                                                    'Available' ? (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    setBookingRoom(
                                                                        room,
                                                                    )
                                                                }
                                                                className="flex-1 bg-accent hover:bg-red-600 text-white text-sm font-semibold py-3 rounded-xl text-center transition-colors shadow-sm shadow-accent/20"
                                                            >
                                                                હમણાં બુક કરો
                                                            </button>
                                                            <a
                                                                href={`tel:${content.phone?.replace(/[^0-9+]/g, '') || '+916354797745'}`}
                                                                className="flex items-center gap-1.5 px-4 py-3 border-2 border-gray-200 hover:border-accent text-sm font-semibold text-gray-600 hover:text-accent rounded-xl transition-colors"
                                                            >
                                                                <Phone
                                                                    size={14}
                                                                />{' '}
                                                                ફોન
                                                            </a>
                                                        </>
                                                    ) : room.status ===
                                                      'Full' ? (
                                                        <button
                                                            disabled
                                                            className="flex-1 bg-gray-100 text-gray-400 text-sm font-semibold py-3 rounded-xl cursor-not-allowed"
                                                        >
                                                            🚫 રૂમ સંપૂર્ણ ભરેલો
                                                            છે
                                                        </button>
                                                    ) : (
                                                        <button
                                                            disabled
                                                            className="flex-1 bg-amber-50 text-amber-600 text-sm font-semibold py-3 rounded-xl cursor-not-allowed"
                                                        >
                                                            🔧 મેઇન્ટેનન્સ હેઠળ
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>

            {/* AMENITIES SECTION */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                            દરેક રૂમ સાથે સામેલ
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-3 font-serif">
                            સામાન્ય સુવિધાઓ
                        </h2>
                        <p className="text-gray-400 text-sm mt-2">
                            આ બધી સગવડ દરેક રહેવાસી ભાઈ માટે ઉપલબ્ધ છે
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                        {amenitiesGrid.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="bg-cream rounded-2xl p-5 flex flex-col items-center text-center gap-3 border border-gray-100 hover:border-accent hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 bg-navy-900 group-hover:bg-accent rounded-xl flex items-center justify-center transition-colors">
                                    <a.icon
                                        size={20}
                                        className="text-gold group-hover:text-white transition-colors"
                                    />
                                </div>
                                <p className="text-sm font-semibold text-navy-900">
                                    {a.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEE YOU STRIP */}
            <section className="bg-navy-900 hero-pattern py-14 px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="text-gold text-sm font-semibold tracking-wider mb-2">
                        ✦ "આવો, પધારો! રૂમ પસંદ કરો" ✦
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-3">
                        રૂમ વિશે કોઈ પણ પ્રશ્ન છે?
                    </h2>
                    <p className="text-gray-400 text-sm mb-7">
                        અમને ફોન કરો અથવા વોટ્સએપ મેસેજ કરો — અમે તરત જ જવાબ
                        આપીશું.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`tel:${content.phone?.replace(/[^0-9+]/g, '') || '+916354797745'}`}
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all"
                        >
                            <Phone size={16} /> ફોન કરો:{' '}
                            {content.phone || '+91 63547 97745'}
                        </a>
                        <Link
                            to="/contact"
                            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-full border border-white/20 transition-all"
                        >
                            પૂછપરછ મોકલો →
                        </Link>
                    </div>
                    <p className="text-gray-500 text-xs mt-6">
                        {content.seeYouLine || '✦ આવજો! ફરી પધારજો! ✦'}
                    </p>
                </motion.div>
            </section>

            <AnimatePresence>
                {bookingRoom && (
                    <BookingModal
                        room={bookingRoom}
                        onClose={() => setBookingRoom(null)}
                    />
                )}

                {/* Lightbox when user clicks on room image */}
                {photoPreviewRoom && photoPreviewRoom.image && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
                        onClick={() => setPhotoPreviewRoom(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 15 }}
                            transition={{ type: "spring", damping: 25, stiffness: 280 }}
                            className="relative max-w-4xl w-full flex flex-col items-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/60 flex items-center justify-center">
                                <img
                                    src={photoPreviewRoom.image}
                                    alt={`રૂમ નંબર ${photoPreviewRoom.roomNumber}`}
                                    className="max-w-full max-h-[72vh] sm:max-h-[78vh] object-contain rounded-2xl"
                                />
                                <button
                                    onClick={() => setPhotoPreviewRoom(null)}
                                    className="absolute top-3 right-3 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-xl"
                                    aria-label="બંધ કરો"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Caption & Actions */}
                            <div className="mt-3.5 px-4 w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                                <div>
                                    <h3 className="text-white font-bold text-lg sm:text-xl font-serif">
                                        રૂમ નંબર {photoPreviewRoom.roomNumber} ({photoPreviewRoom.type} રૂમ)
                                    </h3>
                                    <p className="text-gray-300 text-xs sm:text-sm mt-0.5">
                                        {photoPreviewRoom.floor} માળ · ₹{Number(photoPreviewRoom.rent).toLocaleString()}/મહિને · {photoPreviewRoom.availableBeds}/{photoPreviewRoom.totalBeds} બેડ ખાલી
                                    </p>
                                </div>
                                {photoPreviewRoom.status === 'Available' && (
                                    <button
                                        onClick={() => {
                                            const r = photoPreviewRoom;
                                            setPhotoPreviewRoom(null);
                                            setBookingRoom(r);
                                        }}
                                        className="bg-accent hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-accent/30 shrink-0"
                                    >
                                        હમણાં બુક કરો →
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
}
