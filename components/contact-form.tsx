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
      className="py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-rotate-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollAnimation className="text-center mb-20">
          <div className="glass rounded-full px-6 py-3 inline-flex items-center mb-8">
            <MessageCircle className="h-5 w-5 text-white mr-3" />
            <span className="text-sm font-medium text-white/90 tracking-wide">Ready to Get Started?</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight">
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
              Extraordinary
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your vision into reality with our expert team. Get a free consultation and project estimate today.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <ScrollAnimation className="lg:col-span-1" delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
                <div className="space-y-6">
                  <a
                    href="mailto:contact@bbyb.dev"
                    className="flex items-center space-x-4 group apple-hover glass rounded-xl p-4"
                  >
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email us</p>
                      <span className="text-white font-medium">contact@bbyb.dev</span>
                    </div>
                  </a>

                  <a
                    href="tel:+94713771561"
                    className="flex items-center space-x-4 group apple-hover glass rounded-xl p-4"
                  >
                    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call us</p>
                      <span className="text-white font-medium">+94 71 377 1561</span>
                    </div>
                  </a>

                  <div className="flex items-center space-x-4 glass rounded-xl p-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <span className="text-white font-medium">Colombo, Sri Lanka</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-3 text-white" />
                  <h4 className="text-lg font-semibold">Response Time</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  We typically respond to all inquiries within 24 hours. For urgent projects, we're available for
                  immediate consultation.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation className="lg:col-span-2" delay={400}>
            <Card className="glass-card border-0 shadow-2xl rounded-3xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">Start Your Project</CardTitle>
                <p className="text-gray-700 mt-2">
                  Tell us about your project and we'll provide a detailed proposal within 48 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="mt-2 border-2 border-gray-200 focus:border-black rounded-xl transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="group">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-2 border-2 border-gray-200 focus:border-black rounded-xl transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-500"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <Label htmlFor="company" className="text-sm font-semibold text-gray-700">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="mt-2 border-2 border-gray-200 focus:border-black rounded-xl transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-500"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <Label htmlFor="service" className="text-sm font-semibold text-gray-700">
                        Service Needed *
                      </Label>
                      <Select onValueChange={(value) => handleChange("service", value)} required>
                        <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-black rounded-xl bg-white text-gray-800">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-xl bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
                          <SelectItem value="web-app">Web Application</SelectItem>
                          <SelectItem value="mobile-app">Mobile Application</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce Solution</SelectItem>
                          <SelectItem value="ai-ml">AI/ML Development</SelectItem>
                          <SelectItem value="cloud">Cloud Infrastructure</SelectItem>
                          <SelectItem value="enterprise">Enterprise System</SelectItem>
                          <SelectItem value="design">UI/UX Design</SelectItem>
                          <SelectItem value="consulting">Technical Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="group">
                      <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">
                        Project Budget
                      </Label>
                      <Select onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-black rounded-xl bg-white text-gray-800">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-xl bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
                          <SelectItem value="1k-5k">$1K - $5K</SelectItem>
                          <SelectItem value="5k-10k">$5K - $10K</SelectItem>
                          <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                          <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                          <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                          <SelectItem value="custom">Custom Budget</SelectItem>
                          <SelectItem value="discuss">Let's Discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="group">
                    <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700">
                      Project Timeline
                    </Label>
                    <Select onValueChange={(value) => handleChange("timeline", value)}>
                      <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-black rounded-xl bg-white text-gray-800">
                        <SelectValue placeholder="When do you need this completed?" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-xl bg-white/80 border border-gray-200 shadow-xl rounded-2xl">
                        <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                        <SelectItem value="1-2months">1-2 Months</SelectItem>
                        <SelectItem value="3-6months">3-6 Months</SelectItem>
                        <SelectItem value="6months+">6+ Months</SelectItem>
                        <SelectItem value="flexible">Flexible Timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="group">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your project goals, target audience, key features, and any specific requirements..."
                      className="mt-2 border-2 border-gray-200 focus:border-black rounded-2xl min-h-[120px] transition-all duration-300 bg-white text-gray-800 placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-br from-gray-900 to-black text-white text-lg py-6 rounded-xl font-semibold group relative overflow-hidden disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Sending Your Request...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
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
