import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function CreateProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier; // Ambil nilai dari state
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName || !displayName || !phoneNumber || !birthDate) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/create-account/${identifier}`,
        {
          fullName,
          displayName,
          phoneNumber,
          birthDate,
        }
      );

      setSuccessMessage(`Profile created successfully: ${response.data.message}`);
      setTimeout(() => navigate("/login"), 2000); // Redirect setelah 2 detik
    } catch (error) {
      setErrorMessage(
        `Creation failed: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  return (
    <div
      className="create-profile-container"
      style={{ height: "100vh", display: "flex", position: "relative" }}
    >
      <img
        src="https://github.com/kevin-naufal/ekokont_6/blob/main/EcoConstructProject/Images/Login%20&%20Logout%20Background.jpg?raw=true"
        alt="Background"
        className="background-image"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
          zIndex: 1,
          height: "100%",
          width: "100%",
        }}
      />
      <div
        className="overlay"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>

      <div
        className="create-box"
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="form-wrapper" style={{ width: "100%" }}>
          <h2
            className="form-title"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#1F2937",
            }}
          >
            Create Profile
          </h2>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "16px" }}>{errorMessage}</div>
          )}

          {successMessage && (
            <div style={{ color: "green", marginBottom: "16px" }}>{successMessage}</div>
          )}

          <form onSubmit={handleCreate}>
            <div className="input-group" style={{ marginBottom: "16px" }}>
              <label
                htmlFor="fullName"
                style={{ display: "block", color: "#374151", marginBottom: "8px" }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                style={styles.input}
              />
            </div>

            <div className="input-group" style={{ marginBottom: "16px" }}>
              <label
                htmlFor="displayName"
                style={{ display: "block", color: "#374151", marginBottom: "8px" }}
              >
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                style={styles.input}
              />
            </div>

            <div className="input-group" style={{ marginBottom: "16px" }}>
              <label
                htmlFor="phoneNumber"
                style={{ display: "block", color: "#374151", marginBottom: "8px" }}
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                style={styles.input}
              />
            </div>

            <div className="input-group" style={{ marginBottom: "16px" }}>
              <label
                htmlFor="birthDate"
                style={{ display: "block", color: "#374151", marginBottom: "8px" }}
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #D1D5DB",
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default CreateProfile;
