"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Trophy } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import Modal to disable SSR
const Modal = dynamic(() => import("react-modal"), { ssr: false })

// Import react-modal
import ReactModal from "react-modal"

export default function Achievements() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

    // State for modal
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    // Set Modal app element when #__next is available
    useEffect(() => {
        const setAppElement = () => {
            const element = document.querySelector("#__next")
            if (element) {
                ReactModal.setAppElement("#__next")
            } else {
                setTimeout(setAppElement, 100)
            }
        }
        setAppElement()
    }, [])

    const openModal = (image: string) => {
        setSelectedImage(image)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
        setSelectedImage(null)
    }

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
        {
            title: "Top 5% in Introduction to Internet of Things",
            event: "October 2024",
            description: "Ranked in the top 5% among 78,608 participants.",
            certificate: "/images/achievements/iot.jpg",
        },
        {
            title: "Participant in TVS Credit E.P.I.C 6 Hackathon",
            event: "August 2024",
            description: "Participated in the TVS Credit E.P.I.C 6 Hackathon.",
            certificate: "/images/achievements/tvscredit.jpg",
        },
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
                                    className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                                >
                                    <Trophy className="h-6 w-6 text-primary" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                                        <p className="text-foreground/80">{achievement.event}</p>
                                        <p className="text-foreground/70 text-sm">{achievement.description}</p>
                                    </div>
                                    <button
                                        onClick={() => openModal(achievement.certificate)}
                                        className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                                    >
                                        View Certificate
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "90%",
                        maxHeight: "90vh",
                        padding: "20px",
                        borderRadius: "8px",
                        background: "#fff",
                        overflow: "auto",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        zIndex: 1000,
                    },
                }}
                contentLabel="Certificate Image"
            >
                {selectedImage && (
                    <div className="relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
                        >
                            ✕
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Certificate"
                            width={800}
                            height={600}
                            className="object-contain max-h-[80vh] w-auto"
                        />
                    </div>
                )}
            </Modal>
        </section>
    )
}