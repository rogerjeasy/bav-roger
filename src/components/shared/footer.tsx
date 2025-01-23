import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      href: 'https://github.com/rogerjeasy',
      label: 'GitHub'
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: 'https://linkedin.com/in/rogerjeasy',
      label: 'LinkedIn'
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: 'mailto:rogerjeasy@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="border-t bg-gradient-to-b from-background/50 to-background">
      <div className="container px-4 py-8 mx-auto md:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand and Description */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Roger Bavibidila
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto md:mx-0">
              Full Stack Developer specializing in building exceptional web applications
              with a focus on AI integration and user experience.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:gap-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Information */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Connect
            </h3>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 transition-colors duration-200"
                  asChild
                >
                  <Link 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {link.icon}
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Zurich, Switzerland
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Roger Bavibidila. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;