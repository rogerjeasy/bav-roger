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
import { Send, Mail, Phone, MapPin } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  subject: "",
  message: ""
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
      await fetch("/api/contact/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon."
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full py-24">
      {/* Background Image with Overlay */}
      <div 
        // className="min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center p-4 overflow-y-auto"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=2960")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h2>
          <p className="text-muted-foreground text-lg">Have a question or want to work together?</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full backdrop-blur-sm bg-card/80">
              <CardHeader>
                <h3 className="text-2xl font-semibold">Contact Information</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-primary">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
                <div className="relative w-full h-64 mt-6 overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86027.66882534285!2d8.465650566660906!3d47.37688370870714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b9749bea219%3A0xe66e8df1e71fdc03!2sZurich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1624443139797!5m2!1sen!2sus"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    // referrerPolicy="no-referrer-when-load"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full backdrop-blur-sm bg-card/80">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <h3 className="text-2xl font-semibold">Send Message</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        placeholder="Your Name"
                        {...form.register("name")}
                        className="bg-background/50"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Email Address"
                        type="email"
                        {...form.register("email")}
                        className="bg-background/50"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Subject"
                      {...form.register("subject")}
                      className="bg-background/50"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Your Message"
                      className="min-h-[150px] resize-none bg-background/50"
                      {...form.register("message")}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}