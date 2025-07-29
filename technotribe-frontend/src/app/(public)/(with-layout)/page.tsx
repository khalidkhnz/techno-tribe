"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

import FRONTEND_ROUTES from "@/lib/fe-routes";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Matching",
    description:
      "Our advanced AI matches the perfect candidates with your job requirements in seconds.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description:
      "All developers and recruiters are thoroughly verified for your peace of mind.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Quick Hiring",
    description:
      "Reduce time-to-hire by up to 70% with our streamlined recruitment process.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Globe,
    title: "Global Talent Pool",
    description:
      "Access developers from around the world with diverse skills and experience.",
    color: "from-orange-500 to-red-500",
  },
];

const stats = [
  { number: "10,000+", label: "Active Developers", icon: Users, delay: 0.1 },
  { number: "500+", label: "Companies", icon: Building2, delay: 0.2 },
  { number: "95%", label: "Success Rate", icon: TrendingUp, delay: 0.3 },
  { number: "24/7", label: "Support", icon: Clock, delay: 0.4 },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechCorp",
    content:
      "TechnoTribe helped us find exceptional developers in record time. The AI matching is incredible!",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Senior Developer",
    content:
      "Found my dream job through TechnoTribe. The platform is intuitive and the opportunities are amazing.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "HR Director at StartupXYZ",
    content:
      "The quality of candidates we receive is outstanding. Highly recommend for any company hiring developers.",
    rating: 5,
    avatar: "ER",
  },
];

const jobCategories = [
  {
    title: "Frontend Development",
    count: 234,
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    count: 189,
    icon: Code,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Full Stack Development",
    count: 156,
    icon: Code,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "DevOps Engineering",
    count: 98,
    icon: Code,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Mobile Development",
    count: 145,
    icon: Code,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Data Science",
    count: 87,
    icon: Code,
    color: "from-teal-500 to-green-500",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Create Your Profile",
    description:
      "Sign up as a developer or recruiter and build your comprehensive profile with skills, experience, and preferences.",
    icon: User,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "2",
    title: "AI Matching",
    description:
      "Our advanced AI analyzes profiles and requirements to find the perfect matches with high accuracy.",
    icon: Target,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "3",
    title: "Connect & Hire",
    description:
      "Start conversations, schedule interviews, and make hiring decisions with confidence.",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-500",
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 text-primary bg-background/90 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 500+ Companies Worldwide
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Connect with the Best
              <span className="block text-primary-foreground/80">
                Developer Talent
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              AI-powered platform connecting exceptional developers with
              innovative companies. Find your next opportunity or hire the
              perfect talent.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={FRONTEND_ROUTES.SIGNUP}>
                  <Button
                    size="lg"
                    className="bg-background text-primary hover:bg-background/90 px-8 py-3 shadow-lg"
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Post a Job
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={FRONTEND_ROUTES.JOBS}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-background text-background hover:bg-background hover:text-primary px-8 py-3"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Browse Jobs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="bg-background/10 backdrop-blur-sm border-t border-background/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="container mx-auto px-4 py-6">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: `${stat.delay}s` }}
                  >
                    <stat.icon className="h-8 w-8 mb-2 text-primary-foreground/80" />
                  </motion.div>
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose TechnoTribe?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've built the most advanced developer recruitment platform with
              cutting-edge technology and a focus on user experience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
                  <CardHeader>
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to find your perfect match
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Job Categories
            </h2>
            <p className="text-xl text-muted-foreground">
              Find opportunities in your area of expertise
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {jobCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <category.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {category.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {category.count} jobs available
                          </p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={FRONTEND_ROUTES.JOBS}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  View All Jobs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied developers and recruiters
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mr-4 text-white font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
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
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of developers and companies who have already found
            their perfect match on TechnoTribe.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={FRONTEND_ROUTES.SIGNUP}>
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90 px-8 py-3 shadow-lg"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Start Hiring
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={FRONTEND_ROUTES.SIGNUP}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background text-background hover:bg-background hover:text-primary px-8 py-3"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Find Jobs
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                </motion.div>
                <span className="text-xl font-bold text-foreground">
                  TechnoTribe
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Connecting exceptional developers with innovative companies
                through AI-powered matching.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4 text-foreground">
                For Developers
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href={FRONTEND_ROUTES.JOBS}
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href={FRONTEND_ROUTES.SIGNUP}
                    className="hover:text-foreground transition-colors"
                  >
                    Create Profile
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4 text-foreground">
                For Recruiters
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href={FRONTEND_ROUTES.SIGNUP}
                    className="hover:text-foreground transition-colors"
                  >
                    Post Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href={FRONTEND_ROUTES.RECRUITER.JOBS.BASE}
                    className="hover:text-foreground transition-colors"
                  >
                    Manage Jobs
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href={FRONTEND_ROUTES.ABOUT}
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href={FRONTEND_ROUTES.CONTACT}
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-border mt-8 pt-8 text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 TechnoTribe. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
