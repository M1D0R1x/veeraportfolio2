"use client"

import { useActiveSection, SectionName } from "@/hooks/use-active-section"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
    const { activeSection, scrollToSection } = useActiveSection()
    const { theme, setTheme } = useTheme()

    const sections: { name: string; id: SectionName }[] = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Certifications", id: "certifications" },
        { name: "Achievements", id: "achievements" },
        { name: "Contact", id: "contact" },
    ]

    return (
        <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-xl font-bold text-primary">
                    <a onClick={() => scrollToSection("home")} className="cursor-pointer">
                        Portfolio
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`text-foreground/80 hover:text-primary transition-colors ${
                                activeSection === section.id ? "text-primary font-semibold" : ""
                            }`}
                        >
                            {section.name}
                        </button>
                    ))}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </nav>
    )
}