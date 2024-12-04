import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Assuming you have a Header component
import Footer from "./Footer"; // Assuming you have a Footer component

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart data from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  // Handle item selection/deselection
  const handleSelectItem = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].selected = !updatedCart[index].selected;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total amount for selected items
const totalAmount = cart
  .filter((item) => item.selected)
  .reduce((total, item) => total + item.price * item.quantity, 0);


  // Handle payment for selected items
  const handlePayment = () => {
    const selectedItems = cart.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed to payment.");
      return;
    }

    // Save selected items to localStorage
    localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));

    // Show alert with the selected items
    const itemNames = selectedItems.map((item) => item.name).join(", ");
    alert(`Items saved for payment: ${itemNames}`);

    // Navigate to payment page
    navigate("/buyout", { state: { cartItems: selectedItems, totalAmount } });
  };

  return (
    <div
      style={{
        backgroundColor: "#F1E4CC",
        color: "#4b5b3c",
        fontFamily: "'Arial', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Include Header */}
      <Header />

      <div style={{ padding: "40px", flex: 1 }}>
        <h1 style={{ textAlign: "center", fontSize: "36px", marginBottom: "30px" }}>
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Your cart is empty.
          </p>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {cart.map((item, index) => (
  <div
    key={index}
    style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      transition: "transform 0.3s ease",
    }}
  >
    <img
      src={item.image_url} // Ensure this path is correct
      alt={item.name}
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "15px",
      }}
    />
    <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>{item.name}</h3>
    <p style={{ fontSize: "16px", marginBottom: "10px" }}>
      Rp.{item.price} (per unit)
    </p>
    <p style={{ fontSize: "14px", marginBottom: "10px" }}>
      Quantity: {item.quantity}
    </p>
    <p style={{ fontSize: "16px", marginBottom: "10px" }}>
      Total Price: Rp.{item.price * item.quantity}
    </p>

    {/* Add Select button */}
    <button
      onClick={() => handleSelectItem(index)}
      style={{
        backgroundColor: item.selected ? "#4b5b3c" : "#ccc",
        color: "#fff",
        fontSize: "14px",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "10px",
        transition: "background-color 0.3s ease",
      }}
    >
      {item.selected ? "Selected" : "Select"}
    </button>

    {/* Add Remove button */}
    <button
      onClick={() => handleRemoveItem(index)}
      style={{
        backgroundColor: "#d9534f",
        color: "#fff",
        fontSize: "14px",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        margin: "10px",
        transition: "background-color 0.3s ease",
      }}
    >
      Remove
    </button>
  </div>
))}

            </div>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                Total: Rp.{totalAmount}
              </h3>
              <button
                onClick={handlePayment}
                style={{
                  backgroundColor: "#4b5b3c",
                  color: "#fff",
                  fontSize: "18px",
                  padding: "15px 30px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  marginTop: "20px",
                  width: "200px",
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>

      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default Cart;
