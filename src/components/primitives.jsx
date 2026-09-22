import React from 'react'
import { useReveal } from '../lib/hooks'

/* ============================================================
   Reveal — scroll-triggered fade + slide-up
   Usage: <Reveal delay={120}>…</Reveal>
   ============================================================ */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
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

/* ============================================================
   WaveRule — brand motif as a hairline divider
   ============================================================ */
export function WaveRule({ flip = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={`w-full h-6 text-hair-light dark:text-hair-dark ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0,12 C150,0 300,24 450,12 C600,0 750,24 900,12 C1050,0 1150,20 1200,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}

/* ============================================================
   Field — labeled form input, editorial underline style
   ============================================================ */
export function Field({ label, placeholder, type = 'text', textarea = false, id, ...rest }) {
  const base = `w-full bg-transparent border-0 border-b border-hair-light dark:border-hair-dark
                focus:border-cobalt transition-colors duration-300 outline-none
                py-3 text-base font-sans text-ink dark:text-paper
                placeholder:text-ink/30 dark:placeholder:text-paper/25`
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-')
  return (
    <label htmlFor={fieldId} className="block">
      <span className="kicker">{label}</span>
      <div className="mt-2">
        {textarea ? (
          <textarea id={fieldId} rows="4" placeholder={placeholder} className={`${base} resize-none`} {...rest} />
        ) : (
          <input id={fieldId} type={type} placeholder={placeholder} className={base} {...rest} />
        )}
      </div>
    </label>
  )
}

/* ============================================================
   SectionHeader — numbered kicker + display title
   ============================================================ */
export function SectionHeader({ number, kicker, children, align = 'left' }) {
  const isCenter = align === 'center'
  return (
    <header className={`grid grid-cols-12 gap-6 mb-16 md:mb-24 ${isCenter ? 'text-center' : ''}`}>
      <div className={`col-span-12 ${isCenter ? '' : 'md:col-span-3'}`}>
        <div className="section-num">{number} / {kicker}</div>
      </div>
      <div className={`col-span-12 ${isCenter ? '' : 'md:col-span-9'}`}>
        <h2 className="font-display font-normal tracking-tightest leading-display
                       text-[clamp(2rem,5vw,4.5rem)] max-w-3xl
                       mx-auto data-[align=left]:mx-0"
            data-align={align}>
          {children}
        </h2>
      </div>
    </header>
  )
}