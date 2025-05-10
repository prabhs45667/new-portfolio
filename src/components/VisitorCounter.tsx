import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchVisitorCount, incrementVisitorCount, checkBackendAvailability } from "@/lib/api";

interface VisitorCounterProps {
  className?: string;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ className }) => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [loaded, setLoaded] = useState(false);

  // Check backend availability
  useEffect(() => {
    const checkBackend = async () => {
      const available = await checkBackendAvailability();
      setBackendStatus(available ? 'online' : 'offline');
    };
    
    checkBackend();
  }, []);

  // Use React Query to fetch and cache the visitor count
  const { data: count, isLoading, refetch } = useQuery({
    queryKey: ['visitorCount'],
    queryFn: fetchVisitorCount,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: backendStatus !== 'checking', // Only run query after we've checked backend status
  });

  // Increment count once when component mounts (once per session)
  useEffect(() => {
    const incrementCount = async () => {
      if (backendStatus !== 'checking') {
        try {
          await incrementVisitorCount();
          await refetch(); // Refetch to get the updated count
          setLoaded(true);
        } catch (error) {
          console.error('Failed to increment visitor count:', error);
          setLoaded(true);
        }
      }
    };

    if (!loaded && backendStatus !== 'checking') {
      incrementCount();
    }
  }, [backendStatus, loaded, refetch]);

  // Display loading state initially
  if ((isLoading || !loaded) && backendStatus !== 'offline') {
    return (
      <div className={cn("flex items-center gap-1.5 animate-fade-in-down", className)}>
        <div className="
          py-1.5 px-3 rounded-full 
          flex items-center gap-2 
          bg-gradient-to-r from-black/30 to-black/20 
          backdrop-blur-md 
          border border-white/10 
          text-white 
          shadow-lg
        ">
          <Eye className="h-3.5 w-3.5 text-accent animate-pulse" />
          <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 animate-fade-in-down", 
        className
      )}
    >
      <div className="
        py-1.5 px-3 rounded-full 
        flex items-center gap-2 
        bg-gradient-to-r from-black/30 to-black/20 
        backdrop-blur-md 
        border border-white/10 
        text-white 
        shadow-lg
        hover:shadow-accent/20 hover:border-accent/20
        transition-all duration-300
      ">
        <Eye className="h-3.5 w-3.5 text-accent animate-pulse" />
        <div className="flex items-center animate-fade-in">
          <span className="font-medium text-sm">
            {count?.toLocaleString() || 0}
          </span>
          <span className="ml-1 text-xs text-white/70">visitors</span>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter; 