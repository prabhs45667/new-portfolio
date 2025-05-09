import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import anime from 'animejs';

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Animate theme change ripple
  useEffect(() => {
    anime({
      targets: '.theme-ripple',
      scale: [0, 1],
      opacity: [1, 0],
      easing: 'easeOutQuint',
      duration: 1000,
    });
  }, [resolvedTheme]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full transition-colors"
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        <Sun className={`h-5 w-5 transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon className={`absolute h-5 w-5 transition-all ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      </Button>
      <div className="theme-ripple absolute inset-0 rounded-full bg-accent/20 pointer-events-none"></div>
    </div>
  );
};

export default ThemeToggle;
