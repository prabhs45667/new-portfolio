/**
 * API client for the visitor counter
 * 
 * This connects to the SQL backend server
 */

// API base URL - change this according to your deployment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api' 
  : 'http://localhost:3001/api';

// Debug mode - set to true to see console logs
const DEBUG = true;

/**
 * Log debug messages
 */
const logDebug = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`[VisitorCounter] ${message}`, data || '');
  }
};

/**
 * Check if backend is available
 */
export const checkBackendAvailability = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`${API_URL}/visitors`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    logDebug('Backend not available:', error);
    return false;
  }
};

/**
 * Fetches visitor count from the SQL backend
 */
export const fetchVisitorCount = async (): Promise<number> => {
  try {
    // Get the data from the API
    logDebug('Fetching visitor count from API');
    const response = await fetch(`${API_URL}/visitors`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    logDebug('Received count from API:', data.count);
    return data.count;
  } catch (error) {
    logDebug('Error fetching count, using localStorage fallback:', error);
    
    // Fallback to localStorage if API fails
    const storedCount = localStorage.getItem('visitorCount') || '0';
    const count = parseInt(storedCount, 10);
    return count;
  }
};

/**
 * Increment visitor count - called once per session
 */
export const incrementVisitorCount = async (): Promise<number> => {
  // Only use sessionStorage if backend is unavailable
  const backendAvailable = await checkBackendAvailability();
  
  if (!backendAvailable) {
    logDebug('Using localStorage fallback (backend unavailable)');
    // Using localStorage fallback
    if (sessionStorage.getItem('hasVisited')) {
      const storedCount = localStorage.getItem('visitorCount') || '0';
      return parseInt(storedCount, 10);
    }
    
    sessionStorage.setItem('hasVisited', 'true');
    const storedCount = localStorage.getItem('visitorCount') || '0';
    const newCount = parseInt(storedCount, 10) + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    return newCount;
  }
  
  try {
    logDebug('Incrementing visitor count via API');
    // Collect current page data
    const pageUrl = window.location.href;
    
    // Post to the increment endpoint
    const response = await fetch(`${API_URL}/visitors/increment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        pageUrl,
        timestamp: new Date().toISOString() 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    logDebug('Successfully incremented count to:', data.count);
    return data.count;
  } catch (error) {
    logDebug('Error incrementing count, using localStorage fallback:', error);
    
    // Fallback to localStorage if API fails
    if (sessionStorage.getItem('hasVisited')) {
      const storedCount = localStorage.getItem('visitorCount') || '0';
      return parseInt(storedCount, 10);
    }
    
    sessionStorage.setItem('hasVisited', 'true');
    const storedCount = localStorage.getItem('visitorCount') || '0';
    const newCount = parseInt(storedCount, 10) + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    
    return newCount;
  }
}; 