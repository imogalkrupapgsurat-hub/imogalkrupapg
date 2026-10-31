import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import {
  X, User, Phone, Mail, Calendar, MessageSquare,
  Send, Loader, CheckCircle, BedDouble, MapPin,
  IndianRupee, Users, MessageCircle, Eye, ZoomIn
} from "lucide-react"

const ADMIN_WHATSAPP = "916354797745"

function buildWhatsAppMessage(booking, room) {
  return encodeURIComponent(
`🏠 *નવી રૂમ બુકિંગ વિનંતી — મોગલ કૃપા PG*
━━━━━━━━━━━━━━━━━━━━
📋 *રૂમની વિગત*
• રૂમ નંબર   : ${room.roomNumber}
• માળ        : ${room.floor}
• પ્રકાર      : ${room.type} રૂમ
• ભાડું       : ₹${Number(room.rent).toLocaleString()}/મહિને
• બેડ ક્ષમતા : ${room.totalBeds} બેડ

👤 *મહેમાનની વિગત*
• નામ       : ${booking.name}
• ફોન નંબર   : ${booking.phone}
• ઈમેલ      : ${booking.email || "આપેલ નથી"}
• રહેવા આવવાની તારીખ : ${booking.moveInDate || "નક્કી નથી"}
• સંદેશ      : ${booking.message || "કોઈ ખાસ સંદેશ નથી"}
━━━━━━━━━━━━━━━━━━━━
પધારો! કૃપા કરીને બુકિંગ કન્ફર્મ કરશો જી. 🙏`)
}

export default function BookingModal({ room, onClose }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", moveInDate: "", message: ""
  })
  const [step, setStep] = useState("form")
  const [err, setErr] = useState("")
  const [showPhoto, setShowPhoto] = useState(false)

  const roomImage = room.image || (room.images && room.images[0])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inp = "w-full bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400"

  const submit = async e => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setErr("નામ અને મોબાઈલ નંબર ફરજિયાત છે."); return
    }
    setErr(""); setStep("loading")

    const payload = {
      roomId:     room._id,
      roomNumber: room.roomNumber,
      floor:      room.floor,
      roomType:   room.type,
      rent:       room.rent,
      ...form,
    }

    try {
      await axios.post("/api/booking", payload)
      const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${buildWhatsAppMessage(form, room)}`
      window.open(waUrl, "_blank", "noopener,noreferrer")
      setStep("success")
    } catch (ex) {
      setErr(ex.response?.data?.message || "કંઈક ક્ષતિ થઈ. કૃપા કરીને સીધો ફોન કરો.")
      setStep("form")
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col"
          onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className={`px-6 py-5 flex items-center justify-between shrink-0 bg-gradient-to-br ${
            room.type === "AC" ? "from-blue-500 to-indigo-700" : "from-amber-500 to-orange-600"
          }`}>
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">રૂમ બુકિંગ વિનંતી</p>
              <h2 className="text-white font-bold text-xl sm:text-2xl font-serif">રૂમ નંબર {room.roomNumber}</h2>
              <p className="text-white/90 text-sm">{room.floor} માળ · {room.type} રૂમ · ₹{Number(room.rent).toLocaleString()}/મહિને</p>
            </div>
            <button onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
              aria-label="બંધ કરો">
              <X size={20}/>
            </button>
          </div>

          {/* Quick info strip */}
          <div className="flex items-center gap-4 sm:gap-6 px-5 sm:px-6 py-2.5 bg-gray-50 border-b border-gray-100 text-xs text-gray-600 font-semibold shrink-0">
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-accent"/> {room.floor} માળ</span>
            <span className="flex items-center gap-1.5"><Users size={12} className="text-accent"/> {room.availableBeds}/{room.totalBeds} બેડ ખાલી</span>
            <span className="flex items-center gap-1.5"><IndianRupee size={12} className="text-accent"/> ₹{Number(room.rent).toLocaleString()}/મહિને</span>
          </div>

          {/* Clickable Image Strip if room has photo */}
          {roomImage && (
            <div
              onClick={() => setShowPhoto(true)}
              className="mx-5 sm:mx-6 mt-4 p-2.5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50/50 border border-amber-200 hover:border-accent rounded-2xl flex items-center justify-between cursor-pointer transition-all group shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-300 shadow-sm bg-navy-950">
                  <img
                    src={roomImage}
                    alt={`રૂમ ${room.roomNumber}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <ZoomIn size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-navy-900 group-hover:text-accent transition-colors">
                      રૂમ નંબર {room.roomNumber} નો ફોટો
                    </p>
                    <span className="text-[10px] bg-accent text-white font-bold px-2 py-0.5 rounded-full shadow-sm">
                      ક્લિક કરો
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    ફોટો મોટો જોવા માટે અહીં ક્લિક કરો 🔍
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-accent text-xs font-semibold px-2 py-1 rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-white transition-colors">
                <Eye size={13} />
                <span>જુઓ</span>
              </div>
            </div>
          )}

          <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* SUCCESS STATE */}
          {step === "success" && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500"/>
              </div>
              <h3 className="text-xl font-bold text-navy-900 font-serif mb-2">બુકિંગ સફળતાપૂર્વક નોંધાયું! 🎉</h3>
              <p className="text-gray-600 text-sm mb-1">તમારી રૂમ બુકિંગ વિનંતી સેવ થઈ ગઈ છે.</p>
              <p className="text-gray-500 text-xs mb-6">અને <strong className="text-green-600">WhatsApp</strong> પર તમામ વિગતો સાથે મેસેજ ખૂલી ગયો છે.</p>

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-left mb-6">
                <p className="text-green-800 text-xs font-semibold mb-2">📋 હવે આગળ શું થશે?</p>
                <ul className="space-y-1.5 text-green-700 text-xs">
                  <li>• એડમિનને તમારો WhatsApp મેસેજ તરત મળી જશે</li>
                  <li>• તેઓ તમને થોડી જ વારમાં સામેથી કોલ કે મેસેજ કરશે</li>
                  <li>• વાતચીત બાદ તમારો બેડ કન્ફર્મ થઈ જશે</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <a href={`https://wa.me/${ADMIN_WHATSAPP}`} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                  <MessageCircle size={16}/> WhatsApp પર વાત કરો
                </a>
                <button onClick={onClose}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  બંધ કરો
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-5">✦ આવજો! મોગલ કૃપા PG માં તમારું સ્વાગત છે! ✦</p>
            </motion.div>
          )}

          {/* FORM STATE */}
          {(step === "form" || step === "loading") && (
            <form onSubmit={submit} className="space-y-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                કૃપા કરીને નીચે તમારી માહિતી ભરો. સબમિટ કરતાં જ <span className="text-green-600 font-semibold">WhatsApp</span> પર રૂમની વિગતો સાથે મેસેજ જશે જેથી એડમિન તરત કન્ફર્મ કરી શકે.
              </p>

              {err && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {err}
                </div>
              )}

              {/* Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 block">
                    પૂરું નામ *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"/>
                    <input required value={form.name} onChange={e => set("name", e.target.value)}
                      placeholder="તમારું નામ" className={inp + " pl-9"}/>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 block">
                    મોબાઈલ નંબર *
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"/>
                    <input required value={form.phone} onChange={e => set("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX" className={inp + " pl-9"}/>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 block">ઈમેલ એડ્રેસ</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"/>
                  <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                    placeholder="your@email.com" className={inp + " pl-9"}/>
                </div>
              </div>

              {/* Move-in date */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 block">
                  રહેવા આવવાની અંદાજિત તારીખ
                </label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300"/>
                  <input type="date" value={form.moveInDate} onChange={e => set("moveInDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={inp + " pl-9"}/>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5 block">
                  ખાસ કોઈ જરૂરિયાત કે પ્રશ્ન
                </label>
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-gray-300"/>
                  <textarea value={form.message} onChange={e => set("message", e.target.value)}
                    rows={3} placeholder="દા.ત. હું સુરતમાં અભ્યાસ કરું છું..."
                    className={inp + " pl-9 resize-none"}/>
                </div>
              </div>

              {/* WhatsApp notification note */}
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-3.5">
                <MessageCircle size={18} className="text-green-500 shrink-0 mt-0.5"/>
                <div>
                  <p className="text-green-800 text-xs font-bold mb-0.5">સીધું વોટ્સએપ નોટિફિકેશન</p>
                  <p className="text-green-700 text-xs leading-relaxed">
                    બટન દબાવ્યા પછી વોટ્સએપ ખૂલશે, જેમાં બધી વિગતો આપોઆપ લખાઈ જશે. બસ <strong>સેન્ડ (Send)</strong> દબાવી દેજો.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={step === "loading"}
                className="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all text-base shadow-lg shadow-green-500/30">
                {step === "loading"
                  ? <><Loader size={18} className="animate-spin"/> સેવ કરી WhatsApp ખોલી રહ્યા છીએ...</>
                  : <><MessageCircle size={18}/> બુક કરો અને WhatsApp પર મોકલો</>
                }
              </button>

              <p className="text-center text-xs text-gray-400">
                અથવા સીધો ફોન કરો: <a href="tel:+916354797745" className="text-accent font-semibold">+91 63547 97745</a>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>

    {/* Full Screen Photo Lightbox when user clicks on room image */}
    <AnimatePresence>
      {showPhoto && roomImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowPhoto(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/60 flex items-center justify-center">
              <img
                src={roomImage}
                alt={`રૂમ નંબર ${room.roomNumber}`}
                className="max-w-full max-h-[75vh] sm:max-h-[82vh] object-contain rounded-2xl"
              />
              <button
                onClick={() => setShowPhoto(false)}
                className="absolute top-3 right-3 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-xl"
                aria-label="બંધ કરો"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mt-3 px-4">
              <h3 className="text-white font-bold text-lg sm:text-xl font-serif">
                રૂમ નંબર {room.roomNumber} ({room.type} રૂમ)
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm mt-0.5">
                {room.floor} માળ · ₹{Number(room.rent).toLocaleString()}/મહિને · {room.availableBeds}/{room.totalBeds} બેડ ખાલી
              </p>
              <button
                onClick={() => setShowPhoto(false)}
                className="mt-2.5 text-xs text-gold hover:text-white underline font-semibold transition-colors"
              >
                ← પાછા બુકિંગ ફોર્મ પર જાઓ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
