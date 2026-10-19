import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { initialData } from '../data/initialData'
import { loadData, saveData, STORAGE_KEY } from '../utils/storage'
import { uid } from '../utils/formatters'
import { orderCost, orderTotal, isCancelled, getMetrics } from '../utils/calculations'

const AppContext = createContext(null)
const clone = obj => JSON.parse(JSON.stringify(obj))
export function AppProvider({ children }) {
  const [data, setData] = useState(() => loadData(clone(initialData)))
  const [toast, setToast] = useState(null)
  useEffect(() => { saveData(data) }, [data])
  const notify = (message, type = 'success') => { setToast({ message, type, id: Date.now() }); window.setTimeout(() => setToast(null), 3000) }
  const update = key => fn => setData(prev => ({ ...prev, [key]: fn(prev[key]) }))
  const addProduct = product => { setData(p => ({ ...p, products: [...p.products, { ...product, id: uid('p') }] })); notify('تمت إضافة المنتج بنجاح') }
  const editProduct = product => { setData(p => ({ ...p, products: p.products.map(x => x.id === product.id ? product : x) })); notify('تم تحديث المنتج') }
  const deleteProduct = id => { if (data.orders.some(o => !isCancelled(o) && o.items.some(i => i.productId === id))) { notify('لا يمكن حذف منتج مرتبط بطلب غير ملغي', 'error'); return false } setData(p => ({ ...p, products: p.products.filter(x => x.id !== id) })); notify('تم حذف المنتج'); return true }
  const addCustomer = customer => { setData(p => ({ ...p, customers: [...p.customers, { ...customer, id: uid('c') }] })); notify('تمت إضافة العميل') }
  const editCustomer = customer => { setData(p => ({ ...p, customers: p.customers.map(x => x.id === customer.id ? customer : x) })); notify('تم تحديث بيانات العميل') }
  const deleteCustomer = id => { if (data.orders.some(o => o.customerId === id && !isCancelled(o))) { notify('لا يمكن حذف عميل لديه طلبات نشطة', 'error'); return false } setData(p => ({ ...p, customers: p.customers.filter(x => x.id !== id) })); notify('تم حذف العميل'); return true }
  const applyStock = (products, order, direction) => {
    const quantities = {}
    order.items.forEach(item => { quantities[item.productId] = (quantities[item.productId] || 0) + Number(item.qty) })
    if (direction < 0 && Object.entries(quantities).some(([id, qty]) => { const product = products.find(p => p.id === id); return !product || Number(product.stock) < qty })) return null
    return products.map(p => quantities[p.id] ? { ...p, stock: Number(p.stock) + direction * quantities[p.id] } : p)
  }
  const createOrder = order => {
    const normalized = { ...order, id: uid('o'), number: String(Math.max(1025, ...data.orders.map(o => Number(o.number) || 0)) + 1), date: order.date || new Date().toISOString().slice(0,10), stockApplied: false }
    let products = data.products
    if (['قيد التجهيز', 'تم الشحن', 'تم التسليم'].includes(normalized.status)) {
      products = applyStock(products, normalized, -1)
      if (!products) { notify('الكمية المطلوبة أكبر من المخزون المتاح', 'error'); return false }
      normalized.stockApplied = true
    }
    setData(p => ({ ...p, products, orders: [normalized, ...p.orders] })); notify('تم إنشاء الطلب'); return true
  }
  const editOrder = order => {
    const old = data.orders.find(o => o.id === order.id)
    if (!old) return false
    let products = data.products
    const oldApplied = !!old.stockApplied
    const shouldApply = ['قيد التجهيز', 'تم الشحن', 'تم التسليم'].includes(order.status) && order.status !== 'ملغي'
    if (oldApplied) {
      products = applyStock(products, old, 1)
      if (!products) return false
    }
    const nextApplied = shouldApply
    if (nextApplied) {
      products = applyStock(products, order, -1)
      if (!products) { notify('لا توجد كمية كافية لتطبيق هذا الطلب', 'error'); return false }
    }
    const updated = { ...order, stockApplied: nextApplied }
    setData(p => ({ ...p, products, orders: p.orders.map(o => o.id === order.id ? updated : o) }))
    notify('تم تحديث الطلب والمخزون'); return true
  }
  const changeOrderStatus = (id, status) => { const order = data.orders.find(o => o.id === id); return order ? editOrder({ ...order, status }) : false }
  const deleteOrder = id => { const order = data.orders.find(o => o.id === id); if (!order) return; let products = data.products; if (order.stockApplied) products = applyStock(products, order, 1) || products; setData(p => ({ ...p, products, orders: p.orders.filter(o => o.id !== id) })); notify('تم حذف الطلب وإرجاع الكميات إن لزم') }
  const addExpense = expense => { setData(p => ({ ...p, expenses: [{ ...expense, id: uid('e') }, ...p.expenses] })); notify('تمت إضافة المصروف') }
  const editExpense = expense => { setData(p => ({ ...p, expenses: p.expenses.map(e => e.id === expense.id ? expense : e) })); notify('تم تحديث المصروف') }
  const deleteExpense = id => { setData(p => ({ ...p, expenses: p.expenses.filter(e => e.id !== id) })); notify('تم حذف المصروف') }
  const adjustStock = (id, quantity, reason) => {
    if (!Number.isFinite(Number(quantity)) || Number(quantity) < 0) { notify('أدخل كمية صحيحة غير سالبة', 'error'); return }
    const product = data.products.find(p => p.id === id); if (!product) return
    const movement = { id: uid('m'), productId: id, productName: product.name, before: Number(product.stock), after: Number(quantity), delta: Number(quantity) - Number(product.stock), reason, date: new Date().toISOString() }
    setData(p => ({ ...p, products: p.products.map(x => x.id === id ? { ...x, stock: Number(quantity) } : x), stockMovements: [movement, ...(p.stockMovements || [])] }))
    notify('تم تحديث المخزون')
  }
  const updateSettings = settings => { setData(p => ({ ...p, settings: { ...p.settings, ...settings } })); notify('تم حفظ الإعدادات') }
  const resetData = () => { setData(clone(initialData)); localStorage.removeItem('sellflow-demo-user'); notify('تمت إعادة بيانات التجربة') }
  const metrics = useMemo(() => getMetrics(data), [data])
  const value = { ...data, toast, notify, metrics, addProduct, editProduct, deleteProduct, addCustomer, editCustomer, deleteCustomer, createOrder, editOrder, changeOrderStatus, deleteOrder, addExpense, editExpense, deleteExpense, adjustStock, updateSettings, resetData, orderTotal, orderCost, storageKey: STORAGE_KEY }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp = () => useContext(AppContext)
