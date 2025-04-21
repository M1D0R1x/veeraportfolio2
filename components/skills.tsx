"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Layers, GitBranch, Users, Cloud, Globe } from "lucide-react"

export default function Skills() {
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

    const skills = [
        {
            category: "Programming Languages",
            icon: <Code className="h-6 w-6" />,
            items: ["Java", "Python", "C/C++", "JavaScript", "R"],
        },
        {
            category: "Web Technologies",
            icon: <Globe className="h-6 w-6" />, // Using Globe icon for Web Technologies
            items: ["HTML", "CSS"],
        },
        {
            category: "Frameworks",
            icon: <Layers className="h-6 w-6" />,
            items: ["Django"],
        },
        {
            category: "Build Tools",
            icon: <Layers className="h-6 w-6" />,
            items: ["Maven", "Gradle"],
        },
        {
            category: "Databases",
            icon: <Database className="h-6 w-6" />,
            items: ["PostgreSQL", "SQLite", "MySQL"],
        },
        {
            category: "Data Tools",
            icon: <Database className="h-6 w-6" />,
            items: ["Excel", "Tableau"],
        },
        {
            category: "Version Control",
            icon: <GitBranch className="h-6 w-6" />,
            items: ["Git", "GitHub"],
        },
        {
            category: "Developer Tools",
            icon: <Code className="h-6 w-6" />,
            items: ["PyCharm", "IntelliJ"],
        },
        {
            category: "Soft Skills",
            icon: <Users className="h-6 w-6" />,
            items: ["Communication", "Adaptability", "Leadership", "Problem-Solving", "Team Collaboration"],
        },
        {
            category: "Cloud & Deployment",
            icon: <Cloud className="h-6 w-6" />,
            items: ["Vercel"],
        },
    ]

    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-foreground/80 max-w-2xl mx-auto">
                            I've worked with a variety of technologies and tools throughout my journey. Here's an overview of my
                            technical and soft skills:
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-primary/10 rounded-md text-primary mr-3">{skill.icon}</div>
                                    <h3 className="font-bold">{skill.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, i) => (
                                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}