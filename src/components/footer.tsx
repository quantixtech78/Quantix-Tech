"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import clutchIcon from "../../public/clutch.png";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Careers", href: "/contact" },
  ],
  services: [
    { name: "Web Development", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "Cloud Solutions", href: "/services" },
    { name: "Integration & Portals", href: "/services" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Clutch", icon: clutchIcon, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-linear-to-br from-[#0f172a] to-[#1e3a5f] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/Quantix-Tech-Icon-White.png"
                  alt="Quantix Tech"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <Image
                  src="/Quantix-Tech-Name-White.png"
                  alt="Quantix Tech"
                  width={170}
                  height={28}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-white/70 mb-6 max-w-sm">
                Engineering intelligent digital solutions that empower
                businesses to innovate, scale, and lead with confidence. We
                transform bold ideas into secure, scalable, and future-ready
                digital experiences.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 text-[#38bdf8]" />
                  <span className="text-sm">
                    Delware, US | Engineering hub : Amman, Jordan
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#38bdf8]" />
                  <span className="text-sm">sales@quantix-tech.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#38bdf8] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#38bdf8] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Quantix Tech. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="/terms-and-conditions"
                  className="text-white/70 hover:text-[#38bdf8] transition-colors"
                >
                  Terms & Conditions
                </a>
                <a
                  href="/privacy-policies"
                  className="text-white/70 hover:text-[#38bdf8] transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => {
                  const icon = s.icon as any;
                  const isImageImport =
                    icon && typeof icon === "object" && "src" in icon;

                  if (!icon) {
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white transition-colors"
                        aria-label={s.name}
                      >
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10">
                          <Image
                            src="/clutch.png"
                            alt={s.name}
                            width={18}
                            height={18}
                            className="w-4 h-4 object-contain filter grayscale brightness-0 invert"
                          />
                        </span>
                      </a>
                    );
                  }

                  if (isImageImport) {
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white transition-colors"
                        aria-label={s.name}
                      >
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10">
                          <Image
                            src={icon.src}
                            alt={s.name}
                            width={18}
                            height={18}
                            className="w-4 h-4 object-contain filter grayscale brightness-0 invert"
                          />
                        </span>
                      </a>
                    );
                  }

                  const Comp = icon?.default ?? icon;
                  try {
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white transition-colors"
                        aria-label={s.name}
                      >
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10">
                          {React.createElement(Comp, { className: "w-4 h-4" })}
                        </span>
                      </a>
                    );
                  } catch (err) {
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/70 hover:text-white transition-colors"
                        aria-label={s.name}
                      >
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10">
                          <Image
                            src="/clutch.png"
                            alt={s.name}
                            width={18}
                            height={18}
                            className="w-4 h-4 object-contain filter grayscale brightness-0 invert"
                          />
                        </span>
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
