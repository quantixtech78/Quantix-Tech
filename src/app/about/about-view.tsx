"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
  Globe,
  Target,
  Eye,
  Heart,
  Shield,
  Zap,
  Lightbulb,
  Handshake,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Rocket,
  CheckCircle2,
} from "lucide-react";

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

const companyValues = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We prioritize security in every solution we build, ensuring your data and systems are always protected.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We constantly push boundaries with cutting-edge technology to deliver solutions that give you a competitive edge.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description:
      "We work closely with our clients as partners, ensuring transparency and alignment throughout every project.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We deliver nothing but the highest quality work, with attention to detail in every line of code.",
  },
  {
    icon: Lightbulb,
    title: "Creativity",
    description:
      "We approach challenges with creative thinking, finding innovative solutions to complex problems.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We operate with honesty and transparency, building trust through ethical business practices.",
  },
];

const commitments = [
  {
    icon: Handshake,
    title: "Customer-Centric Engagement",
    description:
      "Maintaining continuous communication and collaboration throughout the project lifecycle.",
  },
  {
    icon: Zap,
    title: "Agile & Adaptive Delivery",
    description:
      "Flexible execution methodology that quickly adapts to evolving business requirements.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Assurance & Testing",
    description:
      "Comprehensive testing processes to ensure reliability, performance, and user satisfaction.",
  },
  {
    icon: Shield,
    title: "Security & Compliance Focus",
    description:
      "Implementing industry’s best practices for cybersecurity, privacy, and compliance requirements.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Improvement Approach",
    description:
      "Regular reviews and optimization initiatives to maximize business value over time.",
  },
  {
    icon: Heart,
    title: "Long-Term Partnership Mindset",
    description:
      "Building trusted relationships focused on sustainable growth and shared success.",
  },
  {
    icon: Rocket,
    title: "Scalable Technology Roadmaps",
    description:
      "Planning future enhancements and scalability from the early project stages.",
  },
  {
    icon: Target,
    title: "Innovation & Emerging Technologies",
    description:
      "Adopting modern technologies and best practices to keep customers ahead of the curve.",
  },
];

const locations = [
  {
    city: "Amman",
    country: "Jordan",
    address: "Abdali Boulevard, Amman, Jordan",
    phone: "+962 6 123 4567",
    email: "amman@quantix-tech.com",
    type: "Headquarters",
  },
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    address: "King Fahd Road, Riyadh, Saudi Arabia",
    phone: "+966 11 123 4567",
    email: "riyadh@quantix-tech.com",
    type: "Regional Office",
  },
];

export function AboutView() {
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const locationsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const locationsInView = useInView(locationsRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-sky-50" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={heroRef}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] mb-6"
              >
                Building the <span className="gradient-text">Future</span>{" "}
                Together
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 max-w-3xl mx-auto mb-8"
              >
                At Quantix Tech we partner with forward-thinking organizations
                to create exceptional digital experiences, scalable cloud
                solutions, and AI-powered innovations that transform bold ideas
                into measurable business success. Innovate with Confidence.
                Build with Purpose. Grow Without Limits.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision - New Design */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
                Mission & <span className="gradient-text">Vision</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-3xl transform rotate-1" />
                <Card className="relative bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white border-0 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 lg:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Target className="w-8 h-8 text-[#38bdf8]" />
                      </div>
                      <h3 className="text-2xl font-bold">Our Mission</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed text-lg">
                      To empower businesses through innovative digital solutions
                      that combine technology, creativity, and strategic
                      thinking—enabling organizations to accelerate growth,
                      improve efficiency, and confidently embrace the future. We
                      are committed to delivering exceptional software,
                      intelligent cloud solutions, and customer experiences that
                      exceed expectations while building long-term partnerships
                      founded on trust, transparency, and measurable results.
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <div className="flex flex-wrap gap-3">
                        {["Innovation", "Growth", "Efficiency", "Results"].map(
                          (tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white/10 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] rounded-3xl transform -rotate-1 opacity-45" />
                <Card className="relative bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] text-white border-0 rounded-3xl overflow-hidden opacity-75">
                  <CardContent className="p-8 lg:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Our Vision</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-lg">
                      To become a globally recognized technology partner known
                      for transforming bold ideas into extraordinary digital
                      experiences. We envision a future where businesses of
                      every size can harness the full power of technology
                      through solutions that are intelligent, scalable, secure,
                      and built to inspire continuous innovation.
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/30">
                      <div className="flex flex-wrap gap-3">
                        {["Trust", "Excellence", "Future", "Impact"].map(
                          (tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white/20 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section ref={valuesRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
              >
                What <span className="gradient-text">Drives Us</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 max-w-2xl mx-auto"
              >
                Our core values guide every decision we make and every solution
                we deliver.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
            >
              {companyValues.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                >
                  <div className="h-44 md:h-48 w-full bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-lg transition p-6 flex flex-col items-start text-left">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] flex items-center justify-center mb-2 flex-shrink-0">
                      <value.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#0f172a] leading-tight mb-1">
                      {value.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Commitment to Excellence */}
        <section
          ref={locationsRef}
          className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={locationsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Why Quantix Tech ?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/70 max-w-2xl mx-auto mb-8"
              >
                We combine strategic planning, technical expertise, and
                customer-centric delivery methodologies to ensure every project
                achieves measurable business value, operational excellence, and
                long-term success.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={locationsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {commitments.map((c) => (
                <motion.div
                  key={c.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                >
                  <div className="h-44 md:h-48 w-full bg-white/5 border border-white/10 rounded-xl shadow-sm hover:shadow-lg transition p-6 flex flex-col items-start text-left">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#38bdf8]/20 flex items-center justify-center mb-2 flex-shrink-0">
                      <c.icon className="w-5 h-5 md:w-6 md:h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-sm font-semibold text-white leading-tight mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-white/70">{c.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-white to-[#38bdf8]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
                Want to Join Our Team?
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                We&apos;re always looking for exceptional talent who share our
                passion for technology and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
