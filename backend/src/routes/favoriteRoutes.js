import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/", protect, addFavorite);
router.delete("/:gameId", protect, removeFavorite);

export default router;
