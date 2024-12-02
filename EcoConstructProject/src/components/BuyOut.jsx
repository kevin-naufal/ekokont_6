import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios"; // Pastikan axios sudah di-import

const BuyOut = () => {
  const { state } = useLocation();
  const { cartItems, totalAmount } = state;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shipmentOption, setShipmentOption] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Gantikan ID pengguna dengan informasi yang sesuai (misalnya username atau email)
  const identifier = JSON.parse(localStorage.getItem('loginData'))?.user?.username; // Sesuaikan ini dengan identifier pengguna yang aktif

  // Load addresses from API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/addresses/${identifier}`
        );
        setAddresses(response.data.addresses);
      } catch (err) {
        setError("Error fetching addresses: " + err.message);
      }
    };

    fetchAddresses();
  }, [identifier]);

  const handlePayment = () => {
    if (!selectedAddress) {
      alert("Please select an address for delivery.");
      return;
    }
    if (!shipmentOption) {
      alert("Please select a shipment option.");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    alert(
      `Payment successful for ${cartItems.length} items.\nTotal: Rp.${totalAmount}\nDelivery Address: ${selectedAddress}\nShipment Option: ${shipmentOption}\nPayment Method: ${paymentMethod}`
    );

    navigate("/payment");
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
          Finalize Your Payment
        </h1>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            No items selected for payment.
          </p>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginBottom: "20px",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <div style={{ marginLeft: "15px", flex: "1" }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#888" }}>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontSize: "18px", fontWeight: "600" }}>
                    Rp.{item.price}
                  </p>
                </div>
              ))}
            </div>

            <h3
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "30px",
              }}
            >
              Total: Rp.{totalAmount}
            </h3>

            {/* Address Selection */}
            <div style={{ marginBottom: "20px", width: "100%", maxWidth: "600px" }}>
              <label
                htmlFor="address"
                style={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                Select Address for Delivery:
              </label>
              <select
                id="address"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                style={{
                  fontSize: "16px",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              >
                <option value="" disabled>
                  -- Select an Address --
                </option>
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <option
                      key={index}
                      value={`${address.title} - ${address.address}`}
                    >
                      {address.title} - {address.address}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No addresses available
                  </option>
                )}
              </select>
            </div>

            {/* Shipment Option */}
            <div
              style={{
                marginBottom: "20px",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <label
                htmlFor="shipment"
                style={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                Select Shipment Option:
              </label>
              <select
                id="shipment"
                value={shipmentOption}
                onChange={(e) => setShipmentOption(e.target.value)}
                style={{
                  fontSize: "16px",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              >
                <option value="" disabled>
                  -- Select Shipment Option --
                </option>
                <option value="Standard (5-7 days)">Standard (5-7 days)</option>
                <option value="Express (2-3 days)">Express (2-3 days)</option>
                <option value="Same Day Delivery">Same Day Delivery</option>
              </select>
            </div>

            {/* Payment Method */}
            <div
              style={{
                marginBottom: "20px",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <label
                htmlFor="payment"
                style={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                Select Payment Method:
              </label>
              <select
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{
                  fontSize: "16px",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              >
                <option value="" disabled>
                  -- Select Payment Method --
                </option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            {/* Confirm Payment */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={handlePayment}
                style={{
                  backgroundColor: "#4b5b3c",
                  color: "#fff",
                  fontSize: "18px",
                  padding: "12px 25px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  width: "100%",
                  maxWidth: "200px",
                }}
              >
                Confirm Payment
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BuyOut;