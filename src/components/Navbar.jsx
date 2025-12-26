import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
// Make sure to import all required icons, including Twitter
import { Menu, X, Github, Linkedin, Mail, Twitter } from 'lucide-react';

// Register plugins globally (GSAP best practice)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navLinks = ['Home', 'About', 'Projects', 'Services', 'Contact'];

// UPDATED socialLinks with specific URLs and Twitter icon
const socialLinks = [
  { icon: Github, href: 'https://github.com/Bibek-Adhikari', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/bibek-adhikari-24149b2b3/', label: 'LinkedIn' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksRef = useRef([]);
  const menuRef = useRef(null);
  const socialRef = useRef(null); // Ref for desktop social links

  // Function to handle link clicks (desktop and mobile)
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();

    // 1. Close menu on mobile
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    // 2. Smooth scroll using GSAP ScrollToPlugin
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: `#${targetId}`, offsetY: 70 }, // Adjust offsetY for fixed navbar
        ease: 'power3.inOut',
      });
    }
  };


  // GSAP animations and effects
  useGSAP(
    () => {
      // --- Initial Entrance Animations ---
      gsap.from('.nav-logo', { y: -40, opacity: 0, duration: 0.8, ease: 'power3.out' });

      // Stagger entrance for main links
      gsap.from('.desktop-link', {
        y: -40,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Stagger entrance for social icons (start slightly after links)
      gsap.from(socialRef.current.children, {
        y: 8,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.4,
      });

      // --- Scroll Blur Effect ---
      gsap.to(navRef.current, {
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        scrollTrigger: {
          trigger: document.body,
          start: 'top -80',
          toggleActions: 'play none none reverse',
        },
      });

      // --- Hover Animation (Magic Line) ---
      const indicator = indicatorRef.current;

      linksRef.current.forEach((link) => {
        if (!link) return;

        const handleMouseEnter = () => {
          const { offsetLeft, offsetWidth } = link;
          gsap.to(indicator, {
            x: offsetLeft,
            width: offsetWidth,
            opacity: 1,
            duration: 0.35,
            ease: 'power3.out',
          });
        };

        link.addEventListener('mouseenter', handleMouseEnter);
        return () => link.removeEventListener('mouseenter', handleMouseEnter);
      });

      navRef.current.addEventListener('mouseleave', () => {
        gsap.to(indicator, {
          opacity: 0,
          duration: 0.3,
        });
      });

    },
    { scope: navRef }
  );

  // --- Mobile Menu Open/Close Animation (Simplified duration for quicker feedback) ---
  useGSAP(() => {
    const menuItems = gsap.utils.toArray('.mobile-link');
    const mobileSocialIcons = gsap.utils.toArray('.mobile-social');

    if (isMenuOpen) {
      // Animate menu in
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3, // Reduced duration
        ease: 'power3.out',
        pointerEvents: 'auto'
      });
      // Stagger links and social icons
      gsap.from([menuItems, mobileSocialIcons], {
        y: 20,
        opacity: 1, // Changed from 1 to 0 for a proper fade-in stagger
        stagger: 0.1,
        duration: 0.4,
        delay: 0.1,
      });
    } else {
      // Animate menu out (reverse the effect)
      gsap.to(menuRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        pointerEvents: 'none',
      });
    }
  }, [isMenuOpen]);


  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-5 text-white border-b border-white/10 backdrop-blur-custom"
    >
      <a href="/" onClick={(e) => { e.preventDefault(); handleLinkClick(e, 'home'); }}>
        <h2 className="text-3xl sm:text-4xl md:text-2xl font-bold text-teal-500 nav-logo">
          Bibek.
        </h2>
      </a>

      {/* Container for Desktop Links AND Social Icons */}
      <div className='hidden md:flex items-center gap-8'>

        {/* Desktop Links with Magic Line */}
        <ul className="relative flex gap-8">
          <span
            ref={indicatorRef}
            className="absolute bottom-[-10px] h-[2px] bg-teal-400 rounded-full opacity-0 transition-opacity duration-300"
          />

          {navLinks.map((link, index) => (
            <li
              key={index}
              ref={(el) => (linksRef.current[index] = el)}
              className="cursor-pointer relative text-white/80 hover:text-white desktop-link"
            >
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, link.toLowerCase())}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Social Icons (New Addition) */}
        <div ref={socialRef} className="flex items-center gap-4 border-l border-white/10 pl-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-white/80 hover:text-teal-400 transition"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

      </div>

      {/* Hamburger Menu Button (Visible on small screens) */}
      <button
        className="md:hidden text-teal-400 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`fixed top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-zinc-950/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center pt-10 transition-transform duration-0 ease-in-out -translate-y-full opacity-0 pointer-events-none`}
      >
        <ul className="flex flex-col items-center space-y-8 text-2xl font-semibold w-full">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="mobile-link text-white hover:text-teal-400 transition"
            >
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, link.toLowerCase())}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Icons for Small Screen (Retained from previous version) */}
        <div className="flex justify-center gap-8 border-t border-white/10 pt-8 mt-12 w-3/4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="mobile-social text-white/80 hover:text-teal-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <social.icon size={30} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;