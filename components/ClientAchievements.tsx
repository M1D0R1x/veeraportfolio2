"use client"

import dynamic from "next/dynamic"

const Achievements = dynamic(() => import("@/components/achievements"), { ssr: false })

export default function ClientAchievements() {
    return <Achievements />
}