const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for development - restrict in production
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Initialize database connection
let db;
const initializeDb = async () => {
  try {
    console.log('Initializing database connection...');
    db = await open({
      filename: path.join(__dirname, 'visitors.db'),
      driver: sqlite3.Database
    });
    
    // Create tables if they don't exist
    console.log('Setting up database schema...');
    const schema = await fs.promises.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);
    
    // Log current visitor count
    const result = await db.get('SELECT total_count FROM visitors WHERE id = 1');
    console.log(`Current visitor count: ${result.total_count}`);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};

// Simple visitor tracking with IP-based deduplication
const visitorTracker = {
  // Store recent IPs to avoid counting multiple visits in a short period
  recentVisitors: new Map(),
  
  // Time window for tracking recent visits (in milliseconds)
  timeWindow: 1000 * 60 * 60, // 1 hour
  
  // Check if this is a new visitor
  isNewVisitor(ip) {
    const now = Date.now();
    
    // Clean up old entries
    for (const [storedIp, timestamp] of this.recentVisitors.entries()) {
      if (now - timestamp > this.timeWindow) {
        this.recentVisitors.delete(storedIp);
      }
    }
    
    // Check if we've seen this IP recently
    if (!ip || this.recentVisitors.has(ip)) {
      return false;
    }
    
    // Store this IP with current timestamp
    this.recentVisitors.set(ip, now);
    return true;
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('Visitor Counter API is running');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/visitors', async (req, res) => {
  try {
    const result = await db.get('SELECT total_count FROM visitors WHERE id = 1');
    res.json({ count: result.total_count });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    res.status(500).json({ error: 'Failed to fetch visitor count' });
  }
});

app.post('/api/visitors/increment', async (req, res) => {
  try {
    // Get client IP and user agent
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const referer = req.headers.referer || '';
    const pageUrl = req.body.pageUrl || '';
    
    // Check if this is a new visitor
    const isNew = visitorTracker.isNewVisitor(ip);
    
    // Always log the visit
    await db.run(
      'INSERT INTO visitor_logs (ip_address, user_agent, page_url, referrer) VALUES (?, ?, ?, ?)',
      [ip, userAgent, pageUrl, referer]
    );
    
    let result;
    
    // Only increment counter for new visitors
    if (isNew) {
      console.log(`New visitor from IP: ${ip} (first 3 octets)`);
      await db.run('UPDATE visitors SET total_count = total_count + 1, last_updated = CURRENT_TIMESTAMP WHERE id = 1');
    } else {
      console.log(`Returning visitor from IP: ${ip} (first 3 octets)`);
    }
    
    // Get updated count
    result = await db.get('SELECT total_count FROM visitors WHERE id = 1');
    
    res.json({ 
      count: result.total_count,
      isNewVisitor: isNew 
    });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    res.status(500).json({ error: 'Failed to increment visitor count' });
  }
});

// Analytics endpoint (could be protected with authentication)
app.get('/api/visitors/analytics', async (req, res) => {
  try {
    const recentVisits = await db.all('SELECT * FROM visitor_logs ORDER BY visited_at DESC LIMIT 100');
    const visitorsByHour = await db.all(`
      SELECT 
        strftime('%H', visited_at) as hour,
        COUNT(*) as count
      FROM visitor_logs
      WHERE visited_at > datetime('now', '-24 hours')
      GROUP BY hour
      ORDER BY hour
    `);
    
    const uniqueVisitorCount = await db.get(`
      SELECT COUNT(DISTINCT ip_address) as count 
      FROM visitor_logs 
      WHERE visited_at > datetime('now', '-24 hours')
    `);
    
    res.json({
      recentVisits,
      visitorsByHour,
      uniqueVisitors24h: uniqueVisitorCount.count
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Initialize and start server
const startServer = async () => {
  const dbInitialized = await initializeDb();
  
  if (!dbInitialized) {
    console.error('Failed to initialize database. Exiting...');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}/api/health to check server status`);
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
}); 