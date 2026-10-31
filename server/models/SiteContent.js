const mongoose = require("mongoose")

const siteContentSchema = new mongoose.Schema({
  // Home Page
  heroBadge:       { type: String, default: "✦ પધારો, મોગલ કૃપા PG માં ✦" },
  heroTitleLine1:  { type: String, default: "તમારું બીજું" },
  heroTitleLine2:  { type: String, default: "ઘર, સુરતમાં 🏠" },
  heroSubtitle:    { type: String, default: "આરામદાયક રહેવાનું · ઘર જેવું જમવાનું · ૨૪/૭ સુરક્ષા" },
  heroLocation:    { type: String, default: "વરાછા, સુરત, ગુજરાત · કેમ છો? મજામાં! 😊" },
  welcomeLine:     { type: String, default: "✦ પધારો! સુરતનું પોતાનું PG ✦" },
  seeYouLine:      { type: String, default: "✦ આવજો! ફરી પધારજો! ✦" },
  surtiSlogan:     { type: String, default: "સુરતનું જમણ અને કાશીનું મરણ" },

  // About Page
  aboutHeading:    { type: String, default: "અમારા વિશે જાણો" },
  aboutStoryTitle: { type: String, default: "\"કેમ છો? મજામાં!\" — સુરતની ધરા પર તમારું ઉષ્માભર્યું સ્વાગત છે" },
  aboutStoryPara1: { type: String, default: "મોગલ કૃપા PG માત્ર એક રહેવાની જગ્યા નથી, પણ સુરત આવીને અભ્યાસ કરતા વિદ્યાર્થીઓ અને જોબ કરતા મિત્રો માટે એક હૂંફાળું આંગણું છે. અમે જાણીએ છીએ કે પોતાના વતન કે ગામથી દૂર રહેવું કેટલું અઘરું છે, એટલે જ અમે અહીં ઘર જેવી જ સુવિધાઓ અને પરિવાર જેવો માહોલ પૂરો પાડીએ છીએ." },
  aboutStoryPara2: { type: String, default: "સુરતી ખાણીપીણીની લિજ્જત અને સ્વચ્છતાની પૂરી કાળજી સાથે, અમારા પોતાના ફૂડ કોર્ટમાં દરરોજ સ્વાદિષ્ટ અને પૌષ્ટિક ગુજરાતી ભોજન પ્રેમપૂર્વક પીરસવામાં આવે છે." },

  // Food Court Page
  foodCourtHeading: { type: String, default: "અમારું ફૂડ કોર્ટ 🍛" },
  foodCourtTagline: { type: String, default: "માતાના હાથના સ્વાદ જેવું મીઠું જમણ 🏠" },
  foodCourtDesc:    { type: String, default: "મોગલ કૃપા PG ની સૌથી મોટી ખાસિયત અમારું ફૂડ કોર્ટ છે! સુરતમાં બહાર રહેતા છોકરાઓને સૌથી મોટો વાંધો ખાવાનો આવે છે. અમારો સંકલ્પ છે કે કોઈ પણ વિદ્યાર્થી કે નોકરિયાત ભાઈને હોસ્ટેલનું બેસ્વાદ ખાવાનું ન ખાવું પડે." },

  // Contact & General Info
  phone:       { type: String, default: "+91 63547 97745" },
  whatsapp:    { type: String, default: "916354797745" },
  email:       { type: String, default: "mogalkrupapg@gmail.com" },
  address:     { type: String, default: "વર્ષા રોડ, માતાવાડી, વર્ષા સોસાયટી ૧, અંબાવાડી, વરાછા, સુરત, ગુજરાત – ૩૯૫૦૧૦" },
  officeHours: { type: String, default: "સોમ–શનિ: સવારે ૮ – રાત્રે ૧૦\nરવિવાર: સવારે ૯ – સાંજે ૮" },

  updatedAt:   { type: Date, default: Date.now },
})

siteContentSchema.statics.getSingleton = async function() {
  let content = await this.findOne()
  if (!content) {
    content = new this()
    await content.save()
  }
  return content
}

module.exports = mongoose.model("SiteContent", siteContentSchema)
