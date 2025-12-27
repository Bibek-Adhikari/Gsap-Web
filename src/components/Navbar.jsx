import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
// Make sure to import all required icons, including Twitter
import { Menu, X, Github, Linkedin, Mail, Twitter, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

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
      // Modified for theme compatibility - using hex with opacity instead of rgba black for better light mode look? 
      // Actually sticking to the dark glassmorphism look even in light mode might be jarring.
      // Let's use a CSS class or variable for the background in CSS instead of GSAP 'backgroundColor' if possible,
      // OR just conditionally set it. For now, I'll stick to a darkish blur for consistency or update it to rely on CSS variables?
      // GSAP overwrites inline styles. Let's try to trust the CSS classes primarily, but GSAP here is doing the scroll effect.
      // Let's keep the dark tint for now as it often looks good on glassmorphism, or switch to white for light mode.
      const scrollBg = theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)';

      gsap.to(navRef.current, {
        backgroundColor: scrollBg,
        backdropFilter: 'blur(20px)',
        color: theme === 'dark' ? 'white' : 'black', // Animate text color too?
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
    { scope: navRef, dependencies: [theme] } // Re-run when theme changes
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
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-5 border-b backdrop-blur-custom transition-colors duration-300 ${theme === 'dark' ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
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
              className={`cursor-pointer relative hover:text-teal-400 desktop-link transition-colors ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}
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
        <div ref={socialRef} className={`flex items-center gap-4 border-l pl-6 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-black/10 text-zinc-950'}`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`transition hover:text-teal-400 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

      </div>

      {/* Hamburger Menu Button (Visible on small screens) */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={toggleTheme}
          className={`p-1 rounded-full transition-colors z-50 ${theme === 'dark' ? 'text-yellow-400' : 'text-zinc-950'}`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <button
          className="text-teal-400 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`fixed top-[75px] left-0 w-full h-[calc(100vh-75px)] ${theme === 'dark' ? 'bg-zinc-950/95' : 'bg-white/95'} backdrop-blur-xl z-40 md:hidden flex flex-col items-center pt-10 transition-transform duration-0 ease-in-out -translate-y-full opacity-0 pointer-events-none`}
      >
        <ul className="flex flex-col items-center space-y-8 text-2xl font-semibold w-full">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className={`mobile-link hover:text-teal-400 transition ${theme === 'dark' ? 'text-white' : 'text-black'}`}
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
        <div className={`flex justify-center gap-8 border-t pt-8 mt-12 w-3/4 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`mobile-social hover:text-teal-400 transition ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}
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
