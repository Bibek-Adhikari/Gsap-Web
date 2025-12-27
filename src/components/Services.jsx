import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  SiHtml5, SiCss, SiJavascript, SiReact as ReactIcon,
  SiFigma, SiGit, SiTailwindcss, SiNpm,
} from '@icons-pack/react-simple-icons';

// Data for the skills marquee
const skillIcons = [
  { icon: SiHtml5, color: '#E34F26', label: 'HTML5' },
  { icon: SiCss, color: '#1572B6', label: 'CSS3' },
  { icon: SiJavascript, color: '#F7DF1E', label: 'JavaScript' },
  { icon: ReactIcon, color: '#61DAFB', label: 'React' },
  { icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind CSS' },
  { icon: SiGit, color: '#F05032', label: 'Git' },
  { icon: SiFigma, color: '#F24E1E', label: 'Figma' },
  { icon: SiNpm, color: '#CB3837', label: 'NPM' },
  // Duplicate the list to ensure seamless looping for the marquee effect
  { icon: SiHtml5, color: '#E34F26', label: 'HTML5' },
  { icon: SiCss, color: '#1572B6', label: 'CSS3' },
  { icon: SiJavascript, color: '#F7DF1E', label: 'JavaScript' },
  { icon: ReactIcon, color: '#61DAFB', label: 'React' },
  { icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind CSS' },
  { icon: SiGit, color: '#F05032', label: 'Git' },
  { icon: SiFigma, color: '#F24E1E', label: 'Figma' },
  { icon: SiNpm, color: '#CB3837', label: 'NPM' },
];

const services = [
  {
    title: 'Frontend Development',
    desc: 'Building fast, responsive, and modern web interfaces using React and clean UI practices.',
  },
  {
    title: 'UI / UX Design',
    desc: 'Designing minimal, user-focused interfaces with attention to layout, spacing, and usability.',
  },
  {
    title: 'Web Animations',
    desc: 'Creating smooth, meaningful animations using GSAP to enhance user experience.',
  },
  {
    title: 'Responsive Design',
    desc: 'Ensuring your website looks and works perfectly across all devices and screen sizes.',
  },
  {
    title: 'Performance Optimization',
    desc: 'Optimizing load times, animations, and assets for better performance.',
  },
  {
    title: 'Portfolio & Landing Pages',
    desc: 'Crafting professional portfolios and landing pages that make a strong first impression.',
  },
];

const Services = () => {
  const marqueeRef = useRef(null);
  const marqueeTimeline = useRef(null);
  const skillsRef = useRef(null);

  useGSAP(
    () => {
      const marqueeElement = marqueeRef.current;
      if (!marqueeElement) return;

      // Calculate the width of the content inside the marquee wrapper
      // This is crucial for GSAP to know how far to scroll for a perfect loop
      const contentWidth = marqueeElement.scrollWidth / 2;
      const windowWidth = window.innerWidth;

      // Determine the distance the icons need to travel for one seamless loop
      // It must travel the distance of the duplicated content.
      const distanceToMove = contentWidth;

      // Initialize the marquee timeline
      marqueeTimeline.current = gsap.timeline({
        repeat: -1, // Infinite repeat
        defaults: { ease: 'none' },
      });

      // Animate the icons to move from right to left (marquee effect)
      marqueeTimeline.current.to(marqueeElement, {
        x: -distanceToMove,
        duration: 40, // Adjust duration for desired speed
      });

    },
    { scope: skillsRef, dependencies: [] }
  );

  // Function to handle pause/resume on hover
  const handleHover = (isHovering) => {
    if (marqueeTimeline.current) {
      if (isHovering) {
        // Pause the animation when hovering
        gsap.to(marqueeTimeline.current, { timeScale: 0, duration: 0.5 });
      } else {
        // Resume the animation when leaving, ensuring smooth transition back to speed
        gsap.to(marqueeTimeline.current, { timeScale: 1, duration: 0.5 });
      }
    }
  };

  return (
    <section className="bg-zinc-950 text-white px-6 md:px-16 py-20" id='services'>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Services
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          I help individuals and businesses build clean, modern,
          and interactive web experiences.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border border-white/10 p-6 rounded-lg hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/10 transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-3 text-teal-400">
              {service.title}
            </h2>
            <p className="text-white/70 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      {/* --- SKILLS MARQUEE SECTION --- */}
      <div ref={skillsRef} className="max-w-full overflow-hidden mt-32 md:mt-48 relative">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-10">
          My <span className='text-teal-400'>Skills</span>
        </h2>

        <div
          className="relative whitespace-nowrap py-4 border-y border-white/10"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <div
            ref={marqueeRef}
            className="inline-block"
            // Important: Use CSS to hide text selection, especially for marquee effects
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {skillIcons.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center mx-10 sm:mx-12 md:mx-16"
              >
                <skill.icon
                  size={50}
                  color={skill.color}
                  className="hover:scale-110 transition duration-300"
                />
                <span className='ml-3 text-lg font-semibold text-white/90 hidden sm:inline-block'>
                  {skill.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* --- END SKILLS MARQUEE SECTION --- */}

    </section>
  )
}

export default Services