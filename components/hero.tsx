"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, GitlabIcon as GitHub, Linkedin, Mail } from "lucide-react"
import { useActiveSection } from "@/hooks/use-active-section"

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollToSection } = useActiveSection()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return
            const { clientX, clientY } = e
            const { width, height, left, top } = ref.current.getBoundingClientRect()

            const x = (clientX - left) / width - 0.5
            const y = (clientY - top) / height - 0.5

            ref.current.style.setProperty("--mouse-x", `${x * 20}px`)
            ref.current.style.setProperty("--mouse-y", `${y * 20}px`)
        }

        document.addEventListener("mousemove", handleMouseMove)
        return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        scrollToSection(href)
    }

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
            ref={ref}
        >
            <div
                className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(var(--primary-rgb), 0.8) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

            <div
                className="absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] -z-10"
                style={{
                    transform: "translate(calc(var(--mouse-x, 0) * -1), calc(var(--mouse-y, 0) * -1))",
                }}
            />

            <div className="container mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Full-Stack Developer
              </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                            I specialize in building robust web applications with modern technologies like Django, Java, and PostgreSQL.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        <Button size="lg" asChild>
                            <a href="#projects" onClick={(e) => handleNavClick(e, "projects")}>
                                View My Work
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                                Contact Me
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex justify-center space-x-6"
                    >
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com/M1D0R1x" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <GitHub className="h-6 w-6" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://www.linkedin.com/in/saviti-veera-babu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="mailto:veerababusaviti21@gmail.com" aria-label="Email">
                                <Mail className="h-6 w-6" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <Button variant="ghost" size="icon" asChild>
                    <a href="#about" onClick={(e) => handleNavClick(e, "about")} aria-label="Scroll down">
                        <ArrowDown className="h-6 w-6" />
                    </a>
                </Button>
            </div>
        </section>
    )
}

