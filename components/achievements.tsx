"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Trophy } from "lucide-react"

export default function Achievements() {
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

    const achievements = [
        { title: "Hackathon Winner", event: "TechFest 2023", description: "Led a team to build a real-time collaboration app." },
        { title: "Top 1% in National Coding Challenge", event: "CodeStreet 2022", description: "Ranked in the top 1% among 10,000 participants." },
    ]

    return (
        <section id="achievements" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <ul className="space-y-6">
                            {achievements.map((achievement, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                                >
                                    <Trophy className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                                        <p className="text-foreground/80">{achievement.event}</p>
                                        <p className="text-foreground/70 text-sm">{achievement.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}