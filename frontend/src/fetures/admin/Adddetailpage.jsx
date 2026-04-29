import { useState, useEffect } from "react";
import API from "../../utlies/api.js"; // ✅ Full URL ki jagah ab hum API use karenge

export default function AddPayment() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    bank: "",
    upiId: "",
    contactName: "",
    contactNumber: "",
    screenshot: null,
  });

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch payments
  const fetchPayments = async () => {
    try {
      const res = await API.get("/payment/all"); // ✅ Base URL removed
      setPayments(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching payments");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("amount", form.amount);
      formData.append("bank", form.bank);
      formData.append("upiId", form.upiId);
      formData.append("contactName", form.contactName);
      formData.append("contactNumber", form.contactNumber);

      if (form.screenshot) {
        formData.append("screenshot", form.screenshot);
      }

      await API.post(
        "/payment/add", // ✅ Base URL removed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Payment Added ✅");

      setForm({
        name: "",
        amount: "",
        bank: "",
        upiId: "",
        contactName: "",
        contactNumber: "",
        screenshot: null,
      });

      document.getElementById("fileInput").value = "";
      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Error adding payment ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/payment/delete/${id}`); // ✅ Base URL removed
      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* ✅ FORM */}
      <div style={styles.card}>
        <h2 style={styles.title}>Add Payment</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            required
            style={styles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Enter Amount"
            required
            style={styles.input}
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            type="text"
            placeholder="Bank Details"
            style={styles.input}
            value={form.bank}
            onChange={(e) => setForm({ ...form, bank: e.target.value })}
          />

          <input
            type="text"
            placeholder="UPI ID"
            required
            style={styles.input}
            value={form.upiId}
            onChange={(e) => setForm({ ...form, upiId: e.target.value })}
          />

          <input
            type="text"
            placeholder="Contact Name"
            style={styles.input}
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          />

          <input
            type="text"
            placeholder="Contact Number"
            style={styles.input}
            value={form.contactNumber}
            onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
          />

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={styles.file}
            onChange={(e) => setForm({ ...form, screenshot: e.target.files[0] })}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* ✅ LIST */}
      <div style={styles.list}>
        <h2>Payment List</h2>

        {payments.length === 0 && <p>No data found</p>}

        {payments.map((item) => (
          <div key={item._id} style={styles.item}>
            <p><b>Name:</b> {item.name}</p>
            <p><b>Amount:</b> ₹{item.amount}</p>
            <p><b>Bank:</b> {item.bank}</p>
            <p><b>UPI:</b> {item.upiId || "-"}</p>
            <p><b>Contact:</b> {item.contactName || "-"}</p>
            <p><b>Phone:</b> {item.contactNumber || "-"}</p>

            {item.screenshot && (
              <img
                src={`http://localhost:5000/uploads/${item.screenshot}`}
                alt="screenshot"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}

            <br />

            <button
              onClick={() => handleDelete(item._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Styles (Remains exactly the same)
const styles = {
  container: { display: "flex", gap: "30px", padding: "20px" },
  card: { width: "350px", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "15px" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  file: { marginBottom: "10px" },
  button: { width: "100%", padding: "10px", background: "#2c3e50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  list: { flex: 1 },
  item: { border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px" },
  deleteBtn: { background: "red", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer", marginTop: "5px" },
};