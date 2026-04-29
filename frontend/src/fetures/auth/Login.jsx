import { useState } from "react";
import API from "../../utlies/api.js"; // ✅ Use your custom API instance
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      // ✅ No localhost here. It uses the baseURL from api.js
      const res = await API.post("/auth/login", form);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect
      navigate("/dashboard");

    } catch (err) {
      console.error("Login Error:", err);
      // Better error handling: check if server sent a specific message
      const errorMsg = err.response?.data?.message || "Login failed";
      alert(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            required
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Minimal styles to keep it clean
const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    background: "#f4f6f8" 
  },
  card: { 
    background: "#fff", 
    padding: "30px", 
    borderRadius: "8px", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "300px" 
  },
  title: { textAlign: "center", marginBottom: "20px", color: "#333" },
  input: { 
    width: "100%", 
    padding: "10px", 
    marginBottom: "15px", 
    borderRadius: "4px", 
    border: "1px solid #ddd",
    boxSizing: "border-box" 
  },
  button: { 
    width: "100%", 
    padding: "10px", 
    background: "#007bff", 
    color: "#fff", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer",
    fontSize: "16px"
  }
};