export const money = (value, currency = 'ج.م') => `${Number(value || 0).toLocaleString('ar-EG', { maximumFractionDigits: 2 })} ${currency}`
export const dateLabel = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString('ar-EG') : '—'
export const todayISO = () => new Date().toISOString().slice(0, 10)
export const uid = prefix => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
export const csvCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`
