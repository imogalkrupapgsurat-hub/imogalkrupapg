import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("pgAdminToken")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      axios.get("/api/auth/verify")
        .then(r => setAdmin(r.data.user))
        .catch(() => { localStorage.removeItem("pgAdminToken"); delete axios.defaults.headers.common["Authorization"] })
        .finally(() => setLoading(false))
    } else { setLoading(false) }
  }, [])

  const login = async (username, password) => {
    const r = await axios.post("/api/auth/login", { username, password })
    const { token, username: u } = r.data
    localStorage.setItem("pgAdminToken", token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setAdmin({ username: u })
    return r.data
  }

  const logout = () => {
    localStorage.removeItem("pgAdminToken")
    delete axios.defaults.headers.common["Authorization"]
    setAdmin(null)
  }

  return <AuthCtx.Provider value={{ admin, login, logout, loading }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
