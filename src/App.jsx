import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Expenses from './pages/Expenses'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import DashboardLayout from './layouts/DashboardLayout'
import { useAuth } from './context/AuthContext'
function Protected({ children }) { const { user } = useAuth(); return user ? children : <Navigate to="/login" replace /> }
export default function App() {
  return <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path="/app" element={<Protected><DashboardLayout/></Protected>}>
      <Route index element={<Dashboard/>}/>
      <Route path="products" element={<Products/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="inventory" element={<Inventory/>}/>
      <Route path="customers" element={<Customers/>}/>
      <Route path="expenses" element={<Expenses/>}/>
      <Route path="reports" element={<Reports/>}/>
      <Route path="settings" element={<Settings/>}/>
    </Route>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
}