
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { useToast } from '@/hooks/use-toast';
import anime from 'animejs';

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to my portfolio!",
      description: "Feel free to explore my projects and get in touch.",
      duration: 5000,
    });

    // Page enter animation
    anime({
      targets: 'main > section',
      opacity: [0, 1],
      translateY: ['30px', '0px'],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: anime.stagger(300, {start: 600})
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
