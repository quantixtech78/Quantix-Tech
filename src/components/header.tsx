"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-400 ease-out will-change-transform",
        isScrolled
          ? cn(
              "top-4 md:top-5 w-[calc(100%-1rem)] md:w-[85%] max-w-5xl px-3 md:px-6 py-2 md:py-3 bg-white/75 dark:bg-[#0f172a]/70 backdrop-blur-md border border-[#1e3a5f]/10 dark:border-[#38bdf8]/20 shadow-lg hover:shadow-xl",
              isMobileMenuOpen ? "rounded-2xl" : "rounded-full",
            )
          : "top-0 w-full px-0 py-0 rounded-none bg-transparent border-0 shadow-none",
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-400",
            isScrolled ? "h-12 md:h-14" : "h-16 md:h-20",
          )}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              className={cn(
                "flex items-center gap-3 transition-all duration-400",
                isScrolled ? "gap-2" : "gap-3",
              )}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/Quantix-Tech-Icon.png"
                alt="Quantix Tech"
                width={40}
                height={40}
                className={cn(
                  "object-contain transition-all duration-400 block dark:hidden",
                  isScrolled ? "w-9 h-9" : "w-10 h-10",
                )}
              />
              <Image
                src="/Quantix-Tech-Icon-White.png"
                alt="Quantix Tech"
                width={40}
                height={40}
                className={cn(
                  "object-contain transition-all duration-400 hidden dark:block",
                  isScrolled ? "w-9 h-9" : "w-10 h-10",
                )}
              />
              <Image
                src="/Quantix-Tech-Name.png"
                alt="Quantix Tech"
                width={170}
                height={32}
                className={cn(
                  "w-auto object-contain transition-all duration-400 block dark:hidden",
                  isScrolled ? "h-8" : "h-8",
                )}
              />
              <Image
                src="/Quantix-Tech-Name-White.png"
                alt="Quantix Tech"
                width={170}
                height={32}
                className={cn(
                  "w-auto object-contain transition-all duration-400 hidden dark:block",
                  isScrolled ? "h-8" : "h-8",
                )}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300 group",
                    isScrolled ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
                    pathname === item.href
                      ? "text-[#38bdf8]"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-linear-to-r from-[#1e3a5f] to-[#38bdf8] transition-all duration-300",
                      pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Link href="/contact">
                <Button
                  className={cn(
                    "bg-linear-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white shadow-lg hover:shadow-xl transition-all duration-300",
                    isScrolled
                      ? "px-4 py-1 text-xs h-auto"
                      : "px-6 py-2 text-sm",
                  )}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={cn(
                "p-2 rounded-lg hover:bg-muted transition-colors duration-300",
                isScrolled ? "p-1.5" : "p-2",
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  className={cn(
                    "transition-all duration-300",
                    isScrolled ? "w-5 h-5" : "w-6 h-6",
                  )}
                />
              ) : (
                <Menu
                  className={cn(
                    "transition-all duration-300",
                    isScrolled ? "w-5 h-5" : "w-6 h-6",
                  )}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "md:hidden overflow-hidden transition-all duration-400",
              isScrolled
                ? "rounded-b-2xl bg-white/75 dark:bg-[#0f172a]/75 backdrop-blur-md border-t border-[#1e3a5f]/10 dark:border-[#38bdf8]/20"
                : "glass border-t border-border/50",
            )}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 block rounded-lg transition-colors duration-300",
                      pathname === item.href
                        ? "bg-[#38bdf8]/10 text-[#38bdf8]"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-linear-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#1e3a5f] text-white">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
