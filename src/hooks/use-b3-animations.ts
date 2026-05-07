"use client"

import { useEffect } from "react"
import type { RefObject } from "react"

export function useB3Observe() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    )
    document.querySelectorAll<HTMLElement>(".fade-up, .reveal-words").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function usePinScale(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = ref.current
    if (!section) return
    const content = section.querySelector<HTMLElement>(".pin-content")
    if (!content) return

    let rafId = 0
    let total = section.offsetHeight - window.innerHeight
    const onResize = () => { total = section.offsetHeight - window.innerHeight }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const rect = section.getBoundingClientRect()
        const scrolled = Math.min(Math.max(-rect.top, 0), total)
        const p = total > 0 ? scrolled / total : 0
        const scale = 0.75 + Math.min(p / 0.7, 1) * 0.25
        content.style.transform = `scale(${scale})`
        content.style.opacity = "1"
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [ref])
}

export function useHScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const wrap = ref.current
    if (!wrap) return
    const track = wrap.querySelector<HTMLElement>(".hscroll-track")
    if (!track) return

    let rafId = 0
    let total = wrap.offsetHeight - window.innerHeight
    let maxTx = track.scrollWidth - window.innerWidth
    const onResize = () => {
      total = wrap.offsetHeight - window.innerHeight
      maxTx = track.scrollWidth - window.innerWidth
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const rect = wrap.getBoundingClientRect()
        const scrolled = Math.min(Math.max(-rect.top, 0), total)
        const p = total > 0 ? scrolled / total : 0
        track.style.transform = `translate3d(${-p * maxTx}px, 0, 0)`
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [ref])
}

export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.25) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const onLeave = () => { el.style.transform = "translate(0,0)" }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [ref, strength])
}

export function useSpotlight(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const cards = container.querySelectorAll<HTMLElement>(".spotlight-card")
    const handlers: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = []
    cards.forEach((el: HTMLElement) => {
      const fn = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mx", (e.clientX - r.left) + "px")
        el.style.setProperty("--my", (e.clientY - r.top) + "px")
      }
      el.addEventListener("mousemove", fn)
      handlers.push({ el, fn })
    })
    return () => handlers.forEach(({ el, fn }) => el.removeEventListener("mousemove", fn))
  }, [containerRef])
}

export function useTilt(containerRef: RefObject<HTMLElement | null>, max = 8) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const cards = container.querySelectorAll<HTMLElement>("[data-tilt]")
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = []
    cards.forEach((el: HTMLElement) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.transform = `perspective(1000px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`
      }
      const leave = () => { el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)" }
      el.addEventListener("mousemove", move)
      el.addEventListener("mouseleave", leave)
      handlers.push({ el, move, leave })
    })
    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener("mousemove", move)
      el.removeEventListener("mouseleave", leave)
    })
  }, [containerRef, max])
}

export function useCounter() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-counter]")
    const observers: IntersectionObserver[] = []
    els.forEach((el) => {
      if (el.dataset.counted) return
      const to = parseFloat(el.dataset.counter || "0")
      const suffix = el.dataset.suffix || ""
      const duration = 1800
      const run = () => {
        el.dataset.counted = "1"
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.floor(eased * to).toLocaleString() + suffix
          if (p < 1) requestAnimationFrame(tick)
          else el.textContent = to.toLocaleString() + suffix
        }
        requestAnimationFrame(tick)
      }
      const obs = new IntersectionObserver((es) => {
        for (const e of es) if (e.isIntersecting) { run(); obs.unobserve(el) }
      }, { threshold: 0.4 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])
}
