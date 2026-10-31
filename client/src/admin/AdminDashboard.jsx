import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from './AuthContext';
import RoomFormModal from './RoomFormModal';
import ContentManager from './ContentManager';
import BookingManager from './BookingManager';
import MealPlanManager from './MealPlanManager';
import GalleryManager from './GalleryManager';
import {
    Plus,
    Pencil,
    Trash2,
    LogOut,
    Home,
    BedDouble,
    CheckCircle,
    AlertTriangle,
    Search,
    RefreshCw,
    Users,
    Images,
    LayoutDashboard,
    Utensils,
    Calendar,
    Sparkles,
} from 'lucide-react';

const statusColors = {
    Available: 'bg-green-100 text-green-700 border-green-200',
    Full: 'bg-red-100 text-red-700 border-red-200',
    Maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
};
const statusLabels = {
    Available: 'ઉપલબ્ધ',
    Full: 'ભરાઈ ગયો',
    Maintenance: 'સમારકામ',
};
const enToGujMap = {
    'free wifi': 'ફ્રી વાઇફાઇ',
    'attached bath': 'અટેચ બાથરૂમ',
    wardrobe: 'પર્સનલ કબાટ',
    'study table': 'સ્ટડી ટેબલ',
    tv: 'LED ટીવી',
    ac: 'એસી (AC)',
    fan: 'પંખો',
    'hot water': 'ગરમ પાણી (ગીઝર)',
    balcony: 'બાલ્કની',
    cctv: 'CCTV સુરક્ષા',
    'power backup': 'ઇન્વર્ટર પાવર બેકઅપ',
    housekeeping: 'દરરોજ સાફ-સફાઈ',
    'laundry access': 'લોન્ડ્રી સુવિધા',
    parking: 'વાહન પાર્કિંગ',
    'common kitchen': 'કોમન રસોડું',
    'ro water': 'RO શુદ્ધ પાણી',
};
const toGujFeat = (f) => enToGujMap[(f || '').toLowerCase().trim()] || f;
const typeGradients = {
    AC: 'from-blue-500 to-indigo-600',
    'Non-AC': 'from-amber-500 to-orange-600',
};

const NAV = [
    { id: 'rooms', label: 'રૂમ વ્યવસ્થાપન', icon: BedDouble },
    { id: 'bookings', label: 'રૂમ બુકિંગ્સ', icon: Calendar },
    { id: 'mealplans', label: 'મીલ પ્લાન્સ (જમવાનું)', icon: Utensils },
    { id: 'gallery', label: 'ફોટો ગેલેરી', icon: Images },
    { id: 'content', label: 'વેબસાઇટ કન્ટેન્ટ', icon: Sparkles },
];

export default function AdminDashboard() {
    const { admin, logout } = useAuth();
    const [tab, setTab] = useState('rooms');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [delId, setDelId] = useState(null);
    const [toast, setToast] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3200);
    };

    const fetchRooms = useCallback(async () => {
        setLoading(true);
        try {
            const r = await axios.get('/api/rooms');
            setRooms(r.data.data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const saveRoom = async (form, id) => {
        if (id) {
            await axios.put(`/api/rooms/${id}`, form);
            showToast('રૂમ સફળતાપૂર્વક અપડેટ થયો!');
        } else {
            await axios.post('/api/rooms', form);
            showToast('નવો રૂમ ઉમેરાયો!');
        }
        setModal(null);
        fetchRooms();
    };
    const deleteRoom = async (id) => {
        await axios.delete(`/api/rooms/${id}`);
        setDelId(null);
        showToast('રૂમ ડિલીટ કરવામાં આવ્યો!', 'error');
        fetchRooms();
    };

    const filtered = rooms
        ?.filter((r) => typeFilter === 'All' || r.type === typeFilter)
        .filter(
            (r) =>
                r.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
                r.floor.toLowerCase().includes(search.toLowerCase()),
        );

    const stats = [
        {
            label: 'કુલ રૂમ',
            value: rooms?.length,
            icon: Home,
            color: 'bg-navy-900 text-white',
        },
        {
            label: 'ઉપલબ્ધ રૂમ',
            value: rooms?.filter((r) => r.status === 'Available')?.length,
            icon: CheckCircle,
            color: 'bg-green-500 text-white',
        },
        {
            label: 'ભરાયેલા રૂમ',
            value: rooms?.filter((r) => r.status === 'Full')?.length,
            icon: BedDouble,
            color: 'bg-red-500 text-white',
        },
        {
            label: 'કુલ બેડ',
            value: rooms?.reduce((s, r) => s + r.totalBeds, 0),
            icon: Users,
            color: 'bg-gold text-navy-900',
        },
        {
            label: 'ખાલી બેડ',
            value: rooms?.reduce((s, r) => s + r.availableBeds, 0),
            icon: BedDouble,
            color: 'bg-blue-500 text-white',
        },
    ];

    const SidebarContent = () => (
        <>
            <div className="px-6 py-5 border-b border-navy-800">
                <div className="flex items-center gap-2.5">
                    <div className="bg-accent p-1.5 rounded-lg">
                        <Home size={18} className="text-white" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm font-serif">
                            મોગલ કૃપા PG
                        </p>
                        <p className="text-gray-500 text-xs">
                            એડમિન પેનલ (સુરત)
                        </p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 px-4 py-5 space-y-1">
                {NAV.map((n) => (
                    <button
                        key={n.id}
                        onClick={() => {
                            setTab(n.id);
                            setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                            tab === n.id
                                ? 'bg-white/10 text-white shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <n.icon
                            size={16}
                            className={
                                tab === n.id ? 'text-gold' : 'text-gray-400'
                            }
                        />{' '}
                        {n.label}
                    </button>
                ))}
            </nav>
            <div className="px-4 py-5 border-t border-navy-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {admin?.username?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold">
                            {admin?.username}
                        </p>
                        <p className="text-gray-500 text-xs">
                            મુખ્ય સંચાલક (Admin)
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors"
                >
                    <LogOut size={15} /> સાઇન આઉટ (Log Out)
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        key="toast"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        className={`fixed top-5 right-5 z-[400] px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm text-white ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex h-screen overflow-hidden">
                {/* Desktop sidebar */}
                <aside className="w-64 bg-navy-900 flex-col shrink-0 hidden lg:flex">
                    <SidebarContent />
                </aside>

                {/* Mobile sidebar overlay */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            key="mob-sidebar"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 z-[200] bg-black/60"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <motion.aside
                                initial={{ x: -260 }}
                                animate={{ x: 0 }}
                                exit={{ x: -260 }}
                                className="w-64 bg-navy-900 h-full flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <SidebarContent />
                            </motion.aside>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto">
                    {/* Top bar */}
                    <div className="bg-white border-b border-gray-100 px-4 lg:px-6 py-4 flex items-center gap-3 sticky top-0 z-20">
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <LayoutDashboard
                                size={18}
                                className="text-gray-600"
                            />
                        </button>
                        <div className="flex-1">
                            <h1 className="text-lg font-bold text-navy-900 font-serif">
                                {NAV.find((n) => n.id === tab)?.label}
                            </h1>
                        </div>
                        {tab === 'rooms' && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={fetchRooms}
                                    className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors"
                                    title="રીફ્રેશ કરો"
                                >
                                    <RefreshCw size={15} />
                                </button>
                                <button
                                    onClick={() => setModal('add')}
                                    className="flex items-center gap-2 bg-accent hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                                >
                                    <Plus size={15} /> નવો રૂમ ઉમેરો
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-4 lg:p-6 space-y-6">
                        {/* ── ROOMS TAB ── */}
                        {tab === 'rooms' && (
                            <>
                                {/* Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {stats.map((s, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                            className={`${s.color} rounded-2xl p-4 flex items-center gap-3 shadow-sm`}
                                        >
                                            <s.icon size={20} />
                                            <div>
                                                <p className="text-xl font-bold font-serif leading-tight">
                                                    {s.value}
                                                </p>
                                                <p className="text-xs opacity-75">
                                                    {s.label}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Filters */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Search
                                            size={14}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            placeholder="રૂમ નંબર અથવા માળ શોધો..."
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-gold transition-all"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        {[
                                            { id: 'All', label: 'બધા જ રૂમ' },
                                            { id: 'AC', label: 'AC રૂમ' },
                                            {
                                                id: 'Non-AC',
                                                label: 'Non-AC રૂમ',
                                            },
                                        ].map((f) => (
                                            <button
                                                key={f.id}
                                                onClick={() =>
                                                    setTypeFilter(f.id)
                                                }
                                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${typeFilter === f.id ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            >
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rooms grid */}
                                {loading ? (
                                    <div className="flex items-center justify-center py-20 text-gray-400">
                                        <RefreshCw
                                            size={22}
                                            className="animate-spin mr-2"
                                        />
                                        રૂમ લોડ થઈ રહ્યા છે...
                                    </div>
                                ) : filtered?.length === 0 ? (
                                    <div className="text-center py-20 text-gray-400">
                                        <BedDouble
                                            size={38}
                                            className="mx-auto mb-3 opacity-30"
                                        />
                                        <p className="font-semibold">
                                            કોઈ રૂમ મળ્યા નથી
                                        </p>
                                        <button
                                            onClick={() => setModal('add')}
                                            className="mt-4 text-accent text-sm font-semibold hover:underline"
                                        >
                                            પહેલો રૂમ ઉમેરો →
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                        {filtered.map((room, i) => (
                                            <motion.div
                                                key={room._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
                                            >
                                                {/* Top banner / Image */}
                                                <div
                                                    className={`h-32 bg-gradient-to-br ${typeGradients[room.type] || 'from-gray-400 to-gray-700'} relative flex items-end p-4 overflow-hidden`}
                                                >
                                                    {room.image && (
                                                        <img
                                                            src={room.image}
                                                            alt={`Room ${room.roomNumber}`}
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                                    <span
                                                        className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[room.status]}`}
                                                    >
                                                        {statusLabels[
                                                            room.status
                                                        ] || room.status}
                                                    </span>
                                                    <div className="relative z-10 bg-black/30 backdrop-blur-sm rounded-xl px-3 py-1.5">
                                                        <p className="text-white font-bold text-xl font-serif">
                                                            ₹
                                                            {room.rent.toLocaleString()}
                                                            <span className="text-xs font-normal">
                                                                /મહિને
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="p-5">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <p className="font-bold text-navy-900">
                                                                રૂમ નં.{' '}
                                                                {
                                                                    room.roomNumber
                                                                }
                                                            </p>
                                                            <p className="text-gray-400 text-xs">
                                                                {room.floor} માળ
                                                                • {room.type}{' '}
                                                                રૂમ
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-bold text-navy-900">
                                                                {
                                                                    room.availableBeds
                                                                }
                                                                /
                                                                {room.totalBeds}
                                                            </p>
                                                            <p className="text-gray-400 text-xs">
                                                                બેડ ખાલી
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1.5 mb-4">
                                                        {Array.from({
                                                            length: room.totalBeds,
                                                        }).map((_, j) => (
                                                            <div
                                                                key={j}
                                                                className={`flex-1 h-2.5 rounded-full ${j < room.availableBeds ? 'bg-green-400' : 'bg-gray-200'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    {room.features?.length >
                                                        0 && (
                                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                                            {room.features
                                                                .slice(0, 4)
                                                                .map((f) => (
                                                                    <span
                                                                        key={f}
                                                                        className="text-[10px] font-semibold bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                                                                    >
                                                                        {toGujFeat(
                                                                            f,
                                                                        )}
                                                                    </span>
                                                                ))}
                                                            {room.features
                                                                .length > 4 && (
                                                                <span className="text-[10px] text-gray-400">
                                                                    +
                                                                    {room
                                                                        .features
                                                                        ?.length -
                                                                        4}{' '}
                                                                    વધુ
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                setModal(room)
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-xl transition-colors"
                                                        >
                                                            <Pencil size={12} />{' '}
                                                            એડિટ (Edit)
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setDelId(
                                                                    room._id,
                                                                )
                                                            }
                                                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white text-xs font-semibold rounded-xl transition-colors border border-red-100 hover:border-red-500"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {/* ── GALLERY TAB ── */}
                        {tab === 'gallery' && (
                            <GalleryManager showToast={showToast} />
                        )}
                        {/* ── MEAL PLANS TAB ── */}
                        {tab === 'mealplans' && (
                            <MealPlanManager showToast={showToast} />
                        )}
                        {/* ── BOOKINGS TAB ── */}
                        {tab === 'bookings' && (
                            <BookingManager showToast={showToast} />
                        )}
                        {/* ── CONTENT TAB ── */}
                        {tab === 'content' && (
                            <ContentManager showToast={showToast} />
                        )}
                    </div>
                </main>
            </div>

            {/* Room modal */}
            <AnimatePresence>
                {modal && (
                    <RoomFormModal
                        room={modal === 'add' ? null : modal}
                        onClose={() => setModal(null)}
                        onSave={saveRoom}
                    />
                )}
            </AnimatePresence>

            {/* Delete confirm */}
            <AnimatePresence>
                {delId && (
                    <motion.div
                        key="del"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-white rounded-2xl p-7 max-w-sm w-full text-center shadow-2xl"
                        >
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle
                                    size={26}
                                    className="text-red-500"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-navy-900 mb-2 font-serif">
                                રૂમ ડિલીટ કરવો છે?
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                આ ક્રિયા રદ થઈ શકશે નહીં. રૂમ હંમેશ માટે દૂર
                                થશે.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDelId(null)}
                                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50"
                                >
                                    રદ કરો
                                </button>
                                <button
                                    onClick={() => deleteRoom(delId)}
                                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold"
                                >
                                    હા, ડિલીટ કરો
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
