import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger  } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });


  useGSAP(() => {
    // === Text Animations ===
    const heroSplit = new SplitText(".title", { type: "chars,words" });
    const paraText = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(paraText.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });

    // === Leaves Animation ===
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // === Video Scroll Animation ===
    // Timeline that animates the video as you scroll
    const startValue = isMobile ? 'top 5%' : 'top 10%'
    const endValue = isMobile ? '120% top' : 'bottom top'

    const tl = gsap.timeline({
  scrollTrigger: {
    trigger: videoRef.current,   // use the actual element
    start: startValue,           // use the variables
    end: endValue,
    scrub: true,
    pin: true,
  },
});

videoRef.current.onloadedmetadata = () => {
  tl.to(videoRef.current, {
    currentTime: videoRef.current.duration
  });
};


  }, []); // run once

  return (
    <>
      <section id="hero" className="noisy relative overflow-hidden">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="Left leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="Right leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      {/* Video behind the hero */}
      <div className="video inset-0 -z-10">
        <video
          ref={videoRef}
          src="./videos/output.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default Hero;
