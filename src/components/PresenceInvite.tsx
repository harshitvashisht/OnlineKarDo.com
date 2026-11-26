import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Globe2, Mail, X } from 'lucide-react'
import { formspreeEndpoint } from '../config'

export default function PresenceInvite() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const hero = document.getElementById('homepage-hero')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!dismissed && entry.boundingClientRect.bottom <= 0)
    }, { threshold: 0 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [dismissed])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('We couldn’t send your request. Please try again.')
      setStatus('sent')
    } catch (submitError) {
      setStatus('error')
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.')
    }
  }

  if (!visible) return null

  return (
    <aside className="fixed bottom-0 left-1/2 z-[90] w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 pb-2 sm:bottom-3 sm:w-[calc(100%-1.5rem)]" aria-label="OnlineKarDo enquiry">
      <section className="relative overflow-hidden rounded-t-[24px] border border-white/25 bg-gradient-to-br from-[#07345c] via-[#075b83] to-[#1739ad] text-white shadow-[0_18px_70px_rgba(0,13,38,.38)] sm:rounded-[26px]">
        <button type="button" aria-label="Close invitation" onClick={() => { setDismissed(true); setVisible(false) }} className="absolute right-2 top-2 z-20 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-[#112d5b]/80 text-white transition hover:bg-[#0a1d3c] sm:right-3 sm:top-3"><X size={17} /></button>
        <div className="grid gap-3 p-4 pr-12 sm:p-5 sm:pr-14 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-6 md:px-7 md:py-5">
          <div className="relative">
            <div className="absolute -left-10 -top-12 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl" />
            <span className="relative inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.18em] text-cyan-100"><Globe2 size={12} /> OnlineKarDo · Business setup</span>
            <h2 id="presence-invite-title" className="mt-1.5 max-w-md font-display text-xl font-semibold leading-[1.02] tracking-[-.05em] text-white sm:text-2xl">Make it easier for customers to find you.</h2>
            <p className="mt-1.5 hidden max-w-sm text-xs leading-relaxed text-white/75 sm:block">Share your email and we’ll follow up about a practical next step.</p>
          </div>

          <div className="relative">
            {status === 'sent' ? (
              <div className="flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 p-3" role="status"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#72e1dc] text-[#083047]"><Check size={17} /></span><span><b className="block text-sm">Request received.</b><small className="text-xs text-white/75">We’ll follow up using your email.</small></span></div>
            ) : (
              <form onSubmit={submit} className="space-y-2">
                <input type="hidden" name="_subject" value="OnlineKarDo website setup request" />
                <input type="hidden" name="Enquiry type" value="Homepage email request" />
                <input type="hidden" name="Source" value="Homepage fixed enquiry panel" />
                <label className="sr-only" htmlFor="presence-invite-email">Your email address</label>
                <div className="flex flex-col gap-2 rounded-xl border border-white/30 bg-white p-1.5 sm:flex-row sm:items-center">
                  <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e9f7f8] text-[#0c6980] sm:grid"><Mail size={17} /></span>
                  <input id="presence-invite-email" type="email" name="email" required autoComplete="email" placeholder="Your email address" className="min-h-10 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm text-[#132c3d] outline-none placeholder:text-[#82929a] focus:ring-0" />
                  <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#087bca] to-[#2144d8] px-4 text-xs font-extrabold uppercase tracking-[.07em] text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70">{status === 'sending' ? 'Sending…' : 'Let’s talk'} <ArrowUpRight size={14} /></button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <label className="flex cursor-pointer items-start gap-1.5 text-[10px] leading-relaxed text-white/75"><input type="checkbox" name="contact_consent" value="yes" required className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#72e1dc]" /><span>I agree to be contacted about my request.</span></label>
                  {error && <p className="text-xs font-semibold text-rose-100" role="alert">{error}</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </aside>
  )
}
