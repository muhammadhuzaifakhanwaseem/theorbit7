"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SpotlightCard({ className, children, ...props }: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    setIsHovered(false)
  }

  useEffect(() => {
    if (!isHovered && containerRef.current) {
      const interval = setInterval(() => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          const x = rect.width / 2 + Math.random() * 100 - 50
          const y = rect.height / 2 + Math.random() * 100 - 50
          setPosition({ x, y })
          setOpacity(0.1) // Subtle glow for inactive state
        }
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden border border-emerald-500/20 bg-white dark:bg-[#0a0a0a]", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
        style={{
          opacity,
          // Mint Green Spotlight: 16, 185, 129
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}