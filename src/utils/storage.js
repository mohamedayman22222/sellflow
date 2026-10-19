export const STORAGE_KEY = 'sellflow-demo-v1'
export function loadData(fallback) {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? { ...fallback, ...JSON.parse(raw) } : fallback }
  catch { return fallback }
}
export function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return true }
  catch { return false }
}
