import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const philosophies = [
    {
      id: 1,
      title: "Code is empathy in action",
      text: "I believe great software isn’t just functional — it’s intuitive, inclusive, and crafted with care."
    },
    {
      id: 2,
      title: "Curiosity is my fuel",
      text: "I thrive on learning — whether it's exploring new frameworks or revisiting fundamentals with a fresh perspective."
    },
    {
      id: 3,
      title: "Build with intent",
      text: "From pixel to logic, I craft full-stack experiences that solve real problems and spark meaningful interactions."
    },
    {
  id: 4,
  title: "Design for humans, not users",
  text: "Every line of code I write keeps people in mind — aiming for clarity, comfort, and connection through technology."
},
{
  id: 5,
  title: "Consistency beats perfection",
  text: "I believe progress comes from showing up, iterating thoughtfully, and always pushing the bar — even in small steps."
},
{
  id: 6,
  title: "Collaboration creates impact",
  text: "The best ideas are rarely built alone. I value shared vision, open feedback, and the synergy of working together."
}
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
  };

  return (
    <section id="philosophy" className="py-20 px-6 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 left-16 text-accent/20 text-3xl" animate={{ y: [0, -30, 0], rotate: [0, 360], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity }}>🧠</motion.div>
        <motion.div className="absolute top-40 right-20 text-neon-purple/30 text-2xl" animate={{ x: [0, -20, 0], y: [0, -40, 0], rotate: [0, -180, 0] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}>💡</motion.div>
        <motion.div className="absolute bottom-32 left-1/4 text-neon-cyan/25 text-xl" animate={{ y: [0, -25, 0], scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }}>✨</motion.div>
        <motion.div className="absolute top-1/4 right-12 w-32 h-32 bg-gradient-primary opacity-5 rounded-full blur-3xl" animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360], x: [0, -30, 0] }} transition={{ duration: 20, repeat: Infinity }} />
        <motion.div className="absolute bottom-1/3 left-16 w-24 h-24 bg-neon-pink opacity-8 rounded-full blur-2xl" animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity, delay: 3 }} />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <motion.h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            My Philosophy
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            Thoughts and values that shape the way I build and grow as a developer.
          </motion.p>
        </motion.div>

        {/* Philosophy Cards */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {philosophies.map((item, index) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.02, rotateX: 5, transition: { duration: 0.3 } }}
              className="group relative cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <motion.div className="relative glass-effect rounded-2xl border border-border/30 overflow-hidden h-full p-6 bg-background/80" whileHover={{ boxShadow: "0 20px 40px hsl(var(--accent) / 0.1)", borderColor: "hsl(var(--accent) / 0.3)" }}>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-5">{item.text}</p>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Optional */}
        <motion.div className="text-center mt-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="glow-effect hover:glow-accent transition-all duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="mr-2">Let’s Connect</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ExternalLink className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
