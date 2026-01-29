import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


// Utility function to generate a random number within a range
const random = (min, max) => Math.random() * (max - min) + min;

const Home = () => {
    const homeRef = useRef(null);
    const imageRef = useRef(null);
    const buttonRef = useRef(null);

    // Refs for the 7 setting icons
    const settingRefs = useRef([]);
    const settingIconSrc = "https://imgs.search.brave.com/1yg04VJC2ohU2x3YG53WUIP7K7SVpJANb6S0dcdc-n4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDcv/MjQ4LzM2MS9zbWFs/bC9zZXR0aW5nLTNk/LXNldHRpbmctaWNv/bi0zZC1zZXR0aW5n/LXN5bWJvbC0zZC1z/ZXR0aW5nLWltYWdl/LWZyZWUtcG5nLnBu/Zw";

    // Define the range the icons can move within the center of the screen (in pixels)
    // Larger range creates a wider flow effect.
    const maxRange = 300;

    // Recursive function for continuous, random movement
    const animateRandomFlow = (target, speed, floatDir) => {
        gsap.to(target, {
            x: random(-maxRange, maxRange), // New random X position
            y: random(-maxRange, maxRange), // New random Y position
            rotation: random(-360, 360),    // Random rotation
            opacity: random(0.08, 0.2),     // Random slight opacity change
            duration: speed,                // Use icon-specific speed
            ease: "sine.inOut",
            onComplete: () => {
                // Call itself again when the animation is finished
                animateRandomFlow(target, speed, floatDir);
            }
        });
    };

    useGSAP(
        () => {
            const tl = gsap.timeline();

            // --- Main Content Entrance Animation (Existing) ---
            tl.from('.hero-title', { y: 80, opacity: 0, duration: 1, ease: 'power4.out' })
                .from('.hero-sub', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
                .from(buttonRef.current, { scale: 0.8, y: 20, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4');

            // --- Background Setting Icons Entrance and Randomized Motion ---

            settingRefs.current.forEach((icon, index) => {
                if (!icon) return;

                // Unique parameters for each icon
                const speed = random(2, 5); // Randomized continuous speed (8s to 15s)
                const floatDir = index % 2 === 0 ? 20 : -20;

                // 1. Entrance Animation (Fly-in from corners to a centralized, random starting point)
                const startX = index % 2 === 0 ? '-100vw' : '100vw';
                const startY = index % 2 === 0 ? '-100vh' : '100vh';

                gsap.fromTo(icon,
                    { x: startX, y: startY, opacity: 0, rotation: random(-360, 360), scale: 1 },
                    {
                        // Target a small random position in the center
                        x: random(-50, 50),
                        y: random(-50, 50),
                        opacity: 0.05 + (index * 0.02),
                        rotation: 0,
                        scale: 1,
                        duration: 1.5 + (index * 0.1),
                        ease: 'power3.out',
                        delay: 0.1 + (index * 0.1),
                        onComplete: () => {
                            // Start the continuous random flow once the entrance is done
                            animateRandomFlow(icon, speed, floatDir);
                        }
                    }
                );

                // No separate continuous rotation/float needed, as 'animateRandomFlow' handles the infinite loop
            });


            // Continuous Image Floating Animation (Existing)
            gsap.to(imageRef.current, {
                y: 20,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        },
        { scope: homeRef }
    );

    return (
        <section
            ref={homeRef}
            className="relative min-h-screen flex items-center justify-center text-zinc-900 dark:text-white overflow-hidden bg-white dark:bg-zinc-950 py-32"
            id='home'
        >

            {/* --- Animated Background Icons (Random Flow Structure) --- */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">

                {[...Array(7)].map((_, index) => (
                    <img
                        key={index}
                        ref={el => settingRefs.current[index] = el}
                        src={settingIconSrc}
                        alt={`Animated Setting Icon ${index + 1}`}
                        // CORRECTED: Added the required Tailwind classes here:
                        className={`absolute 
                // Core Tailwind classes to prevent selection and drag
                select-none pointer-events-none 
                // Vary size slightly
                ${index === 0 ? 'w-24 h-24' : index === 3 ? 'w-36 h-36' : 'w-28 h-28'} 
                text-teal-500 opacity-30`}
                        style={{
                            filter: 'grayscale(200%)',
                            opacity: 0.05,
                            // Initial small offset to scatter them slightly before GSAP takes over
                            transform: `translateX(${index * 5}px) translateY(${-index * 5}px)`
                        }}
                    />
                ))}
            </div>
            {/* --- End Animated Background Icons --- */}


            {/* Content Wrapper */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-16 max-w-6xl w-full">
                {/* LEFT SIDE – Details */}
                <div className="text-center md:text-left order-2 md:order-1">
                    <h1 className="hero-title text-5xl md:text-7xl font-bold">
                        Hi, I’m <span className="text-teal-400">Bibek</span>
                    </h1>

                    <p className="hero-sub mt-4 text-lg text-zinc-600 dark:text-white/80 max-w-xl mx-auto md:mx-0">
                        A passionate web developer focused on building smooth, modern
                        interfaces using <strong>JavaScript</strong>, <strong>React</strong>, <strong>ReactNative</strong>, <strong>GSAP</strong>, and
                        clean UI principles.
                    </p>

                    {/* Button */}
                    <a href="#projects">
                        <button
                            ref={buttonRef}
                            className="hero-btn mt-8 px-8 py-3 rounded-full bg-teal-500 text-white font-semibold shadow-lg hover:bg-teal-600 transition duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
                        >
                            View Portfolio
                        </button>
                    </a>
                </div>

                {/* RIGHT SIDE – Image */}
                <div className="flex justify-center relative order-1 md:order-2">
                    <img
                        ref={imageRef}
                        src="../public/me.png"
                        alt="Developer Portrait"
                        className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-full aspect-square border-4 border-teal-500 shadow-2xl"
                        id='img'
                    />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 text-sm text-zinc-500 dark:text-white/70 z-10 animate-pulse" ref={imageRef}>
                ↓ Scroll Down
            </div>
        </section>
    );
};

export default Home;