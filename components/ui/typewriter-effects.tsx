"use client"

import { useEffect, useState } from "react"
import { motion, stagger, useAnimate, useInView } from "framer-motion"

interface TypewriterProps {
    words: {
        text: string
        className?: string
    }[]
    className?: string
}

export const TypewriterEffect = ({ words, className }: TypewriterProps) => {
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if (isInView && !started) {
            setStarted(true)
            animate(
                "span",
                {
                    opacity: 1,
                },
                {
                    duration: 0.25,
                    delay: stagger(0.1),
                },
            )
        }
    }, [isInView, animate, started])

    const renderWords = () => {
        return (
            <div className={`inline ${className}`} ref={scope}>
                {words.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.split("").map((char, index) => (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    key={`char-${index}`}
                                    className={`inline-block ${word.className || ""}`}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp;
                        </div>
                    )
                })}
            </div>
        )
    }

    return renderWords()
}

