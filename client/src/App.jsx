import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import WhatsAppButton from "./components/WhatsAppButton"
import HomePage from "./pages/Home"
import AboutPage from "./pages/About"
import RoomsPage from "./pages/Rooms"
import FoodCourtPage from "./pages/FoodCourt"
import GalleryPage from "./pages/Gallery"
import ContactPage from "./pages/Contact"
import AdminPage from "./admin/AdminPage"
import { AuthProvider } from "./admin/AuthContext"
import { ContentProvider } from "./context/ContentContext"

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/"        element={<><Navbar /><HomePage />   <Footer /><WhatsAppButton /></>} />
        <Route path="/about"   element={<><Navbar /><AboutPage />  <Footer /><WhatsAppButton /></>} />
        <Route path="/rooms"   element={<><Navbar /><RoomsPage />  <Footer /><WhatsAppButton /></>} />
        <Route path="/food"    element={<><Navbar /><FoodCourtPage /><Footer /><WhatsAppButton /></>} />
        <Route path="/gallery" element={<><Navbar /><GalleryPage /><Footer /><WhatsAppButton /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /><WhatsAppButton /></>} />
        {/* Admin - no Navbar/Footer */}
        <Route path="/admin"   element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <AnimatedRoutes />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
