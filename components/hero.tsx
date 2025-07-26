"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Sparkles, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Glassmorphism background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Floating glass orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute glass rounded-full animate-float animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Interactive mouse follower */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="animate-scale-in">
            <div className="glass rounded-full px-6 py-3 inline-flex items-center mb-8">
              <Zap className="h-5 w-5 text-white mr-3 animate-pulse" />
              <span className="text-sm font-medium text-white/90 tracking-wide">Premium Software Solutions</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
              BitByBit
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 animate-slide-up stagger-1">
            We transform ambitious ideas into
            <span className="text-white font-semibold"> exceptional digital experiences</span>
            <br />
            that drive real business growth
          </p>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-slide-up stagger-2">
            From startups to enterprises, we deliver cutting-edge solutions that scale with your success
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up stagger-3">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white text-lg px-10 py-7 rounded-2xl font-semibold group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Start Your Project
              <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="glass border-white/30 text-white hover:bg-white/10 text-lg px-10 py-7 rounded-2xl apple-hover group bg-transparent"
          >
            <a href="https://github.com/BitByBit-B3" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              View Our Work
            </a>
          </Button>
        </div>

        <div className="animate-bounce animate-slide-up stagger-4">
          <div
            className="glass rounded-full p-4 inline-block cursor-pointer hover:bg-white/10 transition-colors"
            onClick={scrollToContact}
          >
            <ArrowDown className="h-6 w-6 text-white/80" />
          </div>
        </div>
      </div>
    </section>
  )
}
