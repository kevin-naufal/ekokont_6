import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { prerelease } from "@mui/material";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { BuyNowItems, totalAmount } = state;

  const [cartItems, setCartItems] = useState([]);
  const [groupId, setGroupId] = useState(1); // Inisialisasi group_id

  const qrCodes = {
    Dana: "https://raw.githubusercontent.com/kevin-naufal/ekokont_6/refs/heads/main/EcoConstructProject/Images/QR%20Codes/Dana.jpg",
    Gopay: "https://raw.githubusercontent.com/kevin-naufal/ekokont_6/refs/heads/main/EcoConstructProject/Images/QR%20Codes/Gopay.jpg",
    ShopeePay: "https://github.com/kevin-naufal/ekokont_6/blob/main/EcoConstructProject/Images/QR%20Codes/ShopeePay.jpg?raw=true",
  };

  const paymentMethod = state?.paymentMethod || "Unknown";

  // Mengambil data cart dari localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  
    const storedGroupId = localStorage.getItem("groupId");
    if (storedGroupId) {
      setGroupId(Number(storedGroupId)); // Muat groupId terakhir
    }
  }, []);
  

  const handleConfirm = async () => {
    try {
      // Periksa apakah cart kosong
      if (BuyNowItems.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding.");
        return; // Hentikan proses jika cart kosong
      }
      let currentGroupId = groupId; // Gunakan variabel lokal untuk melacak nilai groupId
      
      const loginData = JSON.parse(localStorage.getItem('loginData'));
      const userId = loginData.user._id
      // Iterasi melalui cart dan kirim data ke server
      for (const item of BuyNowItems) {
        const total_price = item.price * item.quantity; // Hitung total harga untuk item
    
        const payload = {
          user_id: userId,
          product_id: item._id, // Ambil product_id dari item cart
          description: "Payment confirmed for this product.",
          purchase_date: new Date().toISOString().split("T")[0], // Tanggal pembelian
          group_id: currentGroupId, // Gunakan nilai groupId lokal
          total_price, // Total harga
        };
    
        // Menampilkan alert untuk setiap item yang diproses
        alert(
          `Processing payment for ${item.name} (Quantity: ${item.quantity}, Price: ${item.price}, Total Price: ${total_price}, Group ID: ${currentGroupId})`
        );
    
        // Mengirim data ke server
        await axios.post("http://localhost:4000/post-status", payload);
      }
    
      // Increment groupId secara manual
      const newGroupId = currentGroupId + 1;
      setGroupId(newGroupId); // Update *state* agar tetap sinkron
      localStorage.setItem("groupId", newGroupId); // Simpan nilai terbaru ke localStorage
  
      // Hapus cart dari localStorage setelah pembayaran berhasil
      localStorage.removeItem("cart");
      navigate("/successful-payment");
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Payment confirmation failed. Please try again.");
    }
  };  

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#F1E4CC",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#4b5b3c" }}>
        Scan the QR Code to Pay with {paymentMethod}
      </h1>
      {qrCodes[paymentMethod] ? (
        <img
          src={qrCodes[paymentMethod]}
          alt={`${paymentMethod} QR Code`}
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      ) : (
        <p style={{ color: "red" }}>Payment method not recognized!</p>
      )}
      <button
        onClick={handleConfirm}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4b5b3c",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
