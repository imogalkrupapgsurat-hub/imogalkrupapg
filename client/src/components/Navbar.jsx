import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Phone,
    Menu,
    X,
    BedDouble,
    Utensils,
    Images,
    Users,
    PhoneCall,
    MessageCircle,
    Sparkles,
    ChevronRight,
    MapPin,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const links = [
    { to: '/', label: 'હોમ', icon: Home, desc: 'મુખ્ય પેજ' },
    { to: '/about', label: 'અમારા વિશે', icon: Users, desc: 'ઓળખ અને મૂલ્યો' },
    {
        to: '/rooms',
        label: 'રૂમ જુઓ',
        icon: BedDouble,
        desc: 'AC અને Non-AC રૂમ',
    },
    { to: '/food', label: 'ફૂડ કોર્ટ', icon: Utensils, desc: 'ઘરનું દેશી જમણ' },
    {
        to: '/gallery',
        label: 'ફોટો ગેલેરી',
        icon: Images,
        desc: 'હોસ્ટેલની તસવીરો',
    },
    {
        to: '/contact',
        label: 'સંપર્ક કરો',
        icon: PhoneCall,
        desc: 'સરનામું અને પૂછપરછ',
    },
];

export default function Navbar() {
    const { content } = useContent();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Close mobile drawer on route change
    useEffect(() => {
        setOpen(false);
    }, [location]);

    // Scroll listener for sticky glass navbar
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // Prevent background body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    const phoneNum = content.phone || '+91 63547 97745';
    const cleanPhone = phoneNum.replace(/[^0-9+]/g, '');
    const waNum = content.whatsapp || '916354797745';

    return (
        <>
            {/* ── TOP NOTIFICATION BAR ── */}
            <div className="bg-navy-900 text-white text-xs py-2 px-4 sm:px-6 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
                    <a
                        href={`tel:${cleanPhone}`}
                        className="flex items-center gap-1.5 hover:text-gold transition-colors font-medium shrink-0"
                    >
                        <Phone size={12} className="text-gold" />
                        <span>{phoneNum}</span>
                    </a>

                    <p className="hidden md:flex items-center gap-1.5 text-gray-300 text-xs truncate max-w-md lg:max-w-xl">
                        <MapPin size={11} className="text-gold shrink-0" />
                        <span className="truncate">
                            વર્ષા રોડ, માતાવાડી, વરાછા, સુરત – ૩૯૫૦૧૦
                        </span>
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block text-[11px] text-gold font-semibold">
                            ✦ સુરતનું ભરોસાપાત્ર PG
                        </span>
                        <Link
                            to="/rooms"
                            className="bg-accent hover:bg-red-600 text-white text-[11px] font-semibold px-3 py-0.5 rounded-full transition-all shadow-sm shadow-accent/20"
                        >
                            રૂમ બુક કરો
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── MAIN NAVBAR ── */}
            <nav
                className={`sticky top-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
                        : 'bg-white py-3'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 bg-accent group-hover:scale-105 rounded-xl flex items-center justify-center text-white shadow-md shadow-accent/20 transition-all">
                            <Home size={20} />
                        </div>
                        <div>
                            <span className="font-bold text-navy-900 font-serif text-lg leading-tight block">
                                મોગલ કૃપા PG
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium -mt-0.5 block flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                ફૂડ કોર્ટ · વરાછા, સુરત
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                end={l.to === '/'}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                        isActive
                                            ? 'text-accent bg-accent/10 shadow-sm'
                                            : 'text-gray-600 hover:text-accent hover:bg-gray-50'
                                    }`
                                }
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href={`https://wa.me/${waNum}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-full transition-colors"
                            title="વોટ્સએપ પર વાત કરો"
                        >
                            <MessageCircle size={18} />
                        </a>
                        <Link
                            to="/rooms"
                            className="bg-accent hover:bg-red-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-md shadow-accent/25 transition-all hover:-translate-y-0.5"
                        >
                            રૂમ પસંદ કરો →
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button with animated state */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <a
                            href={`tel:${cleanPhone}`}
                            className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                            title="કોલ કરો"
                        >
                            <Phone size={18} />
                        </a>
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-2.5 bg-gray-100 hover:bg-gray-200 active:scale-95 text-navy-900 rounded-xl transition-all"
                            aria-label="Toggle menu"
                        >
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── ATTRACTIVE MOBILE DRAWER ── */}
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        {/* Backdrop Blur Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setOpen(false)}
                            className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm"
                        />

                        {/* Slide-in Drawer Container */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 28,
                                stiffness: 260,
                            }}
                            className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-white shadow-2xl flex flex-col border-l border-white/10"
                        >
                            {/* Drawer Top Header */}
                            <div className="p-5 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center text-white shadow">
                                        <Home size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-serif text-base text-white leading-tight">
                                            મોગલ કૃપા PG
                                        </h3>
                                        <p className="text-[10px] text-gold font-medium">
                                            ફૂડ કોર્ટ · સુરત
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-gray-300 hover:text-white transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Gujarati Welcome Badge */}
                            <div className="px-5 pt-4">
                                <div className="bg-gradient-to-r from-accent/20 via-gold/15 to-transparent border border-gold/30 rounded-2xl p-3 flex items-center gap-2.5 shadow-sm">
                                    <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold shrink-0">
                                        <Sparkles size={14} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-gold tracking-wide">
                                            {content.welcomeLine ||
                                                '✦ પધારો, મોગલ કૃપા PG માં ✦'}
                                        </p>
                                        <p className="text-[10px] text-gray-300 truncate">
                                            કેમ છો? મજામાં ને! તમારું સ્વાગત છે.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Links with Icons & Hover Badges */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
                                    મેનૂ નેવિગેશન
                                </p>
                                {links.map((l, idx) => (
                                    <NavLink
                                        key={l.to}
                                        to={l.to}
                                        end={l.to === '/'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all group ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-black/80 to-red-600 text-white shadow-lg shadow-accent/25 font-bold'
                                                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div
                                                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                                                        isActive
                                                            ? 'bg-white/20 text-white'
                                                            : 'bg-white/5 text-gold group-hover:bg-white/10'
                                                    }`}
                                                >
                                                    <l.icon size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm leading-tight">
                                                        {l.label}
                                                    </p>
                                                    <p
                                                        className={`text-[10px] transition-colors ${
                                                            isActive
                                                                ? 'text-white/80'
                                                                : 'text-gray-400'
                                                        }`}
                                                    >
                                                        {l.desc}
                                                    </p>
                                                </div>
                                                <ChevronRight
                                                    size={16}
                                                    className={`transition-transform group-hover:translate-x-0.5 ${
                                                        isActive
                                                            ? 'text-white'
                                                            : 'text-gray-500'
                                                    }`}
                                                />
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>

                            {/* Drawer Bottom Actions */}
                            <div className="p-4 border-t border-white/10 bg-navy-950/60 space-y-2.5">
                                {/* Book Room CTA Button */}
                                <Link
                                    to="/rooms"
                                    className="w-full bg-gradient-to-r from-black/80 to-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-accent/30 transition-all active:scale-[0.98]"
                                >
                                    <BedDouble size={16} /> હમણાં રૂમ બુક કરો
                                </Link>

                                {/* Call & WhatsApp Quick Buttons */}
                                <div className="grid grid-cols-2 gap-2">
                                    <a
                                        href={`tel:${cleanPhone}`}
                                        className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold py-2.5 rounded-xl border border-white/10 transition-colors"
                                    >
                                        <Phone
                                            size={13}
                                            className="text-gold"
                                        />{' '}
                                        ફોન કોલ
                                    </a>
                                    <a
                                        href={`https://wa.me/${waNum}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-sm transition-colors"
                                    >
                                        <MessageCircle size={13} /> WhatsApp
                                    </a>
                                </div>

                                {/* Address & Farewell Footnote */}
                                <div className="pt-2 text-center text-[10px] text-gray-400 space-y-0.5">
                                    <p className="truncate">
                                        વર્ષા રોડ, વરાછા, સુરત – ૩૯૫૦૧૦
                                    </p>
                                    <p className="text-gold font-medium">
                                        {content.seeYouLine ||
                                            '✦ આવજો! ફરી પધારજો! ✦'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
