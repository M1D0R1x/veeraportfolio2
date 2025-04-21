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
                                    src="/placeholder.svg?height=500&width=500"
                                    alt="Developer Portrait"
                                    width={500}
                                    height={500}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-60"></div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-lg shadow-lg hidden md:flex items-center justify-center">
                                <span className="text-5xl font-bold text-primary">5+</span>
                                <span className="text-sm ml-1">
                  Years
                  <br />
                  Experience
                </span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold mb-4">Full-Stack Developer & Mobile App Developer</h3>
                            <p className="text-foreground/80 mb-6">
                                I&#39;m a passionate developer with expertise in building robust web applications and mobile experiences.
                                With a strong foundation in both frontend and backend technologies, I create seamless, user-friendly
                                solutions that solve real-world problems.
                            </p>
                            <p className="text-foreground/80 mb-6">
                                My journey in software development has equipped me with a diverse skill set spanning Python, Java, C++,
                                JavaScript, and more. I&#39;m particularly experienced with Django for web development and Kotlin for
                                Android applications.
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
                                    <p className="text-foreground/80">Jalandhar, Punjab, India</p>
                                </div>
                                <div>
                                    <p className="font-medium">Availability:</p>
                                    <p className="text-foreground/80">Available for hire</p>
                                </div>
                            </div>
                            <Button className="flex items-center gap-2" asChild>
                                <a href="#" download>
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

