"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Award, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Certifications() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

    // State for dialog and image
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null)
    const [isImageLoading, setIsImageLoading] = useState(true)
    const [imageDimensions, setImageDimensions] = useState({ width: 800, height: 600 })
    const [windowSize, setWindowSize] = useState({ width: 800, height: 600 })

    // Update window size only on client-side
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }

        // Initial size
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
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

    // Define certifications with month and year
    const certifications = [
        {
            title: "Supervised Machine Learning: Regression and Classification",
            issuer: "Coursera",
            year: 2024,
            month: 11,
            certificateImage: "/images/certificates/sml.jpg",
        },
        {
            title: "Introduction to Internet of Things",
            issuer: "NPTEL",
            year: 2024,
            month: 10,
            certificateImage: "/images/certificates/iot.jpg",
        },
        {
            title: "Excel Skills for Business",
            issuer: "Coursera",
            year: 2024,
            month: 5,
            certificateImage: "/images/certificates/excel.jpg",
        },
        {
            title: "Dynamic Programming, Greedy Algorithms",
            issuer: "Coursera",
            year: 2024,
            month: 4,
            certificateImage: "/images/certificates/dp.jpg",
        },
        {
            title: "Software Development Processes and Methodologies",
            issuer: "Coursera",
            year: 2024,
            month: 4,
            certificateImage: "/images/certificates/software.jpg",
        },
    ]

    // Sort certifications by year and month (descending order)
    const sortedCertifications = [...certifications].sort((a, b) => {
        if (a.year !== b.year) {
            return b.year - a.year
        }
        return b.month - a.month
    })

    // Function to convert month number to short month name
    const getMonthName = (month: number) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return months[month - 1] || "Unknown"
    }

    const openDialog = (index: number) => {
        setSelectedCertIndex(index)
        setIsImageLoading(true)
        setDialogOpen(true)

        // Use default dimensions initially
        setImageDimensions({ width: 800, height: 600 })

        // Preload the image to get dimensions
        if (index >= 0 && index < sortedCertifications.length) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const img = new Image()
            img.onload = () => {
                setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
                setIsImageLoading(false)
            }
            img.onerror = () => {
                setIsImageLoading(false)
            }
            img.src = sortedCertifications[index].certificateImage
        }
    }

    const closeDialog = () => {
        setDialogOpen(false)
        setTimeout(() => {
            setSelectedCertIndex(null)
        }, 300)
    }

    // Function to navigate between certificates
    const navigateCertificates = (direction: "prev" | "next") => {
        if (selectedCertIndex === null) return

        const totalCerts = sortedCertifications.length
        let newIndex: number

        if (direction === "prev") {
            newIndex = selectedCertIndex === 0 ? totalCerts - 1 : selectedCertIndex - 1
        } else {
            newIndex = selectedCertIndex === totalCerts - 1 ? 0 : selectedCertIndex + 1
        }

        setSelectedCertIndex(newIndex)
        setIsImageLoading(true)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const img = new Image()
        img.onload = () => {
            setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
            setIsImageLoading(false)
        }
        img.onerror = () => {
            setIsImageLoading(false)
        }
        img.src = sortedCertifications[newIndex].certificateImage
    }

    return (
        <section id="certifications" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <ul className="space-y-6">
                            {sortedCertifications.map((cert, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <Award className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{cert.title}</h3>
                                            <p className="text-foreground/80">
                                                {cert.issuer} • {getMonthName(cert.month)} {cert.year}
                                            </p>
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

            {/* Certificate Dialog */}
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    if (!open) closeDialog()
                }}
            >
                <DialogContent
                    className="p-0 overflow-hidden bg-background border-none"
                    style={{
                        maxWidth: `${Math.min(imageDimensions.width + 40, windowSize.width - 40)}px`,
                        maxHeight: `${Math.min(imageDimensions.height + 120, windowSize.height - 80)}px`,
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

                    {selectedCertIndex !== null && selectedCertIndex >= 0 && selectedCertIndex < sortedCertifications.length && (
                        <div className="relative flex flex-col items-center justify-center w-full h-full">
                            {/* Loading indicator */}
                            {isImageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {/* Certificate image */}
                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                <Image
                                    src={sortedCertifications[selectedCertIndex].certificateImage || "/placeholder.svg"}
                                    alt={`Certificate for ${sortedCertifications[selectedCertIndex].title}`}
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

                            {/* Navigation buttons */}
                            {sortedCertifications.length > 1 && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                                        onClick={() => navigateCertificates("prev")}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                                        onClick={() => navigateCertificates("next")}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </>
                            )}

                            {/* Certificate title */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                                <h3 className="text-lg font-semibold">{sortedCertifications[selectedCertIndex].title}</h3>
                                <p className="text-white/80 text-sm">
                                    {sortedCertifications[selectedCertIndex].issuer} •{" "}
                                    {getMonthName(sortedCertifications[selectedCertIndex].month)}{" "}
                                    {sortedCertifications[selectedCertIndex].year}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
