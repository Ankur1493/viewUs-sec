'use client'

import { motion } from 'framer-motion'
import { CardTitle } from "@/components/ui/card"

export default function StartFreeTitle({ title = "Default Title" }: { title?: string }) {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  return (
    <CardTitle className="text-lg text-sky-500 font-bold">
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {title.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </CardTitle>
  )
}
