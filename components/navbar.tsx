"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Import the useActiveSection hook at the top
import { useActiveSection } from "@/hooks/use-active-section"

// Update the Navbar component to use the hook
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { activeSection, scrollToSection } = useActiveSection()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const navLinks = [
        { name: "Home", href: "home" },
        { name: "About", href: "about" },
        { name: "Skills", href: "skills" },
        { name: "Projects", href: "projects" },
        { name: "Contact", href: "contact" },
    ]

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        scrollToSection(href)
        setIsMenuOpen(false)
    }

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <a href="#home" className="text-2xl font-bold text-primary" onClick={(e) => handleNavClick(e, "home")}>
                    Portfolio
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={`#${link.href}`}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`transition-colors ${
                                activeSection === link.href ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <ModeToggle />
                </nav>

                {/* Mobile Navigation Button */}
                <div className="flex items-center md:hidden">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2" aria-label="Toggle menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-background/95 backdrop-blur-md"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={`#${link.href}`}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`py-2 transition-colors ${
                                        activeSection === link.href ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
                                    }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

