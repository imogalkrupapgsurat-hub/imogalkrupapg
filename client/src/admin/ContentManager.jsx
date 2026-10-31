import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Save, RefreshCw, Sparkles, Home, BookOpen, Utensils, Phone, CheckCircle2 } from "lucide-react"
import { useContent } from "../context/ContentContext"

export default function ContentManager({ showToast }) {
  const { content: globalContent, refreshContent } = useContent()
  const [form, setForm] = useState(globalContent)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    setForm(globalContent)
  }, [globalContent])

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setSaving(true)
    try {
      const res = await axios.put("/api/content", form)
      if (res.data?.success) {
        showToast("વેબસાઇટ કન્ટેન્ટ સફળતાપૂર્વક સેવ થયું! 🎉")
        refreshContent()
      }
    } catch (err) {
      showToast(err.response?.data?.message || "સેવ કરવામાં ભૂલ થઈ", "error")
    } finally {
      setSaving(false)
    }
  }

  const inp = "w-full bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
  const textarea = "w-full bg-gray-50 border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-y"

  const tabs = [
    { id: "home",    label: "હોમ પેજ & આવકાર", icon: Home },
    { id: "about",   label: "અમારા વિશે",      icon: BookOpen },
    { id: "food",    label: "ફૂડ કોર્ટ",       icon: Utensils },
    { id: "contact", label: "સંપર્ક માહિતી",    icon: Phone },
  ]

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-navy-900 flex items-center gap-2">
            <Sparkles className="text-gold" size={22} />
            વેબસાઇટ કન્ટેન્ટ મેનેજર (ગુજરાતી)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            અહીંથી તમે વેબસાઇટ પર દેખાતા તમામ ગુજરાતી લખાણ, આવકાર/વિદાયના શબ્દો અને સુરતી સૂત્રો બદલી શકો છો.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm shrink-0">
          {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
          {saving ? "સેવ થઈ રહ્યું છે..." : "કન્ટેન્ટ સેવ કરો"}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === t.id
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}>
            <t.icon size={16} className={activeTab === t.id ? "text-gold" : "text-gray-400"} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Form Content Based On Tab */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {activeTab === "home" && (
          <div className="space-y-5">
            <h3 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3 flex items-center gap-2">
              <Home size={18} className="text-accent" /> હોમ પેજ હેડલાઇન્સ અને આવકારના શબ્દો
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  ટોપ બેજ / વેલકમ ટેગલાઇન
                </label>
                <input
                  value={form.heroBadge || ""}
                  onChange={e => set("heroBadge", e.target.value)}
                  placeholder="દા.ત. ✦ પધારો, મોગલ કૃપા PG માં ✦"
                  className={inp}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  મુખ્ય આવકાર પંક્તિ (Welcome Line)
                </label>
                <input
                  value={form.welcomeLine || ""}
                  onChange={e => set("welcomeLine", e.target.value)}
                  placeholder="દા.ત. ✦ પધારો! સુરતનું પોતાનું PG ✦"
                  className={inp}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  મુખ્ય હેડિંગ લાઇન ૧ (Main Heading Line 1)
                </label>
                <input
                  value={form.heroTitleLine1 || ""}
                  onChange={e => set("heroTitleLine1", e.target.value)}
                  placeholder="દા.ત. તમારું બીજું"
                  className={inp}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  મુખ્ય હેડિંગ લાઇન ૨ (Main Heading Line 2)
                </label>
                <input
                  value={form.heroTitleLine2 || ""}
                  onChange={e => set("heroTitleLine2", e.target.value)}
                  placeholder="દા.ત. ઘર, સુરતમાં 🏠"
                  className={inp}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                હેડિંગ સબટાઇટલ (Hero Subtitle)
              </label>
              <textarea
                rows={2}
                value={form.heroSubtitle || ""}
                onChange={e => set("heroSubtitle", e.target.value)}
                placeholder="દા.ત. આરામદાયક રહેવાનું · ઘર જેવું જમવાનું · ૨૪/૭ સુરક્ષા"
                className={textarea}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  સ્થળ અને સુરતી લહેકો (Location & Surti Touch)
                </label>
                <input
                  value={form.heroLocation || ""}
                  onChange={e => set("heroLocation", e.target.value)}
                  placeholder="દા.ત. વરાછા, સુરત, ગુજરાત · કેમ છો? મજામાં! 😊"
                  className={inp}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  વિદાય પંક્તિ (See You Line)
                </label>
                <input
                  value={form.seeYouLine || ""}
                  onChange={e => set("seeYouLine", e.target.value)}
                  placeholder="દા.ત. ✦ આવજો! ફરી પધારજો! ✦"
                  className={inp}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-5">
            <h3 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-accent" /> અમારા વિશે પેજ કન્ટેન્ટ (About Page Content)
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                પેજ હેડિંગ (Page Heading)
              </label>
              <input
                value={form.aboutHeading || ""}
                onChange={e => set("aboutHeading", e.target.value)}
                placeholder="દા.ત. અમારા વિશે જાણો"
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                વાર્તા / શીર્ષક (Story Title)
              </label>
              <input
                value={form.aboutStoryTitle || ""}
                onChange={e => set("aboutStoryTitle", e.target.value)}
                placeholder='દા.ત. "કેમ છો? મજામાં!" — સુરતની ધરા પર તમારું ઉષ્માભર્યું સ્વાગત છે'
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                અમારા વિશે પરિચ્છેદ ૧ (Paragraph 1)
              </label>
              <textarea
                rows={4}
                value={form.aboutStoryPara1 || ""}
                onChange={e => set("aboutStoryPara1", e.target.value)}
                className={textarea}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                અમારા વિશે પરિચ્છેદ ૨ (Paragraph 2)
              </label>
              <textarea
                rows={3}
                value={form.aboutStoryPara2 || ""}
                onChange={e => set("aboutStoryPara2", e.target.value)}
                className={textarea}
              />
            </div>
          </div>
        )}

        {activeTab === "food" && (
          <div className="space-y-5">
            <h3 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3 flex items-center gap-2">
              <Utensils size={18} className="text-accent" /> ફૂડ કોર્ટ અને સુરતી સ્વાદ (Food Court & Slogans)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  ફૂડ કોર્ટ હેડિંગ
                </label>
                <input
                  value={form.foodCourtHeading || ""}
                  onChange={e => set("foodCourtHeading", e.target.value)}
                  placeholder="દા.ત. અમારું ફૂડ કોર્ટ 🍛"
                  className={inp}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  સુરતી કહેવત / સ્લોગન
                </label>
                <input
                  value={form.surtiSlogan || ""}
                  onChange={e => set("surtiSlogan", e.target.value)}
                  placeholder="દા.ત. સુરતનું જમણ અને કાશીનું મરણ"
                  className={inp}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                જમણ ટેગલાઇન (Meal Tagline)
              </label>
              <input
                value={form.foodCourtTagline || ""}
                onChange={e => set("foodCourtTagline", e.target.value)}
                placeholder="દા.ત. માતાના હાથના સ્વાદ જેવું મીઠું જમણ 🏠"
                className={inp}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                ફૂડ કોર્ટ વર્ણન (Description)
              </label>
              <textarea
                rows={4}
                value={form.foodCourtDesc || ""}
                onChange={e => set("foodCourtDesc", e.target.value)}
                className={textarea}
              />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-5">
            <h3 className="font-bold text-navy-900 text-base border-b border-gray-100 pb-3 flex items-center gap-2">
              <Phone size={18} className="text-accent" /> સંપર્ક માહિતી અને સરનામું (Contact & Address)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  ફોન નંબર (Phone)
                </label>
                <input
                  value={form.phone || ""}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="+91 63547 97745"
                  className={inp}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  વોટ્સએપ નંબર (WhatsApp No.)
                </label>
                <input
                  value={form.whatsapp || ""}
                  onChange={e => set("whatsapp", e.target.value)}
                  placeholder="916354797745"
                  className={inp}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  ઈમેલ (Email)
                </label>
                <input
                  value={form.email || ""}
                  onChange={e => set("email", e.target.value)}
                  placeholder="mogalkrupapg@gmail.com"
                  className={inp}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                સરનામું (Full Address)
              </label>
              <textarea
                rows={2}
                value={form.address || ""}
                onChange={e => set("address", e.target.value)}
                placeholder="વર્ષા રોડ, માતાવાડી, સુરત..."
                className={textarea}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                ઓફિસ સમય (Office Hours)
              </label>
              <textarea
                rows={2}
                value={form.officeHours || ""}
                onChange={e => set("officeHours", e.target.value)}
                placeholder="સોમ–શનિ: સવારે ૮ – રાત્રે ૧૦..."
                className={textarea}
              />
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            અહીં સેવ કરેલી વિગતો વેબસાઇટ પર તરત જ લાઈવ દેખાશે.
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-accent hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-7 py-3 rounded-xl shadow-md transition-all text-sm">
            {saving ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
            {saving ? "સેવિંગ..." : "બધા ફેરફારો સેવ કરો"}
          </button>
        </div>
      </div>
    </div>
  )
}
