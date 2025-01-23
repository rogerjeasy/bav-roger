import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, Phone, MapPin, MessageSquare, Loader2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" }
  });

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
      label: "Location",
      value: "Zurich, Switzerland",
      link: "https://maps.google.com/?q=Zurich,Switzerland"
    }
  ];

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you soon."
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full min-h-screen py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497032628192-86f99bcd76bc")'
        }}
      />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <MessageSquare className="w-16 h-16 mx-auto mb-6 text-white animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Let's Connect
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="transition-transform duration-300 hover:scale-105">
                <CardHeader>
                  <h3 className="text-2xl font-semibold">Send a Message</h3>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          placeholder="Your Name"
                          {...form.register("name")}
                        />
                        {form.formState.errors.name && (
                          <AnimatePresence>
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-sm text-destructive mt-2"
                            >
                              {form.formState.errors.name.message}
                            </motion.p>
                          </AnimatePresence>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Email Address"
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <AnimatePresence>
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-sm text-destructive mt-2"
                            >
                              {form.formState.errors.email.message}
                            </motion.p>
                          </AnimatePresence>
                        )}
                      </div>
                    </div>

                    <div>
                      <Input
                        placeholder="Subject"
                        {...form.register("subject")}
                      />
                      {form.formState.errors.subject && (
                        <AnimatePresence>
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-destructive mt-2"
                          >
                            {form.formState.errors.subject.message}
                          </motion.p>
                        </AnimatePresence>
                      )}
                    </div>

                    <div>
                      <Textarea
                        placeholder="Your Message"
                        {...form.register("message")}
                        className="min-h-[150px] resize-none"
                      />
                      {form.formState.errors.message && (
                        <AnimatePresence>
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-sm text-destructive mt-2"
                          >
                            {form.formState.errors.message.message}
                          </motion.p>
                        </AnimatePresence>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="transition-colors duration-300 hover:bg-accent">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="p-3 rounded-full bg-primary text-primary-foreground">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="w-full h-[300px] rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86027.66882534285!2d8.465650566660906!3d47.37688370870714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b9749bea219%3A0xe66e8df1e71fdc03!2sZurich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1624443139797!5m2!1sen!2sus"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;