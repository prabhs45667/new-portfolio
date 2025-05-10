import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

/**
 * ContactSection with GSAP ScrollTrigger animations.
 */
const ContactSection: React.FC = () => {
  const contactRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = contactRef.current;
    if (sectionEl) {
      const targets = Array.from(
        sectionEl.querySelectorAll<HTMLElement>('.container > *')
      );
      gsap.from(targets, {
        scrollTrigger: { trigger: sectionEl, start: 'top 80%', toggleActions: 'play reverse play reverse' },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
      });
    }
    const imgEl = imgRef.current;
    if (imgEl) {
      gsap.from(imgEl, {
        scrollTrigger: { trigger: imgEl, start: 'top 80%', toggleActions: 'play reverse play reverse' },
        x: 200,
        opacity: 0,
        duration: 1.2,
      });
    }
  }, []);

  return (
    <section id="contact" className="py-12 md:py-20" ref={contactRef}>
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="section-heading">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12">
          <div>
            <p className="text-base md:text-lg mb-4 md:mb-6">
              I'm currently looking for new opportunities to apply my skills in Computer Science. 
              Whether you have a question or just want to say hi, I'll do my best to get back to you!
            </p>
            
            <div className="space-y-3 md:space-y-4 mt-6 md:mt-8">
              <a href="mailto:prabhs4546@gmail.com" className="flex items-center gap-2 md:gap-3 group">
                <div className="p-2 md:p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Mail className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="text-sm md:text-base group-hover:text-accent transition-colors break-all">prabhs4546@gmail.com</span>
              </a>
              
              <a href="tel:+917701857794" className="flex items-center gap-2 md:gap-3 group">
                <div className="p-2 md:p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Phone className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="text-sm md:text-base group-hover:text-accent transition-colors">+91-7701857794</span>
              </a>
              
              <a href="https://github.com/prabhs45667" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 group">
                <div className="p-2 md:p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="text-sm md:text-base group-hover:text-accent transition-colors">github.com/prabhs45667</span>
              </a>
              
              <a href="https://www.linkedin.com/in/prabhdeep-singh-265a43296/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 group">
                <div className="p-2 md:p-3 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="text-sm md:text-base group-hover:text-accent transition-colors">linkedin.com/in/prabhdeep-singh-265a43296</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-full mt-6 md:mt-0">
          <img
            src="/img/contactss.png"
            alt="Contact"
            className="rounded-xl shadow-lg object-cover w-full max-w-[300px] md:max-w-[400px] h-[250px] md:h-[370px]"
            ref={imgRef}
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
