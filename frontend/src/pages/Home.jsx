import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div style={styles.container}>
            <h1>Sports Gaming Platform</h1>
            <p>Login or Register to explore games</p>

            <div style={styles.buttons}>
                {!token ? (
                    <>
                        <Link to="/login">
                            <button style={styles.primary}>Login</button>
                        </Link>

                        <Link to="/register">
                            <button style={styles.secondary}>Register</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/games">
                            <button style={styles.primary}>Go to Games</button>
                        </Link>

                        <Link to="/favorites">
                            <button style={styles.secondary}>My Favorites ⭐</button>
                        </Link>

                        <button
                            onClick={handleLogout}
                            style={styles.logout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
    },
    buttons: {
        display: "flex",
        gap: "20px",
    },
    primary: {
        padding: "12px 24px",
        background: "#2563eb",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
    },
    secondary: {
        padding: "12px 24px",
        background: "#22c55e",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
    },
};
