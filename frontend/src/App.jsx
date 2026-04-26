

// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./fetures/auth/Login";
import Dashboard from "./fetures/admin/Dashboard";
import Adddetailpage from "./fetures/admin/Adddetailpage";
import Home from "./fetures/Home";
import Header from "./layout/Header";
// import Register from "./pages/Register";

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="adddetail" element={<Adddetailpage/>} />
        <Route path="/" element={<Home />} /> 
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;