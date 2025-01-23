"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern -z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/30 to-background/80 -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr,400px] lg:gap-12 xl:grid-cols-[1fr,600px]">
          {/* Text content */}
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.h1 
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I'm Roger Bavibidila
                <br />
                <span className="text-primary">Full Stack Developer</span>
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Specialized in building exceptional web applications with a focus on AI integration
                and user experience.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                href="https://github.com/rogerjeasy" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="https://linkedin.com/in/rogerjeasy" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link 
                href="mailto:rogerjeasy@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Animation */}
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative h-[600px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=3540&auto=format&fit=crop"
                alt="Programming setup with modern laptop"
                fill
                className="object-cover"
                priority
              />
              {/* Floating elements animation */}
              <motion.div
                className="absolute top-1/4 -left-4 w-8 h-8 bg-primary/10 rounded-full"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-4 w-12 h-12 bg-primary/20 rounded-full"
                animate={{
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}