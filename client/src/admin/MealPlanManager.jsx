import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    Plus,
    Pencil,
    Trash2,
    X,
    RefreshCw,
    AlertTriangle,
    Utensils,
    Clock,
    CheckCircle,
    Star,
    Eye,
    EyeOff,
    GripVertical,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

// ── Gradient presets the admin can pick ──
const GRADIENTS = [
    {
        label: 'Amber → Orange',
        value: 'from-black/90 via-orange-500 to-black/90',
    },
    { label: 'Orange → Red', value: 'from-black/90 via-red-500 to-black/90' },
    { label: 'Red → Pink', value: 'from-black/90 via-pink-500 to-black/90' },
    { label: 'Green → Teal', value: 'from-black/90 via-teal-500 to-black/90' },
    {
        label: 'Blue → Indigo',
        value: 'from-black/90 via-indigo-500 to-black/90',
    },
    { label: 'Purple → Pink', value: 'from-black/90 via-pink-500 to-black/90' },
    { label: 'Gold → Amber', value: 'from-black/90 via-amber-500 to-black/90' },
    { label: 'Teal → Cyan', value: 'from-teal-400 to-cyan-600' },
];

const MEAL_TYPES = [
    { id: 'Breakfast', label: 'સવારનો નાસ્તો (Breakfast)' },
    { id: 'Lunch', label: 'બપોરનું ભોજન (Lunch)' },
    { id: 'Dinner', label: 'સાંજનું ભોજન (Dinner)' },
    { id: 'Snacks', label: 'સાંજનો નાસ્તો (Snacks)' },
    { id: 'Special', label: 'સ્પેશિયલ (Special)' },
];

const emptyPlan = {
    name: '',
    price: '',
    per: 'month',
    description: '',
    items: [],
    timings: [],
    isPopular: false,
    isActive: true,
    color: 'from-amber-400 to-orange-500',
    sortOrder: 0,
};
const emptyTiming = { meal: 'Breakfast', time: '', items: '' };

const inp =
    'w-full bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-3 py-2.5 text-sm outline-none transition-all';

// ─────────────────────────────────────────────
// Plan Form Modal
// ─────────────────────────────────────────────
function PlanFormModal({ plan, onClose, onSave }) {
    const [form, setForm] = useState(emptyPlan);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');
    const [newItem, setNewItem] = useState('');
    const [showTimings, setShowTimings] = useState(false);

    useEffect(() => {
        setForm(plan ? { ...emptyPlan, ...plan } : emptyPlan);
    }, [plan]);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    // ── items (bullet points) ──
    const addItem = () => {
        const v = newItem.trim();
        if (v) {
            set('items', [...form.items, v]);
            setNewItem('');
        }
    };
    const removeItem = (i) =>
        set(
            'items',
            form.items?.filter((_, idx) => idx !== i),
        );

    // ── timings ──
    const addTiming = () =>
        set('timings', [...form.timings, { ...emptyTiming }]);
    const setTiming = (i, k, v) => {
        const t = form.timings.map((tm, idx) =>
            idx === i ? { ...tm, [k]: v } : tm,
        );
        set('timings', t);
    };
    const removeTiming = (i) =>
        set(
            'timings',
            form.timings?.filter((_, idx) => idx !== i),
        );

    const submit = async (e) => {
        e.preventDefault();
        setErr('');
        setBusy(true);
        try {
            await onSave(form, plan?._id);
        } catch (ex) {
            setErr(ex.response?.data?.message || 'સેવ કરવામાં ભૂલ થઈ');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
                    <h2 className="text-xl font-bold text-navy-900 font-serif">
                        {plan
                            ? 'મીલ પ્લાન એડિટ કરો (Edit Meal Plan)'
                            : 'નવો મીલ પ્લાન ઉમેરો (Add Meal Plan)'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-5">
                    {err && (
                        <p className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-2.5 rounded-xl">
                            {err}
                        </p>
                    )}

                    {/* Name + Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                પ્લાનનું નામ (Plan Name) *
                            </label>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => set('name', e.target.value)}
                                placeholder="દા.ત. માત્ર સવારનો નાસ્તો / ફુલ થાળી"
                                className={inp}
                            />
                        </div>
                        <div>
                            <label className="label">કિંમત (Price ₹) *</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">
                                    ₹
                                </span>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    value={form.price}
                                    onChange={(e) =>
                                        set('price', Number(e.target.value))
                                    }
                                    placeholder="દા.ત. 2500"
                                    className={inp + ' pl-7'}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Per + Sort order */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                સમયગાળો (Billing Period)
                            </label>
                            <select
                                value={form.per}
                                onChange={(e) => set('per', e.target.value)}
                                className={inp}
                            >
                                <option value="month">
                                    દર મહિને (Per Month)
                                </option>
                                <option value="day">દર દિવસે (Per Day)</option>
                                <option value="week">
                                    દર અઠવાડિયે (Per Week)
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="label">ક્રમ (Sort Order)</label>
                            <input
                                type="number"
                                min="0"
                                value={form.sortOrder}
                                onChange={(e) =>
                                    set('sortOrder', Number(e.target.value))
                                }
                                className={inp}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label">
                            ટૂંકી વિગત (Description)
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => set('description', e.target.value)}
                            rows={2}
                            placeholder="આ પ્લાન વિશે ટૂંકું વર્ણન..."
                            className={inp + ' resize-none'}
                        />
                    </div>

                    {/* Card gradient */}
                    <div>
                        <label className="label mb-2 block">
                            કાર્ડ કલર (Card Color)
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {GRADIENTS.map((g) => (
                                <button
                                    key={g.value}
                                    type="button"
                                    onClick={() => set('color', g.value)}
                                    className={`h-10 rounded-xl bg-gradient-to-br ${g.value} border-2 transition-all ${form.color === g.value ? 'border-navy-900 scale-95 shadow-md' : 'border-transparent'}`}
                                    title={g.label}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-4 flex-wrap">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <div
                                onClick={() =>
                                    set('isPopular', !form.isPopular)
                                }
                                className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${form.isPopular ? 'bg-gold' : 'bg-gray-200'}`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${form.isPopular ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </div>
                            <span className="text-sm font-semibold text-navy-900 flex items-center gap-1.5">
                                <Star size={13} className="text-gold" />{' '}
                                લોકપ્રિય (Popular) તરીકે દર્શાવો
                            </span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <div
                                onClick={() => set('isActive', !form.isActive)}
                                className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${form.isActive ? 'bg-green-500' : 'bg-gray-200'}`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </div>
                            <span className="text-sm font-semibold text-navy-900 flex items-center gap-1.5">
                                {form.isActive ? (
                                    <Eye size={13} className="text-green-500" />
                                ) : (
                                    <EyeOff
                                        size={13}
                                        className="text-gray-400"
                                    />
                                )}
                                {form.isActive
                                    ? 'વેબસાઇટ પર લાઈવ છે'
                                    : 'વેબસાઇટ પરથી છુપાયેલ છે'}
                            </span>
                        </label>
                    </div>

                    {/* Includes (items) */}
                    <div>
                        <label className="label mb-2 block">
                            શું શું સામેલ છે? (Included Items)
                        </label>
                        <div className="space-y-2 mb-2">
                            {form.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2"
                                >
                                    <CheckCircle
                                        size={13}
                                        className="text-green-500 shrink-0"
                                    />
                                    <span className="text-sm flex-1">
                                        {item}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(i)}
                                        className="text-gray-300 hover:text-red-400 transition-colors"
                                    >
                                        <X size={13} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' &&
                                    (e.preventDefault(), addItem())
                                }
                                placeholder="દા.ત. દાળ + ૨ શાક, રોટલી, ભાત, છાશ..."
                                className={inp + ' flex-1'}
                            />
                            <button
                                type="button"
                                onClick={addItem}
                                className="px-4 bg-navy-900 text-white rounded-xl hover:bg-navy-800 transition-colors shrink-0"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Meal Timings (collapsible) */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setShowTimings(!showTimings)}
                            className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-gray-100 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <Clock size={15} className="text-accent" />{' '}
                                જમવાના સમય ({form.timings.length})
                            </span>
                            {showTimings ? (
                                <ChevronUp size={15} />
                            ) : (
                                <ChevronDown size={15} />
                            )}
                        </button>

                        <AnimatePresence>
                            {showTimings && (
                                <motion.div
                                    key="timings"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-3 space-y-3">
                                        {form.timings.map((t, i) => (
                                            <div
                                                key={i}
                                                className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3"
                                            >
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="label">
                                                            સમય/ભોજન *
                                                        </label>
                                                        <select
                                                            value={t.meal}
                                                            onChange={(e) =>
                                                                setTiming(
                                                                    i,
                                                                    'meal',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className={inp}
                                                        >
                                                            {MEAL_TYPES.map(
                                                                (m) => (
                                                                    <option
                                                                        key={
                                                                            m.id
                                                                        }
                                                                        value={
                                                                            m.id
                                                                        }
                                                                    >
                                                                        {
                                                                            m.label
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="label">
                                                            સમયગાળો *
                                                        </label>
                                                        <input
                                                            value={t.time}
                                                            onChange={(e) =>
                                                                setTiming(
                                                                    i,
                                                                    'time',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="દા.ત. સવારે ૭:૩૦ થી ૯:૦૦"
                                                            className={inp}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <label className="label">
                                                            વાનગીઓ (Items
                                                            Served)
                                                        </label>
                                                        <input
                                                            value={t.items}
                                                            onChange={(e) =>
                                                                setTiming(
                                                                    i,
                                                                    'items',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="દા.ત. રોટલી, દાળ, શાક, સંભારો"
                                                            className={inp}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeTiming(i)
                                                        }
                                                        className="mt-5 p-2.5 bg-red-50 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-colors shrink-0"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addTiming}
                                            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-accent text-gray-400 hover:text-accent rounded-xl py-3 text-sm font-semibold transition-colors"
                                        >
                                            <Plus size={15} /> નવો સમય ઉમેરો
                                            (Add Timing)
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Preview card */}
                    <div>
                        <label className="label mb-2 block">
                            લાઈવ પ્રિવ્યુ (Live Card Preview)
                        </label>
                        <div
                            className={`rounded-2xl overflow-hidden border border-gray-100 shadow-sm`}
                        >
                            <div
                                className={`h-24 bg-gradient-to-br ${form.color} flex items-center justify-between px-5`}
                            >
                                <div>
                                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">
                                        દર{' '}
                                        {form.per === 'month'
                                            ? 'મહિને'
                                            : form.per === 'day'
                                              ? 'દિવસે'
                                              : 'અઠવાડિયે'}
                                    </p>
                                    <p className="text-white font-bold text-2xl font-serif">
                                        {form.price
                                            ? `₹${Number(form.price).toLocaleString()}`
                                            : '₹0'}
                                        <span className="text-sm font-normal opacity-80">
                                            /
                                            {form.per === 'month'
                                                ? 'મહિને'
                                                : form.per}
                                        </span>
                                    </p>
                                </div>
                                {form.isPopular && (
                                    <span className="bg-white text-accent text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                        <Star
                                            size={10}
                                            className="fill-current"
                                        />{' '}
                                        લોકપ્રિય
                                    </span>
                                )}
                            </div>
                            <div className="bg-white p-4">
                                <p className="font-bold text-navy-900 font-serif">
                                    {form.name || 'પ્લાનનું નામ'}
                                </p>
                                {form.items.slice(0, 3).map((it, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-1.5 text-xs text-gray-500 mt-1"
                                    >
                                        <CheckCircle
                                            size={10}
                                            className="text-green-500"
                                        />{' '}
                                        {it}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            રદ કરો
                        </button>
                        <button
                            type="submit"
                            disabled={busy}
                            className="flex-1 py-3 rounded-xl bg-accent hover:bg-red-600 disabled:opacity-60 text-white font-semibold transition-colors"
                        >
                            {busy
                                ? 'સેવિંગ...'
                                : plan
                                  ? 'પ્લાન અપડેટ કરો'
                                  : 'પ્લાન સેવ કરો'}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`.label{display:block;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}`}</style>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main MealPlanManager
// ─────────────────────────────────────────────
export default function MealPlanManager({ showToast }) {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [delId, setDelId] = useState(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        try {
            const r = await axios.get('/api/mealplans?all=true');
            setPlans(Array.isArray(r.data?.data) ? r.data.data : []);
        } catch {
            setPlans([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const save = async (form, id) => {
        if (id) {
            await axios.put(`/api/mealplans/${id}`, form);
            showToast('મીલ પ્લાન અપડેટ થયો!');
        } else {
            await axios.post('/api/mealplans', form);
            showToast('નવો મીલ પ્લાન બન્યો!');
        }
        setModal(null);
        fetch();
    };

    const del = async (id) => {
        await axios.delete(`/api/mealplans/${id}`);
        setDelId(null);
        showToast('મીલ પ્લાન ડિલીટ થયો!', 'error');
        fetch();
    };

    const toggle = async (plan, key) => {
        await axios.put(`/api/mealplans/${plan._id}`, { [key]: !plan[key] });
        showToast(`પ્લાન વેબસાઇટ પર ${!plan[key] ? 'દર્શાવાશે' : 'છુપાવ્યો'}!`);
        fetch();
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-navy-900 font-serif text-lg">
                        મીલ પ્લાન્સ (Meal Plans)
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                        કુલ {plans?.length} પ્લાન્સ ·{' '}
                        {plans?.filter((p) => p.isActive).length} વેબસાઇટ પર
                        લાઈવ
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetch}
                        className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors"
                        title="રીફ્રેશ કરો"
                    >
                        <RefreshCw size={15} />
                    </button>
                    <button
                        onClick={() => setModal('add')}
                        className="flex items-center gap-2 bg-accent hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                    >
                        <Plus size={15} /> નવો પ્લાન ઉમેરો
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex items-center justify-center py-20 text-gray-400">
                    <RefreshCw size={20} className="animate-spin mr-2" />{' '}
                    પ્લાન્સ લોડ થઈ રહ્યા છે...
                </div>
            )}

            {!loading && plans.length === 0 && (
                <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
                    <Utensils size={36} className="mx-auto mb-3 opacity-25" />
                    <p className="font-semibold">
                        હજુ સુધી કોઈ મીલ પ્લાન ઉમેરેલ નથી
                    </p>
                    <button
                        onClick={() => setModal('add')}
                        className="mt-4 text-accent text-sm font-semibold hover:underline"
                    >
                        પહેલો પ્લાન ઉમેરો →
                    </button>
                </div>
            )}

            {/* Plans grid */}
            {!loading && plans.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${!plan.isActive ? 'opacity-60' : ''}`}
                        >
                            {/* Gradient top */}
                            <div
                                className={`h-28 bg-gradient-to-br ${plan.color} relative flex items-end p-4`}
                            >
                                {plan.isPopular && (
                                    <span className="absolute top-3 right-3 bg-white text-accent text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                                        <Star
                                            size={10}
                                            className="fill-current"
                                        />{' '}
                                        લોકપ્રિય
                                    </span>
                                )}
                                {!plan.isActive && (
                                    <span className="absolute top-3 left-3 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <EyeOff size={9} /> છુપાયેલ છે
                                    </span>
                                )}
                                <div className="bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                    <p className="text-white font-bold text-2xl font-serif">
                                        ₹{Number(plan.price).toLocaleString()}
                                        <span className="text-xs font-normal opacity-80">
                                            /
                                            {plan.per === 'month'
                                                ? 'મહિને'
                                                : plan.per}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-5">
                                <p className="font-bold text-navy-900 text-lg font-serif mb-1">
                                    {plan.name}
                                </p>
                                {plan.description && (
                                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                                        {plan.description}
                                    </p>
                                )}

                                {plan.items.length > 0 && (
                                    <ul className="space-y-1.5 mb-3">
                                        {plan.items.slice(0, 4).map((it, j) => (
                                            <li
                                                key={j}
                                                className="flex items-center gap-2 text-xs text-gray-600"
                                            >
                                                <CheckCircle
                                                    size={11}
                                                    className="text-green-500 shrink-0"
                                                />{' '}
                                                {it}
                                            </li>
                                        ))}
                                        {plan.items.length > 4 && (
                                            <li className="text-xs text-gray-400 pl-4">
                                                +{plan.items.length - 4} વધુ
                                            </li>
                                        )}
                                    </ul>
                                )}

                                {plan.timings.length > 0 && (
                                    <div className="flex gap-1.5 mb-4 flex-wrap">
                                        {plan.timings.map((t, j) => (
                                            <span
                                                key={j}
                                                className="flex items-center gap-1 text-[10px] bg-amber-50 border border-amber-100 text-amber-700 px-2 py-1 rounded-full font-semibold"
                                            >
                                                <Clock size={9} />{' '}
                                                {t.meal === 'Breakfast'
                                                    ? 'નાસ્તો'
                                                    : t.meal === 'Lunch'
                                                      ? 'બપોરે'
                                                      : t.meal === 'Dinner'
                                                        ? 'સાંજે'
                                                        : t.meal}
                                                : {t.time}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setModal(plan)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-xl transition-colors"
                                    >
                                        <Pencil size={12} /> એડિટ
                                    </button>
                                    <button
                                        onClick={() => toggle(plan, 'isActive')}
                                        title={
                                            plan.isActive
                                                ? 'વેબસાઇટ પરથી છુપાવો'
                                                : 'વેબસાઇટ પર દર્શાવો'
                                        }
                                        className={`flex items-center justify-center px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${plan.isActive ? 'bg-green-50 border-green-100 text-green-600 hover:bg-green-100' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'}`}
                                    >
                                        {plan.isActive ? (
                                            <Eye size={13} />
                                        ) : (
                                            <EyeOff size={13} />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setDelId(plan._id)}
                                        className="flex items-center justify-center px-3 py-2 bg-red-50 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-colors border border-red-100 hover:border-red-500"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Plan form modal */}
            <AnimatePresence>
                {modal && (
                    <PlanFormModal
                        plan={modal === 'add' ? null : modal}
                        onClose={() => setModal(null)}
                        onSave={save}
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
                        className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4"
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
                                મીલ પ્લાન ડિલીટ કરવો છે?
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                આ પ્લાન હંમેશ માટે વેબસાઇટ પરથી દૂર થઈ જશે.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDelId(null)}
                                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50"
                                >
                                    રદ કરો
                                </button>
                                <button
                                    onClick={() => del(delId)}
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
