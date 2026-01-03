import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/favorites",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFavorites(res.data.data);
        } catch (err) {
            console.error("Failed to fetch favorites", err);
            alert("Failed to load favorites");
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (gameId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/favorites/${gameId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // 🔥 Best practice: re-fetch from DB
            fetchFavorites();
        } catch (err) {
            console.error("Failed to remove favorite", err);
            alert("Failed to remove favorite");
        }
    };

    if (loading) {
        return <p style={styles.loading}>Loading favorites...</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>⭐ My Favorite Games</h1>

            {favorites.length === 0 ? (
                <p style={styles.empty}>No favorites added yet.</p>
            ) : (
                favorites.map((game) => (
                    <div key={game.id} style={styles.card}>
                        <h3 style={styles.sport}>{game.sport}</h3>

                        <p>
                            <strong>{game.team_a}</strong> vs{" "}
                            <strong>{game.team_b}</strong>
                        </p>

                        <p><strong>League:</strong> {game.league}</p>

                        <p>
                            <strong>Start:</strong>{" "}
                            {new Date(game.start_time).toLocaleString()}
                        </p>

                        <button
                            style={styles.removeBtn}
                            onClick={() => removeFavorite(game.id)}
                        >
                            ❌ Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
    },
    heading: {
        marginBottom: "25px",
        fontSize: "32px",
    },
    loading: {
        padding: "30px",
        fontSize: "18px",
    },
    empty: {
        fontSize: "18px",
        color: "#6b7280",
    },
    card: {
        padding: "18px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        marginBottom: "15px",
        background: "#fff7ed",
    },
    sport: {
        marginBottom: "8px",
        color: "#1f2937",
    },
    removeBtn: {
        marginTop: "12px",
        padding: "8px 14px",
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};
