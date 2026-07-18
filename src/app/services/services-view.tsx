"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefObject,
} from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FeaturePanels } from "@/components/feature-panels";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  Smartphone,
  Cloud,
  Brain,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  X,
  Users,
  ShoppingCart,
  Building2,
  Stethoscope,
  GraduationCap,
  Plane,
  Link as LinkIcon,
  Server,
  TrendingUp,
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

type Service = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  name: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  benefits?: Array<{
    title: string;
    description: string;
  }>;
};

const services: Service[] = [
  {
    id: "web",
    icon: Code2,
    name: "Web Development",
    shortDesc: "Custom web applications built with modern frameworks",
    fullDesc:
      "Custom web applications built with modern frameworks. We create powerful, scalable web applications using cutting-edge technologies. From simple websites to complex enterprise platforms, we deliver solutions that drive results.",
    technologies: [
      "React",
      "Next.js",
      "Vue.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
    ],
    benefits: [
      {
        title: "Scalable Architecture",
        description: "Built to grow with your business",
      },
      { title: "SEO Optimized", description: "Rank higher in search results" },
      { title: "Fast Performance", description: "Load times under 3 seconds" },
      { title: "Mobile Responsive", description: "Perfect on all devices" },
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    name: "Mobile Development",
    shortDesc: "Native and cross-platform mobile applications",
    fullDesc:
      "Native and cross-platform mobile applications. Build engaging mobile experiences for iOS and Android. Our mobile apps combine beautiful design with powerful functionality to delight users.",
    technologies: [
      "Swift",
      "Kotlin",
      "React Native",
      "Flutter",
      "Firebase",
      "AWS Amplify",
      "SQLite",
      "REST APIs",
    ],
    benefits: [
      {
        title: "Native Performance",
        description: "Smooth, responsive user experience",
      },
      {
        title: "Offline Support",
        description: "Works without internet connection",
      },
      { title: "Push Notifications", description: "Engage users in real-time" },
      { title: "App Store Ready", description: "Complete submission support" },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    name: "Cloud Solutions",
    shortDesc: "Scalable cloud infrastructure and migration",
    fullDesc:
      "Scalable cloud infrastructure and migration. Transform your infrastructure with cloud solutions that scale. We help businesses migrate, optimize, and manage their cloud environments for maximum efficiency.",
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CloudFormation",
      "Jenkins",
    ],
    benefits: [
      { title: "Cost Efficiency", description: "Pay only for what you use" },
      { title: "High Availability", description: "99.99% uptime guaranteed" },
      {
        title: "Auto-Scaling",
        description: "Handle traffic spikes automatically",
      },
      { title: "Disaster Recovery", description: "Built-in backup solutions" },
    ],
  },
  {
    id: "integration",
    icon: LinkIcon,
    name: "Integration & Portals",
    shortDesc: "System integration, portals and API gateways",
    fullDesc:
      "System integration, portals and API gateways. Connect systems, build portals and implement API gateways for smooth data flow and secure integrations.",
    technologies: [
      "API Gateway",
      "REST/GraphQL",
      "OAuth",
      "SAML",
      "RabbitMQ",
      "Kafka",
      "Mulesoft",
      "Azure API Management",
    ],
    benefits: [
      {
        title: "Seamless Connectivity",
        description: "Systems communicate reliably",
      },
      {
        title: "Centralized Portals",
        description: "Single place for users and data",
      },
      {
        title: "Secure Integrations",
        description: "Authentication & authorization best practices",
      },
      {
        title: "Reduced Complexity",
        description: "Simpler architecture and maintenance",
      },
    ],
  },
  {
    id: "managed",
    icon: Server,
    name: "Managed Services",
    shortDesc: "Ongoing managed operations, monitoring and support",
    fullDesc:
      "Ongoing managed operations, monitoring and support. We operate, monitor and maintain your infrastructure and applications with proactive support and SLAs.",
    technologies: [
      "Prometheus",
      "Grafana",
      "Datadog",
      "Ansible",
      "Terraform",
      "Kubernetes",
      "AWS",
      "Azure",
    ],
    benefits: [
      {
        title: "Reduced Operational Burden",
        description: "Focus on your core business",
      },
      {
        title: "Improved Reliability",
        description: "Higher uptime and performance",
      },
      { title: "Cost Predictability", description: "Managed costs and SLAs" },
      {
        title: "Expert Support",
        description: "Access to experienced ops engineers",
      },
    ],
  },
  {
    id: "transformation",
    icon: Zap,
    name: "Digital Transformation",
    shortDesc: "End-to-end modernization services",
    fullDesc:
      "End-to-end modernization services. Modernize your business processes and technology stack. We guide organizations through digital transformation to improve efficiency, reduce costs, and stay competitive.",
    technologies: [
      "RPA Tools",
      "Workflow Automation",
      "ERP Systems",
      "CRM Platforms",
      "BI Tools",
      "Low-Code Platforms",
      "API Management",
      "Integration Platforms",
    ],
    benefits: [
      {
        title: "Increased Efficiency",
        description: "Up to 40% process improvement",
      },
      { title: "Cost Reduction", description: "Lower operational costs" },
      { title: "Better Decisions", description: "Data-driven insights" },
      { title: "Future Ready", description: "Stay ahead of competition" },
    ],
  },
];

const serviceSectionColumns = 3;

const chunkServices = (items: Service[], size: number) => {
  const chunks: Service[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

function ServicePanel({
  service,
  onClose,
  panelId,
  titleId,
  notchLeft,
  panelRef,
  reducedMotion,
  className,
}: {
  service: Service;
  onClose: () => void;
  panelId: string;
  titleId: string;
  notchLeft: number;
  panelRef: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
  className?: string;
}) {
  const ServiceIcon = service.icon;

  return (
    <motion.div
      ref={panelRef}
      id={panelId}
      role="region"
      aria-labelledby={titleId}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: reducedMotion ? 0 : 0.2,
          ease: "easeOut",
          delay: reducedMotion ? 0 : 0.05,
        },
      }}
      exit={{
        opacity: 0,
        y: reducedMotion ? 0 : -8,
        transition: { duration: reducedMotion ? 0 : 0.12, ease: "easeIn" },
      }}
      className={`relative mt-4 ${className ?? ""}`}
    >
      <div
        className="absolute -top-2 z-10 h-4 w-4 rotate-45 border-l border-t border-[#38bdf8]/30 bg-[#10253f]"
        style={{
          left: `${notchLeft}%`,
          transform: "translateX(-50%) rotate(45deg)",
        }}
      />

      <motion.div
        initial={{ gridTemplateRows: "0fr" }}
        animate={{ gridTemplateRows: "1fr" }}
        exit={{ gridTemplateRows: "0fr" }}
        transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
        className="grid overflow-hidden"
      >
        <div className="overflow-hidden">
          <Card className="relative border border-[#38bdf8]/25 bg-[#0b1624]/95 shadow-[0_24px_80px_-36px_rgba(56,189,248,0.55)]">
            <CardContent className="relative p-6 sm:p-8">
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${service.name} details`}
                className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-[#38bdf8]/40 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: reducedMotion ? 0 : 0.2,
                    delay: reducedMotion ? 0 : 0.08,
                  },
                }}
                className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none"
              >
                <div className="flex items-start gap-4 pr-12">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#38bdf8]">
                    <ServiceIcon className="h-7 w-7 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      id={titleId}
                      className="text-2xl font-bold text-[#38bdf8]"
                    >
                      {service.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                      {service.fullDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Key Technologies
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/10 px-3 py-1 text-xs font-medium text-[#7dd3fc]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/contact" className="mt-8 block">
                  <Button className="group w-full bg-gradient-to-r from-[#1e3a5f] to-[#38bdf8] text-white shadow-lg shadow-[#38bdf8]/10 transition-all duration-300 hover:from-[#38bdf8] hover:to-[#1e3a5f] motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}

const industries = [
  {
    icon: TrendingUp,
    name: "SEO Ready",
    description: "Built with SEO best practices for improved discoverability",
  },
  {
    icon: LinkIcon,
    name: "API & Third party integrations",
    description:
      "Ready-made connectors and support for external APIs and services",
  },
  {
    icon: Smartphone,
    name: "Cross Platform compatibility",
    description: "Works seamlessly across web, mobile, and tablet devices",
  },
  {
    icon: Shield,
    name: "Secure",
    description: "Security-first architecture and best practices",
  },
  {
    icon: Server,
    name: "Customized & Scalable",
    description: "Easily customizable solutions that scale with your business",
  },
  {
    icon: Zap,
    name: "Performance Optimization",
    description: "Optimized for speed, low-latency and high throughput",
  },
];

const developmentProcess = [
  {
    step: "01",
    title: "Discovery & Analysis",
    description:
      "We analyze your requirements, goals, and create a comprehensive project roadmap.",
  },
  {
    step: "02",
    title: "Design & Prototype",
    description:
      "Our designers create stunning UI/UX designs and interactive prototypes for your approval.",
  },
  {
    step: "03",
    title: "Development & Testing",
    description:
      "Expert developers build your solution using agile methodology with continuous testing.",
  },
  {
    step: "04",
    title: "Deployment & Launch",
    description:
      "We deploy your solution to production and ensure a smooth launch.",
  },
  {
    step: "05",
    title: "Support & Maintenance",
    description:
      "Ongoing support, updates, and optimization to ensure long-term success.",
  },
];

export function ServicesView() {
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const processLineRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const heroInView = useInView(heroRef, { once: true });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const industriesInView = useInView(industriesRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: processLineRef,
    offset: ["start 80%", "end 20%"],
  });

  const progressScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const desktopRows = chunkServices(services, serviceSectionColumns);
  const openService = openIndex === null ? null : services[openIndex];
  const openDesktopRowIndex =
    openIndex === null ? null : Math.floor(openIndex / serviceSectionColumns);
  const openDesktopColIndex =
    openIndex === null ? null : openIndex % serviceSectionColumns;

  useEffect(() => {
    if (openIndex === null || !panelRef.current) {
      return;
    }

    panelRef.current.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [openIndex, reducedMotion]);

  useEffect(() => {
    if (openIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex]);

  const toggleService = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const closeService = () => {
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-sky-50" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1e3a5f]/10 rounded-full blur-3xl" />

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
                Explore <span className="gradient-text">Our Services</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 max-w-3xl mx-auto mb-8"
              >
                We design, build, and optimize digital solutions that help
                organizations innovate faster, operate smarter, and scale with
                confidence. From custom software and cloud platforms to
                AI-driven automation, every solution is engineered to solve real
                business challenges and create lasting value.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white shadow-lg group"
                  >
                    Get a Quote
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                {/* <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#1e3a5f]/20 hover:border-[#38bdf8]"
                  >
                    View Case Studies
                  </Button>
                </Link> */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:block space-y-6">
              {desktopRows.map((row, rowIndex) => {
                const rowStartIndex = rowIndex * serviceSectionColumns;
                const rowOpenIndex =
                  openDesktopRowIndex === rowIndex ? openIndex : null;

                return (
                  <Fragment key={`desktop-row-${rowIndex}`}>
                    <div className="grid grid-cols-3 gap-6">
                      {row.map((service, colIndex) => {
                        const serviceIndex = rowStartIndex + colIndex;
                        const isOpen = openIndex === serviceIndex;
                        const ServiceIcon = service.icon;

                        return (
                          <motion.button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(serviceIndex)}
                            variants={fadeInUp}
                            whileHover={{ y: -4 }}
                            aria-expanded={isOpen}
                            aria-controls={`service-panel-${service.id}`}
                            className={`group flex h-full w-full cursor-pointer flex-col rounded-2xl border p-8 text-left transition-all duration-300 motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none ${
                              isOpen
                                ? "border-[#38bdf8] bg-[#101e31] shadow-[0_18px_50px_-28px_rgba(56,189,248,0.6)]"
                                : "border-[#1f2d40] bg-[#0b1624] hover:border-[#38bdf8]/50 hover:bg-[#10253f]"
                            }`}
                          >
                            <div className="mb-4 flex items-start gap-4">
                              <div
                                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                                  isOpen
                                    ? "bg-gradient-to-br from-[#38bdf8] to-[#1e3a5f]"
                                    : "bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f]"
                                }`}
                              >
                                <ServiceIcon className="h-6 w-6 text-white" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <h3
                                    className={`text-lg font-bold transition-colors duration-300 ${
                                      isOpen ? "text-[#38bdf8]" : "text-white"
                                    }`}
                                  >
                                    {service.name}
                                  </h3>
                                  <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{
                                      duration: reducedMotion ? 0 : 0.2,
                                      ease: "easeOut",
                                    }}
                                    className="mt-1 flex-shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-[#38bdf8]"
                                  >
                                    <ChevronDown className="h-5 w-5 group-hover:animate-[service-arrow-float_1.1s_ease-in-out_infinite] motion-reduce:group-hover:animate-none" />
                                  </motion.div>
                                </div>

                                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                  {service.shortDesc}
                                </p>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    <AnimatePresence initial={false}>
                      {rowOpenIndex !== null &&
                        openService &&
                        openDesktopRowIndex === rowIndex &&
                        openDesktopColIndex !== null && (
                          <ServicePanel
                            key={openService.id}
                            service={openService}
                            onClose={closeService}
                            panelId={`service-panel-${openService.id}`}
                            titleId={`service-title-${openService.id}`}
                            notchLeft={
                              ((openDesktopColIndex * 2 + 1) /
                                (2 * serviceSectionColumns)) *
                              100
                            }
                            panelRef={panelRef}
                            reducedMotion={reducedMotion}
                          />
                        )}
                    </AnimatePresence>
                  </Fragment>
                );
              })}
            </div>

            <div className="lg:hidden space-y-4">
              {services.map((service, index) => {
                const isOpen = openIndex === index;
                const ServiceIcon = service.icon;

                return (
                  <div key={service.id}>
                    <button
                      type="button"
                      onClick={() => toggleService(index)}
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${service.id}`}
                      className={`group flex w-full items-start gap-4 rounded-2xl border p-8 text-left transition-all duration-300 motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none ${
                        isOpen
                          ? "border-[#38bdf8] bg-[#101e31] shadow-[0_18px_50px_-28px_rgba(56,189,248,0.6)]"
                          : "border-[#1f2d40] bg-[#0b1624] hover:border-[#38bdf8]/50 hover:bg-[#10253f]"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                          isOpen
                            ? "bg-gradient-to-br from-[#38bdf8] to-[#1e3a5f]"
                            : "bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f]"
                        }`}
                      >
                        <ServiceIcon className="h-5 w-5 text-white" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3
                            className={`text-base font-bold transition-colors duration-300 ${
                              isOpen ? "text-[#38bdf8]" : "text-white"
                            }`}
                          >
                            {service.name}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{
                              duration: reducedMotion ? 0 : 0.2,
                              ease: "easeOut",
                            }}
                            className="mt-0.5 flex-shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-[#38bdf8]"
                          >
                            <ChevronDown className="h-5 w-5 group-hover:animate-[service-arrow-float_1.1s_ease-in-out_infinite] motion-reduce:group-hover:animate-none" />
                          </motion.div>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          {service.shortDesc}
                        </p>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <ServicePanel
                          key={service.id}
                          service={service}
                          onClose={closeService}
                          panelId={`service-panel-${service.id}`}
                          titleId={`service-title-${service.id}`}
                          notchLeft={50}
                          panelRef={panelRef}
                          reducedMotion={reducedMotion}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section ref={processRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={processInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
              >
                How We <span className="gradient-text">Deliver</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-600 max-w-2xl mx-auto"
              >
                A proven process that ensures quality, transparency, and
                successful delivery.
              </motion.p>
            </motion.div>

            <motion.div
              ref={processLineRef}
              initial="hidden"
              animate={processInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="relative"
            >
              {/* Process line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200 overflow-hidden">
                <motion.div
                  className="absolute inset-x-0 top-0 w-full h-full bg-gradient-to-b from-[#38bdf8] to-[#1e3a5f] origin-top"
                  style={{ scaleY: progressScaleY }}
                />
              </div>

              <div className="space-y-8">
                {developmentProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    variants={fadeInUp}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`flex-1 ${index % 2 === 1 ? "lg:text-left" : "lg:text-right"}`}
                    >
                      <Card className="border-slate-200 hover:border-[#38bdf8]/50 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex items-start justify-center flex-col">
                          <div className="flex items-center gap-4 mb-3">
                            {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#38bdf8] flex items-center justify-center text-white font-bold">
                              {step.step}
                            </div> */}
                            <h3 className="text-lg font-bold text-[#0f172a]">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-slate-500 flex items-start text-xs">
                            {step.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden lg:flex w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#38bdf8] items-center justify-center text-white font-bold z-10">
                      {step.step}
                    </div>
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section
          ref={industriesRef}
          className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={industriesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Features out of the box
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/70 max-w-xl mx-auto mb-6"
              >
                From strategy to deployment - and beyond - we help ambitious
                organizations build what's next,
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={
                industriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <FeaturePanels items={industries} />
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
                Ready to Build Something Amazing?
              </h2>
              <p className="text-slate-600  max-w-2xl mx-auto">
                Let&apos;s discuss your project requirements and create a
                solution that drives results.
              </p>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Future - ready technology. Built around your business.
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
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
