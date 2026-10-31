import { useState, useEffect, useRef } from "react"
import { X, Plus, Trash2, Upload, Image as ImageIcon, Loader, BedDouble, Check } from "lucide-react"
import axios from "axios"

const COMMON_FEATURES = [
  "ફ્રી વાઇફાઇ",
  "અટેચ બાથરૂમ",
  "પર્સનલ કબાટ (વોર્ડરોબ)",
  "સ્ટડી ટેબલ & ખુરશી",
  "LED ટીવી",
  "એસી (AC)",
  "પંખો",
  "ગરમ પાણી (ગીઝર)",
  "બાલ્કની",
  "CCTV સુરક્ષા",
  "ઇન્વર્ટર પાવર બેકઅપ",
  "દરરોજ સાફ-સફાઈ",
  "લોન્ડ્રી વ્યવસ્થા",
  "વાહન પાર્કિંગ",
  "કોમન રસોડું",
  "RO શુદ્ધ પીવાનું પાણી"
]

const enToGujMap = {
  "free wifi": "ફ્રી વાઇફાઇ",
  "attached bath": "અટેચ બાથરૂમ",
  "wardrobe": "પર્સનલ કબાટ (વોર્ડરોબ)",
  "study table": "સ્ટડી ટેબલ & ખુરશી",
  "tv": "LED ટીવી",
  "ac": "એસી (AC)",
  "fan": "પંખો",
  "hot water": "ગરમ પાણી (ગીઝર)",
  "balcony": "બાલ્કની",
  "cctv": "CCTV સુરક્ષા",
  "power backup": "ઇન્વર્ટર પાવર બેકઅપ",
  "housekeeping": "દરરોજ સાફ-સફાઈ",
  "laundry access": "લોન્ડ્રી વ્યવસ્થા",
  "parking": "વાહન પાર્કિંગ",
  "common kitchen": "કોમન રસોડું",
  "ro water": "RO શુદ્ધ પીવાનું પાણી"
}

const defaultForm = {
  floor: "",
  roomNumber: "",
  totalBeds: 1,
  availableBeds: 1,
  type: "Non-AC",
  rent: "",
  status: "Available",
  description: "",
  image: "",
  features: []
}

export default function RoomFormModal({ room, onClose, onSave }) {
  const [form, setForm] = useState(defaultForm)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState("")
  const [customFeature, setCustomFeature] = useState("")
  const fileInputRef = useRef()

  useEffect(() => {
    if (room) {
      const normalizedFeatures = (room.features || []).map(f => {
        const lower = f.toLowerCase().trim()
        return enToGujMap[lower] || f
      })
      setForm({ ...defaultForm, ...room, features: normalizedFeatures })
    } else {
      setForm(defaultForm)
    }
  }, [room])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toggleFeature = feat => {
    setForm(f => ({
      ...f,
      features: f.features.includes(feat)
        ? f.features.filter(x => x !== feat)
        : [...f.features, feat]
    }))
  }

  const addCustom = () => {
    const v = customFeature.trim()
    if (v && !form.features.includes(v)) {
      setForm(f => ({ ...f, features: [...f.features, v] }))
      setCustomFeature("")
    }
  }

  const handleImageFileChange = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErr("")
    try {
      const fd = new FormData()
      fd.append("image", file)
      const res = await axios.post("/api/rooms/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      if (res.data?.success && res.data.url) {
        set("image", res.data.url)
      }
    } catch (ex) {
      setErr(ex.response?.data?.message || "રૂમ ફોટો અપલોડ કરવામાં ક્ષતિ થઈ")
    } finally {
      setUploading(false)
    }
  }

  const submit = async e => {
    e.preventDefault()
    setErr("")
    setBusy(true)
    try {
      await onSave(form, room?._id)
    } catch (ex) {
      setErr(ex.response?.data?.message || "સેવ કરવામાં ભૂલ થઈ")
    } finally {
      setBusy(false)
    }
  }

  const inp = "w-full bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm outline-none transition-all placeholder:text-gray-400"

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <BedDouble size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-navy-900 font-serif leading-tight">
                {room ? "રૂમ એડિટ કરો" : "નવો રૂમ ઉમેરો"}
              </h2>
              <p className="text-[11px] text-gray-400">
                {room ? `રૂમ નં. ${room.roomNumber} ની વિગતો બદલો` : "રૂમની વિગતો અને સુવિધાઓ દાખલ કરો"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 active:scale-95 rounded-xl transition-all text-gray-400 hover:text-navy-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── SCROLLABLE FORM BODY ── */}
        <form onSubmit={submit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
          {err && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <X size={16} className="shrink-0" />
              <span>{err}</span>
            </div>
          )}

          {/* ── ROOM IMAGE UPLOAD ── */}
          <div className="bg-gray-50/70 rounded-2xl p-3.5 sm:p-4 border border-gray-100">
            <label className="label mb-2">રૂમનો ફોટો (Room Photo)</label>
            <div className="flex flex-col sm:flex-row gap-3.5 items-start sm:items-center">
              {form.image ? (
                <div className="relative w-full sm:w-36 h-36 sm:h-24 rounded-2xl overflow-hidden border-2 border-accent shrink-0 shadow-sm group">
                  <img src={form.image} alt="Room Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => set("image", "")}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 active:scale-90 text-white p-1.5 rounded-full shadow-lg transition-all"
                    title="ફોટો હટાવો"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-full sm:w-36 h-28 sm:h-24 rounded-2xl bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 shrink-0">
                  <ImageIcon size={26} className="mb-1 text-gray-400" />
                  <span className="text-[11px] font-medium">કોઈ ફોટો નથી</span>
                </div>
              )}

              <div className="flex-1 w-full space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 active:scale-[0.98] disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                >
                  {uploading ? <Loader size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploading ? "અપલોડ થઈ રહ્યો છે..." : form.image ? "બીજો ફોટો પસંદ કરો" : "ફોન/ગેલેરીમાંથી ફોટો પસંદ કરો"}
                </button>
                <div className="flex gap-2 items-center">
                  <span className="text-[11px] text-gray-400 shrink-0">અથવા URL:</span>
                  <input
                    type="text"
                    value={form.image}
                    onChange={e => set("image", e.target.value)}
                    placeholder="https://... અથવા /uploads/rooms/..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 1: FLOOR & ROOM NUMBER ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label">માળ / Floor *</label>
              <input
                required
                value={form.floor}
                onChange={e => set("floor", e.target.value)}
                placeholder="દા.ત. ગ્રાઉન્ડ, ૧લો, ૨જો..."
                className={inp}
              />
            </div>
            <div>
              <label className="label">રૂમ નંબર / Room Number *</label>
              <input
                required
                value={form.roomNumber}
                onChange={e => set("roomNumber", e.target.value)}
                placeholder="દા.ત. 101, A-02..."
                className={inp}
              />
            </div>
          </div>

          {/* ── ROW 2: TOTAL BEDS & AVAILABLE BEDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="label">કુલ બેડ (Total Beds) *</label>
              <input
                required
                type="number"
                min="1"
                max="20"
                value={form.totalBeds}
                onChange={e => set("totalBeds", Number(e.target.value))}
                className={inp}
              />
            </div>
            <div>
              <label className="label">ખાલી બેડ (Available Beds) *</label>
              <input
                required
                type="number"
                min="0"
                max={form.totalBeds}
                value={form.availableBeds}
                onChange={e => set("availableBeds", Number(e.target.value))}
                className={inp}
              />
            </div>
          </div>

          {/* ── ROW 3: TYPE, RENT & STATUS (RESPONSIVE GRID) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="label">રૂમ પ્રકાર (Type) *</label>
              <select
                required
                value={form.type}
                onChange={e => set("type", e.target.value)}
                className={inp}
              >
                <option value="AC">AC રૂમ</option>
                <option value="Non-AC">Non-AC રૂમ</option>
              </select>
            </div>
            <div>
              <label className="label">માસિક ભાડું (Rent ₹) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">₹</span>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.rent}
                  onChange={e => set("rent", Number(e.target.value))}
                  placeholder="દા.ત. 6000"
                  className={inp + " pl-8"}
                />
              </div>
            </div>
            <div>
              <label className="label">સ્થિતિ (Status)</label>
              <select
                value={form.status}
                onChange={e => set("status", e.target.value)}
                className={inp}
              >
                <option value="Available">Available (ઉપલબ્ધ)</option>
                <option value="Full">Full (સંપૂર્ણ ભરાઈ ગયો)</option>
                <option value="Maintenance">Maintenance (રિપેરિંગ)</option>
              </select>
            </div>
          </div>

          {/* ── DESCRIPTION ── */}
          <div>
            <label className="label">રૂમ વર્ણન (Description)</label>
            <textarea
              value={form.description}
              onChange={e => set("description", e.target.value)}
              rows={2}
              placeholder="રૂમ વિશે વધારાની વિગત (ઓપ્શનલ)..."
              className={inp + " resize-none"}
            />
          </div>

          {/* ── GUJARATI FACILITIES (TAGS & CHIPS) ── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label mb-0">રૂમની સુવિધાઓ (Facilities &amp; Amenities)</label>
              <span className="text-[10px] text-gray-400 font-semibold">
                {form.features.length} પસંદ કરેલ
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
              {COMMON_FEATURES.map(f => {
                const isSelected = form.features.includes(f)
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeature(f)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                      isSelected
                        ? "bg-accent text-white border-accent shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {isSelected && <Check size={11} className="stroke-[3]" />}
                    <span>{f}</span>
                  </button>
                )
              })}
            </div>

            {/* Custom Feature Add Field */}
            <div className="flex gap-2">
              <input
                value={customFeature}
                onChange={e => setCustomFeature(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCustom()
                  }
                }}
                placeholder="અન્ય કોઈ ગુજરાતી સુવિધા ઉમેરો..."
                className={inp + " flex-1"}
              />
              <button
                type="button"
                onClick={addCustom}
                className="px-4 py-2.5 bg-navy-900 active:scale-95 text-white rounded-xl hover:bg-navy-800 transition-colors shrink-0"
                title="ઉમેરો"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Selected Custom Tags */}
            {form.features.filter(f => !COMMON_FEATURES.includes(f)).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {form.features.filter(f => !COMMON_FEATURES.includes(f)).map(f => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 bg-gold/15 border border-gold/40 text-navy-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                  >
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => toggleFeature(f)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* ── STICKY FOOTER ACTION BUTTONS ── */}
        <div className="p-3.5 sm:p-5 border-t border-gray-100 bg-gray-50/80 shrink-0 flex gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 sm:py-3.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 active:scale-[0.98] transition-all text-sm"
          >
            રદ કરો (Cancel)
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={busy || uploading}
            className="flex-1 py-3 sm:py-3.5 rounded-xl bg-accent hover:bg-red-600 disabled:opacity-60 active:scale-[0.98] text-white font-bold transition-all shadow-md shadow-accent/25 text-sm flex items-center justify-center gap-2"
          >
            {busy ? (
              <>
                <Loader size={16} className="animate-spin" />
                <span>સેવ થઈ રહ્યું છે...</span>
              </>
            ) : (
              <span>{room ? "રૂમ અપડેટ કરો" : "રૂમ સેવ કરો"}</span>
            )}
          </button>
        </div>
      </div>

      <style>{`.label { display:block; font-size:11px; font-weight:600; color:#6b7280; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:5px; }`}</style>
    </div>
  )
}
