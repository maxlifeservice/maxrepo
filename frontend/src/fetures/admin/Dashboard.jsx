import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "200px",
        height: "100vh",
        background: "#2c3e50",
        color: "#fff",
        padding: "20px"
      }}>
        <h3>Menu</h3>

        <Link to="/dashboard" style={{ color: "#fff", display: "block", margin: "10px 0" }}>
          Dashboard
        </Link>

        <Link to="/adddetail" style={{ color: "#fff", display: "block", margin: "10px 0" }}>
          Add Detail
        </Link>

        <Link to="/settings" style={{ color: "#fff", display: "block", margin: "10px 0" }}>
          Settings
        </Link>

        <Link to="/add-payment" style={{ color: "#fff", display: "block", margin: "10px 0" }}>
          Add Payment
        </Link>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>

        {/* Header */}
        <div style={{
          height: "60px",
          background: "#34495e",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px"
        }}>
          <h3>Dashboard</h3>
          <button onClick={logout}>Logout</button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
          <h2>Welcome 🎉</h2>
          <p>This is your dashboard content</p>
        </div>

      </div>
    </div>
  );
}