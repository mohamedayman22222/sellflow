export const ORDER_STATUSES = ['جديد', 'تم التأكيد', 'قيد التجهيز', 'تم الشحن', 'تم التسليم', 'ملغي']
export const statusClasses = status => ({
  'جديد': 'bg-violet-50 text-violet-700',
  'تم التأكيد': 'bg-blue-50 text-blue-700',
  'قيد التجهيز': 'bg-amber-50 text-amber-700',
  'تم الشحن': 'bg-indigo-50 text-indigo-700',
  'تم التسليم': 'bg-emerald-50 text-emerald-700',
  'ملغي': 'bg-rose-50 text-rose-700'
}[status] || 'bg-slate-100 text-slate-600')
