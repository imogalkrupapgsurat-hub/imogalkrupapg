import { createContext, useContext, useState, useEffect, useCallback } from "react"
import axios from "axios"

const defaultContent = {
  heroBadge:       "✦ પધારો, મોગલ કૃપા PG માં ✦",
  heroTitleLine1:  "તમારું બીજું",
  heroTitleLine2:  "ઘર, સુરતમાં 🏠",
  heroSubtitle:    "આરામદાયક રહેવાનું · ઘર જેવું જમવાનું · ૨૪/૭ સુરક્ષા",
  heroLocation:    "વરાછા, સુરત, ગુજરાત · કેમ છો? મજામાં! 😊",
  welcomeLine:     "✦ પધારો! સુરતનું પોતાનું PG ✦",
  seeYouLine:      "✦ આવજો! ફરી પધારજો! ✦",
  surtiSlogan:     "સુરતનું જમણ અને કાશીનું મરણ",

  aboutHeading:    "અમારા વિશે જાણો",
  aboutStoryTitle: "\"કેમ છો? મજામાં!\" — સુરતની ધરા પર તમારું ઉષ્માભર્યું સ્વાગત છે",
  aboutStoryPara1: "મોગલ કૃપા PG માત્ર એક રહેવાની જગ્યા નથી, પણ સુરત આવીને અભ્યાસ કરતા વિદ્યાર્થીઓ અને જોબ કરતા મિત્રો માટે એક હૂંફાળું આંગણું છે. અમે જાણીએ છીએ કે પોતાના વતન કે ગામથી દૂર રહેવું કેટલું અઘરું છે, એટલે જ અમે અહીં ઘર જેવી જ સુવિધાઓ અને પરિવાર જેવો માહોલ પૂરો પાડીએ છીએ.",
  aboutStoryPara2: "સુરતી ખાણીપીણીની લિજ્જત અને સ્વચ્છતાની પૂરી કાળજી સાથે, અમારા પોતાના ફૂડ કોર્ટમાં દરરોજ સ્વાદિષ્ટ અને પૌષ્ટિક ગુજરાતી ભોજન પ્રેમપૂર્વક પીરસવામાં આવે છે.",

  foodCourtHeading: "અમારું ફૂડ કોર્ટ 🍛",
  foodCourtTagline: "માતાના હાથના સ્વાદ જેવું મીઠું જમણ 🏠",
  foodCourtDesc:    "મોગલ કૃપા PG ની સૌથી મોટી ખાસિયત અમારું ફૂડ કોર્ટ છે! સુરતમાં બહાર રહેતા છોકરાઓને સૌથી મોટો વાંધો ખાવાનો આવે છે. અમારો સંકલ્પ છે કે કોઈ પણ વિદ્યાર્થી કે નોકરિયાત ભાઈને હોસ્ટેલનું બેસ્વાદ ખાવાનું ન ખાવું પડે.",

  phone:       "+91 63547 97745",
  whatsapp:    "916354797745",
  email:       "mogalkrupapg@gmail.com",
  address:     "વર્ષા રોડ, માતાવાડી, વર્ષા સોસાયટી ૧, અંબાવાડી, વરાછા, સુરત, ગુજરાત – ૩૯૫૦૧૦",
  officeHours: "સોમ–શનિ: સવારે ૮ – રાત્રે ૧૦\nરવિવાર: સવારે ૯ – સાંજે ૮",
}

const ContentContext = createContext({
  content: defaultContent,
  refreshContent: () => {},
  loading: false,
})

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)
  const [loading, setLoading] = useState(true)

  const fetchContent = useCallback(async () => {
    try {
      const res = await axios.get("/api/content")
      if (res.data?.success && res.data.data) {
        setContent(prev => ({ ...prev, ...res.data.data }))
      }
    } catch (err) {
      console.warn("Using default Gujarati content:", err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  return (
    <ContentContext.Provider value={{ content, refreshContent: fetchContent, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
