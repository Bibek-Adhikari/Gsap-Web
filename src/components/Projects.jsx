import React, { useRef, useEffect, useState } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Discover Nepal",
    desc: "An immersive travel platform showcasing the beauty of Nepal with interactive maps and itinerary planning.",
    liveUrl: "https://discovernepal.vercel.app", 
    githubUrl: "https://github.com/Bibek-Adhikari/DiscoverNepal",
    videos: {
      laptop: "/Video/Discoverlaptop.mp4",
      tablet: "/Video/Discovertaplet.mp4",
      mobile: "/Video/Discovermobile.mp4"
    }
  },
  {
    title: "ChatAdk",
    desc: "A powerful AI-powered chat application with a sleek, modern interface and real-time messaging capabilities.",
    liveUrl: "https://chatadk.vercel.app",
    githubUrl: "https://github.com/Bibek-Adhikari/ChatWithAdk",
    videos: {
      laptop: "/Video/Chatlaptop.mp4",
      tablet: "/Video/Chattaplet.mp4",
      mobile: "/Video/Chatmobile.mp4"
    }
  },
];

const Projects = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProject = projects[currentIndex];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const laptopRef = useRef(null);
  const tabletRef = useRef(null);
  const mobileRef = useRef(null);

  const nextProject = () => {
    const tl = gsap.timeline();
    tl.to([laptopRef.current, tabletRef.current, mobileRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => setCurrentIndex((prev) => (prev + 1) % projects.length)
    });
  };

  const prevProject = () => {
    const tl = gsap.timeline();
    tl.to([laptopRef.current, tabletRef.current, mobileRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([laptopRef.current, tabletRef.current, mobileRef.current], 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [currentIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen transition-colors duration-500 px-6 md:px-12 lg:px-24 py-20 flex flex-col items-center justify-center overflow-hidden relative ${
        isDark ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-zinc-900'
      }`}
      id='projects'
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full blur-[120px] opacity-20 transition-colors duration-500 ${
          isDark ? 'bg-teal-900' : 'bg-teal-200'
        }`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 transition-colors duration-500 ${
          isDark ? 'bg-emerald-900' : 'bg-blue-200'
        }`}></div>
      </div>

      <div className="max-w-7xl w-full mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-8 order-2 lg:order-1">
          <div ref={headerRef}>
            <span className="text-teal-500 font-mono text-sm tracking-widest uppercase mb-2 block">Featured Project</span>
            
            <div className="flex items-baseline gap-4 mb-4">
              <span className={`text-7xl font-bold font-mono select-none transition-colors ${
                isDark ? 'text-zinc-800' : 'text-gray-200'
              }`}>0{currentIndex + 1}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                {activeProject.title}
              </h2>
            </div>
            
            <div className="h-1 w-24 bg-teal-500 rounded-full mb-6"></div>
            
            <p className={`text-lg leading-relaxed max-w-md transition-colors ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              {activeProject.desc}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 bg-teal-500 text-white rounded-full font-bold hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-teal-500/25 hover:-translate-y-1"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-8 py-3.5 border rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700' 
                  : 'bg-white border-gray-200 text-zinc-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
              }`}
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          </div>

          {/* Navigation */}
          <div className={`flex items-center gap-6 pt-8 w-full max-w-md border-t transition-colors ${
            isDark ? 'border-zinc-800' : 'border-gray-200'
          }`}>
            <button 
              onClick={prevProject}
              className={`p-4 rounded-full border transition-all ${
                isDark 
                  ? 'border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white' 
                  : 'border-gray-200 hover:bg-gray-100 text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex-1 flex gap-2">
              {projects.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentIndex ? 'flex-[2] bg-teal-500' : isDark ? 'flex-1 bg-zinc-800' : 'flex-1 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextProject}
              className={`p-4 rounded-full border transition-all ${
                isDark 
                  ? 'border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white' 
                  : 'border-gray-200 hover:bg-gray-100 text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Multi-Device Mockup with Container */}
        <div className="lg:col-span-7 relative flex items-center justify-center order-1 lg:order-2 select-none min-h-[450px] md:min-h-[650px] w-full px-4 md:px-0">
          
          {/* Subtle Background Container for Devices */}
          <div className={`relative w-full max-w-3xl mx-auto p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] transition-colors border-2 ${
            isDark ? 'bg-zinc-900/30 border-zinc-800/50' : 'bg-gray-100/80 border-gray-200/80'
          }`}>
            
            {/* Unified Device Island Container */}
            <div className="relative w-full mx-auto flex items-center justify-center scale-90 sm:scale-95 md:scale-100 transition-transform duration-500">
              
              {/* Tablet Frame - Left Overlap */}
              <div 
                ref={tabletRef}
                className={`absolute -bottom-4 -left-2 md:-left-10 w-[120px] sm:w-[180px] md:w-[260px] aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] border-[6px] md:border-[10px] shadow-2xl z-20 overflow-hidden ring-4 transition-colors ${
                  isDark ? 'bg-zinc-900 border-zinc-800 ring-zinc-900/50' : 'bg-zinc-800 border-zinc-700 ring-white'
                }`}
              >
                <div className="w-full h-full bg-black relative">
                  <video 
                    key={`tablet-${currentIndex}`}
                    autoPlay loop muted playsInline
                    disablePictureInPicture
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  >
                    <source src={activeProject.videos.tablet} type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Laptop Frame - Center */}
              <div ref={laptopRef} className="relative w-[90%] md:w-[85%] z-10">
                <div className={`relative w-full aspect-[16/10] rounded-t-xl md:rounded-t-2xl border-[6px] md:border-[12px] shadow-2xl overflow-hidden transition-colors ${
                  isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-800 border-zinc-700'
                }`}>
                  {/* Camera */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full z-20 mt-1.5 border ${
                    isDark ? 'bg-zinc-950 border-zinc-700' : 'bg-zinc-800 border-zinc-600'
                  }`}></div>
                  
                  {/* Screen / Video */}
                  <div className="w-full h-full bg-black relative">
                    <video 
                      key={`laptop-${currentIndex}`}
                      autoPlay loop muted playsInline
                      disablePictureInPicture
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-cover pointer-events-none select-none"
                    >
                      <source src={activeProject.videos.laptop} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none"></div>
                  </div>
                </div>

                {/* Laptop Base */}
                <div className={`relative w-[108%] h-3 md:h-6 rounded-b-xl md:rounded-b-2xl border-x-[8px] md:border-x-[12px] -translate-x-[4%] z-20 shadow-2xl transition-colors ${
                  isDark ? 'bg-zinc-700 border-zinc-800' : 'bg-zinc-300 border-zinc-400'
                }`}>
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-32 h-1 md:h-1.5 rounded-b-lg ${
                    isDark ? 'bg-zinc-900/50' : 'bg-zinc-400/50'
                  }`}></div>
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/40 blur-3xl rounded-full z-0"></div>
              </div>

              {/* Mobile Frame - Right Overlap */}
              <div 
                ref={mobileRef}
                className={`absolute -bottom-8 -right-4 md:-right-10 w-[90px] sm:w-[130px] md:w-[170px] aspect-[9/19.5] rounded-[1.8rem] md:rounded-[1.8rem] border-[4px] md:border-[8px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 overflow-hidden ring-2 transition-colors ${
                  isDark ? 'bg-zinc-900 border-zinc-800 ring-zinc-950' : 'bg-zinc-800 border-zinc-700 ring-white'
                }`}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-3 md:h-5 bg-black rounded-b-xl md:rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="w-6 md:w-8 h-0.5 md:h-1 bg-zinc-800 rounded-full"></div>
                </div>
                
                {/* Screen / Video */}
                <div className="w-full h-full bg-black relative">
                   <video 
                      key={`mobile-${currentIndex}`}
                      autoPlay loop muted playsInline
                      disablePictureInPicture
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-cover pointer-events-none select-none"
                    >
                      <source src={activeProject.videos.mobile} type="video/mp4" />
                    </video>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
