-- Visitor Counter Schema

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_count INTEGER NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create visitor_logs table for detailed analytics
CREATE TABLE IF NOT EXISTS visitor_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT,
    user_agent TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    page_url TEXT,
    referrer TEXT
);

-- Insert initial counter if empty
INSERT OR IGNORE INTO visitors (id, total_count) VALUES (1, 0); 