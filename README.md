# Mogal Krupa PG

A complete MERN stack website for Mogal Krupa PG accommodation in Surat, Gujarat.

## Features
- Fully responsive, modern UI inspired by Dribbble design trends
- Built with React, Vite, TailwindCSS, and Framer Motion
- Node.js & Express backend with MongoDB database
- Smooth scrolling, animations, glassmorphism, and gradient backgrounds
- Complete contact/booking form integrated with the backend

## Setup Instructions

1. **Install Dependencies**
   Run the following command from the root directory (`mogal-krupa-pg/`):
   ```bash
   npm run install:all
   ```

2. **Configure Environment Variables**
   In the `server` directory, create a `.env` file and copy the contents of `.env.example`:
   ```bash
   cd server
   cp .env.example .env
   ```
   Ensure MongoDB is running locally on port 27017, or update the `MONGODB_URI` with your connection string.

3. **Start the Application**
   From the root directory, run:
   ```bash
   npm start
   ```
   - The Frontend will be available at `http://localhost:5173`
   - The Backend will run on `http://localhost:5000`

## Technologies Used
- Frontend: React (Vite), TailwindCSS, Framer Motion, Lucide React, Axios
- Backend: Node.js, Express, Mongoose, MongoDB
