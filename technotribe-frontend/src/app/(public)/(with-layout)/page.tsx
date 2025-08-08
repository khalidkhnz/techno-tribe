"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  Users,
  Zap,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Building2,
  Code,
  Globe,
  Shield,
  Clock,
  DollarSign,
  MapPin,
  Sparkles,
  Rocket,
  Target,
  Award,
  Heart,
  MessageCircle,
  Calendar,
  BarChart3,
  User,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPinIcon,
  Send,
  MousePointer2,
  Layers,
  Database,
  Server,
  Smartphone,
  Monitor,
  Cpu,
  Brain,
  Zap as Lightning,
  Infinity,
  Eye,
  Coffee,
  Cloud,
} from "lucide-react";

import FRONTEND_ROUTES from "@/lib/fe-routes";

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/10 rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: 999999,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Aceternity-style grid background
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
    </div>
  );
};

// Aceternity-style spotlight effect
const Spotlight = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-3xl ${className}`}
    />
  );
};

// Animated number counter
const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const finalValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * finalValue));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [finalValue, duration]);

  return <span>{value.includes('+') ? `${count}+` : value.includes('%') ? `${count}%` : count}</span>;
};

// Modern tech stack icons (unused for now but kept for future use)
// const techStack = [
//   { name: "React", icon: Code, color: "text-blue-500" },
//   { name: "Node.js", icon: Server, color: "text-green-500" },
//   { name: "Python", icon: Code, color: "text-yellow-500" },
//   { name: "TypeScript", icon: Code, color: "text-blue-600" },
//   { name: "MongoDB", icon: Database, color: "text-green-600" },
//   { name: "Docker", icon: Layers, color: "text-blue-400" },
//   { name: "AWS", icon: Cloud, color: "text-orange-500" },
//   { name: "GraphQL", icon: Zap, color: "text-pink-500" },
// ];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Advanced machine learning algorithms match developers with perfect opportunities based on skills, experience, and preferences.",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Every developer and company profile is thoroughly verified through our multi-step authentication process.",
    gradient: "from-green-500 via-teal-500 to-blue-500",
  },
  {
    icon: Lightning,
    title: "Instant Connections",
    description: "Connect with potential matches instantly through our real-time messaging and video interview platform.",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access a worldwide network of top-tier developers and innovative companies across all time zones.",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
];

const stats = [
  { number: "50,000+", label: "Active Developers", icon: Users },
  { number: "2,500+", label: "Companies", icon: Building2 },
  { number: "98%", label: "Success Rate", icon: TrendingUp },
  { number: "24/7", label: "Support", icon: Clock },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Engineering Director at Meta",
    content: "TechnoTribes revolutionized our hiring process. We found exceptional talent 3x faster than traditional methods.",
    rating: 5,
    avatar: "SC",
    company: "Meta",
  },
  {
    name: "Alex Rodriguez",
    role: "Senior Full-Stack Developer",
    content: "Found my dream role at a unicorn startup through TechnoTribes. The AI matching was incredibly accurate!",
    rating: 5,
    avatar: "AR",
    company: "Stripe",
  },
  {
    name: "Emily Johnson",
    role: "CTO at TechCorp",
    content: "The quality of developers on TechnoTribes is unmatched. Every candidate was pre-screened and interview-ready.",
    rating: 5,
    avatar: "EJ",
    company: "TechCorp",
  },
];

const jobCategories = [
  {
    title: "Frontend Development",
    count: 1234,
    icon: Monitor,
    description: "React, Vue, Angular, Next.js",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    count: 987,
    icon: Server,
    description: "Node.js, Python, Java, Go",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Full Stack Development",
    count: 756,
    icon: Layers,
    description: "MERN, MEAN, Django, Rails",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Mobile Development",
    count: 543,
    icon: Smartphone,
    description: "React Native, Flutter, Swift",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "DevOps Engineering",
    count: 432,
    icon: Cpu,
    description: "AWS, Docker, Kubernetes, CI/CD",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "AI/ML Engineering",
    count: 321,
    icon: Brain,
    description: "TensorFlow, PyTorch, OpenAI",
    gradient: "from-teal-500 to-green-500",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Build a comprehensive profile showcasing your skills, experience, and career aspirations with our AI-powered profile builder.",
    icon: User,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    title: "AI Matching",
    description: "Our advanced AI analyzes thousands of data points to match you with the perfect opportunities or candidates.",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    step: "03",
    title: "Connect & Interview",
    description: "Start meaningful conversations, schedule interviews, and make hiring decisions with confidence using our platform.",
    icon: MessageCircle,
    gradient: "from-green-500 to-emerald-500",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <GridBackground />
        <FloatingParticles />
        
        {/* Spotlight Effects */}
        <Spotlight className="top-40 left-0 w-[50vw] h-[40vh]" />
        <Spotlight className="top-10 right-0 w-[50vw] h-[40vh]" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-6 text-primary bg-primary/5 border-primary/20 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 2,500+ Companies Worldwide
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              variants={fadeInUpVariants}
            >
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Connect
              </span>{" "}
              with the{" "}
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                Future
              </span>
              <br />
              <span className="text-foreground/80">of Developer Talent</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUpVariants}
            >
              Revolutionary AI-powered platform that connects exceptional developers 
              with innovative companies. Experience the next generation of tech recruitment.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              variants={fadeInUpVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Link href={FRONTEND_ROUTES.SIGNUP}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-10 py-4 text-lg shadow-xl shadow-primary/25 group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all duration-300"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Start Your Journey
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Link href={FRONTEND_ROUTES.JOBS}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary/5 px-10 py-4 text-lg backdrop-blur-sm"
                  >
                    <Eye className="mr-3 h-6 w-6" />
                    Explore Opportunities
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    <AnimatedCounter value={stat.number} />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: 999999 }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUpVariants}
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Revolutionary
              </span>{" "}
              Features
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUpVariants}
            >
              Experience the next generation of developer recruitment with cutting-edge AI technology 
              and seamless user experience designed for modern professionals.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <CardContent className="p-0">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              variants={fadeInUpVariants}
            >
              How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={fadeInUpVariants}
            >
              Three simple steps to revolutionize your career or hiring process
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative mb-8"
                >
                  <motion.div
                    className={`w-24 h-24 bg-gradient-to-r ${step.gradient} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <step.icon className="h-12 w-12 text-white" />
                  </motion.div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {step.step}
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUpVariants}
            >
              Popular <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Categories</span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={fadeInUpVariants}
            >
              Discover opportunities across the most in-demand tech specializations
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {jobCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group cursor-pointer"
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <category.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 text-sm">
                      {category.description}
                    </p>
                    <p className="text-primary font-semibold">
                      <AnimatedCounter value={category.count.toString()} /> jobs available
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={FRONTEND_ROUTES.JOBS}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-4 text-lg shadow-xl">
                  Explore All Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={fadeInUpVariants}
            >
              Success <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Stories</span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={fadeInUpVariants}
            >
              Join thousands of satisfied professionals who transformed their careers with TechnoTribes
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-5 w-5 text-accent fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-foreground mb-6 text-lg leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mr-4 text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-primary font-semibold text-sm">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
        <GridBackground />
        <FloatingParticles />
        
        {/* Spotlight Effects */}
        <Spotlight className="top-0 left-0 w-full h-full" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-8"
              variants={fadeInUpVariants}
            >
              Ready to Transform Your
              <span className="block text-primary-foreground/80">Career Journey?</span>
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl mb-12 text-primary-foreground/90 leading-relaxed"
              variants={fadeInUpVariants}
            >
              Join the revolution in tech recruitment. Connect with your perfect match today 
              and experience the future of professional networking.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              variants={fadeInUpVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={FRONTEND_ROUTES.SIGNUP}>
                  <Button
                    size="lg"
                    className="bg-background text-primary hover:bg-background/90 px-10 py-4 text-lg shadow-2xl font-semibold"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Start Your Journey
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={FRONTEND_ROUTES.JOBS}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-background text-background hover:bg-background/10 px-10 py-4 text-lg backdrop-blur-sm font-semibold"
                  >
                    <Eye className="mr-3 h-6 w-6" />
                    Explore Opportunities
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold text-foreground">
                  TechnoTribes
                </span>
              </div>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed max-w-md">
                Revolutionizing the way exceptional developers connect with innovative companies 
                through cutting-edge AI technology and seamless user experience.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Github].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Icon className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-bold mb-6 text-foreground text-lg">
                For Developers
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  { label: "Browse Jobs", href: FRONTEND_ROUTES.JOBS },
                  { label: "Create Profile", href: FRONTEND_ROUTES.SIGNUP },
                  { label: "Career Resources", href: "#" },
                  { label: "Success Stories", href: "#" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-bold mb-6 text-foreground text-lg">
                For Companies
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  { label: "Post Jobs", href: FRONTEND_ROUTES.SIGNUP },
                  { label: "Find Talent", href: FRONTEND_ROUTES.JOBS },
                  { label: "Pricing", href: "#" },
                  { label: "Enterprise", href: "#" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4 md:mb-0">
              &copy; 2024 TechnoTribes. All rights reserved. Built with ❤️ for the developer community.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href={FRONTEND_ROUTES.CONTACT} className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
