import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentPage() {
  const [data, setData] = useState({
    name: "",
    amount: "",
    contactName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/payment/all");
        const latest = res.data[0];

        setData({
          name: latest?.name || "Aman",
          amount: latest?.amount || 38145,
          contactName: latest?.contactName || "UMESH",
          phone: latest?.phone || "9992460821",
          email: latest?.email || "example@gmail.com",
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      {/* 🔵 Top Header */}
      <div style={styles.header}>
        {/* Logo bina box ke, header mein */}
        <img 
          src="/mx.jpg" 
          alt="Logo" 
          style={{ width: "120px", height: "auto" }} 
        />
      </div>

      {/* ⚪ Card */}
      <div style={styles.card}>
        <h3 style={styles.title}>Payment Request from Max Services</h3>

        <p style={styles.label}>PAYMENT FOR</p>
        <p style={styles.value}>Mr. {data.name}</p>

        <p style={styles.label}>AMOUNT PAYABLE</p>
        <h2 style={styles.amount}>INR {data.amount}</h2>

        <div style={styles.line}></div>

        <p style={styles.contactText}>
          For any queries, please contact{" "}
          <span style={{ color: "#007bff" }}>{data.contactName}</span>
        </p>

        <p style={styles.iconText}>📞 {data.phone}</p>
        <p style={styles.iconText}>✉️ {data.email}</p>

        <p style={styles.link}>Merchant's business policies ↗</p>
      </div>

      {/* 🔽 Bottom Section */}
      <div style={styles.bottom}>
        <h3 style={{ margin: "10px 0" }}>
          <img src="https://razorpay.com/build/browser/static/favicon.ico" alt="Razorpay" style={{ width: "30px", verticalAlign: "middle", marginRight: "10px" }} />
          Razorpay
        </h3>

        <div style={{ display: "flex", gap: "10px", margin: "10px 0", justifyContent: "center" }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: "20px" }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{ height: "20px" }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg.png" alt="Mastercard" style={{ height: "20px" }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/RuPay.svg" alt="RuPay" style={{ height: "20px" }} />
        </div>

        <p style={styles.smallText}>
          Want to create payment links for your business? Visit razorpay.com/payment-links and get started instantly.
        </p>

        <p style={styles.blueLink}>🚩 Report Payment Link</p>

        <button style={styles.button}>Proceed to Pay</button>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  header: {
    background: "#2b6cb0",
    color: "#fff",
    padding: "15px",
    display: "flex",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    margin: "15px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  title: { fontSize: "16px", marginBottom: "15px" },
  label: { fontSize: "12px", color: "#888", marginTop: "10px" },
  value: { fontSize: "14px", fontWeight: "500" },
  amount: { fontSize: "24px", margin: "5px 0" },
  line: { height: "2px", width: "20px", background: "green", margin: "10px 0" },
  contactText: { fontSize: "12px", color: "#666" },
  iconText: { fontSize: "13px", marginTop: "5px" },
  link: { fontSize: "12px", color: "#007bff", marginTop: "10px", cursor: "pointer" },

  bottom: {
    background: "#fff",
    margin: "15px",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  smallText: { fontSize: "12px", color: "#666", marginTop: "8px" },
  blueLink: { fontSize: "12px", color: "#007bff", cursor: "pointer" },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    background: "#0a2540",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};