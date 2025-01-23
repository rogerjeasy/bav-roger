"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Feature {
  title: string;
  description?: string;
  role?: string;
  features: string[];
}

const projects: Feature[] = [
  {
    title: "Let Us Connect",
    description: "Networking & Collaboration Platform",
    features: [
      "Full-stack Go/NextJS application",
      "Real-time notifications with Pusher",
      "Modern UI with NextUI and ShadCN"
    ]
  },
  {
    title: "EasyLife",
    description: "E-Commerce marketplace connecting vendors and customers",
    features: [
      "RESTful APIs with Django REST Framework",
      "Responsive React interface",
      "Seamless vendor-customer connections"
    ]
  },
  {
    title: "GPTuessr",
    description: "Multiplayer Online Game with AI Integration",
    features: [
      "DALL-E for real-time image generation",
      "ChatGPT integration for player assessment",
      "80.3% test coverage on SonarCloud"
    ]
  }
];

const experiences: Feature[] = [
  {
    title: "University of Zurich",
    role: "Research Assistant",
    features: [
      "Deep Learning course TA",
      "PyTorch Conv2d Module extension",
      "U-net based stereo matching model"
    ]
  },
  {
    title: "Earkick AI",
    role: "Machine Learning Engineer Intern",
    features: [
      "Video-based emotion recognition",
      "Advanced feature engineering",
      "Audio-video data integration"
    ]
  }
];

const cardVariants = {
  hiddenDesktop: { y: 50, opacity: 0 },
  hiddenMobile: { x: 300, opacity: 0 },
  visibleDesktop: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  visibleMobile: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exitDesktop: { y: -50, opacity: 0 },
  exitMobile: { x: -300, opacity: 0 }
};

const AnimatedContent: React.FC = () => {
  const [showingProjects, setShowingProjects] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentArray = showingProjects ? projects : experiences;
    const timer = setTimeout(() => {
      if (currentIndex < currentArray.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
        setShowingProjects(!showingProjects);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, showingProjects]);

  const currentArray = showingProjects ? projects : experiences;
  const currentItem = currentArray[currentIndex];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold text-white mb-8">
        {showingProjects ? "Featured Projects" : "Work Experience"}
      </h3>
      
      <div className="flex w-full max-w-xl justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.title}
            variants={cardVariants}
            initial={isMobile ? "hiddenMobile" : "hiddenDesktop"}
            animate={isMobile ? "visibleMobile" : "visibleDesktop"}
            exit={isMobile ? "exitMobile" : "exitDesktop"}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-xl w-full"
          >
            <h4 className="text-xl font-semibold text-white mb-2 break-words">
              {showingProjects ? currentItem.title : `${currentItem.title} - ${currentItem.role}`}
            </h4>
            {showingProjects && (
              <p className="text-gray-200 mb-4 text-sm break-words">
                {currentItem.description}
              </p>
            )}
            <ul className="space-y-2">
              {currentItem.features.map((feature, idx) => (
                <li key={idx} className="text-gray-300 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0 mt-1.5" />
                  <span className="break-words">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedContent;