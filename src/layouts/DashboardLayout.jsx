import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Warehouse, Users, Receipt, ChartNoAxesCombined, Settings, Menu, X, LogOut, CreditCard, Home } from 'lucide-react'
import Logo from '../components/Logo'
import Toast from '../components/Toast'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
const links = [
  {to:'/app', label:'الرئيسية', icon:LayoutDashboard, end:true},
  {to:'/app/products', label:'المنتجات', icon:Package},
  {to:'/app/orders', label:'الطلبات', icon:ShoppingCart},
  {to:'/app/inventory', label:'المخزون', icon:Warehouse},
  {to:'/app/customers', label:'العملاء', icon:Users},
  {to:'/app/expenses', label:'المصاريف', icon:Receipt},
  {to:'/app/reports', label:'التقارير', icon:ChartNoAxesCombined},
  {to:'/app/settings', label:'الإعدادات', icon:Settings}
]
export default function DashboardLayout() {
  const [open,setOpen] = useState(false); const app = useApp(); const { user, logout } = useAuth(); const navigate = useNavigate()
  const nav = <><div className="px-5 py-5"><Logo light/></div><div className="px-3 pb-4 text-[10px] font-bold tracking-widest text-slate-500">القائمة الرئيسية</div><nav className="space-y-1 px-3">{links.map(({to,label,icon:Icon,end})=><NavLink key={to} to={to} end={end} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive?'bg-blue-600 text-white shadow-lg shadow-blue-950/20':'text-slate-300 hover:bg-white/10 hover:text-white'}`}><Icon size={18}/>{label}</NavLink>)}<NavLink to="/pricing" onClick={()=>setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10"><CreditCard size={18}/>الأسعار</NavLink></nav><div className="mt-auto border-t border-white/10 p-3"><button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/10" onClick={()=>{logout();navigate('/login')}}><LogOut size={18}/>تسجيل الخروج</button><NavLink to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/10"><Home size={18}/>الموقع التعريفي</NavLink></div></>
  return <div className="min-h-screen bg-canvas"><aside className="fixed inset-y-0 right-0 z-40 hidden w-60 flex-col bg-navy lg:flex">{nav}</aside>{open&&<div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={()=>setOpen(false)} />}<aside className={`fixed inset-y-0 right-0 z-50 flex w-64 flex-col bg-navy transition-transform lg:hidden ${open?'translate-x-0':'translate-x-full'}`}><button className="absolute left-3 top-4 text-white" onClick={()=>setOpen(false)}><X/></button>{nav}</aside><div className="min-h-screen lg:mr-60"><header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur md:px-8"><div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={()=>setOpen(true)} aria-label="فتح القائمة"><Menu/></button><div><p className="text-sm font-extrabold">{app.settings.businessName}</p><p className="text-xs text-slate-400">لوحة إدارة المتجر</p></div></div><div className="flex items-center gap-3"><span className="hidden text-left sm:block"><span className="block text-sm font-bold">{user?.name || app.settings.profileName}</span><span className="block text-xs text-slate-400">مدير المتجر</span></span><div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 font-extrabold text-blue-700">{(user?.name || app.settings.profileName || 'أ').slice(0,1)}</div></div></header><main className="p-4 md:p-8"><Outlet/></main></div><Toast toast={app.toast} onClose={()=>{}}/></div>
}