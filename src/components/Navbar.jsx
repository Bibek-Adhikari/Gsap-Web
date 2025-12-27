import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
// Make sure to import all required icons
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';
// Assuming the path to your ThemeContext is correct
import { useTheme } from '../context/ThemeContext';

// Register plugins globally (GSAP best practice)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navLinks = ['Home', 'About', 'Projects', 'Services', 'Contact'];

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


  // --- 1. Initial Entrance Animations & Hover Effects (Run ONCE on mount) ---
  useGSAP(() => {
    // Entrance Animations
    gsap.from('.nav-logo', { y: -40, opacity: 0, duration: 0.8, ease: 'power3.out' });

    gsap.from('.desktop-link', {
      y: -40,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.1,
    });

    gsap.from(socialRef.current.children, {
      y: 8,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.4,
    });

    // Hover Animation (Magic Line) - Setup once
    const indicator = indicatorRef.current;
    gsap.set(indicator, { opacity: 1, width: 0 });

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

    const navElement = navRef.current;
    const handleMouseLeave = () => {
      gsap.to(indicator, {
        opacity: 1,
        duration: 0.3,
      });
    };

    navElement.addEventListener('mouseleave', handleMouseLeave);
    return () => navElement.removeEventListener('mouseleave', handleMouseLeave);
  }, { scope: navRef, dependencies: [] }); // Empty dependencies = Run once on mount

  // --- 2. Theme-Dependent Scroll Effect (Re-run when theme changes) ---
  useGSAP(() => {
    const scrollBg = theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)';
    const scrollColor = theme === 'dark' ? 'white' : 'black';

    // Kill existing ScrollTrigger to avoid duplicates
    ScrollTrigger.getById('nav-scroll-effect')?.kill();

    gsap.to(navRef.current, {
      backgroundColor: scrollBg,
      color: scrollColor,
      backdropFilter: 'blur(20px)',
      duration: 0.3,
      scrollTrigger: {
        id: 'nav-scroll-effect',
        trigger: document.body,
        start: 'top -80',
        end: 'top -81',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: navRef, dependencies: [theme] });

  // --- Mobile Menu Open/Close Animation (FIXED opacity bug) ---
  useGSAP(() => {
    const menuItems = gsap.utils.toArray('.mobile-link');
    const mobileSocialIcons = gsap.utils.toArray('.mobile-social');

    if (isMenuOpen) {
      const tlMobileIn = gsap.timeline();

      // Animate menu in
      tlMobileIn.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out',
        pointerEvents: 'auto'
      });
      // Stagger links and social icons
      tlMobileIn.from([menuItems, mobileSocialIcons], {
        y: 20,
        opacity: 1, // FIX APPLIED: Changed from 1 to 0 for a proper fade-in stagger
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.1,
      }, "<0.1"); // Start staggering slightly after container animation begins

    } else {
      const tlMobileOut = gsap.timeline();

      // Stagger links and social icons out first
      tlMobileOut.to([mobileSocialIcons, menuItems], {
        y: -5,
        opacity: 1,
        stagger: 0.05,
        duration: 0.2,
        ease: 'power1.in',
      });

      // Animate menu out 
      tlMobileOut.to(menuRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        pointerEvents: 'none',
      }, "<0.1");
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

        {/* Desktop Social Icons & Theme Toggle */}
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

        {/* Social Icons for Small Screen */}
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