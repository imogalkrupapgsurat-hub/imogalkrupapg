import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import {
  X, ChevronLeft, ChevronRight, ZoomIn, RefreshCw,
  Image as ImageIcon, Sparkles, Filter, Eye, Maximize2
} from "lucide-react"
import axios from "axios"
import PageWrapper from "../components/PageWrapper"

const CATS = [
  { id: "All",         label: "બધું જુઓ" },
  { id: "Rooms",       label: "રૂમ" },
  { id: "Kitchen",     label: "રસોડું / જમવાનું" },
  { id: "Common Area", label: "કોમન એરિયા" },
  { id: "Building",    label: "બિલ્ડિંગ" },
  { id: "Food",        label: "સુરતી થાળી" },
  { id: "Other",       label: "અન્ય સુવિધાઓ" },
]

const catBadges = {
  Rooms:        { bg: "bg-blue-600/80 text-white",      dot: "bg-blue-300",   name: "રૂમ" },
  Kitchen:      { bg: "bg-amber-600/80 text-white",     dot: "bg-amber-300",  name: "રસોડું" },
  "Common Area":{ bg: "bg-emerald-600/80 text-white",   dot: "bg-emerald-300",name: "કોમન એરિયા" },
  Building:     { bg: "bg-slate-700/80 text-white",     dot: "bg-slate-300",  name: "બિલ્ડિંગ" },
  Food:         { bg: "bg-orange-600/80 text-white",    dot: "bg-orange-300", name: "જમવાનું" },
  Other:        { bg: "bg-purple-600/80 text-white",    dot: "bg-purple-300", name: "અન્ય" },
}

const fallbackGradients = [
  "from-blue-600 to-indigo-800",
  "from-amber-500 to-orange-700",
  "from-emerald-600 to-teal-800",
  "from-rose-500 to-red-700",
  "from-purple-600 to-indigo-900",
  "from-cyan-600 to-blue-800",
]

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [active, setActive] = useState("All")
  const [lightbox, setLightbox] = useState(null)
  const [imgErrors, setImgErrors] = useState({})

  useEffect(() => {
    axios.get("/api/gallery")
      .then(r => setImages(Array.isArray(r.data?.data) ? r.data.data : []))
      .catch(() => setError("ફોટો લોડ કરવામાં અગવડ થઈ છે."))
      .finally(() => setLoading(false))
  }, [])

  const filtered = active === "All"
    ? (images || [])
    : (images || []).filter(i => i.category === active)

  const go = dir => {
    const idx = filtered.findIndex(i => i._id === lightbox._id)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  const handleImgError = id =>
    setImgErrors(prev => ({ ...prev, [id]: true }))

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = e => {
      if (!lightbox) return
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowLeft") go(-1)
      if (e.key === "ArrowRight") go(1)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightbox, filtered])

  return (
    <PageWrapper>
      {/* ── PAGE HERO ── */}
      <section className="bg-navy-900 hero-pattern py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/90 to-navy-900" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 text-xs sm:text-sm mb-3">
            <Link to="/" className="hover:text-gold transition-colors">હોમ</Link>
            <span className="mx-2">›</span> ફોટો ગેલેરી
          </motion.p>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-widest font-semibold px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-3"
          >
            <Sparkles size={13} className="text-gold" /> પધારો! મોગલ કૃપા PG ની એક ઝલક
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-serif tracking-tight"
          >
            અમારી ફોટો ગેલેરી 📸
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed"
          >
            અમારા આરામદાયક રૂમ, ચોખ્ખું રસોડું, બેઠક વ્યવસ્થા અને તમામ સુવિધાઓના તાજા ફોટો જુઓ. સુરતનું સૌથી ચોખ્ખું-ચણાક PG!
          </motion.p>
        </div>
      </section>

      {/* ── STYLISH CATEGORY FILTER TABS ── */}
      <section className="bg-white border-b border-gray-100 py-3.5 px-4 sm:px-6 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none w-full sm:w-auto sm:justify-center">
            {CATS.map(c => {
              const count = c.id === "All" ? images.length : images.filter(i => i.category === c.id).length
              const isSelected = active === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? "bg-accent text-white shadow-md shadow-accent/25 scale-[1.02]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? "bg-white/25 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-500 font-semibold shrink-0">
            <span>કુલ {filtered.length} ફોટા</span>
          </div>
        </div>
      </section>

      {/* ── STYLISH RESPONSIVE GRID ── */}
      <section className="bg-cream py-10 sm:py-16 px-4 sm:px-6 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-28 text-gray-400">
              <RefreshCw size={28} className="animate-spin text-accent mb-3" />
              <p className="text-sm font-semibold">ગેલેરી લોડ થઈ રહી છે...</p>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-24 text-gray-500">
              <ImageIcon size={42} className="mx-auto mb-3 opacity-30 text-accent" />
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <ImageIcon size={48} className="mb-3 opacity-25 text-gray-400" />
              <h3 className="text-lg font-bold text-navy-900 font-serif">આ કેટેગરીમાં હજુ કોઈ ફોટો નથી</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm">
                અન્ય કેટેગરી પસંદ કરો અથવા થોડા સમય બાદ ફરી તપાસ કરો.
              </p>
              <button
                onClick={() => setActive("All")}
                className="mt-4 px-5 py-2 bg-accent text-white text-xs font-semibold rounded-full shadow"
              >
                બધા ફોટો જુઓ
              </button>
            </div>
          )}

          {/* ── ULTRA-STYLISH BENTO / MASONRY GRID ── */}
          {!loading && !error && filtered.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6"
              >
                {filtered.map((img, i) => {
                  const failed = imgErrors[img._id]
                  const grad = fallbackGradients[i % fallbackGradients.length]
                  const badge = catBadges[img.category] || catBadges.Other
                  // Give 1st or occasional image a featured look on large screens if desired
                  const isFeatured = i === 0 && filtered.length >= 4

                  return (
                    <motion.div
                      key={img._id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: Math.min(i * 0.04, 0.4) }}
                      whileHover={{ y: -6 }}
                      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col ${
                        isFeatured ? "md:col-span-2 md:row-span-2" : ""
                      }`}
                      onClick={() => setLightbox(img)}
                    >
                      {/* Image Frame Container */}
                      <div className={`relative w-full overflow-hidden bg-gray-100 ${
                        isFeatured ? "h-64 sm:h-[420px]" : "h-48 sm:h-64"
                      }`}>
                        {!failed ? (
                          <img
                            src={img.url}
                            alt={img.title}
                            loading="lazy"
                            onError={() => handleImgError(img._id)}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
                            <ImageIcon size={32} className="text-white/60" />
                          </div>
                        )}

                        {/* Top floating category badge */}
                        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md backdrop-blur-md ${badge.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.name}
                          </span>
                        </div>

                        {/* Floating Zoom icon on hover */}
                        <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                            <Maximize2 size={13} />
                          </div>
                        </div>

                        {/* Soft Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                        {/* Bottom Card Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white z-10">
                          <p className="font-bold text-xs sm:text-sm font-serif line-clamp-1 group-hover:text-gold transition-colors">
                            {img.title}
                          </p>
                          <p className="text-[10px] text-gray-300 opacity-80 group-hover:opacity-100 transition-opacity mt-0.5 flex items-center gap-1">
                            <Eye size={11} className="text-gold" /> મોટું કરીને જોવા ક્લિક કરો
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── STYLISH FULLSCREEN LIGHTBOX WITH KEYBOARD/TOUCH ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-navy-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 select-none"
            onClick={() => setLightbox(null)}
          >
            {/* Close Button */}
            <button
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full flex items-center justify-center text-white transition-all z-20 shadow-lg border border-white/10"
              onClick={() => setLightbox(null)}
            >
              <X size={22} />
            </button>

            {/* Previous Button */}
            {filtered.length > 1 && (
              <button
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/25 active:scale-95 rounded-full flex items-center justify-center text-white transition-all z-20 shadow-xl border border-white/10"
                onClick={e => { e.stopPropagation(); go(-1) }}
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Modal Image Box */}
            <motion.div
              key={lightbox._id}
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="max-w-5xl max-h-[90vh] flex flex-col items-center gap-3 z-10"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black/40">
                {!imgErrors[lightbox._id] ? (
                  <img
                    src={lightbox.url}
                    alt={lightbox.title}
                    onError={() => handleImgError(lightbox._id)}
                    className="max-w-full max-h-[72vh] sm:max-h-[78vh] object-contain"
                  />
                ) : (
                  <div className={`w-80 sm:w-96 h-64 sm:h-80 bg-gradient-to-br ${fallbackGradients[0]} flex items-center justify-center`}>
                    <ImageIcon size={44} className="text-white/50" />
                  </div>
                )}
              </div>

              {/* Caption and Info Strip */}
              <div className="text-center px-4 max-w-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow ${
                    (catBadges[lightbox.category] || catBadges.Other).bg
                  }`}>
                    {(catBadges[lightbox.category] || catBadges.Other).name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {filtered.findIndex(i => i._id === lightbox._id) + 1} / {filtered.length}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base sm:text-xl font-serif">
                  {lightbox.title}
                </h3>
              </div>
            </motion.div>

            {/* Next Button */}
            {filtered.length > 1 && (
              <button
                aria-label="Next image"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/25 active:scale-95 rounded-full flex items-center justify-center text-white transition-all z-20 shadow-xl border border-white/10"
                onClick={e => { e.stopPropagation(); go(1) }}
              >
                <ChevronRight size={26} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SEE YOU STRIP ── */}
      <section className="bg-navy-900 py-12 px-6 text-center text-white border-t border-navy-800">
        <p className="text-gold text-sm font-semibold mb-1">
          ✦ "આવો રૂબરૂ મુલાકાતે! ચા-પાણી પીતા જજો!" ✦
        </p>
        <p className="text-gray-400 text-xs mt-1">
          મોગલ કૃપા PG, વરાછા, સુરત — આવજો, ફરી પધારજો!
        </p>
      </section>
    </PageWrapper>
  )
}
