import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const SuccessfulPayment = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/product-display"); // Mengarahkan pengguna kembali ke halaman beranda
  };

  return (
    <div
      style={{
        backgroundColor: "#F1E4CC",
        color: "#4b5b3c",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Header />

      <div
        style={{
          padding: "40px 20px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "20px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Payment Successful
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Your payment has been successfully processed. Thank you for your purchase!
        </p>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleGoHome}
            style={{
              backgroundColor: "#4b5b3c",
              color: "#fff",
              fontSize: "18px",
              padding: "12px 25px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Go to Home
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SuccessfulPayment;
