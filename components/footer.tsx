import { Github, Linkedin, Heart, Code, X } from "lucide-react"
import { ScrollAnimation } from "./scroll-animation"

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-50 to-white border-t border-gray-200 py-16 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-4xl font-black text-black mb-3 apple-hover cursor-default">BitByBit</h3>
              <p className="text-gray-600 flex items-center justify-center md:justify-start text-lg">
                Premium Software Solutions
                <Code className="ml-2 h-5 w-5 text-gray-400" />
              </p>
              <p className="text-gray-500 mt-1">Colombo, Sri Lanka</p>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://github.com/BitByBit-B3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-dark rounded-xl text-gray-700 hover:text-black transition-all duration-300 apple-hover"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/bitbybit-b3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-dark rounded-xl text-gray-700 hover:text-black transition-all duration-300 apple-hover"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/bitbybit_b3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-dark rounded-xl text-gray-700 hover:text-black transition-all duration-300 apple-hover"
              >
                <X className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 flex items-center justify-center text-lg">
              © 2025 BitByBit. All rights reserved. • Crafted with
              <Heart className="h-5 w-5 mx-2 text-red-500 animate-pulse" />
              for ambitious businesses
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  )
}
