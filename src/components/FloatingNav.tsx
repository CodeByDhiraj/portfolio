import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  PenTool,
  FileText,
} from "lucide-react";

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "philosophy", icon: PenTool, label: "Philosophy" },
    { id: "contact", icon: User, label: "Contact" },
  ];

  const handleResumeDownload = () => {
    setDownloading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          window.open("/[Dhiraj_Kumar_Resume].pdf", "_blank");
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const socialItems = [
    {
      icon: FileText,
      onClick: handleResumeDownload,
      label: "Resume",
    },
    {
      icon: Github,
      href: "https://github.com/codebydhiraj",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dhirajdev",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:dsingh98658@gmail.com",
      label: "Email",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-3/4 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
    >
      {/* Navigation */}
      <div className="glass-effect glow-effect rounded-full p-2 space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative p-3 rounded-full transition-all duration-300 group ${activeSection === item.id
                ? "bg-primary text-primary-foreground glow-effect"
                : "text-muted-foreground hover:text-accent hover:bg-secondary/20"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="h-5 w-5" />
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-background border border-border rounded-lg px-3 py-1 text-sm whitespace-nowrap">
                {item.label}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Social Links */}
      <div className="glass-effect rounded-full p-2 flex justify-center items-center gap-4">
        {socialItems.map((item, index) => (
          <motion.div
            key={index}
            onClick={item.onClick}
            className="relative block p-3 rounded-full text-muted-foreground hover:text-accent hover:bg-secondary/20 transition-all duration-300 group cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <item.icon className="h-4 w-4" />
              </a>
            ) : (
              <item.icon className="h-4 w-4" />
            )}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-background border border-border rounded-lg px-3 py-1 text-sm whitespace-nowrap">
                {item.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Download Animation */}
      {downloading && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999]"
        >
          <div className="glass-effect px-8 py-5 rounded-2xl border border-border shadow-xl text-center">
            <div className="flex items-center gap-3 justify-center">
              <svg className="animate-spin h-5 w-5 text-accent" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-primary font-semibold tracking-wide text-base">
                Downloading Resume... {progress}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FloatingNav;
