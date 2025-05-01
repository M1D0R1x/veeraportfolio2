"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Trophy, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Achievements() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

    // State for dialog and image
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
    const [isImageLoading, setIsImageLoading] = useState(true)
    const [imageDimensions, setImageDimensions] = useState({ width: 800, height: 600 })
    const [, setWindowSize] = useState({ width: 800, height: 600 })

    // Update window size only on client-side
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setWindowSize({ width: window.innerWidth, height: window.innerHeight })
            }
        }

        // Initial size
        if (typeof window !== "undefined") {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

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
            title: "Top 5% in Introduction to Internet of Things(NPTEL)",
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

    const preloadImage = (src: string, callback: (dimensions: { width: number; height: number }) => void) => {
        if (typeof window !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
                callback({ width: img.width, height: img.height })
                setIsImageLoading(false)
            }
            img.onerror = () => {
                setIsImageLoading(false)
            }
            img.src = src
        } else {
            // Default dimensions for server-side rendering
            callback({ width: 800, height: 600 })
            setIsImageLoading(false)
        }
    }

    const openDialog = (index: number) => {
        setSelectedAchievement(index)
        setIsImageLoading(true)
        setDialogOpen(true)

        setImageDimensions({ width: 800, height: 600 })

        if (index >= 0 && index < achievements.length) {
            preloadImage(achievements[index].certificate, (dimensions) => {
                setImageDimensions(dimensions)
            })
        }
    }

    const closeDialog = () => {
        setDialogOpen(false)
        setTimeout(() => {
            setSelectedAchievement(null)
        }, 300)
    }

    const navigateAchievements = (direction: "prev" | "next") => {
        if (selectedAchievement === null) return

        const totalAchievements = achievements.length
        let newIndex: number

        if (direction === "prev") {
            newIndex = selectedAchievement === 0 ? totalAchievements - 1 : selectedAchievement - 1
        } else {
            newIndex = selectedAchievement === totalAchievements - 1 ? 0 : selectedAchievement + 1
        }

        setSelectedAchievement(newIndex)
        setIsImageLoading(true)

        preloadImage(achievements[newIndex].certificate, (dimensions) => {
            setImageDimensions(dimensions)
        })
    }

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
                                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <Trophy className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{achievement.title}</h3>
                                            <p className="text-foreground/80">{achievement.event}</p>
                                            <p className="text-foreground/70 text-sm">{achievement.description}</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => openDialog(index)}
                                        className="mt-3 sm:mt-0 px-3 py-1 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                                    >
                                        View Certificate
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>

            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    if (!open) closeDialog()
                }}
            >
                <DialogContent
                    className="p-0 overflow-hidden bg-background border-none"
                    style={{
                        maxWidth: `${Math.min(imageDimensions.width + 40, typeof window !== "undefined" ? window.innerWidth - 40 : 800)}px`,
                        maxHeight: `${Math.min(imageDimensions.height + 120, typeof window !== "undefined" ? window.innerHeight - 80 : 600)}px`,
                        width: "auto",
                        height: "auto",
                    }}
                >
                    <DialogClose
                        className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none"
                        onClick={closeDialog}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    {selectedAchievement !== null && selectedAchievement >= 0 && selectedAchievement < achievements.length && (
                        <div className="relative flex flex-col items-center justify-center w-full h-full">
                            {isImageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                <Image
                                    src={achievements[selectedAchievement].certificate || "/placeholder.svg"}
                                    alt={`Certificate for ${achievements[selectedAchievement].title}`}
                                    width={imageDimensions.width}
                                    height={imageDimensions.height}
                                    quality={90}
                                    priority
                                    onLoad={() => setIsImageLoading(false)}
                                    className={`object-contain max-h-full max-w-full transition-opacity duration-300 ${
                                        isImageLoading ? "opacity-0" : "opacity-100"
                                    }`}
                                />
                            </div>

                            {achievements.length > 1 && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                                        onClick={() => navigateAchievements("prev")}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                                        onClick={() => navigateAchievements("next")}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                                <h3 className="text-lg font-semibold">{achievements[selectedAchievement].title}</h3>
                                <p className="text-white/80 text-sm">{achievements[selectedAchievement].event}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
