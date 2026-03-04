# GreenPath Setup Guide

## Overview
GreenPath is an eco-friendly journey tracking application with email/phone authentication and PostgreSQL database.

## Prerequisites
- Node.js v18 or higher
- PostgreSQL v14 or higher
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/VanithaLakshminN/GreenPath1.git
cd GreenPath1
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Set Up PostgreSQL Database

#### Create Database
```bash
createdb greenpath
```

#### Initialize Schema
```bash
psql -d greenpath -f server/src/schema.sql
```

Or manually connect and run:
```bash
psql -d greenpath
\i server/src/schema.sql
```

### 5. Configure Environment Variables

#### Backend Configuration
Copy `server/.env.example` to `server/.env`:
```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your settings:
```env
PORT=8080
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/greenpath
JWT_SECRET=your_secure_random_secret_key_here
NODE_ENV=development
```

#### Frontend Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
VITE_API_URL=http://localhost:8080/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 6. Start the Application

#### Start Backend Server (Terminal 1)
```bash
cd server
npm run dev
```

The server will run on http://localhost:8080

#### Start Frontend (Terminal 2)
```bash
npm run dev
```

The frontend will run on http://localhost:5173

### 7. Access the Application
Open your browser and navigate to: http://localhost:5173

## Features

### Authentication
- Register with email or phone number
- Login with email, phone, or username
- Secure password hashing with bcrypt
- JWT token-based sessions

### Journey Tracking
- Find eco-friendly routes using Google Maps
- Track CO2 savings
- Save journey history
- Earn points for sustainable travel

### Dashboard
- View journey history
- Track total CO2 saved
- See earned points and badges
- User profile management

## Database Schema

### Users Table
- id, email, phone, username
- password_hash
- full_name, profile_picture
- created_at, updated_at, last_login
- is_verified

### Journeys Table
- id, user_id
- start_location, end_location
- distance, duration
- transport_mode, co2_saved
- created_at

### Sessions Table
- id, user_id, token
- expires_at, created_at

### Achievements Table
- id, user_id
- achievement_type, achievement_name
- description, earned_at

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (requires auth)

### Journeys
- `POST /api/journeys` - Save a journey
- `GET /api/journeys?userId=username` - Get user journeys

### Health Check
- `GET /api/health` - Check API status

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running:
   ```bash
   pg_ctl status
   ```

2. Check database exists:
   ```bash
   psql -l | grep greenpath
   ```

3. Verify connection string in `server/.env`

### Port Already in Use
If port 8080 or 5173 is in use:
- Change PORT in `server/.env`
- Change port in `vite.config.ts` for frontend

### Google Maps Not Loading
- Verify `VITE_GOOGLE_MAPS_API_KEY` in `.env`
- Check API key has Maps JavaScript API enabled
- Ensure billing is enabled on Google Cloud Console

## Security Notes

### API Keys
- Never commit `.env` files to git
- Keep `.env.example` with placeholder values only
- Regenerate exposed API keys immediately

### Database
- Use strong passwords for PostgreSQL
- Change JWT_SECRET to a secure random string
- Enable SSL for production databases

### Production Deployment
- Set `NODE_ENV=production`
- Use environment variables for all secrets
- Enable HTTPS
- Set up proper CORS policies
- Use connection pooling for database

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Uses `--watch` flag for auto-restart

### Database Migrations
When updating schema:
1. Backup database: `pg_dump greenpath > backup.sql`
2. Apply changes to `server/src/schema.sql`
3. Run: `psql -d greenpath -f server/src/schema.sql`

### Testing API
Use tools like Postman or curl:
```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"testuser","password":"password123"}'
```

## Support
For issues or questions, please open an issue on GitHub.
