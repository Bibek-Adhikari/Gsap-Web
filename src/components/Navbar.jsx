import React from "react";
import { navLinks } from "../../constats/index";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });
    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      
      {
        backgroundColor: "#00000050",
        backgroundFilter: "blur(20%)",
        duration: 0.3,
        ease: "power1.out",
      }
    );
  });

  return (
    <nav>
      <div className="">
        <a href="#home" className="flex items-center gap-2">
          <img src="./images/logo.png" alt="logo" />
          <p>Velvet Pour</p>
        </a>
        <ul>
          {navLinks.map((link) => {
            return (
              <li key={link.id}>
                <a href={`${link.id}`}>{link.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
