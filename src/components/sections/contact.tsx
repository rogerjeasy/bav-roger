"use client";

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send, Mail, Phone, MapPin, MessageSquare } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const defaultValues: Partial<ContactFormValues> = {
  name: "", email: "", subject: "", message: ""
}

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    label: "Email",
    value: "rogerjeasy@gmail.com",
    link: "mailto:rogerjeasy@gmail.com"
  },
  {
    icon: <Phone className="h-6 w-6" />,
    label: "Phone",
    value: "+41 76 686 53 25",
    link: "tel:+41766865325"
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    label: "Address",
    value: "Zurich, Switzerland",
    link: "https://maps.google.com/?q=Zurich,Switzerland"
  }
]

export default function ContactSection() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Failed to submit')
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon."
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative w-full py-24">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=2960")'
        }}
      />
      
      <div className="container relative mx-auto px-4 max-w-6xl">
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center relative">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <MessageSquare className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                  Get in Touch
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Have a question or want to work together? I'm always open to discussing new projects 
                  or opportunities to create exceptional software solutions.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-background/95 border-primary/10">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-primary">Contact Information</h3>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{item.label}</p>
                        <p className="text-muted-foreground group-hover:text-primary/80 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
                <motion.div 
                  className="relative w-full h-72 overflow-hidden rounded-lg border border-primary/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86027.66882534285!2d8.465650566660906!3d47.37688370870714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b9749bea219%3A0xe66e8df1e71fdc03!2sZurich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1624443139797!5m2!1sen!2sus"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-background/95 border-primary/10">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <h3 className="text-2xl font-semibold text-primary">Send Message</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Input
                        placeholder="Your Name"
                        {...form.register("name")}
                        className="bg-background/50 border-primary/10 focus:border-primary transition-all"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                      )}
                    </motion.div>
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Input
                        placeholder="Email Address"
                        type="email"
                        {...form.register("email")}
                        className="bg-background/50 border-primary/10 focus:border-primary transition-all"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                      )}
                    </motion.div>
                  </div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Input
                      placeholder="Subject"
                      {...form.register("subject")}
                      className="bg-background/50 border-primary/10 focus:border-primary transition-all"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                    )}
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Textarea
                      placeholder="Your Message"
                      className="min-h-[150px] resize-none bg-background/50 border-primary/10 focus:border-primary transition-all"
                      {...form.register("message")}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                    )}
                  </motion.div>
                </CardContent>
                <CardFooter>
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 transition-all"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}