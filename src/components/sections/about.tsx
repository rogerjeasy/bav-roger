"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function AboutSection() {
  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden">
      <motion.div 
        className="container mx-auto grid gap-12 lg:grid-cols-[1fr,1.5fr]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Image Column */}
        <motion.div 
          className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden"
          variants={fadeInUp}
        >
          <Image
            src="/about-image.jpg"
            alt="Roger Bavibidila"
            fill
            className="object-cover"
            priority
          />
          {/* Decorative Elements */}
          <motion.div
            className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Content Column */}
        <div className="space-y-8">
          <motion.div variants={fadeInUp} className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            <p className="text-lg text-muted-foreground">
              I'm a Full Stack Developer with a strong background in AI and Machine Learning. 
              Currently pursuing my MSc in Applied Information and Data Science at Lucerne University, 
              I combine theoretical knowledge with practical experience in building innovative web solutions.
            </p>
          </motion.div>

          {/* Key Skills Cards */}
          <motion.div 
            variants={fadeInUp}
            className="grid gap-6 sm:grid-cols-2"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Technical Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  Specialized in Python, TypeScript, and Go, with extensive experience in ML frameworks 
                  and modern web technologies.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Research Background</h3>
                <p className="text-sm text-muted-foreground">
                  Research Assistant at UZH, focusing on deep learning and computer vision applications.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Highlights */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-xl font-semibold">Recent Experience</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                <div>
                  <h4 className="font-medium">Research Assistant</h4>
                  <p className="text-sm text-muted-foreground">
                    University of Zurich | 2021 - 2024
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                <div>
                  <h4 className="font-medium">ML Engineer Intern</h4>
                  <p className="text-sm text-muted-foreground">
                    Earkick AI | 2023
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp}>
            <Button variant="outline" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                View Full Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}