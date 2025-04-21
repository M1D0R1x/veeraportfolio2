import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ScrollToTop from "@/components/scroll-to-top"
import ScrollIndicator from "@/components/scroll-indicator"
import Navbar from "@/components/navbar";

export default function Home() {
  return (
      <main className="min-h-screen">
          <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <ScrollToTop />
        <ScrollIndicator />
      </main>
  )
}

