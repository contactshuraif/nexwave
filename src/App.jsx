import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  ArrowRight, ArrowUpRight, Menu, X, Sun, Moon,
  Mail, Instagram, Briefcase, Plus, Minus, ArrowUp,
  Loader2, Check, AlertCircle,
} from 'lucide-react'

/* ============================================================
   HOOKS
   ============================================================ */

function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold, rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])
  return { ref, visible }
}

function useScrollProgress() {
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

function useTheme() {
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

function useScrollFlag(threshold = 20) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return past
}

function useCursorSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    let frame = 0
    const onMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const root = document.documentElement
        root.style.setProperty('--mx', `${e.clientX}px`)
        root.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
}

function useMagnetic(strength = 0.25) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let frame = 0
    const onMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.style.transform = 'translate3d(0,0,0)'
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [strength])
  return ref
}

function useCountUp(target, duration = 1600) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target); return
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
        setValue(target * eased)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return { ref, value }
}

/* ============================================================
   PRIMITIVES
   ============================================================ */

function Reveal({ children, delay = 0, y = 24, as: Tag = 'div', className = '', ...rest }) {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, '--reveal-y': `${y}px` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function MeshBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-[20%] -left-[15%] w-[55vw] h-[55vw] rounded-full
                   animate-mesh-drift opacity-[0.22] dark:opacity-[0.35]"
        style={{
          background: 'radial-gradient(circle at center, #1B4DFF 0%, transparent 65%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full
                   animate-mesh-drift-2 opacity-[0.18] dark:opacity-[0.28]"
        style={{
          background: 'radial-gradient(circle at center, #22B8B0 0%, transparent 65%)',
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute -bottom-[25%] left-[25%] w-[50vw] h-[50vw] rounded-full
                   animate-mesh-drift-3 opacity-[0.14] dark:opacity-[0.22]"
        style={{
          background: 'radial-gradient(circle at center, #7B5BFF 0%, transparent 65%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,11,14,0.5) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(10,11,14,0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
    </div>
  )
}

function MagneticButton({ children, href = '#', className = '', ...rest }) {
  const magnetRef = useMagnetic(0.22)

  const onClick = useCallback((e) => {
    const btn = e.currentTarget
    const r = btn.getBoundingClientRect()
    const span = document.createElement('span')
    const size = Math.max(r.width, r.height)
    span.className = 'ripple'
    span.style.width = `${size}px`
    span.style.height = `${size}px`
    span.style.left = `${e.clientX - r.left - size / 2}px`
    span.style.top  = `${e.clientY - r.top  - size / 2}px`
    btn.appendChild(span)
    setTimeout(() => span.remove(), 750)
  }, [])

  return (
    <a
      ref={magnetRef}
      href={href}
      onClick={onClick}
      className={`btn btn-primary magnetic ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

function WaveRule({ flip = false, className = '' }) {
  return (
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none"
         className={`w-full h-6 ${flip ? 'rotate-180' : ''} ${className}`}
         aria-hidden="true">
      <defs>
        <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor="#1B4DFF" stopOpacity="0" />
          <stop offset="25%"  stopColor="#1B4DFF" stopOpacity="0.7" />
          <stop offset="50%"  stopColor="#22B8B0" stopOpacity="0.9" />
          <stop offset="75%"  stopColor="#1B4DFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1B4DFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,12 C150,0 300,24 450,12 C600,0 750,24 900,12 C1050,0 1150,20 1200,12"
            fill="none" stroke="url(#waveGrad)" strokeWidth="1" />
    </svg>
  )
}

function Field({ label, placeholder, type = 'text', textarea = false, id, ...rest }) {
  const base = `w-full bg-transparent border-0 border-b border-hair-light dark:border-hair-dark
                focus:border-cobalt transition-colors duration-300 outline-none
                py-3 text-base font-sans text-ink dark:text-paper
                placeholder:text-ink/30 dark:placeholder:text-paper/25
                disabled:opacity-60 disabled:cursor-not-allowed`
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-')
  return (
    <label htmlFor={fieldId} className="block">
      <span className="kicker">{label}</span>
      <div className="mt-2">
        {textarea
          ? <textarea id={fieldId} rows="4" placeholder={placeholder} className={`${base} resize-none`} {...rest} />
          : <input id={fieldId} type={type} placeholder={placeholder} className={base} {...rest} />}
      </div>
    </label>
  )
}

function SectionHeader({ number, kicker, children }) {
  return (
    <header className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
      <div className="col-span-12 md:col-span-3">
        <div className="section-num">{number} / {kicker}</div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="font-display font-bold tracking-tightest leading-display
                       text-[clamp(2.25rem,5.5vw,5rem)] max-w-3xl">
          {children}
        </h2>
      </div>
    </header>
  )
}

function Stat({ raw, suffix = '', label, delay = 0 }) {
  const { ref, value } = useCountUp(raw)
  const display =
    raw >= 100 ? Math.round(value).toString() :
    raw % 1 !== 0 ? value.toFixed(1) :
    Math.round(value).toString()
  return (
    <Reveal delay={delay}>
      <div ref={ref}>
        <div className="font-display font-bold text-5xl md:text-6xl tracking-tightest tabular text-gradient">
          {display}{suffix}
        </div>
        <div className="kicker mt-3">{label}</div>
      </div>
    </Reveal>
  )
}

/* ============================================================
   DATA
   ============================================================ */

const NAV = [
  ['01', 'Work',    '#services'],
  ['02', 'Process', '#process'],
  ['03', 'Studio',  '#about'],
  ['04', 'FAQ',     '#faq'],
  ['05', 'Contact', '#contact'],
]

const SERVICES = [
  { n: '01', title: 'Web & SaaS', blurb: 'Product-grade platforms engineered for scale.',
    body: 'From multi-tenant SaaS to e-commerce engines and high-throughput booking systems — we architect the entire stack. Multi-region Postgres, event-driven APIs, and a component library your team will actually enjoy maintaining.',
    tags: ['Next.js', 'PostgreSQL', 'Node', 'Stripe', 'Redis'] },
  { n: '02', title: 'Mobile Applications', blurb: 'iOS & Android products built for retention.',
    body: 'React Native and native modules where it matters. Offline-first data flows, push infrastructure that scales, and release pipelines that keep your app in the top quartile of store performance.',
    tags: ['React Native', 'Expo', 'Swift', 'Kotlin'] },
  { n: '03', title: 'API & Integration', blurb: 'One coherent system across every tool you own.',
    body: 'We design the connective tissue — REST and GraphQL layers, webhook pipelines, and CRM synchronization — so your sales, ops, and data teams stop fighting their tools.',
    tags: ['GraphQL', 'tRPC', 'Webhooks', 'Salesforce', 'HubSpot'] },
  { n: '04', title: 'POS & Custom ERP', blurb: 'Real-time operations across every branch.',
    body: 'Multi-branch inventory, live reconciliation, and financial reporting that leadership trusts. We replace spreadsheets with systems and keep the audit trail intact.',
    tags: ['Inventory', 'Reconciliation', 'Reporting'] },
  { n: '05', title: 'AI Automation', blurb: 'Agents that remove the work nobody should do.',
    body: 'Document processing, retrieval-augmented search, and orchestrated workflows powered by LLMs. PII-safe pipelines and evaluation harnesses so quality doesn’t drift.',
    tags: ['RAG', 'LLM Ops', 'LangChain', 'Vector DBs'] },
]

const PROCESS = [
  { n: 'I',   title: 'Scope',   text: 'A week of interviews, systems mapping, and a fixed-scope proposal.' },
  { n: 'II',  title: 'Shape',   text: 'Wireframes, prototypes, and the architecture that will carry the product.' },
  { n: 'III', title: 'Ship',    text: 'Two-week sprints, weekly demos, and continuous deployment to staging.' },
  { n: 'IV',  title: 'Sustain', text: 'Handover, documentation, and an SLA your team can rely on.' },
]

const FAQS = [
  { q: 'What does a typical engagement look like?', a: 'Most projects begin with a two-week discovery sprint. From there we either continue as your product team or hand over a documented build to your engineers.' },
  { q: 'How do you price work?',                    a: 'Fixed-scope proposals for defined builds, or monthly retainers for ongoing product work. No hourly billing — we quote outcomes.' },
  { q: 'Do you work with existing teams?',          a: 'Yes. We frequently embed alongside internal engineering teams, follow your conventions, and hand over cleanly.' },
  { q: 'What happens after launch?',                a: 'Every project ships with documentation, runbooks, and a 30-day stabilization window. Ongoing support is available on retainer.' },
]

const MARQUEE = ['React','Node.js','PostgreSQL','TypeScript','Next.js','React Native','AWS','Docker','GraphQL','Python','OpenAI','Redis','Stripe','Terraform']

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function ServiceRow({ service, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <li className="border-b border-hair-light dark:border-hair-dark">
      <button onClick={() => setOpen(v => !v)} aria-expanded={open}
              className="w-full text-left py-7 md:py-9 group flex items-start md:items-center gap-6 md:gap-10">
        <span className="font-mono text-xs text-cobalt pt-1 md:pt-0">{service.n}</span>
        <div className="flex-1">
          <h3 className={`font-display font-bold tracking-tightest leading-none text-3xl md:text-5xl transition-colors duration-300
                          ${open ? 'text-cobalt' : 'group-hover:text-cobalt'}`}>
            {service.title}
          </h3>
          <p className="mt-3 text-ink/60 dark:text-paper/60 text-base md:text-lg">{service.blurb}</p>
        </div>
        <span className="shrink-0 w-9 h-9 rounded-full border border-hair-light dark:border-hair-dark
                         flex items-center justify-center group-hover:border-cobalt transition-colors duration-300">
          {open ? <Minus className="w-4 h-4 text-cobalt" />
                : <Plus className="w-4 h-4 text-ink/60 dark:text-paper/60 group-hover:text-cobalt transition-colors" />}
        </span>
      </button>
      <div className={`grid grid-cols-12 overflow-hidden transition-[grid-template-rows] duration-500 ease-reveal
                       ${open ? 'grid-rows-[1fr] pb-10' : 'grid-rows-[0fr]'}`}>
        <div className="col-span-12 md:col-start-4 md:col-span-8 min-h-0">
          <div className="pt-2">
            <p className="text-ink/70 dark:text-paper/70 leading-relaxed mb-6 max-w-2xl text-lg">{service.body}</p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] uppercase tracking-widest2 px-2.5 py-1.5 rounded-hair
                                         border border-hair-light dark:border-hair-dark text-ink/60 dark:text-paper/60
                                         hover:border-cobalt/40 hover:text-cobalt hover:bg-cobalt/5 transition-colors duration-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function FaqRow({ index, q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border-b border-hair-light dark:border-hair-dark">
      <button onClick={() => setOpen(v => !v)} aria-expanded={open}
              className="w-full text-left py-6 flex items-start gap-6 group">
        <span className="font-mono text-xs text-cobalt pt-2">{String(index + 1).padStart(2, '0')}</span>
        <span className="flex-1 font-display font-bold text-xl md:text-2xl tracking-tighter2 group-hover:text-cobalt transition-colors duration-200">
          {q}
        </span>
        {open ? <Minus className="w-4 h-4 text-cobalt mt-2" />
              : <Plus className="w-4 h-4 text-ink/40 dark:text-paper/40 mt-2 group-hover:text-cobalt transition-colors" />}
      </button>
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-reveal
                       ${open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 md:pl-14">
          <p className="text-ink/70 dark:text-paper/70 leading-relaxed max-w-2xl text-lg">{a}</p>
        </div>
      </div>
    </li>
  )
}

/* ============================================================
   CONTACT FORM — wired to /api/contact (Resend)
   States: idle · loading · success · error
   ============================================================ */
function ContactForm() {
  const [state, setState] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (state === 'loading' || state === 'success') return

    setState('loading')
    setErrorMsg('')

    const formData = new FormData(e.target)
    const payload = {
      name:    (formData.get('name')    || '').toString().trim(),
      email:   (formData.get('email')   || '').toString().trim(),
      company: (formData.get('company') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim(),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setState('success')
      e.target.reset?.()
      setTimeout(() => setState('idle'), 5000)
    } catch (err) {
      console.error('[contact form]', err)
      setErrorMsg(err.message || 'Failed to send. Please try again.')
      setState('error')
      setTimeout(() => setState('idle'), 6000)
    }
  }

  const disabled = state === 'loading' || state === 'success'

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name"  name="name"  placeholder="Ada Lovelace"    required disabled={disabled} />
        <Field label="Email" name="email" type="email" placeholder="ada@example.com" required disabled={disabled} />
      </div>
      <Field label="Company" name="company" placeholder="Acme, Inc." disabled={disabled} />
      <Field
        label="What are you building?"
        name="message"
        textarea
        placeholder="A few lines is plenty."
        required
        disabled={disabled}
      />

      <div className="flex items-center gap-6 pt-2 flex-wrap">
        <button
          type="submit"
          disabled={disabled}
          className="btn btn-primary disabled:opacity-70 disabled:cursor-wait"
        >
          {state === 'idle'    && <>Send inquiry <ArrowRight className="w-4 h-4 arrow-slide" /></>}
          {state === 'loading' && <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>}
          {state === 'success' && <><Check className="w-4 h-4" /> Sent — thank you</>}
          {state === 'error'   && <>Try again <ArrowRight className="w-4 h-4 arrow-slide" /></>}
        </button>
        <span className="kicker">Replies within one business day</span>
      </div>

      {/* Error message */}
      {state === 'error' && errorMsg && (
        <div role="alert"
             className="flex items-start gap-3 p-4 rounded-hair
                        border border-red-500/30 bg-red-500/5
                        text-sm text-red-500 dark:text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Success message */}
      {state === 'success' && (
        <div role="status"
             className="flex items-start gap-3 p-4 rounded-hair
                        border border-teal/30 bg-teal/5
                        text-sm text-teal">
          <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>Got it — thanks for reaching out. We'll reply within one business day.</span>
        </div>
      )}
    </form>
  )
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const { theme, toggle } = useTheme()
  const progress = useScrollProgress()
  const scrolled = useScrollFlag(20)
  const [menuOpen, setMenuOpen] = useState(false)

  useCursorSpotlight()

  return (
    <div className="grain min-h-screen font-sans relative">
      <MeshBackground />
      <div className="spotlight" aria-hidden="true" />

      {/* Scroll progress bar */}
      <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #1B4DFF 0%, #4F74FF 40%, #22B8B0 70%, #7B5BFF 100%)',
            boxShadow: '0 0 12px rgba(34, 184, 176, 0.7)',
          }}
        />
      </div>

      {/* ============ HEADER ============ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-paper/75 dark:bg-ink/75 backdrop-blur-xl border-b border-hair-light dark:border-hair-dark'
          : 'border-b border-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#top" className="flex items-center gap-3 group">
              <img src="/nexwave.png" alt="" className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" />
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display font-bold text-xl tracking-tighter2">Nex Wave</span>
                <span className="kicker mt-1">Software Studio · LK</span>
              </span>
            </a>
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
              {NAV.map(([n, label, href]) => (
                <a key={label} href={href}
                   className="group flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-widest2
                              text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors duration-200">
                  <span className="text-cobalt">{n}</span>
                  <span className="link-underline">{label}</span>
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={toggle} aria-label="Toggle theme"
                      className="w-9 h-9 rounded-hair border border-hair-light dark:border-hair-dark flex items-center justify-center
                                 text-ink/70 dark:text-paper/70 hover:text-cobalt dark:hover:text-cobalt-light hover:border-cobalt/40
                                 hover:shadow-[0_0_18px_-2px_rgba(27,77,255,0.5)] transition-all duration-200">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <MagneticButton href="#contact"
                              className="hidden md:inline-flex !py-2.5 !px-4 !text-[12px] !tracking-wide uppercase font-mono">
                Start a project <ArrowUpRight className="w-3.5 h-3.5 arrow-slide" />
              </MagneticButton>
              <button onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}
                      className="lg:hidden w-9 h-9 rounded-hair border border-hair-light dark:border-hair-dark flex items-center justify-center text-ink dark:text-paper">
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className={`lg:hidden overflow-hidden bg-paper dark:bg-ink border-t border-hair-light dark:border-hair-dark
                         transition-[max-height] duration-500 ease-reveal ${menuOpen ? 'max-h-[420px]' : 'max-h-0'}`}>
          <nav className="px-6 py-6 space-y-1">
            {NAV.map(([n, label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                 className="flex items-baseline gap-4 py-3 border-b border-hair-light dark:border-hair-dark font-display font-bold text-3xl tracking-tightest">
                <span className="font-mono text-[11px] text-cobalt">{n}</span>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section id="top" className="relative pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12">
              <span className="kicker">001 — Index</span>
              <span className="hidden md:inline text-hair-light dark:text-hair-dark">/</span>
              <span className="kicker">Colombo · Est. 2023</span>
              <span className="hidden md:inline text-hair-light dark:text-hair-dark">/</span>
              <span className="kicker flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
                Two slots open · Q1
              </span>
            </div>
          </Reveal>
          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            <div className="col-span-12 lg:col-span-8">
              <Reveal delay={80}>
                <h1 className="font-display font-bold tracking-tightest leading-display text-[clamp(2.75rem,8.5vw,7.5rem)]">
                  Ride the next<br />
                  wave of <span className="text-gradient">quiet</span><br />
                  engineering.
                </h1>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:pt-6">
              <Reveal delay={200}>
                <p className="text-xl md:text-2xl leading-relaxed max-w-md text-ink/70 dark:text-paper/70">
                  Nex Wave is a small studio building software that stays up, stays fast,
                  and stays out of your team's way. SaaS platforms, mobile products,
                  and AI systems — shipped with restraint.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton href="#services">
                    See the work <ArrowRight className="w-4 h-4 arrow-slide" />
                  </MagneticButton>
                  <a href="#contact" className="btn btn-ghost">Start a conversation</a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-hair-light dark:border-hair-dark">
            <Stat raw={18}  suffix="+" label="Products shipped"      delay={0} />
            <Stat raw={4.9} suffix="★" label="Client satisfaction"   delay={80} />
            <Stat raw={6}   suffix=""  label="Countries served"      delay={160} />
            <Reveal delay={240}>
              <div>
                <div className="font-display font-bold text-5xl md:text-6xl tracking-tightest tabular text-gradient">
                  24/7
                </div>
                <div className="kicker mt-3">Support window</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="border-y border-hair-light dark:border-hair-dark py-6 overflow-hidden mask-fade-x">
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="mx-8 font-mono text-xs uppercase tracking-widest2 text-ink/50 dark:text-paper/40">
              {item}
              <span className="mx-8 text-gradient font-bold">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ SERVICES ============ */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeader number="002" kicker="Services">
              Five capabilities.<br />
              <span className="text-gradient">One</span> coherent engineering practice.
            </SectionHeader>
          </Reveal>
          <ul className="border-t border-hair-light dark:border-hair-dark">
            {SERVICES.map((s, i) => <ServiceRow key={s.n} service={s} index={i} />)}
          </ul>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="py-24 md:py-32 bg-ink/[0.02] dark:bg-paper/[0.02] border-y border-hair-light dark:border-hair-dark relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <SectionHeader number="003" kicker="Process">
              Four movements,<br /> each one deliberate.
            </SectionHeader>
          </Reveal>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-hair-light dark:bg-hair-dark border border-hair-light dark:border-hair-dark">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} as="li" delay={i * 80}>
                <div className="relative h-full bg-paper dark:bg-ink p-8 md:p-10 group
                                transition-colors duration-500 ease-reveal overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                  transition-opacity duration-500 pointer-events-none"
                       style={{
                         background: 'linear-gradient(135deg, #1B4DFF 0%, #4F74FF 45%, #22B8B0 100%)',
                       }} />
                  <div className="relative z-10">
                    <div className="font-mono text-xs tracking-widest2 text-cobalt group-hover:text-paper/80 mb-8 transition-colors">{p.n}</div>
                    <h3 className="font-display font-bold text-3xl tracking-tightest mb-4 text-ink dark:text-paper group-hover:text-paper transition-colors">{p.title}</h3>
                    <p className="text-base leading-relaxed text-ink/60 dark:text-paper/60 group-hover:text-paper/85 transition-colors">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 lg:gap-16 items-start">
            <Reveal className="col-span-12 lg:col-span-3">
              <div className="section-num">004 / Studio</div>
            </Reveal>
            <div className="col-span-12 lg:col-span-9">
              <Reveal delay={80}>
                <p className="font-display font-bold text-[clamp(1.75rem,3.8vw,3.25rem)] leading-snug2 tracking-tightest max-w-4xl">
                  We started Nex Wave because we were tired of watching good businesses
                  <span className="text-gradient"> drown in software that didn't fit</span>.
                  Our answer was simple: build small, build sharp, and hand over systems
                  your team can actually own.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mt-16">
                {[
                  ['Continuity', 'The same two engineers stay on your project from kickoff to handover. No rotating cast.'],
                  ['Restraint',  'We default to boring technology. Postgres over the flavour of the month. Boring is a feature.'],
                  ['Craft',      'Design and engineering review each other weekly. Polish is a discipline, not an afterthought.'],
                  ['Honesty',    'If we’re not the right studio for your project, we’ll say so on the first call.'],
                ].map(([title, body], i) => (
                  <Reveal key={title} delay={i * 80}>
                    <div className="pt-6 border-t border-hair-light dark:border-hair-dark gradient-border-b">
                      <h4 className="font-display font-bold text-2xl tracking-tighter2 mb-3">{title}</h4>
                      <p className="text-base leading-relaxed text-ink/60 dark:text-paper/60">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="py-24 md:py-32 relative overflow-hidden
                          bg-ink text-paper dark:bg-paper dark:text-ink transition-colors">
        <div className="absolute inset-0 pointer-events-none"
             style={{
               background: 'radial-gradient(60% 80% at 20% 30%, rgba(27,77,255,0.30), transparent 60%),' +
                           'radial-gradient(50% 70% at 80% 70%, rgba(34,184,176,0.22), transparent 60%)',
               mixBlendMode: 'screen',
             }}
             aria-hidden="true"
        />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-12 gap-6">
            <Reveal className="col-span-12 md:col-span-3">
              <div className="font-mono text-[11px] uppercase tracking-widest2 text-cobalt">005 / Client</div>
            </Reveal>
            <Reveal as="blockquote" delay={80} className="col-span-12 md:col-span-9">
              <p className="font-display font-bold text-[clamp(1.75rem,4.5vw,3.75rem)] leading-snug2 tracking-tightest">
                "They rebuilt our inventory system in ten weeks.<br />
                <span className="text-gradient">Twenty hours a week came back</span> to my ops team."
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <div className="w-10 h-px bg-gradient-to-r from-cobalt to-teal" />
                <span className="font-mono text-xs uppercase tracking-widest2">Sarah J. — RetailFlow</span>
              </footer>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-24 md:py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6">
            <Reveal className="col-span-12 md:col-span-3">
              <div className="section-num">006 / FAQ</div>
              <p className="mt-6 text-base text-ink/60 dark:text-paper/60 max-w-[16rem] leading-relaxed">
                The questions we get on nearly every first call.
              </p>
            </Reveal>
            <div className="col-span-12 md:col-span-9">
              <ul className="border-t border-hair-light dark:border-hair-dark">
                {FAQS.map((f, i) => <FaqRow key={i} index={i} q={f.q} a={f.a} />)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-24 md:py-32 border-t border-hair-light dark:border-hair-dark relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 lg:gap-16">
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <div className="section-num mb-8">007 / Contact</div>
                <h2 className="font-display font-bold tracking-tightest leading-display text-[clamp(2.5rem,6vw,5rem)]">
                  Tell us<br />what you're<br /><span className="text-gradient">building.</span>
                </h2>
                <p className="mt-8 text-lg text-ink/60 dark:text-paper/60 leading-relaxed max-w-md">
                  The best first step is a 30-minute call. Bring your problem,
                  we'll bring questions and a rough shape of what it takes.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <ul className="mt-12 border-t border-hair-light dark:border-hair-dark">
                  {[
                    { icon: <Mail className="w-4 h-4" />,      label: 'Email',     value: 'nexwave.lk@gmail.com', href: 'mailto:nexwave.lk@gmail.com',     hover: 'group-hover:text-cobalt' },
                    { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', value: '@nexwave.lk',          href: 'https://instagram.com/nexwave.lk', hover: 'group-hover:text-amber' },
                    { icon: <Briefcase className="w-4 h-4" />, label: 'Portfolio', value: 'fiverr.com/nexwave',   href: 'https://www.fiverr.com/s/RV7NgxV', hover: 'group-hover:text-teal' },
                  ].map((c) => (
                    <li key={c.label} className="border-b border-hair-light dark:border-hair-dark">
                      <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                         rel="noopener noreferrer"
                         className="py-5 flex items-center gap-5 group relative overflow-hidden">
                        <span className="text-ink/60 dark:text-paper/60 group-hover:text-cobalt transition-colors duration-200">{c.icon}</span>
                        <span className="kicker w-20">{c.label}</span>
                        <span className={`flex-1 font-mono text-sm ${c.hover} transition-colors duration-200`}>{c.value}</span>
                        <ArrowUpRight className="w-4 h-4 text-ink/30 dark:text-paper/30 group-hover:text-cobalt transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500
                                         bg-gradient-to-r from-cobalt/5 via-teal/5 to-transparent pointer-events-none" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:pl-10">
              <Reveal delay={180}><ContactForm /></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-hair-light dark:border-hair-dark relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <WaveRule />
          <div className="py-12 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <img src="/nexwave.png" alt="Nex Wave" className="h-10 w-auto mb-6" />
              <p className="font-display font-bold text-2xl tracking-tighter2 leading-tight max-w-sm">
                A small studio building software with <span className="text-gradient">restraint</span>.
              </p>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <div className="kicker mb-4">Sitemap</div>
              <ul className="space-y-2.5">
                {['Work','Process','Studio','FAQ','Contact'].map((x) => (
                  <li key={x}>
                    <a href={`#${x.toLowerCase()}`}
                       className="text-base text-ink/70 dark:text-paper/70 hover:text-cobalt transition-colors duration-200 link-underline">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-4">
              <div className="kicker mb-4">Subscribe</div>
              <form className="flex items-end gap-3 border-b border-hair-light dark:border-hair-dark focus-within:border-cobalt transition-colors duration-200 pb-2"
                    onSubmit={(e) => e.preventDefault()}>
                <input type="email" required placeholder="you@company.com"
                       className="flex-1 bg-transparent border-0 outline-none text-base placeholder:text-ink/40 dark:placeholder:text-paper/40" />
                <button type="submit" aria-label="Subscribe" className="text-cobalt hover:text-ink dark:hover:text-paper transition-colors duration-200">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="kicker mt-3">Occasional notes. No spam.</p>
            </div>
          </div>
          <div className="py-6 border-t border-hair-light dark:border-hair-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
              © {new Date().getFullYear()} Nex Wave — All rights reserved
            </div>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/40 dark:text-paper/40">
                Set in Satoshi &amp; JetBrains Mono
              </span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="font-mono text-[10px] uppercase tracking-widest2 text-gradient hover:opacity-70 transition-opacity duration-200 flex items-center gap-2">
                Top <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}