import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllGames } from "../controllers/gameController.js";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import {
    registerUser,
    loginUser
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, getAllGames);
router.post("/", protect, addFavorite);
router.get("/", protect, getFavorites);
router.delete("/:gameId", protect, removeFavorite);
export default router;