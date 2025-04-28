"use client"

import { useState, useEffect } from "react"

export type SectionName = "home" | "about" | "skills" | "projects" | "certifications" | "achievements" | "contact"

export function useActiveSection() {
    const [activeSection, setActiveSection] = useState<SectionName>("home")
    const [scrolling, setScrolling] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (scrolling) return

            const sections = document.querySelectorAll("section[id]")
            const scrollPosition = window.scrollY + 100 // offset for header

            let current: SectionName = "home"
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop
                const sectionHeight = section.clientHeight
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.id as SectionName
                }
            })

            setActiveSection(current)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrolling])

    const scrollToSection = (sectionId: string) => {
        setScrolling(true)
        const element = document.getElementById(sectionId)

        if (element) {
            const headerOffset = 80 // Height of your fixed header
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })

            // Set active section after scrolling
            setTimeout(() => {
                setActiveSection(sectionId as SectionName)
                setScrolling(false)
            }, 500)
        }
    }

    return { activeSection, scrollToSection }
}