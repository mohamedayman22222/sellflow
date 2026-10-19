import { useEffect, useState } from 'react'
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : initialValue }
    catch { return initialValue }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch (e) { console.error('تعذر حفظ البيانات محليًا', e) } }, [key, value])
  return [value, setValue]
}
