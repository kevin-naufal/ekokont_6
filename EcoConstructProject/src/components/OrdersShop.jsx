import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersShop = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [actionType, setActionType] = useState(""); // "confirm" or "cancel"

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const shopId = localStorage.getItem("shopId");
      const response = await axios.get(`http://localhost:4000/get-status-shop/${shopId}`);
      
      // Filter pesanan yang memiliki deskripsi "The order has arrived at its destination." atau "Payment Rejected"
      const filteredOrders = response.data.filter(
        (order) =>
          order.description !== "The order has arrived at its destination." &&
          order.description !== "Payment Rejected"
      );

      setOrders(filteredOrders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAction = (orderId, type, groupId) => {
    setCurrentOrder({ orderId, groupId }); // Simpan orderId dan groupId dalam objek
    setActionType(type); // Simpan jenis aksi
    setShowModal(true); // Tampilkan modal
  };

  const confirmAction = async () => {
    try {
      const loginData = JSON.parse(localStorage.getItem("loginData"));
      const userId = loginData.user._id;
      const { groupId } = currentOrder;

      // Tentukan deskripsi berdasarkan tipe aksi
      const description =
        actionType === "confirm"
          ? "Payment Confirmed"
          : actionType === "confirmDelivery"
          ? "The order is on its way to the buyer."
          : actionType === "confirmArrival"
          ? "The order has arrived at its destination."
          : "Payment Rejected";

      const response = await axios.put(`http://localhost:4000/update-status/${userId}/${groupId}`, {
        description,
      });

      console.log(`${actionType} action processed:`, response.data);

      // Perbarui daftar orders setelah perubahan status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.status_id === currentOrder.orderId
            ? { ...order, description: response.data.updatedStatus.description }
            : order
        )
      );

      // Memanggil kembali data pesanan untuk menyembunyikan yang sudah selesai atau dibatalkan
      fetchOrders();

      // Menutup modal dan mereset status
      setShowModal(false);
      setCurrentOrder(null);
      setActionType("");
    } catch (err) {
      console.error("Error updating the status:", err);
      setError(err.response?.data?.error || "Failed to update order status.");
      setShowModal(false);
    }
  };

  const cancelAction = () => {
    setShowModal(false);
    setCurrentOrder(null);
    setActionType("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#F8F8F8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#4b5b3c" }}>Orders for Your Shop</h1>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders found for this shop.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {orders.map((order) => (
            <div
              key={order.status_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                width: "300px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ fontSize: "18px", color: "#4b5b3c" }}>{order.product_name}</h2>
              <p><strong>Description:</strong> {order.description}</p>
              <p><strong>Purchase Date:</strong> {order.purchase_date}</p>
              <p><strong>Group ID:</strong> {order.group_id}</p>
              <p><strong>Total Price:</strong> Rp{order.total_price.toLocaleString()}</p>
              <p><strong>Buyer:</strong> {order.user.username}</p>

              <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                {order.description === "The order is on its way to the buyer." ? (
                  <button
                    onClick={() => handleAction(order.status_id, "confirmArrival", order.group_id)}
                    style={{
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Confirm Arrival
                  </button>
                ) : order.description === "Payment Confirmed" ? (
                  <button
                    onClick={() => handleAction(order.status_id, "confirmDelivery", order.group_id)}
                    style={{
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Confirm Delivery
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleAction(order.status_id, "confirm", order.group_id)}
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleAction(order.status_id, "cancel", order.group_id)}
                      style={{
                        backgroundColor: "#F44336",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <p>Are you sure you want to {actionType} this order?</p>
            <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={confirmAction}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={cancelAction}
                style={{
                  backgroundColor: "#F44336",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersShop;
