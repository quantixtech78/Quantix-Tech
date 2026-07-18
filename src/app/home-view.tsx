"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedNetworkBackground } from "@/components/animated-network-background";
import { ProcessTimeline } from "@/components/process-timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Smartphone,
  Cloud,
  Brain,
  Shield,
  Zap,
  Users,
  Award,
  ArrowRight,
  Play,
  Globe,
  Rocket,
  CheckCircle2,
  HeartHandshake,
  Link as LinkIcon,
  Server,
} from "lucide-react";
import {
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiMongodb,
  SiDocker,
  SiFigma,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiAmazonwebservices,
} from "react-icons/si";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Modern web apps with React, Next.js & more",
    projects: "150+",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "iOS & Android native & cross-platform",
    projects: "80+",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "AWS, Azure, GCP infrastructure",
    projects: "100+",
  },
  {
    icon: LinkIcon,
    title: "Integeration & Portals",
    description: "System integration, portals and API gateway solutions",
    projects: "60+",
  },
  {
    icon: Server,
    title: "Managed services",
    description: "24/7 managed operations, monitoring and support",
    projects: "70+",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "End-to-end modernization",
    projects: "45+",
  },
];

const stats = [
  { value: "500+", label: "Projects Delivered", icon: Rocket },
  { value: "150+", label: "Happy Clients", icon: Users },
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "30+", label: "Countries Served", icon: Globe },
];

const partners = ["Microsoft", "Google", "AWS", "Salesforce", "SAP", "Oracle"];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We analyze your requirements and create a comprehensive project roadmap.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Our designers create stunning UI/UX that aligns with your brand identity.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Expert developers build your solution using cutting-edge technologies.",
  },
  {
    step: "04",
    title: "Testing",
    description:
      "Rigorous QA ensures your product is bug-free and performs optimally.",
  },
  {
    step: "05",
    title: "Deployment",
    description:
      "We deploy your solution and provide comprehensive documentation.",
  },
  {
    step: "06",
    title: "Support",
    description: "Ongoing maintenance and support to ensure long-term success.",
  },
];

const technologies = [
  { name: "React Js", icon: SiReact },
  { name: "Next Js", icon: SiNextdotjs },
  { name: "Vue Js", icon: SiVuedotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Figma", icon: SiFigma },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Node Js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "AWS", icon: SiAmazonwebservices },
];

function AnimatedCount({
  target,
  isActive,
  suffix = "",
  duration = 1400,
}: {
  target: number;
  isActive: boolean;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let animationFrame = 0;
    let startTime = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, isActive, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export function HomeView() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const processRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, {
    once: true,
    margin: "-100px",
  });
  const statsInView = useInView(statsRef, { once: false, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-white" />
          <AnimatedNetworkBackground />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <motion.div
                ref={heroRef}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {/* <motion.div variants={fadeInUp}>
                  <Badge className="mb-4 bg-[#38bdf8]/10 text-[#0ea5e9] border-[#38bdf8]/20 hover:bg-[#38bdf8]/20">
                    <Zap className="w-3 h-3 mr-1" />
                    #1 IT Solutions Provider
                  </Badge>
                </motion.div> */}

                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6 leading-tight"
                >
                  Transforming Ideas Into{" "}
                  <span className="gradient-text">Digital Reality</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-slate-600 mb-8 max-w-xl"
                >
                  Quantix Tech transforms ambitious ideas into intelligent
                  digital solutions. From exceptional web experiences and cloud
                  platforms to AI-powered innovation, we help businesses build,
                  scale, and thrive in a rapidly evolving digital world.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      Start Your Project
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  {/* <Button size="lg" variant="outline" className="border-2 border-[#1e3a5f]/20 hover:border-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all duration-300 group">
                    <Play className="mr-2 w-4 h-4 text-[#38bdf8]" />
                    Watch Demo
                  </Button> */}
                </motion.div>

                {/* Quick Stats */}
                {/* <motion.div
                  variants={fadeInUp}
                  className="mt-12 flex flex-wrap gap-8"
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-[#38bdf8]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#1e3a5f]">
                          {stat.value}
                        </div>
                        <div className="text-sm text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div> */}
              </motion.div>

              {/* Right content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-xl p-4 z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        Web Development
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute top-1/2 -right-8 bg-white rounded-2xl shadow-xl p-4 z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] flex items-center justify-center">
                      <Cloud className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        Cloud Solutions
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-4 left-1/4 bg-white rounded-2xl shadow-xl p-4 z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        Integrations & Portals
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Main hero card */}
                <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#38bdf8] flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Launch Your Vision
                        </div>
                        <div className="text-white/70 text-sm">
                          From concept to reality
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        "Strategize & Planning",
                        "Design & Development",
                        "Testing & Deployment",
                        "Ongoing Support",
                      ].map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.15 }}
                          className="flex items-center gap-2 text-white/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
                          <span className="text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section ref={servicesRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-[#38bdf8]/10 text-[#0ea5e9] border-[#38bdf8]/20">
                  Our Expertise
                </Badge>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
              >
                Solutions That Power{" "}
                <span className="gradient-text">Digital Growth</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 max-w-2xl mx-auto"
              >
                We deliver more than technology -- We deliver outcomes designed
                to help businesses transform, scale, and succeed in a rapidly
                evolving digital world.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full border-slate-200 hover:border-[#38bdf8]/50 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        {/* <span className="text-sm font-semibold text-[#38bdf8]">{service.projects}</span> */}
                      </div>
                      <h3 className="text-lg font-bold text-[#0f172a] mb-2 group-hover:text-[#38bdf8] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={servicesInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#1e3a5f]/20 hover:border-[#38bdf8] hover:bg-[#38bdf8]/10 group"
                >
                  View All Services
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          ref={statsRef}
          className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#38bdf8] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#38bdf8] rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-sm tracking-[0.24em] font-medium uppercase text-white">
                  Technologies We Work With
                </h2>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="w-full"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="tech-marquee-track">
                  <div className="tech-marquee-group">
                    {technologies.map((tech, index) => (
                      <div
                        key={`${tech.name}-group-a-${index}`}
                        className="tech-marquee-item flex items-center gap-3 px-6 py-4 rounded-xl min-w-max"
                      >
                        <tech.icon className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="tech-marquee-group" aria-hidden="true">
                    {technologies.map((tech, index) => (
                      <div
                        key={`${tech.name}-group-b-${index}`}
                        className="tech-marquee-item flex items-center gap-3 px-6 py-4 rounded-xl min-w-max"
                      >
                        <tech.icon className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Process Section */}
        <section
          ref={processRef}
          className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessTimeline steps={processSteps} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#38bdf8]/10 to-[#1e3a5f]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <HeartHandshake className="w-16 h-16 mx-auto mb-6 text-[#38bdf8]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                The future belongs to organizations that embrace innovation
                today. Let's build something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#1e3a5f]/20 hover:border-[#38bdf8] hover:bg-white transition-all duration-300"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
