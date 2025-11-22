# Setup Guide - Directory Application

This guide will help you set up the Directory application with a Neon Postgres database backend.

## Prerequisites

- Node.js 18+ installed
- A Neon account (free tier available at [neon.tech](https://neon.tech))

## Step 1: Clone and Install

```bash
# Install dependencies
npm install
```

## Step 2: Set Up Neon Postgres Database

### 2.1 Create a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account (no credit card required)
3. Create a new project

### 2.2 Get Your Connection String

1. In your Neon dashboard, go to your project
2. Click on "Connection Details"
3. Copy the connection string (it looks like this):
   ```
   postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Neon connection string:
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgresql://your-connection-string-here
   ```

## Step 4: Run Database Migration

Run the migration script to create tables and insert sample data:

```bash
npm run migrate
```

You should see:
```
✅ Database migration completed successfully!
📊 Tables created:
   - categories
   - listings
   - users
   - favorites
📝 Sample data inserted
```

## Step 5: Start the Server

Start the Express server:

```bash
npm run server
```

Or for development with auto-reload:

```bash
npm run server:dev
```

The server will start on `http://localhost:3000`

## Step 6: Build Tailwind CSS (Optional)

If you want to make CSS changes:

```bash
# For development (watch mode)
npm run dev

# For production (minified)
npm run build
```

## Testing the API

Once the server is running, you can test the API endpoints:

### Get All Listings
```bash
curl http://localhost:3000/api/listings
```

### Get All Categories
```bash
curl http://localhost:3000/api/categories
```

### Get a Specific Listing
```bash
curl http://localhost:3000/api/listings/1
```

### Filter Listings by Category
```bash
curl http://localhost:3000/api/listings?category=teknologi
```

### Search Listings
```bash
curl http://localhost:3000/api/listings?search=design
```

## Project Structure

```
datastar/
├── server/
│   ├── index.js           # Main Express server
│   ├── db.js              # Database connection
│   ├── schema.sql         # Database schema
│   ├── migrate.js         # Migration script
│   └── routes/
│       ├── listings.js    # Listings API routes
│       └── categories.js  # Categories API routes
├── public/
│   └── css/
│       └── output.css     # Generated Tailwind CSS
├── src/
│   └── css/
│       └── input.css      # Tailwind source
├── index.html             # Main landing page
├── .env                   # Environment variables (create this)
├── .env.example           # Environment template
└── package.json
```

## Available Scripts

- `npm run server` - Start the Express server
- `npm run server:dev` - Start server with auto-reload
- `npm run migrate` - Run database migrations
- `npm run dev` - Build Tailwind CSS in watch mode
- `npm run build` - Build Tailwind CSS for production

## Troubleshooting

### Connection Issues

If you get a database connection error:
1. Check that your `DATABASE_URL` in `.env` is correct
2. Make sure your Neon project is running (it auto-sleeps after inactivity)
3. Verify you have internet connection (Neon is cloud-based)

### Migration Fails

If migration fails:
1. Check your database connection string
2. Ensure you have permissions to create tables
3. Try running the SQL directly in Neon's SQL editor

### Port Already in Use

If port 3000 is already in use:
1. Change the `PORT` in your `.env` file
2. Or kill the process using port 3000:
   ```bash
   # On Linux/Mac
   lsof -ti:3000 | xargs kill -9

   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

## Next Steps

Now that your backend is running:

1. **Connect the Frontend** - Update `index.html` to fetch data from the API
2. **Create Detail Pages** - Build individual listing pages
3. **Add Filtering** - Implement interactive filters with Datastar
4. **Add SSE** - Set up Server-Sent Events for real-time updates

See `PROJEKTPLAN.md` for the complete roadmap!

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [Express.js Guide](https://expressjs.com/)
- [Datastar Documentation](https://data-star.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
