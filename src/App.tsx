import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect, useState, useRef } from "react";

// Custom cursor component
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Only setup cursor if not on mobile
    if (!isMobile) {
      const updatePosition = (e: MouseEvent) => {
        targetPos.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);

      const animate = () => {
        // Smooth interpolation
        const lerp = (start: number, end: number, t: number) => {
          return start * (1 - t) + end * t;
        };

        // Apply smooth movement with lerp
        cursorPos.current.x = lerp(cursorPos.current.x, targetPos.current.x, 0.15);
        cursorPos.current.y = lerp(cursorPos.current.y, targetPos.current.y, 0.15);
        
        // Apply position to cursor elements
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) scale(${isClicking ? 0.7 : 1})`;
        }
        
        if (outlineRef.current) {
          outlineRef.current.style.transform = `translate3d(${cursorPos.current.x - 5}px, ${cursorPos.current.y - 5}px, 0) scale(${isClicking ? 1.5 : 1})`;
        }
        
        // Continue animation loop
        animationFrameId.current = requestAnimationFrame(animate);
      };
      
      // Initialize cursor positions and start animation
      cursorPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      animationFrameId.current = requestAnimationFrame(animate);

      // Hide the default cursor
      document.body.style.cursor = 'none';

      return () => {
        document.removeEventListener('mousemove', updatePosition);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', checkMobile);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        document.body.style.cursor = 'auto';
      };
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Don't render cursor elements on mobile
  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

export default App;
