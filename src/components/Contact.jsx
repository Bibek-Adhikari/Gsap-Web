import React, { useEffect } from "react";
import { openingHours, socials } from "../../constats";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  // Animate when #contact enters viewport
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",       // when top of #contact hits 80% of viewport
        end: "bottom 20%",      // optional end point
        toggleActions: "play none none reverse", // play on enter, reverse on leave
      },
    });

    // Fade + slide whole footer
    tl.from("#contact .content", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Stagger individual child divs
    tl.from("#contact .content > div", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    }, "-=0.4"); // overlap slightly

    tl.from('.socialContainer',{
      xPercent:5,
      opacity:0,
      duration:1.5,
      ease:'power2inOut',  
    })
  });

  return (
    <footer id="contact">
      <img src="/images/footer-right-leaf.png" alt="Right-leaf" id="f-right-leaf" />
      <img src="/images/footer-left-leaf.png" alt="Left-leaf" id="f-left-leaf" />
      <div className="content">
        <h2>Where to find US</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day}: {time.time}
            </p>
          ))}
        </div>

        <div>
          <h3>Social</h3>
          <div className="socialContainer flex-center gap-5">
            {socials.map((social) => (
              <a href={social.url} key={social.name}>
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
