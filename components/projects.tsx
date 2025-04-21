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
            title: "E-commerce Platform",
            description: "A full-featured e-commerce platform built with Django and React",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Django", "Python", "React", "PostgreSQL"],
            category: ["web", "django"],
            demoUrl: "https://example.com",
            codeUrl: "https://github.com",
            details:
                "This e-commerce platform provides a complete solution for online stores with product management, cart functionality, payment processing, and order tracking.",
            features: [
                "User authentication and profiles",
                "Product catalog with categories and search",
                "Shopping cart and checkout process",
                "Payment gateway integration",
                "Order management and tracking",
                "Admin dashboard for inventory management",
            ],
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A Kanban-style task management application",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Django", "Python", "JavaScript", "REST API"],
            category: ["web", "django"],
            demoUrl: "https://example.com",
            codeUrl: "https://github.com",
            details:
                "This task management application helps teams organize their work with a visual Kanban board interface, allowing for easy tracking of project progress.",
            features: [
                "Drag-and-drop task management",
                "Project and team organization",
                "Task assignments and due dates",
                "Comments and attachments",
                "Progress tracking and reporting",
                "Email notifications",
            ],
        },
        {
            id: 3,
            title: "Fitness Tracker",
            description: "Android application for tracking workouts and fitness goals",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Kotlin", "Android", "Room Database", "Gradle"],
            category: ["mobile", "android"],
            demoUrl: "https://example.com",
            codeUrl: "https://github.com",
            details:
                "This fitness tracking app allows users to record workouts, track progress, and set fitness goals with a clean, intuitive interface.",
            features: [
                "Workout logging and history",
                "Progress charts and statistics",
                "Goal setting and achievement tracking",
                "Exercise library with instructions",
                "Customizable workout plans",
                "Integration with health platforms",
            ],
        },
        {
            id: 4,
            title: "Weather Dashboard",
            description: "Real-time weather information dashboard with forecasts",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["JavaScript", "HTML", "CSS", "API Integration"],
            category: ["web"],
            demoUrl: "https://example.com",
            codeUrl: "https://github.com",
            details:
                "This weather dashboard provides real-time weather information and forecasts for locations worldwide, with a clean and responsive interface.",
            features: [
                "Current weather conditions",
                "5-day weather forecast",
                "Location search and favorites",
                "Interactive weather maps",
                "Weather alerts and notifications",
                "Historical weather data",
            ],
        },
        {
            id: 5,
            title: "Social Media API",
            description: "RESTful API for a social media platform built with Django REST framework",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Django", "Python", "REST API", "PostgreSQL"],
            category: ["web", "django", "api"],
            demoUrl: "https://example.com",
            codeUrl: "https://github.com",
            details:
                "This API provides all the backend functionality needed for a social media platform, including user authentication, posts, comments, likes, and more.",
            features: [
                "User authentication and profiles",
                "Post creation and management",
                "Comments and reactions",
                "Friend/follower relationships",
                "Notifications system",
                "Content moderation tools",
            ],
        },
        {
            id: 6,
            title: "Budget Tracker",
            description: "Personal finance and budget tracking application",
            image: "/placeholder.svg?height=600&width=800",
            tags: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
            category: ["web", "java"],
            demoUrl: "https://example.com",
            codeUrl: "https://github.com",
            details:
                "This budget tracking application helps users manage their personal finances, track expenses, and set budget goals with detailed reporting.",
            features: [
                "Expense and income tracking",
                "Budget creation and monitoring",
                "Financial reports and charts",
                "Bill reminders and recurring transactions",
                "Savings goals tracking",
                "Data export and backup",
            ],
        },
    ]

    const filters = [
        { name: "All", value: "all" },
        { name: "Web", value: "web" },
        { name: "Mobile", value: "mobile" },
        { name: "Django", value: "django" },
        { name: "Android", value: "android" },
        { name: "API", value: "api" },
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
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            width={800}
                                            height={600}
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30 mr-2"
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <Maximize2 className="h-5 w-5" />
                                            </Button>
                                            {project.demoUrl && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30 mr-2"
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
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-foreground/70 mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedProject(project)}>
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

                    <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                        {selectedProject && (
                            <Image
                                src={selectedProject.image || "/placeholder.svg"}
                                alt={selectedProject.title}
                                width={800}
                                height={600}
                                className="object-cover"
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

