import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    title: "Information Technology Dte. as Intern",
    company: "Airport Authority of India",
    duration: "July 2024 - Aug 2024",
    location: "New Delhi, India",
    description: [
      "I worked on a real-time project, \"Automation & Dashboarding of Asset Management Tool over Aviation Data\".",
      "I was involved in Automation, Data analytics, Data visualization, Selenium, Python and Aviation.",
      "Created Functional Specifications Documents (FSDs) and Technical Specification Documents (TSDs) to suit the business requirements."
    ]
  }
];

const ExperienceSection: React.FC = () => {
  const expRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    initParticlesEngine(loadFull);
  }, []);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = expRef.current;
    if (sectionEl) {
      const elems = Array.from(
        sectionEl.querySelectorAll<HTMLElement>('.container > *')
      );
      gsap.from(elems, {
        scrollTrigger: { trigger: sectionEl, start: 'top 80%' },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
      });
      // animate image inside
      const img = sectionEl.querySelector('img');
      if (img) {
        gsap.from(img as HTMLElement, {
          scrollTrigger: { trigger: img, start: 'top 80%' },
          x: 200,
          opacity: 0,
          duration: 1,
        });
      }
    }
  }, []);

  return (
    <section id="experience" className="py-20 relative" ref={expRef}>
      {/* Star particles background */}
      <Particles
        id="experienceTsparticles"
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
              value: 60,
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
              type: "star",
              options: {
                star: {
                  sides: 5
                }
              }
            },
            opacity: {
              value: { min: 0.1, max: 0.4 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false
              }
            },
            size: {
              value: { min: 1, max: 4 },
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
        <h2 className="section-heading">Experience</h2>
        
        <div className="mt-12 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border transform -translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 relative">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 z-10"></div>
              
              <div className="md:flex">
                <div className="md:w-1/2 px-8 py-4">
                  <Card className="tech-card">
                    <CardHeader className="p-6 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">{exp.title}</CardTitle>
                          <p className="text-lg font-medium text-accent">{exp.company}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-2">
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.duration}</span>
                        <span className="mx-1">•</span>
                        <Briefcase className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-2">
                        {exp.description.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:w-1/2 flex justify-center items-center">
                  <div className="w-full h-full max-w-[350px] max-h-[500px] flex items-center justify-center">
                    <img
                      src="/img/photo.jpg"
                      alt="Experience Photo"
                      className="rounded-xl object-cover shadow-lg border border-border w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
