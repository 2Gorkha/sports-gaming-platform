import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import favoriteRoutes from "./src/routes/favoriteRoutes.js";

dotenv.config();

const app = express();

// Put the exact origins you really use here
const allowedOrigins = [
    "https://sports-gaming-platform-frontend-c74oub2e.vercel.app",
    "http://localhost:5173",
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            // Allow this origin
            return callback(null, true);
        } else {
            // Do NOT throw an Error here – that causes 500
            return callback(null, false);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());

// Your routes
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Basic error handler so unexpected errors don’t become silent 500s
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
