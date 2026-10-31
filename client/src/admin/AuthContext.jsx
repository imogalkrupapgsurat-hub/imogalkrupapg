import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const savedUser = localStorage.getItem("pgAdminUser")
    const token = localStorage.getItem("pgAdminToken")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      return savedUser ? { username: savedUser } : { username: "admin" }
    }
    return null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("pgAdminToken")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      axios.get("/api/auth/verify")
        .then(r => {
          if (r.data?.user) {
            setAdmin(r.data.user)
            if (r.data.user.username) {
              localStorage.setItem("pgAdminUser", r.data.user.username)
            }
          }
        })
        .catch(err => {
          // Only clear session if token is truly invalid/expired (HTTP 401/403)
          // Do NOT log out on network/temporary backend issues (500, network error, etc.)
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            localStorage.removeItem("pgAdminToken")
            localStorage.removeItem("pgAdminUser")
            delete axios.defaults.headers.common["Authorization"]
            setAdmin(null)
          }
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const r = await axios.post("/api/auth/login", { username, password })
    const { token, username: u } = r.data
    localStorage.setItem("pgAdminToken", token)
    localStorage.setItem("pgAdminUser", u || username)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setAdmin({ username: u || username })
    return r.data
  }

  const logout = () => {
    localStorage.removeItem("pgAdminToken")
    localStorage.removeItem("pgAdminUser")
    delete axios.defaults.headers.common["Authorization"]
    setAdmin(null)
  }

  return <AuthCtx.Provider value={{ admin, login, logout, loading }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
