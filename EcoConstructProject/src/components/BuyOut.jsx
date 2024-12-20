import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const BuyOut = () => {
  const { state } = useLocation();
  const { cartItems: initialCartItems, totalAmount } = state;

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shipmentOption, setShipmentOption] = useState("");
  const [error, setError] = useState(null);
  const [grandTotal, setGrandTotal] = useState(totalAmount);

  const navigate = useNavigate();

  const identifier = JSON.parse(localStorage.getItem("loginData"))?.user?.username;

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

  // Recalculate grand total whenever cartItems or shipmentOption changes
  useEffect(() => {
    const shipmentPrice = shipmentOption
      ? parseInt(shipmentOption.split(" - Rp.")[1]?.replace(",", "") || 0)
      : 0;

    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setGrandTotal(newTotal + shipmentPrice);
  }, [cartItems, shipmentOption]);

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  // Handle shipment change
  const handleShipmentChange = (e) => {
    setShipmentOption(e.target.value);

    const [, shipmentPrice] = e.target.value.split(" - Rp.");
    const shipmentCost = shipmentPrice ? parseInt(shipmentPrice.replace(",", "")) : 0;

    setGrandTotal(totalAmount + shipmentCost);
  };

  const removeItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

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

    const [shipmentType, shipmentPrice] = shipmentOption.split(" - Rp.");
    const shipmentCost = shipmentPrice ? parseInt(shipmentPrice.replace(",", "")) : 0;

    alert(
      `Payment successful for ${cartItems.length} items.\n` +
        `Total: Rp.${grandTotal}\n` +
        `Delivery Address: ${selectedAddress}\n` +
        `Shipment Option: ${shipmentType}\n` +
        `Shipment Cost: Rp.${shipmentCost}\n` +
        `Payment Method: ${paymentMethod}`
    );

    const BuyNowItems = cartItems;
    navigate("/payment", { state: { paymentMethod, BuyNowItems } });
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
              {cartItems.map((item, index) => {
                const itemTotal = item.price * item.quantity;
                return (
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
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <p style={{ fontSize: "14px", color: "#888", marginRight: "10px" }}>
        Quantity:
      </p>
      <button
        onClick={() => decreaseQuantity(index)}
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#007BFF",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        - 
      </button>
      <span
        style={{
          fontSize: "14px",
          fontWeight: "500",
          padding: "5px 10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          textAlign: "center",
          minWidth: "30px",
        }}
      >
        {item.quantity}
      </span>
      <button
        onClick={() => increaseQuantity(index)}
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#007BFF",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        + 
      </button>
    </div>
    <button
      onClick={() => removeItem(index)}
      style={{
        backgroundColor: "#ff4d4f",
        color: "#fff",
        padding: "5px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "10px",
      }}
    >
      Remove
    </button>
  </div>
  <p style={{ fontSize: "15px", fontWeight: "600" }}>
    Rp.{(item.price * item.quantity).toLocaleString()}
  </p>
</div>
                );
              })}
            </div>

            <h3
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "30px",
              }}
            >
              Total: Rp.{grandTotal}
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
              onChange={handleShipmentChange}
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
              <option value="Standard (5-7 days) - Rp.20,000">Standard (5-7 days) - Rp.20,000</option>
              <option value="Express (2-3 days) - Rp.50,000">Express (2-3 days) - Rp.50,000</option>
              <option value="Same Day Delivery - Rp.100,000">Same Day Delivery - Rp.100,000</option>
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
    <option value="Gopay">Gopay</option>
    <option value="ShopeePay">ShopeePay</option>
    <option value="Dana">Dana</option>
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
