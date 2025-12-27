import React, { useRef } from 'react';
import { Github, Link } from 'lucide-react'; // Assuming you have lucide-react or similar icons

// Add image placeholders and GitHub links to your project data
const projects = [
  {
    title: 'NEB Grade 12 Grammar Quiz App',
    desc: 'Interactive quiz app with animations, dark mode, and progress tracking.',
    tech: ['React', 'Tailwind', 'JavaScript'],
    liveLink: '#',
    githubLink: '#',
    image: '/quiz-app-preview.png', // Placeholder image path
    featured: true, // Mark this as featured to take more space
  },
  {
    title: 'Animated Portfolio Website',
    desc: 'Personal portfolio with GSAP animations and modern UI.',
    tech: ['React', 'GSAP', 'Tailwind'],
    liveLink: '#',
    githubLink: '#',
    image: '/portfolio-preview.png',
  },
  {
    title: 'Snake Game',
    desc: 'Classic snake game built using JavaScript and canvas.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    liveLink: '#',
    githubLink: '#',
    image: '/snake-game-preview.png',
  },
  {
    title: 'Bilingual Educational Website',
    desc: 'Nepali & English educational site with responsive layout.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    githubLink: '#',
    image: '/edu-site-preview.png',
  },
  // Adding one more project for a balanced 2x3 grid (total 6)
  {
    title: 'Minimal Blog Template',
    desc: 'A super fast, statically generated blog template built with modern tools.',
    tech: ['Next.js', 'Tailwind', 'MDX'],
    liveLink: '#',
    githubLink: '#',
    image: '/blog-template-preview.png',
  },
  {
    title: 'Expense Tracker',
    desc: 'Simple financial tool to track daily expenses with charts.',
    tech: ['React', 'Redux', 'Chart.js'],
    liveLink: '#',
    githubLink: '#',
    image: '/expense-tracker-preview.png',
  },
];


// --- Reusable Project Card Component with GSAP Hover ---
const ProjectCard = ({ project, className = '' }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);


  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col overflow-hidden rounded-xl border border-teal-400/20 bg-zinc-900 shadow-lg transition duration-300 ${className}`}
    >
      {/* Project Image Area (Fixed Aspect Ratio) */}
      <div className="relative w-full overflow-hidden border-b border-teal-400/20 pt-[60%]">
        <img
          ref={imageRef}
          src={'https://imgs.search.brave.com/h_LgG9E14kkNkyAZ-Y128Roa8zN6ZDUjsq1PlJ88pQc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzkv/MjEzLzkzNi9zbWFs/bC9haS1nZW5lcmF0/ZWQtYWJzdHJhY3Qt/d2F0ZXItYnViYmxl/cy1jb2xvcmZ1bC1i/YWNrZ3JvdW5kLWRl/c2lnbi1pbWFnZXMt/cGhvdG8uanBn'}
          alt={`Preview of ${project.title}`}
          className="absolute inset-0 h-full w-full object-cover transition duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-2xl font-bold text-teal-400 mb-2">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm mb-4 flex-grow">
          {project.desc}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2 border-t border-white/5">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-white hover:text-teal-400 transition"
          >
            <Link className="h-4 w-4 mr-1" />
            Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-white hover:text-teal-400 transition"
          >
            <Github className="h-4 w-4 mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Main Projects Component ---
const Projects = () => {
  const gridContainerRef = useRef(null);


  return (
    <section className="min-h-screen bg-zinc-950 text-white px-6 md:px-16 py-20" id='projects'>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 projects-header">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-teal-400">
          Projects
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          A selection of projects that showcase my skills in frontend
          development, UI design, and interactive experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div
        ref={gridContainerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
          // Use aspect-square or a defined h-full to make them same size (already handled by grid)
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;