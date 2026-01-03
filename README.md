# Sports Mini Games Platform

This project is a full-stack mini sports gaming platform developed as part of a **Full-Stack Intern Assessment**.  
The application allows users to register, log in, view sports matches, filter them by sport, and mark matches as favorites.

The goal of this project is to simulate core features commonly found in sports betting or casino platforms, **without involving real money, betting logic, or transactions**.

---

##  Features

### User Authentication
- User registration with name, email, and password
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes to ensure only logged-in users can access games and favorites
- Logout functionality

### Games / Matches
- Displays a list of sports matches
- Each match includes:
    - Sport type (Cricket, Football, etc.)
    - League (IPL, EPL, La Liga)
    - Competing teams
    - Match start time
- Game data is fetched dynamically from the database

### Filtering
- Users can filter matches by sport
- Filtering is supported on both backend and frontend

### Favorites
- Users can add or remove matches from favorites
- Favorites are user-specific and stored in the backend
- Dedicated Favorites page to view saved matches

---

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- RESTful APIs

### Frontend
- React (Vite)
- React Router
- Axios
- Basic responsive UI using inline styles

---

## Project Structure
sports-gaming-platform

### Backend
- src/controllers
- src/routes
- src/middleware
- src/config
- server.js
- .env.example

### Frontend
- src/pages
- src/components
- src/api
- App.jsx
- main.jsx

## API Endpoints

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```
### Games
```http
GET /api/games  # Fetch all games
GET /api/games?sport=Cricket  # Filter games by sport
```
### Favorites
```http 
POST   /api/favorites #Add a game to favorites
GET    /api/favorites #Get all favorite games
DELETE /api/favorites/:gameId # Remove a game from favorites 
```

### Setup Instruction
```bash
git clone https://github.com/<your-username>/sports-gaming-platform.git```sh
cd sports-gaming-platform
#Backend Setup
cd backend
npm install

#Create a .env file using the example provided:
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/sports_platform
JWT_SECRET=your_jwt_secret_here

#Start Server
npm run dev
#Backend PORT
http://localhost:5000
```
```bash
#Frontend Setup
cd frontend
npm install
npm run dev
http://localhost:5173

```
### DB Information 
- PostgreSQL is used as the database

- Game data is pre-seeded into the database

- Favorites are stored per user using relational mapping

### Author 
**Rahul Raj Abhishek**  
B.Tech Computer Science  
Full-Stack Intern Assessment Project (January 2026)