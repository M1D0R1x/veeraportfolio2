"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Server, Smartphone, GitBranch, Terminal, Globe, Layers } from "lucide-react"

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
            items: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS", "Kotlin"],
        },
        {
            category: "Web Development",
            icon: <Globe className="h-6 w-6" />,
            items: ["Django", "JavaScript", "HTML5", "CSS", "React", "RESTful APIs"],
        },
        {
            category: "Mobile Development",
            icon: <Smartphone className="h-6 w-6" />,
            items: ["Android", "Kotlin", "Java", "Gradle", "XML"],
        },
        {
            category: "Databases",
            icon: <Database className="h-6 w-6" />,
            items: ["PostgreSQL", "MySQL", "SQLite"],
        },
        {
            category: "DevOps & Tools",
            icon: <Server className="h-6 w-6" />,
            items: ["Git", "GitHub"],
        },
        {
            category: "Build Tools",
            icon: <Layers className="h-6 w-6" />,
            items: ["Maven", "Gradle", "npm", "pip"],
        },
        {
            category: "Version Control",
            icon: <GitBranch className="h-6 w-6" />,
            items: ["Git", "GitHub"],
        },
        {
            category: "Command Line",
            icon: <Terminal className="h-6 w-6" />,
            items: ["Bash", "PowerShell", "Command Prompt"],
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
                            I&#39;ve worked with a variety of technologies and tools throughout my career. Here&#39;s an overview of my
                            technical expertise:
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

