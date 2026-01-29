import React from "react";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import gsap from "gsap";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Bibek-Adhikari", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/bibek-adhikari-24149b2b3/",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
  ];

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Smooth scroll to section WITHOUT changing URL
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // If your URL ever has a hash, this removes it (keeps it clean)
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  // Back to top (GSAP if plugin exists; fallback if not)
  const handleBackToTop = (e) => {
    e.preventDefault();

    try {
      gsap.to(window, {
        duration: 1.0,
        scrollTo: { y: 0 }, // requires ScrollToPlugin
        ease: "power3.inOut",
      });
    } catch {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-t border-teal-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* 1. Brand & Description */}
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="text-3xl font-bold mb-3 text-teal-400 hover:text-teal-300 transition"
            aria-label="Go to Home"
          >
            Bibek<span className="text-zinc-400 dark:text-white/40">.</span>
          </button>

          <p className="text-zinc-600 dark:text-white/70 max-w-sm leading-relaxed">
            Frontend developer focused on building modern, animated, and user-friendly web
            experiences using React, GSAP, and Tailwind CSS.
          </p>
        </div>

        {/* 2. Navigation (NO # / NO route change) */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-teal-300">
            Navigate
          </h3>

          <div className="flex flex-col gap-2 text-zinc-600 dark:text-white/70">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-left hover:text-teal-400 transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Social */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-teal-300">
            Connect
          </h3>

          <div className="flex flex-col gap-3 text-zinc-600 dark:text-white/70">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-teal-400 transition"
              >
                <social.icon size={18} />
                <span className="text-sm">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar & Back to Top */}
      <div className="relative border-t border-teal-400/20 py-4 text-center text-sm text-zinc-400 dark:text-white/50">
        {/* Back to Top Button */}
        <button
          onClick={handleBackToTop}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-teal-500 text-black hover:bg-teal-600 transition duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>

        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-teal-400">Bibek Adhikari</span>. Designed & Developed by Bibek.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
