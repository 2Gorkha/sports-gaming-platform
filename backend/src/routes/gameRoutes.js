import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllGames } from "../controllers/gameController.js";

const router = express.Router();

router.get("/", protect, getAllGames);

export default router;
