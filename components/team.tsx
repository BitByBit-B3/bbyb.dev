"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { ScrollAnimation } from "./scroll-animation"

const teamMembers = [
  {
    name: "Methika Fernando",
    role: "Team Lead",
    description: "Team leader and backend specialist overseeing the entire development lifecycle and system architecture.",
    skills: ["Node.js", "Project Management", "System Architecture", "Backend Development"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "methika@bitbybit.dev",
    },
  },
  {
    name: "Thilina Rathnakumara",
    role: "Backend Development Lead",
    description: "Backend specialist focused on server-side development, APIs, and database management.",
    skills: ["Node.js", "Database Design", "API Development", "Server Architecture"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "thilina@bitbybit.dev",
    },
  },
  {
    name: "Tharun Devaraja",
    role: "UI/UX Design Lead",
    description: "Creative visionary who transforms complex ideas into intuitive, beautiful user experiences using Figma and contributes to frontend development.",
    skills: ["Figma", "Design Systems", "React", "Frontend Development"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "tharun@bitbybit.dev",
    },
  },
  {
    name: "Thanuka Perera",
    role: "Marketing Lead",
    description: "Marketing strategist driving brand awareness, user acquisition, and business growth initiatives.",
    skills: ["Digital Marketing", "Brand Strategy", "Content Creation", "Market Research"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "thanuka@bitbybit.dev",
    },
  },
  {
    name: "Sithumli Nanayakkara",
    role: "Frontend Development Lead",
    description: "Frontend specialist creating responsive, interactive user interfaces with modern web technologies.",
    skills: ["React", "TypeScript", "CSS/Tailwind", "Frontend Architecture"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "sithumli@bitbybit.dev",
    },
  },
]

export function Team() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-20 w-64 h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-l from-gray-200 to-gray-100 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-200 rounded-full animate-rotate-slow opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollAnimation className="text-center mb-16">
          <div className="glass-dark rounded-full px-6 py-3 inline-flex items-center mb-8">
            <span className="text-sm font-medium text-gray-600 tracking-wide">Meet the Experts</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-8 tracking-tight">Our Team</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A collective of passionate innovators, each bringing unique expertise to transform your vision into reality
          </p>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <Card className="glass-card hover:shadow-2xl transition-all duration-500 group apple-hover border-0 relative overflow-hidden w-80">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-8 relative z-10">
                  {/* Profile Initials */}
                  <div className="mb-6 relative">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-black text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.description}</p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200 group-hover:bg-gray-200 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links - Commented out for now */}
                  {/* <div className="flex justify-center space-x-4">
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 glass-dark rounded-lg text-gray-600 hover:text-black transition-all duration-300 apple-hover"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.github}
                      className="p-2 glass-dark rounded-lg text-gray-600 hover:text-black transition-all duration-300 apple-hover"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="p-2 glass-dark rounded-lg text-gray-600 hover:text-black transition-all duration-300 apple-hover"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="p-2 glass-dark rounded-lg text-gray-600 hover:text-black transition-all duration-300 apple-hover"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div> */}
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
