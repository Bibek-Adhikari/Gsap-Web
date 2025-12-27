import React from 'react';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react'; // Import icons
import gsap from 'gsap';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Bibek-Adhikari', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bibek-adhikari-24149b2b3/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ];

  // Function to handle smooth scroll to top (reusing GSAP's ScrollToPlugin)
  const handleBackToTop = (e) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-t border-teal-400/20">

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* 1. Brand & Description */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-3 text-teal-400">
            Bibek.
          </h2>
          <p className="text-zinc-600 dark:text-white/70 max-w-sm">
            Frontend developer focused on building modern, animated,
            and user-friendly web experiences using React, GSAP, and Tailwind CSS.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-teal-300">
            Navigation
          </h3>
          <ul className="space-y-3 text-zinc-600 dark:text-white/70">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={`#${link.href}`}
                  // Ensure anchor links are used for single-page navigation
                  className="hover:text-teal-400 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
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
                <span className='text-sm'>{social.label}</span>
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
          className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-teal-500 text-black hover:bg-teal-600 transition duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>

        {/* Copyright */}
        <p>
          © {new Date().getFullYear()} <span className='text-teal-400'>Bibek Adhikari</span>. Designed & Developed by Bibek.
        </p>
      </div>

    </footer>
  );
};

export default Footer;