import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import anime from 'animejs';

// Component to animate each character in a text string
const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={`${char}-${index}`} 
          className="char" 
          style={{ '--char-index': index } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

interface NavLink {
  text: string;
  href: string;
}

const links: NavLink[] = [
  { text: 'Home', href: '#home' },
  { text: 'About', href: '#about' },
  { text: 'Experience', href: '#experience' },
  { text: 'Projects', href: '#projects' },
  { text: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav links with staggered delay
    anime({
      targets: '.nav-link',
      opacity: [0, 1],
      translateY: ['-20px', '0px'],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: anime.stagger(100, {start: 300})
    });
    // Animate navbar name on mount
    anime({
      targets: '.navbar-name .char',
      opacity: [0, 1],
      translateY: ['-2em', '0em'],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: anime.stagger(60)
    });
    // Animate again when scrolling up to the top
    const handleScroll = () => {
      if (window.scrollY < 20) {
        anime({
          targets: '.navbar-name .char',
          opacity: [0, 1],
          translateY: ['-2em', '0em'],
          easing: 'easeOutExpo',
          duration: 1200,
          delay: anime.stagger(60)
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 py-4',
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="text-2xl font-display font-bold gradient-text uppercase text-white">
          <AnimatedText text="PRABHDEEP SINGH NARULA" className="navbar-name" />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link) => (
            <a key={link.text} href={link.href} className="navbar-link nav-link">
              <AnimatedText text={link.text} />
            </a>
          ))}
          <div className="flex items-center space-x-2 ml-4">
            <a href="https://github.com/prabhs45667" target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/prabhdeep-singh-265a43296/" target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:prabhs4546@gmail.com">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
            <ThemeToggle />
          </div>
          <Button variant="default" className="ml-4" asChild>
            <a href="https://drive.google.com/file/d/1oK8B-xbiUMQo8xpXKU1a6EBawy3e_37u/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <AnimatedText text="Resume" />
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-4">
          <ThemeToggle />
          <button 
            className="flex flex-col justify-center items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn(
                "block h-0.5 w-full bg-foreground transition-all duration-300",
                mobileMenuOpen && "rotate-45 translate-y-2"
              )}></span>
              <span className={cn(
                "block h-0.5 w-full bg-foreground transition-opacity duration-300",
                mobileMenuOpen && "opacity-0"
              )}></span>
              <span className={cn(
                "block h-0.5 w-full bg-foreground transition-all duration-300",
                mobileMenuOpen && "-rotate-45 -translate-y-2"
              )}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed left-0 right-0 bg-background/90 backdrop-blur-lg mt-4 p-4 transition-all duration-300 md:hidden",
        mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
      )}>
        <nav className="flex flex-col">
          {links.map((link) => (
            <a 
              key={link.text} 
              href={link.href} 
              className="py-3 text-lg font-medium hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <AnimatedText text={link.text} />
            </a>
          ))}
          <div className="flex items-center space-x-4 py-3">
            <a href="https://github.com/prabhs45667" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/prabhdeep-singh-265a43296/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:prabhs4546@gmail.com">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <Button variant="default" className="mt-4" asChild>
            <a href="https://drive.google.com/file/d/1oK8B-xbiUMQo8xpXKU1a6EBawy3e_37u/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <AnimatedText text="Resume" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
