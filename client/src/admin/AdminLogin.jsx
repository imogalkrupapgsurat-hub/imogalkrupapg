import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Home, Lock, User, Eye, EyeOff, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
    const { login } = useAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [show, setShow] = useState(false);
    const [err, setErr] = useState('');
    const [busy, setBusy] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setErr('');
        setBusy(true);
        try {
            await login(form.username, form.password);
        } catch (ex) {
            setErr(
                ex.response?.data?.message || 'લોગિન નિષ્ફળ ગયું. ખોટી માહિતી.',
            );
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy-900 hero-pattern flex items-center justify-center px-4">
            <div className="absolute top-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-blob delay-2000" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md"
            >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-accent p-2.5 rounded-xl">
                        <Home size={22} className="text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-navy-900 font-serif text-lg">
                            મોગલ કૃપા PG
                        </p>
                        <p className="text-xs text-gray-400">
                            એડમિન પેનલ (Admin Panel)
                        </p>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-navy-900 font-serif mb-1">
                    આપનું સ્વાગત છે!
                </h1>
                <p className="text-gray-400 text-sm mb-8">
                    PG મેનેજ કરવા માટે લોગિન કરો
                </p>

                {err && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
                        <Lock size={14} /> {err}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                            યૂઝરનેમ (Username)
                        </label>
                        <div className="relative">
                            <User
                                size={16}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                required
                                autoFocus
                                value={form.username}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        username: e.target.value,
                                    }))
                                }
                                placeholder="admin"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl text-sm outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                            પાસવર્ડ (Password)
                        </label>
                        <div className="relative">
                            <Lock
                                size={16}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                required
                                type={show ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        password: e.target.value,
                                    }))
                                }
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl text-sm outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-900"
                            >
                                {show ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={busy}
                        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-red-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all mt-2"
                    >
                        {busy ? (
                            <Loader size={18} className="animate-spin" />
                        ) : (
                            <Lock size={18} />
                        )}
                        {busy
                            ? 'સાઇન ઇન થઈ રહ્યું છે...'
                            : 'સાઇન ઇન કરો (Sign In)'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    ડિફોલ્ટ:{' '}
                    <span className="font-semibold text-navy-900">admin</span> /{' '}
                    <span className="font-semibold text-navy-900">
                        mogalkrupa@2024
                    </span>
                </p>
            </motion.div>
        </div>
    );
}
