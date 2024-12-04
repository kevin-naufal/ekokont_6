import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios untuk mengambil data dari API
import Header from "./Header"; // Sesuaikan dengan path yang benar
import Footer from "./Footer"; // Sesuaikan dengan path yang benar
import MyAccountSidebar from "./MyAccountSidebar"; // Import komponen sidebar

const MyAccountOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/get-status"); // Panggil endpoint API
        setOrders(response.data); // Simpan data dalam state orders
        setLoading(false); // Set loading ke false setelah data diambil
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false); // Set loading ke false jika ada error
      }
    };

    fetchOrders();
  }, []); // useEffect hanya berjalan sekali saat komponen dimuat

  // Kelompokkan data berdasarkan group_id
  const groupedOrders = orders.reduce((groups, order) => {
    const group = order.group_id; // Gunakan group_id untuk pengelompokkan
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(order);
    return groups;
  }, {});

  // Jika masih dalam proses loading, tampilkan loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.headerText}>My Account</h1>
        <div style={styles.accountSection}>
          {/* Sidebar */}
          <MyAccountSidebar />

          {/* Main Content */}
          <div style={styles.mainContent}>
            <h2>Orders History</h2>
            {Object.entries(groupedOrders).map(([group, orders]) => (
              <div key={group}>
                {/* Hilangkan teks besar 'Group' */}
                <div style={styles.tableWrapper}>
                  <table style={styles.ordersTable}>
                    <thead>
                      <tr style={styles.tableHeader}>
                        <th style={styles.tableData}>Product Name</th>
                        <th style={styles.tableData}>Purchase Date</th>
                        <th style={styles.tableData}>Description</th>
                        <th style={styles.tableData}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index} style={styles.tableRow}>
                          <td style={styles.tableData}>{order.product_name}</td>
                          <td style={styles.tableData}>{order.purchase_date}</td>
                          <td style={styles.tableData}>{order.description}</td>
                          <td style={styles.tableData}>{order.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
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
    flex: "3",
  },
  tableWrapper: {
    overflowX: "auto", // Menambahkan overflow-x untuk scroll horizontal
    marginTop: "20px",
  },
  ordersTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#f4f0eb",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#333",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    borderBottom: "1px solid #ccc",
  },
  tableData: {
    padding: "15px",
    textAlign: "center",
    fontSize: "16px",
  },
  groupHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "40px",
    textAlign: "left",
  },
};

export default MyAccountOrders;
