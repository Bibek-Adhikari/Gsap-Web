import React, { useRef, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { navLinks, socialLinks, NAVBAR_HEIGHT } from './Navbar/navbar.config';
import { useNavbarAnimations } from './Navbar/useNavbarAnimations';
import gsap from 'gsap';

const Navbar = ({ offsetY = NAVBAR_HEIGHT }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksRef = useRef([]);
  const menuRef = useRef(null);
  const socialRef = useRef(null);

  useNavbarAnimations({
    navRef,
    indicatorRef,
    linksRef,
    socialRef,
    menuRef,
    theme,
    isMenuOpen,
    offsetY,
  });

  const handleScroll = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);

    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: `#${id}`, offsetY },
      ease: 'power3.inOut',
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 h-[75px]
      flex items-center justify-between px-6 md:px-16
      border-b transition-colors
      dark:border-white/10 border-black/10"
    >
      {/* Logo */}
      <a href="#home" onClick={(e) => handleScroll(e, 'home')}>
        <h1 className="nav-logo text-2xl md:text-3xl font-bold text-teal-500">
          Bibek.
        </h1>
      </a>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="relative flex gap-8">
          <span
            ref={indicatorRef}
            className="absolute -bottom-2 h-[2px] bg-teal-400 rounded-full"
          />
          {navLinks.map((link, i) => (
            <li
              key={link.id}
              ref={(el) => (linksRef.current[i] = el)}
              className="desktop-link cursor-pointer
              text-black/80 dark:text-white/80 hover:text-teal-400"
            >
              <a href={`#${link.id}`} onClick={(e) => handleScroll(e, link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          ref={socialRef}
          className="flex items-center gap-4 border-l pl-6
          dark:border-white/10 border-black/10"
        >
          <button onClick={toggleTheme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-3">
        <button onClick={toggleTheme}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="fixed top-[75px] left-0 w-full h-[calc(100vh-75px)]
        bg-white dark:bg-zinc-950 opacity-0 -translate-y-full
        md:hidden flex flex-col items-center pt-10"
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            className="mobile-link text-2xl py-4"
            href={`#${link.id}`}
            onClick={(e) => handleScroll(e, link.id)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
