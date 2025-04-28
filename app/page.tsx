import Hero from "@/components/hero"
import About from "@/components/about"
import Certifications from "@/components/certifications"
import Achievements from "@/components/achievements"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ScrollToTop from "@/components/scroll-to-top"
import ScrollIndicator from "@/components/scroll-indicator"
import Navbar from "@/components/navbar"

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Certifications />
            <Achievements />
            <Skills />
            <Projects />
            <Contact />
            <ScrollToTop />
            <ScrollIndicator />
        </main>
    )
}