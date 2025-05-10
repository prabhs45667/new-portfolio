import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { School, Calendar, Award, Code } from 'lucide-react';
import anime from 'animejs';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const AboutSection: React.FC = () => {
  const skills = [
    'Python', 'Java', 'HTML/CSS', 'C/C++', 'SQL', 'PHP',
    'DSA', 'PyTorch', 'Numpy', 'Pandas', 'Matplotlib', 
    'TensorFlow', 'Streamlit', 'Selenium', 'NLP', 
    'Web Scraping', 'Deep Learning'
  ];

  const aboutTextRef = useRef<HTMLParagraphElement>(null);
  const infoItemsRef = useRef<HTMLDivElement>(null);
  const skillsCardRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    initParticlesEngine(loadFull);
  }, []);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // About text animation
          if (entry.target === aboutTextRef.current) {
            anime({
              targets: aboutTextRef.current,
              opacity: [0, 1],
              translateY: ['20px', '0px'],
              easing: 'easeOutExpo',
              duration: 1000,
              delay: 200
            });
          }
          
          // Info items animation
          if (entry.target === infoItemsRef.current) {
            anime({
              targets: infoItemsRef.current?.querySelectorAll('.info-item'),
              opacity: [0, 1],
              translateX: ['-20px', '0px'],
              easing: 'easeOutExpo',
              duration: 800,
              delay: anime.stagger(150)
            });
          }
          
          // Skills card animation
          if (entry.target === skillsCardRef.current) {
            anime({
              targets: skillsCardRef.current,
              opacity: [0, 1],
              translateY: ['20px', '0px'],
              easing: 'easeOutExpo',
              duration: 800,
              delay: 400
            });
          }
          
          // Skills tags animation
          if (entry.target === skillsRef.current) {
            anime({
              targets: skillsRef.current?.querySelectorAll('.skill-tag'),
              opacity: [0, 1],
              scale: [0.8, 1],
              easing: 'easeOutElastic(1, .5)',
              duration: 1200,
              delay: anime.stagger(50, {grid: [3, 6], from: 'center'})
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    if (aboutTextRef.current) observer.observe(aboutTextRef.current);
    if (infoItemsRef.current) observer.observe(infoItemsRef.current);
    if (skillsCardRef.current) observer.observe(skillsCardRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-muted/30 relative">
      {/* Star particles background */}
      <Particles
        id="aboutTsparticles"
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
              value: 80,
              density: {
                enable: true,
                width: 800,
                height: 800,
              },
            },
            color: {
              value: ["#ffffff", "#f5f5f5", "#e0e0e0"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.05, max: 0.3 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false
              }
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 0.8,
                sync: false
              }
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: false,
              },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: { enable: true },
            },
            modes: {
              bubble: {
                distance: 100,
                size: 4,
                duration: 2,
                opacity: 0.4,
              },
              push: {
                quantity: 4,
              },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="container mx-auto z-10 relative">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
          <div className="space-y-6">
            <p ref={aboutTextRef} className="text-lg opacity-0">
              I'm a <span className="font-semibold gradient-text">Computer Science & Engineering</span> student at Guru Gobind Singh Indraprastha University, New Delhi. My passion lies in developing intelligent systems, data analytics, and creating innovative solutions for real-world problems.
            </p>
            
            <div ref={infoItemsRef} className="space-y-4">
              <div className="flex items-center gap-3 info-item opacity-0">
                <School className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Bachelor of Technology in Computer Science and Engineering</p>
                  <p className="text-muted-foreground text-sm">Guru Gobind Singh Indraprastha University, New Delhi (CGPA: 8.30)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 info-item opacity-0">
                <Calendar className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">2022 - 2026</p>
                  <p className="text-muted-foreground text-sm">Expected Graduation</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 info-item opacity-0">
                <Award className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Achievements</p>
                  <p className="text-muted-foreground text-sm">Cleared IC Hack 2.0 with Rank 4 All-over India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 info-item opacity-0">
                <Code className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">SWAAS Member</p>
                  <p className="text-muted-foreground text-sm">Content and Social Media Member for The Eco-Technical Society of GTBIT</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card ref={skillsCardRef} className="tech-card opacity-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
                <div ref={skillsRef} className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm skill-tag opacity-0"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
