import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useNavbarAnimations = ({
  navRef,
  indicatorRef,
  linksRef,
  socialRef,
  menuRef,
  theme,
  isMenuOpen,
  offsetY,
}) => {

  // Entrance + hover magic line
  useGSAP(() => {
    gsap.from('.nav-logo', { y: -30, opacity: 0, duration: 0.6 });
    gsap.from('.desktop-link', {
      y: -30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
    });

    if (socialRef.current) {
      gsap.from(socialRef.current.children, {
        y: 10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
      });
    }

    const indicator = indicatorRef.current;
    gsap.set(indicator, { width: 0, opacity: 0 });

    linksRef.current.forEach((link) => {
      if (!link) return;
      link.addEventListener('mouseenter', () => {
        gsap.to(indicator, {
          x: link.offsetLeft,
          width: link.offsetWidth,
          opacity: 1,
          duration: 0.3,
        });
      });
    });
  }, []);

  // Scroll background effect (theme aware)
  useGSAP(() => {
    ScrollTrigger.getById('navbar-scroll')?.kill();

    gsap.fromTo(
      navRef.current,
      {
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
      },
      {
        backgroundColor:
          theme === 'dark'
            ? 'rgba(9,9,11,0.85)' // zinc-950
            : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        duration: 0.25,
        scrollTrigger: {
          id: 'navbar-scroll',
          trigger: document.body,
          start: 'top -80',
          end: 'top -81',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [theme]);


  // Mobile menu animation
  useGSAP(() => {
    const items = gsap.utils.toArray('.mobile-link, .mobile-social');

    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
      });
      gsap.from(items, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
      });
    } else {
      gsap.to(menuRef.current, {
        y: -100,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
      });
    }
  }, [isMenuOpen]);
};
