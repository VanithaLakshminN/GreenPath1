# GreenPath

An eco-friendly journey tracking application that helps users make sustainable transportation choices.

## Features

- User authentication with email or phone number
- Track eco-friendly journeys
- Calculate CO2 savings
- Earn achievements for sustainable choices
- Interactive maps for route planning

## Tech Stack

### Frontend
- React with TypeScript
- Vite
- TailwindCSS
- React Router

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/VanithaLakshminN/GreenPath1.git
   cd GreenPath1
   ```

2. Install frontend dependencies
   ```bash
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

4. Set up PostgreSQL database
   ```bash
   createdb greenpath
   psql -d greenpath -f server/src/schema.sql
   ```

5. Configure environment variables
   - Copy `server/.env.example` to `server/.env`
   - Copy `.env.example` to `.env`
   - Update with your database credentials and API keys

6. Start the backend server
   ```bash
   cd server
   npm run dev
   ```

7. Start the frontend (in a new terminal)
   ```bash
   npm run dev
   ```

8. Open http://localhost:5173 in your browser

## Project Structure

```
GreenPath1/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── types.ts           # TypeScript types
├── server/                # Backend source code
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   ├── db.js          # Database connection
│   │   ├── schema.sql     # Database schema
│   │   └── index.js       # Server entry point
│   └── package.json
└── package.json
```

## License

MIT
