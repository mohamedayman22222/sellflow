export const orderSubtotal = order => (order.items || []).reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.unitPrice || 0), 0)
export const orderTotal = order => Math.max(0, orderSubtotal(order) - Number(order.discount || 0) + Number(order.shipping || 0))
export const orderCost = order => (order.items || []).reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.unitCost || 0), 0)
export const isCancelled = order => order.status === 'ملغي'
export const isDelivered = order => order.status === 'تم التسليم'
export const getMetrics = ({ orders = [], expenses = [] }) => {
  const valid = orders.filter(o => !isCancelled(o))
  const delivered = valid.filter(isDelivered)
  const sales = valid.reduce((s, o) => s + orderTotal(o), 0)
  const cogs = delivered.reduce((s, o) => s + orderCost(o), 0)
  const deliveredRevenue = delivered.reduce((s, o) => s + orderTotal(o), 0)
  const expenseTotal = expenses.reduce((s, e) => s + Number(e.amount || 0), 0)
  return { orderCount: valid.length, sales, deliveredRevenue, cogs, grossProfit: deliveredRevenue - cogs, expenseTotal, netProfit: deliveredRevenue - cogs - expenseTotal }
}
export const productSales = orders => {
  const map = {}
  orders.filter(isDelivered).forEach(o => (o.items || []).forEach(i => { map[i.name] = (map[i.name] || 0) + Number(i.qty || 0) }))
  return Object.entries(map).map(([name, qty]) => ({ name, qty })).sort((a,b) => b.qty - a.qty)
}
