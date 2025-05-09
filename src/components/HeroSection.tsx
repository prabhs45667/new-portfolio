import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VisitorCounter from "./VisitorCounter";

// Component to animate each character in a text string
const AnimatedText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="char"
          style={{ "--char-index": index } as React.CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initParticlesEngine(loadFull);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const heading = headingRef.current;
    if (heading) {
      const chars = Array.from(heading.querySelectorAll<HTMLElement>(".char"));
      gsap.from(chars, {
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        immediateRender: false,
      });
    }
    const sub = subheadingRef.current;
    if (sub) {
      const subchars = Array.from(sub.querySelectorAll<HTMLElement>(".char"));
      gsap.from(subchars, {
        scrollTrigger: {
          trigger: sub,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        immediateRender: false,
      });
    }
    const btns = buttonsRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (btns) {
      gsap.from(Array.from(btns), {
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        immediateRender: false,
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col items-center justify-center pt-16 overflow-hidden"
    >
      {/* White triangular network background */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 60, // Reduced from 100
              density: {
                enable: true,
                width: 800,
                height: 800,
              },
            },
            color: {
              value: ["#ffffff", "#f5f5f5", "#e0e0e0", "#cccccc"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.05, max: 0.3 }, // Reduced opacity range
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: false, // Disabled attraction
                rotate: { x: 600, y: 1200 },
              },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: { enable: true },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                },
              },
              push: {
                quantity: 4,
              },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Visitor Counter - Positioned below navigation bar */}
      <div className="fixed top-24 md:top-[5.5rem] right-4 md:right-8 z-30">
        <VisitorCounter className="opacity-90 hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="container mx-auto text-center z-10 px-4 md:px-0">
        <p className="text-accent font-medium mb-2 animate-fade-in">
          <AnimatedText text="Hello, I'm" />
        </p>
        <h1 ref={headingRef} className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 uppercase text-white">
          <AnimatedText text="PRABHDEEP SINGH NARULA" />
        </h1>
        <h2
          ref={subheadingRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto"
        >
          <AnimatedText text="Computer Science Engineer with expertise in Web " />
          <br />
          <AnimatedText text="Development Data Science & Machine Learning" />
        </h2>

        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-3 md:gap-4">
          <Button variant="default" size="sm" className="text-sm md:text-base" asChild>
            <a href="#projects">
              <AnimatedText text="View My Work" />
            </a>
          </Button>
          <Button variant="outline" size="sm" className="text-sm md:text-base" asChild>
            <a href="#contact">
              <AnimatedText text="Get In Touch" />
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-16 animate-bounce">
        <a
          href="#about"
          className="text-muted-foreground flex flex-col items-center"
        >
          <span className="mb-1 md:mb-2 text-xs md:text-sm">
            <AnimatedText text="Scroll Down" />
          </span>
          <ArrowDown className="h-4 w-4 md:h-5 md:w-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
