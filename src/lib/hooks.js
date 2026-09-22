import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------
   useReveal — IntersectionObserver-based scroll reveal
   Fires once, then disconnects. Zero runtime cost after.
   --------------------------------------------------------- */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}

/* ---------------------------------------------------------
   useScrollProgress — 0 → 1 as the page scrolls
   Used for the top progress bar. Throttled via rAF.
   --------------------------------------------------------- */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight
        setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
}

/* ---------------------------------------------------------
   useTheme — persisted light/dark with system preference
   --------------------------------------------------------- */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('nexwave-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('nexwave-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}

/* ---------------------------------------------------------
   useScrollFlag — boolean once user scrolls past threshold
   Used to darken the header background on scroll.
   --------------------------------------------------------- */
export function useScrollFlag(threshold = 20) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return past
}