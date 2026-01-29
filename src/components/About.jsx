import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- Reusable Bento Tile Component ---
const BentoTile = ({ className = '', children, hoverFlip = false }) => {
  const tileRef = useRef(null);

  useGSAP(() => {
    if (hoverFlip) {
      // Set initial state for the 3D effect
      gsap.set(tileRef.current, { transformStyle: 'preserve-3d', transformPerspective: 1000 });

      // Hover animation logic
      const handleMouseEnter = () => {
        gsap.to(tileRef.current, {
          rotationY: 10, // A subtle 3D tilt
          scale: 1.02,
          border: '1px solid #34D399', // Teal-400 equivalent for border
          duration: 0.5,
          ease: 'power3.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(tileRef.current, {
          rotationY: 0,
          scale: 1,
          border: '1px solid rgba(255, 255, 255, 0.1)', // Back to original border
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      const tile = tileRef.current;
      tile.addEventListener('mouseenter', handleMouseEnter);
      tile.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup
      return () => {
        tile.removeEventListener('mouseenter', handleMouseEnter);
        tile.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [hoverFlip]);

  const baseClasses = "relative bg-white dark:bg-zinc-900 border border-teal-400/20 p-6 rounded-xl transition duration-300 shadow-xl cursor-pointer";

  return (
    <div
      ref={tileRef}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </div>
  );
};


// --- Main About Component ---
const About = () => {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      // Entrance animation for the heading and subtitle
      gsap.from('.about-title, .about-sub', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Entrance animation for the Bento Grid items
      gsap.from(gridRef.current.children, {
        y: 50,
        opacity: 1,
        scale: 0.9,
        stagger: 0.15, // Stagger them one after the other
        duration: 0.8,
        ease: 'back.out(0.2)',
        delay: 0.5, // Start after the title animation finishes
      });
    },
    { scope: gridRef }
  );


  return (
    <section className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-6 md:px-16 py-20" id='about'>
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="about-title text-4xl md:text-6xl font-bold tracking-tight text-teal-400">
          About Me
        </h1>
        <p className="about-sub mt-4 text-zinc-600 dark:text-white/70 max-w-2xl">
          I’m a frontend developer focused on building modern, animated, and
          user-friendly web interfaces with clean design systems.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 "
      >

        {/* 1. Large Intro */}
        <BentoTile className="md:col-span-2 md:row-span-2 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white" hoverFlip>
          <h2 className="text-2xl font-semibold mb-3 text-teal-300">Who I Am</h2>
          <p className="text-zinc-600 dark:text-white/70 leading-relaxed">
            Hi, I’m <strong>Bibek Adhikari</strong>, a passionate web developer
            who enjoys turning ideas into smooth, interactive experiences.
            I work mainly with <strong className="text-teal-400">React</strong>, <strong className="text-teal-400">Tailwind CSS</strong>, and <strong className="text-teal-400">GSAP</strong> to create clean,
            modern UI with subtle animations.
          </p>
          <div className="absolute bottom-4 right-6 text-5xl opacity-10">🚀</div>
        </BentoTile>

        {/* 2. Skills */}
        <BentoTile hoverFlip>
          <h2 className="text-xl font-semibold mb-3 text-teal-300">Skills</h2>
          <ul className="text-zinc-600 dark:text-white/70 space-y-1 list-disc list-inside">
            <li>HTML, CSS, JavaScript</li>
            <li>React & Tailwind CSS</li>
            <li>GSAP Animations</li>
            <li>Responsive Design</li>
          </ul>
        </BentoTile>

        {/* 3. Tools */}
        <BentoTile hoverFlip>
          <h2 className="text-xl font-semibold mb-3 text-teal-300">Tools</h2>
          <p className="text-zinc-600 dark:text-white/70">
            VS Code, Git & GitHub, Figma, Chrome DevTools
          </p>
          <div className="absolute bottom-4 right-6 text-5xl opacity-10">🛠️</div>
        </BentoTile>

        {/* 4. Education */}
        <BentoTile hoverFlip>
          <h2 className="text-xl font-semibold mb-3 text-teal-300">Education</h2>
          <p className="text-zinc-600 dark:text-white/70">
            BCA 1st Sem Student <br />
            <span className="font-medium text-teal-400">Computer & Accountancy</span>
          </p>
          <div className="absolute bottom-4 right-6 text-5xl opacity-10">📚</div>
        </BentoTile>

        {/* 5. Contact CTA */}
        <BentoTile hoverFlip>
          <h2 className="text-xl font-semibold mb-3 text-teal-300">Let's Connect</h2>
          <p className="text-zinc-600 dark:text-white/70">
            Ready to collaborate on a smooth, modern project?
          </p>
          <a href="#contact" className="mt-3 inline-block text-teal-400 hover:underline">
            Get in touch →
          </a>
          <div className="absolute bottom-4 right-6 text-5xl opacity-10">📧</div>
        </BentoTile>

        {/* 6. Philosophy (Full width) */}
        <BentoTile className="md:col-span-2" hoverFlip>
          <h2 className="text-xl font-semibold mb-3 text-teal-300">Design Philosophy</h2>
          <p className="text-zinc-600 dark:text-white/70 leading-relaxed">
            I believe in **minimalism**, **clarity**, and **motion with purpose**.
            Animations should guide users — not distract them. The goal is performance and delight.
          </p>
          <div className="absolute bottom-4 right-6 text-5xl opacity-10">✨</div>
        </BentoTile>

      </div>
    </section>
  );
};

export default About;