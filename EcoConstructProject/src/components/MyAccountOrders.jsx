import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import MyAccountSidebar from "./MyAccountSidebar";

// Fungsi untuk memformat harga
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Hilangkan desimal
  }).format(price);
};

const MyAccountOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const loginData = JSON.parse(localStorage.getItem("loginData"));
        const response = await axios.get(
          `http://localhost:4000/get-status-account/${loginData.user._id}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const groupedOrders = orders.reduce((groups, order) => {
    const group = order.group_id;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(order);
    return groups;
  }, {});

  const toggleGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.headerText}>My Account</h1>
        <div style={styles.accountSection}>
          <MyAccountSidebar />
          <div style={styles.mainContent}>
            <h2>Orders History</h2>
            {Object.entries(groupedOrders).map(([group, orders]) => {
              const isExpanded = expandedGroups[group];
              const totalPrice = orders.reduce(
                (sum, order) => sum + order.total_price,
                0
              );
              const displayedOrders = isExpanded ? orders.reverse() : [orders[0]];  // Membalik urutan
              const remainingProducts = orders.length - displayedOrders.length;

              return (
                <div key={group} style={styles.groupSection}>
                  <div style={styles.cardContainer}>
                    {displayedOrders.map((order, index) => (
                      <div key={index} style={styles.orderCard}>
                        <div style={styles.cardHeader}>
                          <h3 style={styles.productName}>
                            {order.product_name}
                          </h3>
                          <span style={styles.purchaseDate}>
                            {order.purchase_date}
                          </span>
                        </div>
                        {index === 0 && remainingProducts > 0 && (
                          <p style={styles.remainingText}>
                            +{remainingProducts} produk lainnya
                          </p>
                        )}
                        <p style={styles.description}>{order.description}</p>
                        <div style={styles.cardFooter}>
                          {index === 0 && (
                            <span
                              style={styles.textButton}
                              onClick={() => toggleGroup(group)}
                            >
                              {isExpanded ? "Hide All" : "View All"}
                            </span>
                          )}
                          <p style={styles.price}>
                            {isExpanded
                              ? formatPrice(order.total_price)
                              : formatPrice(totalPrice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    backgroundColor: "#F1E4CC",
    padding: "40px 150px",
    fontFamily: "Arial, sans-serif",
    flex: 1,
  },
  headerText: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  accountSection: {
    display: "flex",
    gap: "40px",
    alignItems: "flex-start",
  },
  mainContent: {
    flex: 3,
  },
  groupSection: {
    marginBottom: "30px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  orderCard: {
    flex: "1 1 calc(30% - 20px)",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "150px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  purchaseDate: {
    fontSize: "14px",
    color: "#888",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  textButton: {
    fontSize: "14px",
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
  remainingText: {
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
    marginBottom: "10px",
  },
};

export default MyAccountOrders;
