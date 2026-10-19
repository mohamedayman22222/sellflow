import { csvCell } from './formatters'
export function downloadCSV(filename, rows) {
  if (!rows?.length) return false
  const csv = '\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
  return true
}
