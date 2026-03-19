import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Twitter, Send, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "./AnimatedBackground";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const trimmedData = { name: name.trim(), email: email.trim(), message: message.trim() };
    
    const { error } = await supabase
      .from("contact_messages")
      .insert(trimmedData);

    if (error) {
      setIsSubmitting(false);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive"
      });
      return;
    }

    // Send email notification (don't block on this)
    supabase.functions.invoke("send-contact-notification", {
      body: trimmedData
    }).catch(console.error);

    setIsSubmitting(false);
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon."
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative" ref={ref}>
      <AnimatedBackground variant="accent" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-primary font-medium mb-4 block">Get in Touch</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Let's work <span className="text-gradient">together</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
            Let's create something amazing.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto space-y-4 mb-12"
          >
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card border-border"
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border"
              maxLength={255}
            />
            <Textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-card border-border min-h-[120px]"
              maxLength={1000}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:glow-primary transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/parthpbhagat", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/parth-p-bhagat-203162369", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Mail, href: "mailto:parthpbhagat@gmail.com", label: "Email" }
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;