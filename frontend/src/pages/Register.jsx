import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api.js"

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post(
                "/api/auth/register",
                form
            );

            alert("Registration successful! Please login.");


            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Create Account</h2>

                <input
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button onClick={handleSubmit}>Register</button>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
    },
    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
};
