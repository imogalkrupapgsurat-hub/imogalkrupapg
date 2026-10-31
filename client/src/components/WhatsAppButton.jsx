import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/916354797745" target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30" />
        <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all">
          <MessageCircle size={26} />
        </div>
      </div>
      <div className="absolute bottom-full right-0 mb-2 bg-navy-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        WhatsApp પર વાત કરો 💬
      </div>
    </a>
  )
}
