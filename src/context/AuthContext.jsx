import { createContext, useContext, useState } from 'react'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('sellflow-demo-user')) } catch { return null } })
  const login = (email, name = 'أحمد محمد') => { const u = { email, name }; localStorage.setItem('sellflow-demo-user', JSON.stringify(u)); setUser(u); return u }
  const logout = () => { localStorage.removeItem('sellflow-demo-user'); setUser(null) }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
