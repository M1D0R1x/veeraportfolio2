"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
    Code,
    Database,
    Layers,
    GitBranch,
    Users,
    Cloud,
    Globe,
    MessageSquare,
    Lightbulb,
    UserCheck,
    Puzzle,
} from "lucide-react"

// Define TypeScript types for skill items
type SkillItem =
    | { name: string; image: string; icon?: never }
    | { name: string; icon: React.ReactElement; image?: never }

type SkillCategory = {
    category: string
    icon: React.ReactElement
    items: SkillItem[]
}

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

    const skills: SkillCategory[] = [
        {
            category: "Programming Languages",
            icon: <Code className="h-6 w-6" />,
            items: [
                { name: "Java", image: "/images/java.jpg" },
                { name: "Go", image: "/images/go.png"},
                { name: "Python", image: "/images/python.png" },
                { name: "C/C++", image: "/images/c++.svg" },
                { name: "JavaScript", image: "/images/javascript.png" },
                { name: "R", image: "/images/r.jpg" },
            ],
        },
        {
            category: "Web Technologies",
            icon: <Globe className="h-6 w-6" />,
            items: [
                { name: "HTML", image: "/images/html.jpg" },
                { name: "CSS", image: "/images/css.jpg" },
            ],
        },
        {
            category: "Frameworks",
            icon: <Layers className="h-6 w-6" />,
            items: [{ name: "Django", image: "/images/django.png" }],
        },
        {
            category: "Build Tools",
            icon: <Layers className="h-6 w-6" />,
            items: [
                { name: "Maven", image: "/images/maven.jpeg" },
                { name: "Gradle", image: "/images/gradle.webp" },
            ],
        },
        {
            category: "Databases",
            icon: <Database className="h-6 w-6" />,
            items: [
                { name: "PostgreSQL", image: "/images/postgresql.png" },
                { name: "SQLite", image: "/images/sqlite.jpg" },
                { name: "MySQL", image: "/images/sql.png" },
            ],
        },
        {
            category: "Data Tools",
            icon: <Database className="h-6 w-6" />,
            items: [
                { name: "Excel", image: "/images/excel.jpeg" },
                { name: "Tableau", image: "/images/tableau.png" },
            ],
        },
        {
            category: "Version Control",
            icon: <GitBranch className="h erroneous code here-6 w-6" />,
            items: [
                { name: "Git", image: "/images/git.png" },
                { name: "GitHub", image: "/images/github.jpg" },
            ],
        },
        {
            category: "Developer Tools",
            icon: <Code className="h-6 w-6" />,
            items: [
                { name: "PyCharm", image: "/images/pycharm.png" },
                { name: "IntelliJ", image: "/images/IntelliJ.jpg" },
            ],
        },
        {
            category: "Soft Skills",
            icon: <Users className="h-6 w-6" />,
            items: [
                { name: "Communication", icon: <MessageSquare className="h-8 w-8" /> },
                { name: "Adaptability", icon: <Lightbulb className="h-8 w-8" /> },
                { name: "Leadership", icon: <UserCheck className="h-8 w-8" /> },
                { name: "Problem-Solving", icon: <Puzzle className="h-8 w-8" /> },
                { name: "Team Collaboration", icon: <Users className="h-8 w-8" /> },
            ],
        },
        {
            category: "Cloud & Deployment",
            icon: <Cloud className="h-6 w-6" />,
            items: [
                { name: "Vercel", image: "/images/vercel.jpeg" },
                { name: "AWS", image: "/images/aws.jpeg" },
            ],
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
                            I&apos;ve worked with a variety of technologies and tools throughout my journey. Here&apos;s an overview of my
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
                                <div className="flex flex-wrap gap-4">
                                    {skill.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="relative group flex flex-col items-center"
                                            title={item.name}
                                        >
                                            <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                                                {"image" in item ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 flex items-center justify-center">
                                                        {item.icon}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="mt-2 text-sm text-foreground/80 text-center">{item.name}</span>
                                            <span className="absolute invisible group-hover:visible bottom-full mb-10 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.name}
                      </span>
                                        </div>
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