import { useAuth } from "./AuthContext"
import AdminLogin from "./AdminLogin"
import AdminDashboard from "./AdminDashboard"
import { RefreshCw } from "lucide-react"

export default function AdminPage() {
  const { admin, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <RefreshCw size={28} className="text-gold animate-spin" />
    </div>
  )
  return admin ? <AdminDashboard /> : <AdminLogin />
}
