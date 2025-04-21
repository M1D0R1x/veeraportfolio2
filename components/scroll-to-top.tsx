"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
// Add the import for useActiveSection at the top
import { useActiveSection } from "@/hooks/use-active-section"

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const { scrollToSection } = useActiveSection()

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault()
        scrollToSection("home")
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <Button size="icon" className="rounded-full shadow-lg" onClick={scrollToTop} aria-label="Scroll to top">
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

