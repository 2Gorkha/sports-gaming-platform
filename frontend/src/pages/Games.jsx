
import { useEffect, useState } from "react";
import axios from "axios";


export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sport, setSport] = useState("");
    const [provider, setProvider] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const params = {};

            if (sport) params.sport = sport;
            if (provider) params.provider = provider;
            const res = await axios.get("http://localhost:5000/api/games", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            });
            setGames(res.data.data);
        } catch (err) {
            console.error("Failed to fetch games", err);
        } finally {
            setLoading(false);
        }
    };

    const addFavorite = async (gameId) => {
        try {
            await axios.post(
                "http://localhost:5000/api/favorites",
                { gameId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Added to favorites ");
        } catch (err) {
            alert("Already in favorites or error");
        }
    };

    if (loading) return <p>Loading games...</p>;

    // 🔥 GROUP BY SPORT
    const groupedGames = games.reduce((acc, game) => {
        acc[game.sport] = acc[game.sport] || [];
        acc[game.sport].push(game);
        return acc;
    }, {});

    return (
        <div style={styles.container}>
            <button
                style={styles.favLinkBtn}
                onClick={() => window.location.href = "/favorites"}
            >
                Show My Favorites
            </button>
            <div style={styles.filters}>
                <select value={sport} onChange={(e) => setSport(e.target.value)}>
                    <option value="">All Sports</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                </select>

                <select value={provider} onChange={(e) => setProvider(e.target.value)}>
                    <option value="">All Providers</option>
                    <option value="IPL">IPL</option>
                    <option value="EPL">EPL</option>
                    <option value="La Liga">La Liga</option>
                </select>

                <button onClick={fetchGames}>Apply Filter</button>
                <button
                    onClick={() => {
                        setSport("");
                        setProvider("");
                        fetchGames();
                    }}
                >
                    Clear
                </button>
            </div>
            <h1>Available Games</h1>

            {Object.keys(groupedGames).map((sport) => (
                <div key={sport} style={styles.section}>
                    <h2>{sport}</h2>

                    {groupedGames[sport].map((game) => (
                        <div key={game.id} style={styles.card}>
                            <p><strong>League:</strong> {game.league}</p>
                            <p>
                                <strong>{game.team_a}</strong> vs{" "}
                                <strong>{game.team_b}</strong>
                            </p>
                            <p>
                                <strong>Start:</strong>{" "}
                                {new Date(game.start_time).toLocaleString()}
                            </p>

                            <button
                                style={styles.favBtn}
                                onClick={() => addFavorite(game.id)}
                            >
                                Add to Favorite
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
    },
    section: {
        marginBottom: "40px",
    },
    card: {
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "15px",
        background: "#f9fafb",
    },
    favBtn: {
        marginTop: "10px",
        padding: "8px 14px",
        border: "none",
        borderRadius: "6px",
        background: "#facc15",
        cursor: "pointer",
    },
    favLinkBtn: {
        marginBottom: "20px",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
    },
    filters: {
        display: "flex",
        gap: "12px",
        marginBottom: "25px",
    },

};
