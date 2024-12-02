import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate(); // Hook untuk melakukan navigasi

  const handleConfirm = () => {
    // Melakukan navigasi ke halaman successful-payment
    navigate("/successful-payment");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Halo</p>
      <button
        onClick={handleConfirm} // Menambahkan event handler onClick
        style={{
          padding: "10px 20px",
          backgroundColor: "#4b5b3c",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Confirm
      </button>
    </div>
  );
};

export default Payment;
