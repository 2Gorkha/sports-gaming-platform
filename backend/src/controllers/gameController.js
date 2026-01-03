import pool from "../config/db.js";

export const getAllGames = async (req, res) => {
  try {
    const { sport, provider } = req.query;

    let query = "SELECT * FROM games";
    let conditions = [];
    let values = [];

    if (sport) {
      values.push(sport);
      conditions.push(`sport ILIKE $${values.length}`);
    }

    if (provider) {
      values.push(provider);
      conditions.push(`provider ILIKE $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY id ASC";

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Failed to fetch games" });
  }
};
