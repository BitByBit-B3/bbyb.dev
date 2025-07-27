"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import { ScrollAnimation } from "./scroll-animation"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Thank you for your inquiry! We'll get back to you within 24 hours.")
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error || 'Failed to send message'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section
      id="contact"
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] border border-white/10 rounded-full animate-rotate-slow" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollAnimation className="text-center mb-12 lg:mb-20">
          <div className="glass rounded-full px-4 lg:px-6 py-2 lg:py-3 inline-flex items-center mb-6 lg:mb-8">
            <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5 text-white mr-2 lg:mr-3" />
            <span className="text-xs lg:text-sm font-medium text-white/90 tracking-wide">Ready to Get Started?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 lg:mb-8 tracking-tight leading-tight">
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
              Extraordinary
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Transform your vision into reality with our expert team. Get a free consultation and project estimate today.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <ScrollAnimation className="lg:col-span-1 order-2 lg:order-1" delay={200}>
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-white">Get In Touch</h3>
                <div className="space-y-4 lg:space-y-6">
                  <a
                    href="mailto:contact@bbyb.dev"
                    className="flex items-center space-x-3 lg:space-x-4 group apple-hover glass rounded-xl p-4 lg:p-5 transition-all duration-300 hover:bg-white/20"
                  >
                    <div className="p-2 lg:p-3 bg-white/15 rounded-lg lg:rounded-xl group-hover:bg-white/25 transition-colors duration-300 flex-shrink-0">
                      <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs lg:text-sm text-gray-300">Email us</p>
                      <span className="text-white font-medium text-sm lg:text-base break-all">contact@bbyb.dev</span>
                    </div>
                  </a>

                  <a
                    href="tel:+94713771561"
                    className="flex items-center space-x-3 lg:space-x-4 group apple-hover glass rounded-xl p-4 lg:p-5 transition-all duration-300 hover:bg-white/20"
                  >
                    <div className="p-2 lg:p-3 bg-white/15 rounded-lg lg:rounded-xl group-hover:bg-white/25 transition-colors duration-300 flex-shrink-0">
                      <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-gray-300">Call us</p>
                      <span className="text-white font-medium text-sm lg:text-base">+94 71 377 1561</span>
                    </div>
                  </a>

                  <div className="flex items-center space-x-3 lg:space-x-4 glass rounded-xl p-4 lg:p-5">
                    <div className="p-2 lg:p-3 bg-white/15 rounded-lg lg:rounded-xl flex-shrink-0">
                      <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-gray-300">Location</p>
                      <span className="text-white font-medium text-sm lg:text-base">Colombo, Sri Lanka</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl lg:rounded-2xl p-5 lg:p-6">
                <div className="flex items-center mb-3 lg:mb-4">
                  <Clock className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 text-white flex-shrink-0" />
                  <h4 className="text-base lg:text-lg font-semibold text-white">Response Time</h4>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                  We typically respond to all inquiries within 24 hours. For urgent projects, we're available for
                  immediate consultation.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation className="lg:col-span-2 order-1 lg:order-2" delay={400}>
            <Card className="glass-card border-0 shadow-2xl bg-white/98 backdrop-blur-lg rounded-xl lg:rounded-2xl overflow-hidden">
              <CardHeader className="p-6 lg:p-8">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">Start Your Project</CardTitle>
                <p className="text-gray-600 mt-2 text-sm lg:text-base leading-relaxed">
                  Tell us about your project and we'll provide a detailed proposal within 48 hours.
                </p>
              </CardHeader>
              <CardContent className="p-6 lg:p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="group space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-800 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-gray-800 hover:border-gray-400 rounded-lg transition-all duration-300 bg-white text-gray-900 text-base focus:ring-2 focus:ring-gray-800/20"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="group space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-800 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-gray-800 hover:border-gray-400 rounded-lg transition-all duration-300 bg-white text-gray-900 text-base focus:ring-2 focus:ring-gray-800/20"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <Label htmlFor="company" className="text-sm font-semibold text-gray-800 block">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-gray-800 hover:border-gray-400 rounded-lg transition-all duration-300 bg-white text-gray-900 text-base focus:ring-2 focus:ring-gray-800/20"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="group space-y-2">
                      <Label htmlFor="service" className="text-sm font-semibold text-gray-800 block">
                        Service Needed *
                      </Label>
                      <Select onValueChange={(value) => handleChange("service", value)} required>
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-gray-800 hover:border-gray-400 rounded-lg bg-white text-gray-900 text-base focus:ring-2 focus:ring-gray-800/20 transition-all duration-200 ease-in-out hover:shadow-md focus:shadow-lg group">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-lg shadow-xl border-2 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-200">
                          <SelectItem value="web-app" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Web Application</SelectItem>
                          <SelectItem value="mobile-app" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Mobile Application</SelectItem>
                          <SelectItem value="ecommerce" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">E-Commerce Solution</SelectItem>
                          <SelectItem value="ai-ml" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">AI/ML Development</SelectItem>
                          <SelectItem value="cloud" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Cloud Infrastructure</SelectItem>
                          <SelectItem value="enterprise" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Enterprise System</SelectItem>
                          <SelectItem value="design" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">UI/UX Design</SelectItem>
                          <SelectItem value="consulting" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Technical Consulting</SelectItem>
                          <SelectItem value="other" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="group space-y-2">
                      <Label htmlFor="budget" className="text-sm font-semibold text-gray-800 block">
                        Project Budget
                      </Label>
                      <Select onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-gray-800 hover:border-gray-400 rounded-lg bg-white text-gray-900 text-base focus:ring-2 focus:ring-gray-800/20 transition-all duration-200 ease-in-out hover:shadow-md focus:shadow-lg group">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-lg shadow-xl border-2 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-200">
                          <SelectItem value="10k-25k" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">$10K - $25K</SelectItem>
                          <SelectItem value="25k-50k" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">$25K - $50K</SelectItem>
                          <SelectItem value="50k-100k" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">$50K - $100K</SelectItem>
                          <SelectItem value="100k-250k" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">$100K - $250K</SelectItem>
                          <SelectItem value="250k+" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">$250K+</SelectItem>
                          <SelectItem value="discuss" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Let's Discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <Label htmlFor="timeline" className="text-sm font-semibold text-gray-800 block">
                      Project Timeline
                    </Label>
                    <Select onValueChange={(value) => handleChange("timeline", value)}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-gray-800 hover:border-gray-400 rounded-lg bg-white text-gray-900 text-base focus:ring-2 focus:ring-gray-800/20 transition-all duration-200 ease-in-out hover:shadow-md focus:shadow-lg group">
                        <SelectValue placeholder="When do you need this completed?" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 rounded-lg shadow-xl border-2 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-200">
                        <SelectItem value="urgent" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Urgent (1-2 weeks)</SelectItem>
                        <SelectItem value="1-2months" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">1-2 Months</SelectItem>
                        <SelectItem value="3-6months" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">3-6 Months</SelectItem>
                        <SelectItem value="6months+" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">6+ Months</SelectItem>
                        <SelectItem value="flexible" className="hover:bg-gray-50 focus:bg-gray-100 transition-colors duration-150">Flexible Timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="group space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-800 block">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your project goals, target audience, key features, and any specific requirements..."
                      className="border-2 border-gray-200 focus:border-gray-800 hover:border-gray-400 rounded-lg min-h-[120px] lg:min-h-[140px] transition-all duration-300 bg-white text-gray-900 text-base focus:ring-2 focus:ring-gray-800/20 resize-y"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-gray-900 via-black to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-gray-800 text-white text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                          Sending Your Request...
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          Get Free Consultation
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
