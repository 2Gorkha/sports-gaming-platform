import pool from "../config/db.js";

// ADD GAME TO FAVORITES
export const addFavorite = async (req, res) => {
  const userId = req.user.id; // from JWT middleware
  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ message: "Game ID is required" });
  }

  try {
    // Check if already favorited
    const exists = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND game_id = $2",
      [userId, gameId]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "Game already in favorites" });
    }

    const result = await pool.query(
      "INSERT INTO favorites (user_id, game_id) VALUES ($1, $2) RETURNING *",
      [userId, gameId]
    );

    res.status(201).json({
      message: "Game added to favorites",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Add favorite error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL FAVORITES FOR USER
export const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `
      SELECT f.id, g.*
      FROM favorites f
      JOIN games g ON f.game_id = g.id
      WHERE f.user_id = $1
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Fetch favorites error:", error);
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

// REMOVE FAVORITE
export const removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const { gameId } = req.params;

  try {
    await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND game_id = $2",
      [userId, gameId]
    );

    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};