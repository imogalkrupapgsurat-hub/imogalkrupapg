import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import {
  Upload, Trash2, X, ImagePlus, RefreshCw,
  AlertTriangle, Tag, FolderOpen, CheckCircle, Image, Cloud
} from "lucide-react"

const CATEGORIES = [
  { id:"Rooms",        label:"રૂમ (Rooms)" },
  { id:"Kitchen",      label:"રસોડું (Kitchen)" },
  { id:"Common Area",  label:"કોમન એરિયા" },
  { id:"Building",     label:"બિલ્ડિંગ (Building)" },
  { id:"Food",         label:"જમવાનું (Food)" },
  { id:"Other",        label:"અન્ય (Other)" },
]

const catColors = {
  Rooms:        "bg-blue-100 text-blue-700",
  Kitchen:      "bg-amber-100 text-amber-700",
  "Common Area":"bg-green-100 text-green-700",
  Building:     "bg-slate-100 text-slate-700",
  Food:         "bg-orange-100 text-orange-700",
  Other:        "bg-purple-100 text-purple-700",
}

export default function GalleryManager({ showToast }) {
  const [images,   setImages]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState("All")
  const [delId,    setDelId]    = useState(null)
  const [uploading,setUploading]= useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [preview,  setPreview]  = useState([])
  const [editId,   setEditId]   = useState(null)
  const [editData, setEditData] = useState({ title:"", category:"Other" })
  const [cldInfo,  setCldInfo]  = useState({ isCloudinary: false, cloudName: "" })
  const fileRef = useRef()

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      const r = await axios.get("/api/gallery")
      setImages(r.data.data)
      const cld = await axios.get("/api/gallery/cloudinary-status")
      if (cld.data?.success) setCldInfo(cld.data)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchImages() }, [fetchImages])

  const onDrop = e => {
    e.preventDefault(); setDragOver(false)
    addFiles(Array.from(e.dataTransfer.files))
  }
  const onFileChange = e => addFiles(Array.from(e.target.files))
  const addFiles = files => {
    const imgs = files.filter(f => f.type.startsWith("image/"))
    const newPreviews = imgs.map(f => ({
      file: f,
      title: f.name.replace(/\.[^.]+$/, ""),
      category: "Other",
      objectUrl: URL.createObjectURL(f),
    }))
    setPreview(prev => [...prev, ...newPreviews])
  }
  const removePreview = idx => {
    setPreview(prev => {
      URL.revokeObjectURL(prev[idx].objectUrl)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const uploadAll = async () => {
    if (preview.length === 0) return
    setUploading(true)
    let ok = 0
    for (const item of preview) {
      try {
        const fd = new FormData()
        fd.append("image",    item.file)
        fd.append("title",    item.title)
        fd.append("category", item.category)
        await axios.post("/api/gallery/upload", fd)
        ok++
      } catch { /* continue */ }
    }
    setUploading(false)
    setPreview([])
    showToast(`${ok} ફોટા સફળતાપૂર્વક અપલોડ થયા!`)
    fetchImages()
  }

  const deleteImage = async id => {
    await axios.delete(`/api/gallery/${id}`)
    setDelId(null)
    showToast("ફોટો ડિલીટ કરવામાં આવ્યો!", "error")
    fetchImages()
  }

  const openEdit = img => {
    setEditId(img._id)
    setEditData({ title: img.title, category: img.category })
  }
  const saveEdit = async () => {
    await axios.put(`/api/gallery/${editId}`, editData)
    setEditId(null)
    showToast("ફોટો વિગત અપડેટ થઈ!")
    fetchImages()
  }

  const filtered = filter === "All" ? images : images.filter(i => i.category === filter)

  return (
    <div className="space-y-6">

      {/* ── UPLOAD ZONE ── */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`bg-white rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragOver ? "border-accent bg-accent/5 scale-[1.01]" : "border-gray-200 hover:border-gold"
        }`}>
        <input ref={fileRef} type="file" multiple accept="image/*" onChange={onFileChange} className="hidden" />

        <div className="flex justify-center mb-3">
          {cldInfo.isCloudinary ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <Cloud size={13} className="text-blue-500" /> Cloudinary ક્લાઉડ સક્રિય છે ({cldInfo.cloudName || "Active"}) ☁️
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <Cloud size={13} className="text-amber-500" /> Cloudinary સેટઅપ: .env ફાઇલમાં કી સેટ કરો
            </span>
          )}
        </div>

        <div className="w-14 h-14 bg-navy-900/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-navy-900">
          <ImagePlus size={28} className="text-accent" />
        </div>

        <p className="font-bold text-navy-900 font-serif text-lg mb-1">
          ગેલેરી માટે ફોટો અહીં ખેંચીને મૂકો (Drag &amp; Drop)
        </p>
        <p className="text-gray-400 text-xs mb-4">JPG, PNG, WebP ફોર્મેટ સપોર્ટેડ છે</p>

        <button
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors">
          <FolderOpen size={14} /> કોમ્પ્યુટરમાંથી પસંદ કરો
        </button>
      </div>

      {/* ── PREVIEW QUEUE ── */}
      {preview.length > 0 && (
        <motion.div initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-navy-900 text-sm font-serif">
              અપલોડ કરવા માટે તૈયાર ફોટો ({preview.length})
            </h4>
            <button
              onClick={uploadAll}
              disabled={uploading}
              className="flex items-center gap-2 bg-accent hover:bg-red-600 disabled:opacity-50 text-white font-semibold text-xs px-5 py-2 rounded-xl transition-colors">
              {uploading ? <RefreshCw size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploading ? "અપલોડ થઈ રહ્યા છે..." : `બધા (${preview.length}) ફોટો અપલોડ કરો`}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {preview.map((p, idx) => (
              <div key={idx} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100 relative group">
                <img src={p.objectUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <input
                    value={p.title}
                    onChange={e => {
                      const v = e.target.value
                      setPreview(prev => prev.map((x,i) => i===idx ? {...x, title:v} : x))
                    }}
                    placeholder="ફોટોનું શીર્ષક"
                    className="w-full text-xs font-semibold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-gold"
                  />
                  <select
                    value={p.category}
                    onChange={e => {
                      const v = e.target.value
                      setPreview(prev => prev.map((x,i) => i===idx ? {...x, category:v} : x))
                    }}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <button onClick={() => removePreview(idx)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── FILTER & STATS ROW ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {[{ id:"All", label:"બધા જ (All)" }, ...CATEGORIES].map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === c.id ? "bg-accent text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}>
              {c.label} {c.id !== "All" && `(${images.filter(i => i.category === c.id).length})`}
            </button>
          ))}
        </div>
        <button onClick={fetchImages} className="p-2.5 bg-white border border-gray-100 hover:bg-gray-50 rounded-xl text-gray-500 transition-colors shrink-0" title="રીફ્રેશ કરો">
          <RefreshCw size={14} />
        </button>
      </div>

      {/* ── IMAGES GRID ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw size={22} className="animate-spin mr-2" /> ગેલેરી લોડ થઈ રહી છે...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <Image size={38} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">કોઈ ફોટો મળ્યા નથી</p>
          <p className="text-xs mt-1 text-gray-400">ઉપરથી નવા ફોટો અપલોડ કરો</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(img => (
            <motion.div key={img._id} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group relative flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => openEdit(img)}
                    className="p-2 bg-white/90 hover:bg-white text-navy-900 rounded-xl transition-all shadow">
                    <Tag size={13} />
                  </button>
                  <button onClick={() => setDelId(img._id)}
                    className="p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-xl transition-all shadow">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-navy-900 truncate">{img.title}</p>
                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${catColors[img.category] || catColors.Other}`}>
                  {CATEGORIES.find(c => c.id === img.category)?.label || img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      <AnimatePresence>
        {editId && (
          <div className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-navy-900 font-serif">ફોટો વિગત બદલો</h3>
                <button onClick={() => setEditId(null)}><X size={16} /></button>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">શીર્ષક (Title)</label>
                <input
                  value={editData.title}
                  onChange={e => setEditData(d => ({ ...d, title: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">કેટેગરી (Category)</label>
                <select
                  value={editData.category}
                  onChange={e => setEditData(d => ({ ...d, category: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setEditId(null)} className="flex-1 py-2 border rounded-xl text-xs font-semibold">રદ કરો</button>
                <button onClick={saveEdit} className="flex-1 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-red-600">સેવ કરો</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DELETE MODAL ── */}
      <AnimatePresence>
        {delId && (
          <div className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-7 max-w-sm w-full text-center shadow-2xl">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={26} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2 font-serif">ફોટો ડિલીટ કરવો છે?</h3>
              <p className="text-gray-500 text-sm mb-6">આ ફોટો ગેલેરીમાંથી હંમેશ માટે દૂર થશે.</p>
              <div className="flex gap-3">
                <button onClick={() => setDelId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50">રદ કરો</button>
                <button onClick={() => deleteImage(delId)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold">હા, ડિલીટ કરો</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
