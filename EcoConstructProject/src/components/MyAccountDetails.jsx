import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import MyAccountSidebar from "./MyAccountSidebar";
import { MdEdit } from "react-icons/md";

// Fungsi untuk memformat harga
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Hilangkan desimal
  }).format(price);
};

const MyAccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Untuk mengatur mode edit
  const [editingField, setEditingField] = useState(""); // Field yang sedang diedit
  const [newValue, setNewValue] = useState(""); // Nilai baru yang ingin disubmit

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const loginData = JSON.parse(localStorage.getItem("loginData"));
        const response = await axios.get(
          `http://localhost:4000/get-account/${loginData.user._id}`
        );
        setAccountDetails({
          ...response.data.account, // Ambil data account
          email: response.data.email, // Ambil email dari respons
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching account details:", error);
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  const handleEditClick = (field) => {
    setIsEditing(true);
    setEditingField(field);
    setNewValue(accountDetails[field]); // Set nilai lama sebagai default
  };

  const handleInputChange = (e) => {
    setNewValue(e.target.value); // Update nilai yang sedang diedit
  };

  const handleBlur = async () => {
    try {
      const loginData = JSON.parse(localStorage.getItem("loginData"));
      const response = await axios.put(
        `http://localhost:4000/update-account/${loginData.user._id}`,
        {
          [editingField]: newValue, // Hanya kirim field yang diedit
        }
      );

      // Update state dengan data terbaru setelah perubahan berhasil
      setAccountDetails({
        ...accountDetails,
        [editingField]: newValue, // Update field yang diedit
      });

      setIsEditing(false); // Keluar dari mode edit
    } catch (error) {
      console.error("Error updating account:", error);
    }
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
            <h2>Account Details</h2>
            {accountDetails && (
              <div style={styles.detailsSection}>
                <div style={styles.cardContainer}>
                  <div style={styles.accountCard}>
                    <div style={styles.cardHeader}>
                      <h3 style={styles.infoTitle}>Full Name</h3>
                    </div>
                    <div style={styles.infoValueContainer}>
                      {isEditing && editingField === "fullName" ? (
                        <input
                          type="text"
                          value={newValue}
                          onChange={handleInputChange}
                          onBlur={handleBlur} // Trigger save on blur
                          style={styles.input}
                        />
                      ) : (
                        <p style={styles.infoValue}>{accountDetails.fullName}</p>
                      )}
                      <MdEdit
                        style={styles.editIcon}
                        onClick={() => handleEditClick("fullName")}
                      />
                    </div>

                    <div style={styles.cardHeader}>
                      <h3 style={styles.infoTitle}>Display Name</h3>
                    </div>
                    <div style={styles.infoValueContainer}>
                      {isEditing && editingField === "displayName" ? (
                        <input
                          type="text"
                          value={newValue}
                          onChange={handleInputChange}
                          onBlur={handleBlur} // Trigger save on blur
                          style={styles.input}
                        />
                      ) : (
                        <p style={styles.infoValue}>{accountDetails.displayName}</p>
                      )}
                      <MdEdit
                        style={styles.editIcon}
                        onClick={() => handleEditClick("displayName")}
                      />
                    </div>

                    <div style={styles.cardHeader}>
                      <h3 style={styles.infoTitle}>Phone</h3>
                    </div>
                    <div style={styles.infoValueContainer}>
                      {isEditing && editingField === "phoneNumber" ? (
                        <input
                          type="text"
                          value={newValue}
                          onChange={handleInputChange}
                          onBlur={handleBlur} // Trigger save on blur
                          style={styles.input}
                        />
                      ) : (
                        <p style={styles.infoValue}>{accountDetails.phoneNumber}</p>
                      )}
                      <MdEdit
                        style={styles.editIcon}
                        onClick={() => handleEditClick("phoneNumber")}
                      />
                    </div>

                    <div style={styles.cardHeader}>
                      <h3 style={styles.infoTitle}>Email</h3>
                    </div>
                    <div style={styles.infoValueContainer}>
                      {isEditing && editingField === "email" ? (
                        <input
                          type="email"
                          value={newValue}
                          onChange={handleInputChange}
                          onBlur={handleBlur} // Trigger save on blur
                          style={styles.input}
                        />
                      ) : (
                        <p style={styles.infoValue}>{accountDetails.email}</p>
                      )}
                      <MdEdit
                        style={styles.editIcon}
                        onClick={() => handleEditClick("email")}
                      />
                    </div>

                    <div style={styles.cardHeader}>
                      <h3 style={styles.infoTitle}>Birth Date</h3>
                    </div>
                    <div style={styles.infoValueContainer}>
                      {isEditing && editingField === "birthDate" ? (
                        <input
                          type="date"
                          value={newValue}
                          onChange={handleInputChange}
                          onBlur={handleBlur} // Trigger save on blur
                          style={styles.input}
                        />
                      ) : (
                        <p style={styles.infoValue}>
                          {new Date(accountDetails.birthDate).toLocaleDateString("id-ID")}
                        </p>
                      )}
                      <MdEdit
                        style={styles.editIcon}
                        onClick={() => handleEditClick("birthDate")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
  detailsSection: {
    marginBottom: "30px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  accountCard: {
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "5px",
  },
  infoTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  infoValueContainer: {
    display: "flex",
    justifyContent: "space-between", // Membuat info value dan ikon sebaris
    alignItems: "center",
  },
  infoValue: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
  },
  editIcon: {
    cursor: "pointer",
    color: "#888", // Warna abu-abu
  },
  input: {
    padding: "5px",
    fontSize: "16px",
    width: "70%",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
};

export default MyAccountDetails;
