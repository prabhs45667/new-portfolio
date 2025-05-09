import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  links: number[];
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Updated with red/black color scheme
  const colors = ['#ff3333', '#ff0000', '#b30000', '#cc0000'];
  const particleCount = 100; // Increased for more density
  const connectionDistance = 180; // Increased for more connections
  const maxLinks = 4; // Increased for more connections

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create particles
    const createParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.6, // Slightly faster
          speedY: (Math.random() - 0.5) * 0.6, // Slightly faster
          color: colors[Math.floor(Math.random() * colors.length)],
          links: []
        });
      }
      particlesRef.current = particles;
      
      // Create network links
      for (let i = 0; i < particles.length; i++) {
        const distances: {index: number, distance: number}[] = [];
        
        // Calculate distances to all other particles
        for (let j = 0; j < particles.length; j++) {
          if (i !== j) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              distances.push({index: j, distance});
            }
          }
        }
        
        // Sort by distance and take closest ones
        distances.sort((a, b) => a.distance - b.distance);
        particles[i].links = distances.slice(0, maxLinks).map(d => d.index);
      }
    };
    
    createParticles();
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & draw particles
      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce on edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1;
        }
        
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1;
        }
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw permanent links between particles with red color
        particle.links.forEach(linkIndex => {
          const linkedParticle = particlesRef.current[linkIndex];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 0, 0, 0.2)`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(linkedParticle.x, linkedParticle.y);
          ctx.stroke();
        });
      });
      
      // Recalculate links occasionally
      if (Math.random() < 0.005) { // 0.5% chance per frame
        particlesRef.current.forEach((particle, i) => {
          const distances: {index: number, distance: number}[] = [];
          
          for (let j = 0; j < particlesRef.current.length; j++) {
            if (i !== j) {
              const dx = particle.x - particlesRef.current[j].x;
              const dy = particle.y - particlesRef.current[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < connectionDistance) {
                distances.push({index: j, distance});
              }
            }
          }
          
          distances.sort((a, b) => a.distance - b.distance);
          particle.links = distances.slice(0, maxLinks).map(d => d.index);
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
