import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import {
  Calendar, Phone, Mail, User, CheckCircle, Clock,
  XCircle, Trash2, RefreshCw, AlertTriangle, MessageCircle,
  BedDouble, Search, Filter
} from "lucide-react"

const statusBadge = {
  Pending:   "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-green-100 text-green-700 border-green-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
}
const statusLabels = {
  Pending:   "પેન્ડિંગ (Pending)",
  Confirmed: "કન્ફર્મ (Confirmed)",
  Cancelled: "રદ થયેલ (Cancelled)",
}

export default function BookingManager({ showToast }) {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState("All")
  const [search,   setSearch]   = useState("")
  const [delId,    setDelId]    = useState(null)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const r = await axios.get("/api/booking")
      setBookings(Array.isArray(r.data?.data) ? r.data.data : [])
    } catch (err) {
      showToast(err.response?.data?.message || "બુકિંગ મેળવવામાં ભૂલ થઈ", "error")
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/booking/${id}`, { status })
      showToast(`બુકિંગ ${status==="Confirmed"?"કન્ફર્મ":status==="Cancelled"?"રદ":"પેન્ડિંગ"} તરીકે માર્ક થયું!`)
      fetchBookings()
    } catch {
      showToast("સ્ટેટસ અપડેટ કરવામાં ક્ષતિ થઈ", "error")
    }
  }

  const deleteBooking = async id => {
    try {
      await axios.delete(`/api/booking/${id}`)
      setDelId(null)
      showToast("બુકિંગ રેકોર્ડ ડિલીટ થયો!", "error")
      fetchBookings()
    } catch {
      showToast("ડિલીટ કરવામાં ભૂલ થઈ", "error")
    }
  }

  const filtered = bookings
    .filter(b => filter === "All" || b.status === filter)
    .filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.toLowerCase().includes(search.toLowerCase()) ||
      b.roomNumber.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-bold text-navy-900 font-serif text-lg">રૂમ બુકિંગ વિનંતીઓ (Room Bookings)</h3>
          <p className="text-gray-400 text-xs mt-0.5">
            કુલ {bookings.length} બુકિંગ્સ · {bookings.filter(b=>b.status==="Pending").length} બાકી (પેન્ડિંગ)
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchBookings} className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors" title="રીફ્રેશ કરો">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="મહેમાનનું નામ, મોબાઈલ અથવા રૂમ નંબર શોધો..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-gold transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "All", label: "બધા જ (All)" },
            { id: "Pending", label: "પેન્ડિંગ (Pending)" },
            { id: "Confirmed", label: "કન્ફર્મ થયેલ (Confirmed)" },
            { id: "Cancelled", label: "રદ થયેલ (Cancelled)" },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setFilter(st.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === st.id ? "bg-accent text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <RefreshCw size={22} className="animate-spin mr-2" /> બુકિંગ્સ લોડ થઈ રહ્યા છે...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <Calendar size={40} className="mx-auto mb-3 opacity-25" />
          <p className="font-semibold">કોઈ બુકિંગ મળ્યા નથી</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((b, i) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      રૂમ નં. {b.roomNumber} ({b.roomType || "Standard"} રૂમ)
                    </span>
                    <h4 className="font-bold text-navy-900 text-lg font-serif">{b.name}</h4>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadge[b.status] || statusBadge.Pending}`}>
                    {statusLabels[b.status] || b.status}
                  </span>
                </div>

                {/* Info List */}
                <div className="space-y-1.5 text-xs text-gray-600 mb-4 bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-gray-400 shrink-0" />
                    <a href={`tel:${b.phone}`} className="font-semibold hover:text-accent">{b.phone}</a>
                    <a
                      href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[11px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md hover:bg-green-100"
                    >
                      <MessageCircle size={12} /> WhatsApp
                    </a>
                  </div>

                  {b.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="text-gray-400 shrink-0" />
                      <span>{b.email}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-gray-400 shrink-0" />
                    <span>આવવાની તારીખ: <strong>{b.moveInDate || "નક્કી નથી"}</strong></span>
                  </div>

                  {b.rent && (
                    <div className="flex items-center gap-2">
                      <BedDouble size={13} className="text-gray-400 shrink-0" />
                      <span>માસિક ભાડું: <strong>₹{Number(b.rent).toLocaleString()}/મહિને</strong></span>
                    </div>
                  )}

                  {b.message && (
                    <div className="mt-2 pt-2 border-t border-gray-200 text-gray-500 italic">
                      "{b.message}"
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
                <div className="flex gap-1.5">
                  {b.status !== "Confirmed" && (
                    <button
                      onClick={() => updateStatus(b._id, "Confirmed")}
                      className="px-3 py-1.5 bg-green-50 hover:bg-green-500 text-green-700 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <CheckCircle size={12} /> કન્ફર્મ કરો
                    </button>
                  )}
                  {b.status !== "Cancelled" && (
                    <button
                      onClick={() => updateStatus(b._id, "Cancelled")}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <XCircle size={12} /> રદ કરો
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setDelId(b._id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="ડિલીટ કરો"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
                <AlertTriangle size={26} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2 font-serif">બુકિંગ રેકોર્ડ ડિલીટ કરવો છે?</h3>
              <p className="text-gray-500 text-sm mb-6">આ રેકોર્ડ હંમેશ માટે દૂર થશે.</p>
              <div className="flex gap-3">
                <button onClick={() => setDelId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50">રદ કરો</button>
                <button onClick={() => deleteBooking(delId)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold">હા, ડિલીટ કરો</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
