import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js";
import gameRoutes from "./src/routes/gameRoutes.js";
import favoriteRoutes from "./src/routes/favoriteRoutes.js";

const app = express();

app.use(
    cors({
        origin: "https://sports-gaming-platform-frontend-c74oub2e.vercel.app",
        credentials: true,
    })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
