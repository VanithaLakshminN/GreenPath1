# GreenPath Backend Server

Backend API for GreenPath application with PostgreSQL database.

## Setup

1. Install PostgreSQL on your system
2. Create a database named `greenpath`
3. Copy `.env.example` to `.env` and update with your database credentials
4. Install dependencies:
   ```bash
   npm install
   ```

5. Initialize the database schema:
   ```bash
   psql -U your_username -d greenpath -f src/schema.sql
   ```

6. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (requires authentication)

### Health Check
- `GET /api/health` - Check if API is running

## Environment Variables

- `PORT` - Server port (default: 8080)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
