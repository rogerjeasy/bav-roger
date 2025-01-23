"use client"

import { motion, useAnimation } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

interface ProjectImage {
  src: string
  alt: string
}

interface ProjectLinks {
  frontend: string
  backend: string
}

interface Project {
  title: string
  description: string
  images: ProjectImage[]
  tags: string[]
  liveLink: string
  githubLinks: ProjectLinks
}

const projects: Project[] = [
  {
    title: "Let Us Connect",
    description: "Networking & Collaboration Platform built with Go Fiber and Next.js",
    images: [
      { src: "/assets/connect_home.png", alt: "Let Us Connect Home" },
      { src: "/assets/connect-2.png", alt: "Let Us Connect Chat" },
      { src: "/assets/connect-3.png", alt: "Let Us Connect Profile" },
    ],
    tags: ["Next.js", "TypeScript", "Go", "Firebase"],
    liveLink: "https://example.com",
    githubLinks: {
      frontend: "https://github.com/yourusername/frontend",
      backend: "https://github.com/yourusername/backend"
    }
  },
  {
    title: "EasyLife",
    description: "Full-featured e-Commerce marketplace connecting vendors and customers",
    images: [
      { src: "/assets/easy-life.png", alt: "EasyLife Home" },
      { src: "/assets/easy-life-products.png", alt: "EasyLife Products" },
      { src: "/assets/easy-life-cart.png", alt: "EasyLife Cart" },
    ],
    tags: ["React", "Django", "PostgreSQL", "REST API"],
    liveLink: "https://easylife-shop.onrender.com",
    githubLinks: {
      frontend: "https://github.com/yourusername/easylife-frontend",
      backend: "https://github.com/yourusername/easylife-backend"
    }
  },
  {
    title: "GPTuessr",
    description: "Multiplayer game featuring DALL-E and ChatGPT integration",
    images: [
      { src: "/assets/gptuessr.png", alt: "GPTuessr Home" },
      { src: "/assets/gptuessr-game.png", alt: "GPTuessr Game" },
      { src: "/assets/gptuessr-leaderboard.png", alt: "GPTuessr Leaderboard" },
    ],
    tags: ["Next.js", "OpenAI", "TypeScript", "SonarCloud"],
    liveLink: "https://example.com/gptuessr",
    githubLinks: {
      frontend: "https://github.com/yourusername/gptuessr-frontend",
      backend: "https://github.com/yourusername/gptuessr-backend"
    }
  }
]

const ImageSlider = ({ images, isHovered }: { images: ProjectImage[], isHovered: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
  
    useEffect(() => {
      let interval: NodeJS.Timeout
      if (isHovered) {
        interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 2000)
      }
      return () => clearInterval(interval)
    }, [isHovered, images.length])
  
    return (
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    )
  }
  
  export default function ProjectsSection() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  
    return (
      <section className="py-24 px-4 md:px-6">
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Featured Projects
          </motion.h2>
  
          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card 
                  className="overflow-hidden min-h-[800px]"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <CardHeader>
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardHeader>
  
                  <CardContent>
                    <ImageSlider 
                      images={project.images} 
                      isHovered={hoveredProject === index}
                    />
                  </CardContent>
  
                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild size="sm">
                        <Link href={project.liveLink} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.githubLinks.frontend} target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          Frontend
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.githubLinks.backend} target="_blank">
                          <Github className="mr-2 h-4 w-4" />
                          Backend
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }