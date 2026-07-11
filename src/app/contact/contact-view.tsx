"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Calendar,
  Globe,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Instagram,
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

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#", handle: "@quantixtech" },
  { name: "Twitter", icon: Twitter, href: "#", handle: "@quantixtech" },
  { name: "GitHub", icon: Github, href: "#", handle: "quantix-tech-labs" },
  { name: "Facebook", icon: Facebook, href: "#", handle: "Quantix Tech" },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
    handle: "@quantixtech.official",
  },
];

const services = [
  "Web Development",
  "Mobile Development",
  "UI/UX",
  "Cloud Solutions",
  "Integration & Portals",
  "Managed Services",
  "Digital Transformation",
  "Other",
];

export function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "", // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const heroRef = useRef(null);
  const formRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service) {
      setSubmitError("Please select a service.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.service,
          message: formData.message,
          company: formData.company, // honeypot — real users leave this empty
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message");
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          company: "",
        });
      }, 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#38bdf8]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#38bdf8]/5 rounded-full blur-3xl" />

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
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Let&apos;s Build Something{" "}
                <span className="text-[#38bdf8]">Amazing</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-white/70 max-w-2xl mx-auto"
              >
                Tell us about your vision, your challenges, or your next big
                opportunity - and let's create something extraordinary together.
                Your next breakthrough starts here.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section ref={formRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <Card className="border-slate-200 shadow-xl">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-2xl">
                      Send us a message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we&apos;ll get back to you
                      within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-slate-600 mb-4">
                          Thank you for reaching out. We&apos;ll get back to you
                          within 24 hours.
                        </p>
                        <Badge className="bg-green-100 text-green-700">
                          We received your inquiry
                        </Badge>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot: hidden from users, catches spam bots. */}
                        <input
                          type="text"
                          name="company"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          style={{
                            position: "absolute",
                            left: "-9999px",
                            width: 1,
                            height: 1,
                            opacity: 0,
                          }}
                        />
                        {submitError && (
                          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {submitError}
                          </div>
                        )}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="text-sm font-medium text-slate-700"
                            >
                              Full Name *
                            </label>
                            <Input
                              id="name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              required
                              className="border-slate-200 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="text-sm font-medium text-slate-700"
                            >
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              required
                              className="border-slate-200 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="phone"
                              className="text-sm font-medium text-slate-700"
                            >
                              Phone Number
                            </label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              className="border-slate-200 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20"
                            />
                          </div>
                          <div className="space-y-2 ">
                            <label className="text-sm font-medium text-slate-700">
                              Service Interested In *
                            </label>
                            <Select
                              value={formData.service}
                              onValueChange={(value) =>
                                setFormData({ ...formData, service: value })
                              }
                            >
                              <SelectTrigger className="border-slate-200 focus:border-[#38bdf8] w-full">
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium text-slate-700"
                          >
                            Tell Us About Your Project *
                          </label>
                          <Textarea
                            id="message"
                            placeholder="Briefly describe what you want to build, improve, or solve."
                            rows={5}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                            required
                            className="border-slate-200 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20 resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          size="lg"
                          className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              Send Message
                            </span>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Quick Info */}
                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-[#0f172a] mb-4">
                      Quick Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-[#38bdf8]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#0f172a]">
                            Response Time
                          </div>
                          <p className="text-sm text-slate-500">
                            We respond within 24 hours on business days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center flex-shrink-0">
                          <Globe className="w-5 h-5 text-[#38bdf8]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#0f172a]">
                            Global Coverage
                          </div>
                          <p className="text-sm text-slate-500">
                            Serving clients in 30+ countries worldwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="border-slate-200 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#38bdf8]" />
                        <span>
                          Delware, US | Engineering hub : Amman, Jordan
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#38bdf8]" />
                        <span>sales@quantix-tech.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                Let&apos;s discuss your requirements and create something
                amazing together.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Free consultation
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  No obligation
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  24h response
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
