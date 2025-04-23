"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null) // Add a ref for the form
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStatus, setFormStatus] = useState<{
        type: "success" | "error" | null
        message: string
    }>({ type: null, message: "" })

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFormStatus({ type: null, message: "" }) // Reset form status

        try {
            const formData = new FormData(e.currentTarget)
            const body = JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                subject: formData.get("subject"),
                message: formData.get("message"),
            })

            const response = await fetch("/api/contact", {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                },
            })

            // Log response for debugging
            console.log("API Response:", {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
            })

            const responseData = await response.json()
            console.log("Response Data:", responseData)

            // Handle success (status codes 200 or 201)
            if (response.status === 200 || response.status === 201) {
                setFormStatus({
                    type: "success",
                    message: "Your message has been sent successfully! I'll get back to you soon.",
                })
                // Use formRef to reset the form
                if (formRef.current) {
                    formRef.current.reset()
                }
            } else {
                throw new Error(responseData.message || `API error: ${response.statusText}`)
            }
        } catch (error: unknown) {
            console.error("Form Submission Error:", error)
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
            setFormStatus({
                type: "error",
                message: `Failed to send message: ${errorMessage}. Please try again or contact me directly.`,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-foreground/80 max-w-2xl mx-auto">
                            Have a project in mind or want to discuss potential opportunities? Feel free to reach out using the form below or through my contact information.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <div className="bg-card rounded-lg p-6 shadow-sm border h-full">
                                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="p-2 bg-primary/10 rounded-md text-primary mr-4">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Location</h4>
                                            <p className="text-foreground/70">Jalandhar, Punjab, India</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="p-2 bg-primary/10 rounded-md text-primary mr-4">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Email</h4>
                                            <p className="text-foreground/70">veerababusaviti21@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="p-2 bg-primary/10 rounded-md text-primary mr-4">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Phone</h4>
                                            <p className="text-foreground/70">+91 7569734332</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                                    <div className="flex space-x-4">
                                        <a
                                            href="https://github.com/M1D0R1x"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-primary/10 rounded-md text-primary hover:bg-primary/20 transition-colors"
                                            aria-label="GitHub"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/saviti-veera-babu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-primary/10 rounded-md text-primary hover:bg-primary/20 transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <div className="bg-card rounded-lg p-6 shadow-sm border">
                                <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

                                {formStatus.type && (
                                    <Alert
                                        className={`mb-6 ${
                                            formStatus.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                        }`}
                                    >
                                        {formStatus.type === "success" ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4" />
                                        )}
                                        <AlertDescription>{formStatus.message}</AlertDescription>
                                    </Alert>
                                )}

                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">
                                                Your Name
                                            </label>
                                            <Input id="name" name="name" placeholder="John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">
                                                Your Email
                                            </label>
                                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">
                                            Subject
                                        </label>
                                        <Input id="subject" name="subject" placeholder="Project Inquiry" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="I'd like to discuss a project..."
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full md:w-auto"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}