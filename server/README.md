# Visitor Counter Backend

This is a simple SQL-based backend for tracking website visitors on your portfolio.

## Features

- Track total visitor count
- Log visitor details (IP, user agent, referrer)
- Provide basic analytics
- SQLite database for simplicity and ease of setup
- IP-based deduplication to prevent multiple counting

## Installation

1. Install dependencies:
   ```
   cd server
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

3. The server will run on port 3001 by default (http://localhost:3001)

## Testing the Server

To verify the server is working correctly:

1. Start the server in one terminal:
   ```
   npm start
   ```

2. In another terminal, run the test script:
   ```
   npm test
   ```

This will simulate visits and verify the counter is incrementing correctly.

## Troubleshooting

If your visitor counter is not working correctly:

1. **Backend not running**: Make sure the server is running on port 3001
   - Check by visiting http://localhost:3001/api/health

2. **Frontend not connecting to backend**: Open browser console and look for errors 
   - Check if there are any CORS errors
   - Verify the API_URL in `src/lib/api.ts` is correct

3. **Count not incrementing**: The server prevents counting the same IP multiple times within a 1-hour window
   - This is by design to prevent inflated counts
   - Each browser session will only be counted once

4. **Database issues**: If you suspect database corruption
   - Stop the server
   - Delete the `visitors.db` file
   - Restart the server (a new database will be created)

## API Endpoints

- `GET /api/visitors` - Get the current visitor count
- `POST /api/visitors/increment` - Increment the visitor count
- `GET /api/visitors/analytics` - Get visitor analytics
- `GET /api/health` - Check if the server is running

## Database

The application uses SQLite, which stores all data in a single file `visitors.db`.

## Production Deployment

For production deployment, consider:

1. Setting up a proper web server (Nginx, Apache) as a reverse proxy
2. Using environment variables for configuration
3. Setting up HTTPS
4. Implementing rate limiting
5. Adding authentication for analytics endpoints

### Deploying to a VPS

```bash
# Clone repository
git clone <your-repo-url>
cd aurora-weave-portfolio/server

# Install dependencies
npm install

# Start with PM2 for persistence
npm install -g pm2
pm2 start server.js --name visitor-counter
pm2 save
```

### Deploying to Heroku

```bash
# Initialize git if not already done
git init
heroku create

# Add a Procfile
echo "web: node server.js" > Procfile

# Push to Heroku
git add .
git commit -m "Initial commit"
git push heroku master
```

## Environment Variables

- `PORT` - Port to run the server on (default: 3001)
- `NODE_ENV` - Environment (development/production) 