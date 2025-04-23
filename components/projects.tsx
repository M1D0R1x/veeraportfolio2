"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X, Maximize2, Code, Globe } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"

type Project = {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    category: string[]
    demoUrl?: string
    codeUrl?: string
    details: string
    features: string[]
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("all")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    const projects: Project[] = [
        {
            id: 1,
            title: "Nihonow",
            description: "A full-stack web application for Japanese language learning, deployed on Vercel",
            image: "/images/nihonow.png", // Replace with your screenshot
            tags: ["Python", "Django", "HTML", "CSS", "JavaScript", "PostgreSQL", "Git"],
            category: ["web", "django"],
            demoUrl: "https://nihonow.vercel.app",
            details:
                "Nihonow is a full-stack web application designed to provide free Japanese language learning from beginner to advanced levels, deployed on Vercel.",
            features: [
                "Designed and developed using Django, providing free learning from beginner to advanced levels",
                "Integrated multimedia resources, quizzes, and flashcards for grammar, vocabulary, and Kanji mastery",
                "Used Ably for WebSocket communication to enable real-time updates",
            ],
        },
        {
            id: 2,
            title: "Chat Application",
            description: "A peer-to-peer chat application with real-time messaging, file transfers, and a Java Swing interface",
            image: "/images/chatapp.png", // Replace with your screenshot
            tags: ["Java", "Java Swing", "Socket Programming", "SQLite", "Maven", "Git"],
            category: ["java"],
            codeUrl: "https://github.com/M1D0R1x/Java_Chat_Application",
            details:
                "This chat application enables peer-to-peer real-time messaging with a user-friendly interface built using Java Swing.",
            features: [
                "Built using Java and Socket Programming, featuring a messaging interface with Java Swing",
                "Added file transfers, emoji support, and chat history clearing",
                "Integrated SQLite for persistent message storage, managed with Maven",
            ],
        },
        {
            id: 3,
            title: "Text and Speech to Indian Sign Language",
            description: "A web application converting text and speech into animated Indian Sign Language gestures, deployed on Vercel",
            image: "/images/animated.png", // Replace with your screenshot
            tags: ["Python", "Django", "PostgreSQL", "JavaScript"],
            category: ["web", "django"],
            demoUrl: "https://animatedsign-coral.vercel.app",
            details:
                "This web application converts text and speech inputs into animated Indian Sign Language (ISL) gestures, deployed on Vercel.",
            features: [
                "Developed using Django to convert inputs into ISL gestures",
                "Utilized WebKitSpeechRecognition for speech input and NLTK for text processing",
                "Integrated JavaScript for front-end animation rendering",
            ],
        },
        {
            id: 4,
            title: "FitFork",
            description: "A React-based web application for AI-driven personalized nutrition planning",
            image: "/images/fitfork.png",
            tags: ["React", "JavaScript", "Node.js", "Git"],
            category: ["web", "react"],
            demoUrl: "https://fitfork.vercel.app",
            codeUrl: "https://github.com/M1D0R1x/fitfork",
            details:
                "FitFork is a React-based web application under development, designed to integrate AI for generating personalized nutrition plans based on user health and preferences.",
            features: [
                "Built with React for a responsive and interactive user interface",
                "Implemented forms for collecting user health and dietary preferences",
                "Structured for future AI model integration to deliver tailored nutrition recommendations",
            ],
        },

    ]

    const filters = [
        { name: "All", value: "all" },
        { name: "Web", value: "web" },
        { name: "Django", value: "django" },
        { name: "Java", value: "java" },
    ]

    const filteredProjects =
        activeFilter === "all" ? projects : projects.filter((project) => project.category.includes(activeFilter))

    return (
        <section id="projects" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-foreground/80 max-w-2xl mx-auto">
                            Here are some of the projects I&#39;ve worked on. Each project demonstrates different skills and technologies.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
                        {filters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={activeFilter === filter.value ? "default" : "outline"}
                                onClick={() => setActiveFilter(filter.value)}
                                className="mb-2"
                            >
                                {filter.name}
                            </Button>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={itemVariants}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-card rounded-lg overflow-hidden shadow-md border hover:shadow-lg transition-all group"
                                >
                                    <div className="relative overflow-hidden aspect-video">
                                        <Image
                                            src={project.image || "/images/fallback.png"} // Fallback image
                                            alt={project.title}
                                            width={800}
                                            height={600}
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30"
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <Maximize2 className="h-5 w-5" />
                                            </Button>
                                            {project.demoUrl && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30"
                                                    asChild
                                                >
                                                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-5 w-5" />
                                                    </a>
                                                </Button>
                                            )}
                                            {project.codeUrl && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30"
                                                    asChild
                                                >
                                                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                                                        <Github className="h-5 w-5" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col min-h-[250px]">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-foreground/70 mb-4 flex-grow">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-auto"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
                        <DialogDescription className="text-foreground/70">{selectedProject?.description}</DialogDescription>
                    </DialogHeader>
                    <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <div className="relative w-full max-h-[40vh] rounded-lg overflow-hidden mb-6">
                        {selectedProject && (
                            <Image
                                src={selectedProject.image || "/images/fallback.png"} // Fallback image
                                alt={selectedProject.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
                            <p className="text-foreground/80 mb-6">{selectedProject?.details}</p>

                            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                            <ul className="list-disc pl-5 mb-6 space-y-1 text-foreground/80">
                                {selectedProject?.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject?.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                                {tag}
                            </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold mb-2">Links</h3>
                                {selectedProject?.demoUrl && (
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                                            <Globe className="h-4 w-4 mr-2" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                                {selectedProject?.codeUrl && (
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href={selectedProject.codeUrl} target="_blank" rel="noopener noreferrer">
                                            <Code className="h-4 w-4 mr-2" />
                                            Source Code
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}