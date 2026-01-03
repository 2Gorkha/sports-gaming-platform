import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api.js"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/games");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleLogin}>
                <h2>Login</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>

                <p>
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f6fa",
    },
    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
};
