"use client";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  Target,
  Award,
  Globe,
  Shield,
  Zap,
  Heart,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Briefcase,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const values = [
  {
    icon: Heart,
    title: "Passion for People",
    description:
      "We believe in the power of human potential and strive to connect talented individuals with opportunities that fuel their growth.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We leverage cutting-edge AI technology to create seamless, intelligent matching that benefits both developers and companies.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Your data and privacy are our top priorities. We maintain the highest standards of security and transparency.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "We foster a diverse, inclusive community where talent knows no geographical boundaries.",
  },
];

const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Former tech lead at Google with 15+ years in software development and recruitment.",
    avatar: "/api/placeholder/150/150",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "AI/ML expert with experience building scalable platforms at Facebook and Amazon.",
    avatar: "/api/placeholder/150/150",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product",
    bio: "Product leader with a track record of building user-centric recruitment solutions.",
    avatar: "/api/placeholder/150/150",
  },
  {
    name: "Emily Watson",
    role: "Head of Operations",
    bio: "Operations specialist with deep expertise in scaling high-growth tech companies.",
    avatar: "/api/placeholder/150/150",
  },
];

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description:
      "TechnoTribe was born from a vision to revolutionize developer recruitment.",
  },
  {
    year: "2021",
    title: "First 1000 Users",
    description:
      "Reached our first milestone with 1000 active developers and recruiters.",
  },
  {
    year: "2022",
    title: "AI Launch",
    description:
      "Launched our AI-powered matching algorithm with 95% accuracy.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded to 50+ countries with 10,000+ active users.",
  },
  {
    year: "2024",
    title: "Series A Funding",
    description:
      "Secured $10M in funding to accelerate growth and product development.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-primary bg-background">
              About TechnoTribe
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Revolutionizing Developer
              <span className="block text-primary-foreground/80">Recruitment</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              We're on a mission to connect exceptional developers with
              innovative companies through intelligent, AI-powered matching that
              benefits everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At TechnoTribe, we believe that the right connection between
                talent and opportunity can change the world. Our mission is to
                build the most intelligent, efficient, and human-centered
                platform for developer recruitment.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We combine cutting-edge AI technology with deep human
                understanding to create meaningful connections that drive
                innovation and growth for both developers and companies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  10,000+ Developers
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Target className="mr-2 h-4 w-4" />
                  500+ Companies
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Award className="mr-2 h-4 w-4" />
                  95% Success Rate
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-accent/50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">AI-Powered</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced matching algorithms
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">
                      Worldwide talent pool
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Secure</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Scalable</h3>
                    <p className="text-sm text-muted-foreground">
                      Grows with your needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at TechnoTribe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals behind TechnoTribe's mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in TechnoTribe's growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {milestone.year}
                </div>
                <h3 className="font-semibold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Tribe?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Whether you're a developer looking for opportunities or a company
            seeking talent, TechnoTribe is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                <Briefcase className="mr-2 h-5 w-5" />
                Post a Job
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Search className="mr-2 h-5 w-5" />
                Browse Jobs
              </Button>
            </Link>
          </div>
                </div>
      </section>
    </>
  );
}
