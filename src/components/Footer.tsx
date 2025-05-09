
import React, { useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import anime from 'animejs';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    const footerElement = document.querySelector('footer');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: '.footer-animate',
            opacity: [0, 1],
            translateY: ['20px', '0px'],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: anime.stagger(100)
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    if (footerElement) {
      observer.observe(footerElement);
    }
    
    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);
  
  return (
    <footer className="py-10 bg-card border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left footer-animate">
            <h3 className="text-xl font-display font-bold gradient-text mb-2">Prabhdeep Singh Narula</h3>
            <p className="text-muted-foreground">Computer Science Engineer</p>
          </div>
          
          <div className="flex items-center gap-4 mb-6 md:mb-0 footer-animate">
            <a 
              href="https://github.com/prabhs4546" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent/10 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/prabhdeep-singh-narula-1798b0246/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent/10 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:prabhs4546@gmail.com"
              className="p-2 rounded-full hover:bg-accent/10 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <div className="text-muted-foreground text-sm text-center md:text-right footer-animate">
            &copy; {currentYear} Prabhdeep Singh Narula. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
