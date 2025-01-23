"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnimatedContent from "@/components/sections/animated-content";

interface ImageType {
  src: string;
  alt: string;
}

const images: ImageType[] = [
  {
    src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=3540&auto=format&fit=crop",
    alt: "Programming setup with modern laptop"
  },
  {
    src: "https://images.unsplash.com/photo-1503252947848-7338d3f92f31?q=80&w=3540&auto=format&fit=crop",
    alt: "Code on screen"
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop",
    alt: "Modern development environment"
  }
];

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 grid min-h-screen w-full grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          <div className="max-w-2xl space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
            <motion.div variants={itemVariants} className="inline-block">
              <span className="px-6 py-2 rounded-full bg-primary/20 text-primary font-medium border border-primary/20">
                Full Stack Developer
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
            >
              Hi, I'm Roger Bavibidila
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-100 max-w-lg"
            >
              Specialized in building exceptional web applications with a focus on AI integration
              and user experience.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white/30 hover:bg-white/10 transition-colors duration-300"
              >
                <Link href="/projects">View Projects</Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              {[
                { href: "https://github.com/rogerjeasy", Icon: Github },
                { href: "https://linkedin.com/in/rogerjeasy", Icon: Linkedin },
                { href: "mailto:rogerjeasy@gmail.com", Icon: Mail }
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/80 hover:text-primary transition-all duration-300"
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="flex items-center">
          <AnimatedContent />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;