"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Ensure component is mounted before rendering to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" disabled>
                <Sun className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    // Simple toggle between dark and light
    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="focus-visible:ring-0">
            {resolvedTheme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

