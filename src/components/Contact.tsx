import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  User,
  Building,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FORMCARRY_ENDPOINT = "https://formcarry.com/s/svPbJMvTL5Y"; // <- apna hi rehne do

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMCARRY_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      // Formcarry sometimes doesn't return JSON nicely – so guard it
      const json = await res.json().catch(() => null);

      if (res.ok && (!json || json?.status === "success")) {
        form.reset();
        setShowSuccess(true);
      } else {
        setError(
          json?.message || "Something went wrong. Please try again later."
        );
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "dsingh98658@gmail.com",
      description: "Drop me a line anytime",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8506820051 ",
      description: "Mon-Sat from 8am to 10pm",
      color: "from-green-400 to-green-600",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Available Worldwide",
      description: "Remote & on-site projects",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      description: "Quick turnaround guaranteed",
      color: "from-orange-400 to-orange-600",
    },
  ];

  const services = [
    { icon: "🚀", text: "Full-stack web development" },
    { icon: "💻", text: "Frontend web development" },
    { icon: "👨‍💻", text: "Backend web development" },
    { icon: "💡", text: "Technical consulting" },
    { icon: "🔧", text: "Code reviews & optimization" },
    { icon: "☁️", text: "Cloud deployment & DevOps" },
    { icon: "🎨", text: "UI/UX design collaboration" },
  ];

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden" ref={ref}>
      {/* --- BACKGROUND ANIMATIONS (unchanged) --- */}
      {/* ...KEEP YOUR SAME BACKGROUND CODE HERE (omitted for brevity to focus on the fix)... */}

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-border/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Let's Connect</span>
          </motion.div>

          <motion.h2
            className="text-5xl lg:text-6xl font-bold gradient-text mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start Your Project
          </motion.h2>

          <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your ideas into reality? Let's discuss how we can
            create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Card className="p-6 glass-effect border-border/30 hover:border-accent/30 transition-all duration-300 h-full group cursor-pointer">
                    <motion.div
                      className="flex flex-col items-start space-y-3"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className={`p-3 bg-gradient-to-r ${info.color} rounded-xl opacity-90 group-hover:opacity-100 transition-opacity`}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <info.icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-sm font-medium text-muted-foreground">
                          {info.value}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Building className="h-5 w-5 text-accent" />
                Services Available
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.text}
                    className="flex items-center gap-3 p-3 rounded-lg glass-effect border border-border/30 hover:border-accent/30 transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5, transition: { duration: 0.2 } }}
                  >
                    <motion.span
                      className="text-xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {service.icon}
                    </motion.span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {service.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="p-8 glass-effect border-border/30 hover:border-accent/20 transition-all duration-500 relative overflow-hidden">
              {/* Animated bg */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(45deg, hsl(var(--accent)/0.05), transparent, hsl(var(--primary)/0.05))",
                    "linear-gradient(135deg, hsl(var(--primary)/0.05), transparent, hsl(var(--accent)/0.05))",
                    "linear-gradient(45deg, hsl(var(--accent)/0.05), transparent, hsl(var(--primary)/0.05))",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" />
                    Send a Message
                  </h3>
                  <p className="text-muted-foreground">
                    I'll get back to you within 24 hours
                  </p>
                </motion.div>

                {error && (
                  <motion.div
                    className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md p-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot (anti-spam) */}
                  <input type="text" name="_gotcha" className="hidden" />

                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium mb-2 block text-foreground">
                        Name *
                      </label>
                      <Input
                        name="name"
                        placeholder="Your full name"
                        className="glass-effect border-border/50 hover:border-accent/50 focus:border-accent transition-all duration-300"
                        required
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium mb-2 block text-foreground">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="glass-effect border-border/50 hover:border-accent/50 focus:border-accent transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      placeholder="Project inquiry, consultation, etc."
                      className="glass-effect border-border/50 hover:border-accent/50 focus:border-accent transition-all duration-300"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                      rows={6}
                      className="glass-effect border-border/50 hover:border-accent/50 focus:border-accent transition-all duration-300 resize-none"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-neon hover:bg-gradient-primary text-background font-semibold py-3 relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />

                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Send className="h-4 w-4" />
                            </motion.div>
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-[90%] max-w-md glass-effect border border-border/30 rounded-2xl p-8 text-center"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <button
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                onClick={() => setShowSuccess(false)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-semibold mb-2 gradient-text">
                Thank You!
              </h3>
              <p className="text-muted-foreground">
                I’ve received your message. I’ll get back to you within 24 hours.
              </p>

              <motion.button
                className="mt-6 px-6 py-2 rounded-md bg-accent text-accent-foreground hover:opacity-90 transition"
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowSuccess(false)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
