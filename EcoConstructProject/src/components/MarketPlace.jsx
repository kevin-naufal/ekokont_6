import React, { useState, useEffect } from "react";
import axios from "axios";

function MarketPlace() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    status: "",
    description: "",
    image: null,
  });
  const [uploadStatus, setUploadStatus] = useState("");

  // Fungsi untuk mengambil data produk dari API
  const fetchProducts = async () => {
    const shopId = localStorage.getItem("shopId"); // Mengambil shopId dari localStorage
    alert(shopId);

    if (!shopId) {
      console.error("Shop ID not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/products/shop/${shopId}` // Menggunakan shopId di endpoint
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Memanggil API GET saat komponen pertama kali dimuat
  }, []);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fungsi untuk menangani perubahan input file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      setUploadStatus(""); // Reset status jika ada file baru
    } else {
      setUploadStatus("Hanya file foto yang diperbolehkan.");
    }
  };

  // Fungsi untuk mengunggah file foto ke server
  const handleFileUpload = async () => {
    if (!formData.image) {
      setUploadStatus("Pilih file foto terlebih dahulu.");
      return null;
    }

    const uploadData = new FormData();
    uploadData.append("LOCAL_FILE", formData.image); // Sesuai dengan key di server
    uploadData.append("FILE_PATH", `uploads/${formData.image.name}`); // Tentukan path di GitHub

    try {
      const response = await axios.post("http://localhost:4000/upload-file", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("File berhasil diunggah.");
      return response.data.fileUrl; // Mengembalikan URL file di GitHub
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Terjadi kesalahan saat mengunggah file.");
      return null;
    }
  };

  // Fungsi untuk menangani pengiriman produk
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Upload file foto terlebih dahulu
    const imageUrl = await handleFileUpload();
    if (!imageUrl) return;

    const shopId = localStorage.getItem("shopId"); // Ambil shopId dari localStorage
    alert(shopId);

    // Kirim data produk ke server
    try {
      const response = await axios.post("http://localhost:4000/add-product", {
        name: formData.name,
        type: formData.type,
        price: formData.price,
        status: formData.status,
        description: formData.description,
        image_url: imageUrl, // Gunakan URL dari GitHub
        shop_id: shopId, // Tambahkan shop_id
      });

      setUploadStatus("Produk berhasil ditambahkan.");
      setFormData({
        name: "",
        type: "",
        price: "",
        status: "",
        description: "",
        image: null,
      });
      fetchProducts(); // Refresh data produk setelah menambahkan
    } catch (error) {
      console.error("Error adding product:", error);
      setUploadStatus("Terjadi kesalahan saat menambahkan produk.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#F7FAFC",
        minHeight: "100vh",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#2D3748",
          textAlign: "center",
        }}
      >
        Tambahkan Produk Baru
      </h2>

      {/* Form untuk menambahkan produk */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          name="type"
          placeholder="Tipe Produk"
          value={formData.type}
          onChange={handleInputChange}
          required
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Harga Produk"
          value={formData.price}
          onChange={handleInputChange}
          required
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          name="status"
          placeholder="Status Produk (Available/Out of Stock)"
          value={formData.status}
          onChange={handleInputChange}
          required
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />
        <textarea
          name="description"
          placeholder="Deskripsi Produk"
          value={formData.description}
          onChange={handleInputChange}
          required
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "block", marginBottom: "10px", padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#38A169",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Tambahkan Produk
        </button>
        {uploadStatus && (
          <p
            style={{
              marginTop: "10px",
              color: uploadStatus.includes("berhasil") ? "#38A169" : "#E53E3E",
            }}
          >
            {uploadStatus}
          </p>
        )}
      </form>

      {/* Tampilkan produk dengan area scroll */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          maxHeight: "500px",
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFFFFF",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #E2E8F0",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <h3
              style={{
                margin: "10px 0 5px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#2D3748",
              }}
            >
              {product.name}
            </h3>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#4A5568" }}>
              {product.type}
            </p>
            <p
              style={{
                margin: "5px 0",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#2F855A",
              }}
            >
              Rp{product.price.toLocaleString()}
            </p>
            <p
              style={{
                margin: "5px 0",
                fontSize: "14px",
                color: product.status === "Available" ? "#38A169" : "#E53E3E",
              }}
            >
              {product.status}
            </p>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#718096" }}>
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPlace;
