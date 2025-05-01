"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function About() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <section id="about" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                        <div className="w-20 h-1 bg-primary mx-auto"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div variants={itemVariants} className="relative">
                            <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-lg shadow-xl">
                                <Image
                                    src="/images/photo.jpg"
                                    alt="Developer Portrait"
                                    width={500}
                                    height={500}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-60"></div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold mb-4">Full-Stack Developer</h3>
                            <p className="text-foreground/80 mb-6">
                                I’m Saviti Veerababu, a Computer Science student at Lovely Professional University, passionate about solving real-world problems through technology. I build web applications using modern technologies like Django, Python, Java, and PostgreSQL, focusing on creating user-friendly and impactful solutions.
                            </p>
                            <p className="text-foreground/80 mb-6">
                                My journey in software development has honed my skills in Python, Java, C/C++, JavaScript, and SQL, with hands-on experience in frameworks like Django and tools like Git and Maven.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <p className="font-medium">Name:</p>
                                    <p className="text-foreground/80">Saviti Veerababu</p>
                                </div>
                                <div>
                                    <p className="font-medium">Email:</p>
                                    <p className="text-foreground/80">veerababusaviti21@gmail.com</p>
                                </div>
                                <div>
                                    <p className="font-medium">Location:</p>
                                    <p className="text-foreground/80">Phagwara, Punjab, India</p>
                                </div>
                                <div>
                                    <p className="font-medium">Availability:</p>
                                    <p className="text-foreground/80">Available for hire</p>
                                </div>
                            </div>
                            <Button className="flex items-center gap-2" asChild>
                                <a href="resumes/Veera_resume.pdf" download>
                                    <FileText className="h-4 w-4" />
                                    Download Resume
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}