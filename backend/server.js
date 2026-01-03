import express from "express";
import cors from "cors";
import "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import favoriteRoutes from "./src/routes/favoriteRoutes.js";

const app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (Postman, curl)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


app.options("*", cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
