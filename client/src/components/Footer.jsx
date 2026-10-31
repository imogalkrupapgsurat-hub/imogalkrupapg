import { Link } from "react-router-dom"
import { Home, Phone, MapPin, Mail, Clock } from "lucide-react"
import { useContent } from "../context/ContentContext"

const quickLinks = [
  { to:"/",        label:"હોમ" },
  { to:"/about",   label:"અમારા વિશે" },
  { to:"/rooms",   label:"રૂમ જુઓ" },
  { to:"/food",    label:"ફૂડ કોર્ટ" },
  { to:"/gallery", label:"ગેલેરી" },
  { to:"/contact", label:"સંપર્ક કરો" },
]

export default function Footer() {
  const { content } = useContent()
  const phoneNum = content.phone || "+91 63547 97745"
  const cleanPhone = phoneNum.replace(/[^0-9+]/g, "")
  const emailAddr = content.email || "mogalkrupapg@gmail.com"
  const addressTxt = content.address || "વર્ષા રોડ, માતાવાડી, વર્ષા સોસાયટી ૧, અંબાવાડી, વરાછા, સુરત – ૩૯૫૦૧૦"

  return (
    <footer className="bg-navy-900 text-gray-400 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-accent p-1.5 rounded-lg"><Home size={18} className="text-white" /></div>
            <span className="font-bold text-white font-serif text-lg">મોગલ કૃપા PG</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            સુરતનું ભરોસાપાત્ર PG — આરામદાયક રૂમ, ઘર જેવું ગુજરાતી જમવાનું, અને ૨૪/૭ સુરક્ષા. તમારું બીજું ઘર! 🏠
          </p>
          <p className="text-xs text-gold font-semibold">{content.seeYouLine || "✦ ફરી પધારજો! ✦"}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">ઝડપી લિંક્સ</h4>
          <div className="space-y-2.5">
            {quickLinks.map(l => (
              <Link key={l.to} to={l.to} className="block text-sm hover:text-gold transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">સંપર્ક</h4>
          <div className="space-y-3 text-sm">
            <a href={`tel:${cleanPhone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone size={14} className="text-gold shrink-0" /> {phoneNum}
            </a>
            <a href={`mailto:${emailAddr}`} className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail size={14} className="text-gold shrink-0" /> {emailAddr}
            </a>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
              <span>{addressTxt}</span>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">ઓફિસ સમય</h4>
          <div className="space-y-2.5 text-sm whitespace-pre-line">
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-gold shrink-0 mt-0.5" />
              <span>{content.officeHours || "સોમ–શનિ: સવારે ૮ – રાત્રે ૧૦\nરવિવાર: સવારે ૯ – સાંજે ૮"}</span>
            </div>
          </div>
          <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-xs text-gold font-semibold mb-1">🙏 {content.welcomeLine || "આવો, પધારો!"}</p>
            <p className="text-xs leading-relaxed">અમે હંમેશા તમારી સેવામાં હાજર છીએ.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 text-center text-xs">
        <p>© {new Date().getFullYear()} મોગલ કૃપા PG. બધા હક સુરક્ષિત. | સુરત, ગુજરાત 🇮🇳</p>
      </div>
    </footer>
  )
}
