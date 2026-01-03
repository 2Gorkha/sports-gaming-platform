
import pool from "../config/db.js";
export const createUser = async (name, email, passwordHash) => {
    const query = `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
            RETURNING id, name, email
    `;
    const values = [name, email, passwordHash];
    const result = await pool.query(query, values);
    return result.rows[0];
};
export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
};