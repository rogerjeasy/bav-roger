"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: "Research Assistant",
    company: "University of Zurich",
    location: "Zurich, Switzerland",
    period: "09/2021 - 08/2024",
    description: [
      "Teaching Assistant (TA) in the Deep Learning course",
      "Extended PyTorch Conv2d Module for Gabor wavelet processing, enabling GPU parallelization",
      "Implemented frequency domain processing with torch.fft, reducing runtime by 60%",
      "Developed Gabor jets for comprehensive image response extraction",
      "Developed and implemented a deep learning U-net based model for stereo matching, outperforming multiple 2D-based models"
    ],
    skills: ["PyTorch", "Deep Learning", "Computer Vision", "GPU Computing"]
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Earkick AI",
    location: "Zurich, Switzerland",
    period: "01/2023 - 03/2023",
    description: [
      "Curated high-quality training datasets for model training and analysis",
      "Implemented advanced feature engineering and preprocessing techniques",
      "Led the training of video-based emotion recognition models using an open-source dataset",
      "Integrated audio and video data streams for more robust emotion recognition analysis"
    ],
    skills: ["Machine Learning", "Data Processing", "Video Analysis", "Feature Engineering"]
  }
]

export default function ExperienceSection() {
  return (
    <section className="py-24 px-4 md:px-6 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3544&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // backgroundAttachment: 'fixed',
            // opacity: 0.1
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40 -z-10" />
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tight text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Professional Experience
        </motion.h2>

        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-border -translate-x-1/2" />

          {experiences.map((experience, index) => (
                          <motion.div
              key={experience.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  duration: 1,
                  bounce: 0.3,
                  delay: index * 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:translate-y-24"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 translate-y-1/2" />

              <Card className={`${index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}`}>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                    <p className="text-lg text-primary">{experience.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {experience.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {experience.location}
                    </div>
                  </div>

                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground cursor-pointer"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}