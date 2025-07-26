"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Smartphone,
  Globe,
  ShoppingCart,
  Brain,
  Shield,
  Zap,
  Database,
  Cloud,
  Palette,
  BarChart3,
  Rocket,
  Settings,
} from "lucide-react"
import { ScrollAnimation } from "./scroll-animation"

const services = [
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Native iOS and Android apps that deliver exceptional user experiences and drive engagement across all devices.",
    tech: "React Native • Flutter • Swift • Kotlin",
    category: "Mobile",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Lightning-fast, responsive web applications built with modern frameworks for maximum performance and scalability.",
    tech: "React • Next.js • Vue • Angular",
    category: "Web",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Complete online stores with payment processing, inventory management, and analytics to maximize your revenue.",
    tech: "Shopify • WooCommerce • Custom Solutions",
    category: "E-Commerce",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Intelligent automation and data-driven insights that give your business a competitive edge in the market.",
    tech: "Python • TensorFlow • OpenAI • Custom Models",
    category: "AI/ML",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Scalable, secure cloud solutions that grow with your business and ensure 99.9% uptime for your applications.",
    tech: "AWS • Google Cloud • Azure • DevOps",
    category: "Cloud",
  },
  {
    icon: Database,
    title: "Enterprise Systems",
    description: "Robust backend systems and APIs that handle millions of requests while maintaining peak performance.",
    tech: "Node.js • Python • PostgreSQL • MongoDB",
    category: "Backend",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that convert visitors into customers and keep users coming back for more.",
    tech: "Figma • Adobe Creative Suite • Prototyping",
    category: "Design",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Real-time dashboards and business intelligence tools that turn your data into actionable insights.",
    tech: "Tableau • Power BI • Custom Dashboards",
    category: "Analytics",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions that protect your business and customer data from modern threats.",
    tech: "Security Audits • Penetration Testing • Compliance",
    category: "Security",
  },
  {
    icon: Rocket,
    title: "Digital Transformation",
    description: "Complete business modernization strategies that streamline operations and accelerate growth.",
    tech: "Process Automation • Legacy Migration • Training",
    category: "Strategy",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your existing applications and improve user experience with our optimization expertise.",
    tech: "Code Optimization • CDN • Caching • Monitoring",
    category: "Optimization",
  },
  {
    icon: Settings,
    title: "API Development",
    description:
      "Robust, scalable APIs that connect your systems and enable seamless integrations with third-party services.",
    tech: "REST • GraphQL • Microservices • Documentation",
    category: "Integration",
  },
]

export function Services() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollAnimation className="text-center mb-16">
          <div className="glass-dark rounded-full px-6 py-3 inline-flex items-center mb-8">
            <span className="text-sm font-medium text-gray-600 tracking-wide">Industry-Leading Solutions</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-8 tracking-tight">What We Create</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From concept to launch, we deliver solutions that drive measurable results and transform how your customers
            interact with your brand
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 50}>
              <Card className="glass-card hover:shadow-2xl transition-all duration-500 group apple-hover border-0 h-full">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-900 to-black rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">{service.description}</p>

                  <div className="text-xs font-mono text-gray-500 border-t border-gray-100 pt-4">{service.tech}</div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
