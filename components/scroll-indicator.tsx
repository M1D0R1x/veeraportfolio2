"use client"

import { useActiveSection, type SectionName } from "@/hooks/use-active-section"
import { motion } from "framer-motion"

export default function ScrollIndicator() {
    const { activeSection, scrollToSection } = useActiveSection()

    const sections: { id: SectionName; label: string }[] = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "certifications", label: "Certifications" },
        { id: "achievements", label: "Achievements" },
        { id: "contact", label: "Contact" },
    ]

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
            <div className="flex flex-col items-center space-y-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group relative flex items-center"
                        aria-label={`Scroll to ${section.label} section`}
                    >
            <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-sm">
              {section.label}
            </span>
                        <div className="w-3 h-3 rounded-full border border-primary/50 relative">
                            {activeSection === section.id && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="absolute inset-0.5 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

