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
  const [editProductId, setEditProductId] = useState(null); // State untuk ID produk yang sedang diedit
  const [uploadStatus, setUploadStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  


  const fetchProducts = async () => {
    const shopId = localStorage.getItem("shopId");
    if (!shopId) {
      console.error("Shop ID not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/products/shop/${shopId}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      setUploadStatus("");
    } else {
      setUploadStatus("Hanya file foto yang diperbolehkan.");
    }
  };

  const handleFileUpload = async () => {
    if (!formData.image) return null;
    const uploadData = new FormData();
    uploadData.append("LOCAL_FILE", formData.image);
    uploadData.append("FILE_PATH", `uploads/${formData.image.name}`);
    try {
      const response = await axios.post("http://localhost:4000/upload-file", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageUrl = await handleFileUpload();
    if (editProductId) {
      // Update produk
      try {
        const response = await axios.put(
          `http://localhost:4000/update-product/${editProductId}`,
          {
            ...formData,
            image_url: imageUrl || formData.image_url, // Pertahankan URL jika tidak ada file baru
          }
        );
        setUploadStatus("Produk berhasil diperbarui.");
        setEditProductId(null); // Reset setelah selesai edit
      } catch (error) {
        console.error("Error updating product:", error);
        setUploadStatus("Terjadi kesalahan saat memperbarui produk.");
      }
    } else {
      // Tambahkan produk baru
      try {
        const shopId = localStorage.getItem("shopId");
        const response = await axios.post("http://localhost:4000/add-product", {
          ...formData,
          image_url: imageUrl,
          shop_id: shopId,
        });
        setUploadStatus("Produk berhasil ditambahkan.");
      } catch (error) {
        console.error("Error adding product:", error);
        setUploadStatus("Terjadi kesalahan saat menambahkan produk.");
      }
    }
    setFormData({
      name: "",
      type: "",
      price: "",
      status: "",
      description: "",
      image: null,
    });
    setShowForm(false);
    fetchProducts();
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditProductId(product._id); // Set ID produk yang sedang diedit
    setShowForm(true); // Tampilkan form
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/delete-product/${productId}`);
        fetchProducts();
        alert("Produk berhasil dihapus.");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Terjadi kesalahan saat menghapus produk.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#F7FAFC", minHeight: "100vh", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#2D3748", textAlign: "center" }}>
        Produk Kamu
      </h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setFormData({
              name: "",
              type: "",
              price: "",
              status: "",
              description: "",
              image: null,
            });
            setEditProductId(null);
            setShowForm(!showForm);
          }}
          style={{
            backgroundColor: "#38A169",
            color: "#FFFFFF",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {editProductId ? "Cancel Edit" : "Add Product"}
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
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
            {editProductId ? "Update Product" : "Tambahkan Produk"}
          </button>
          {uploadStatus && (
            <p style={{ marginTop: "10px", color: uploadStatus.includes("berhasil") ? "#38A169" : "#E53E3E" }}>
              {uploadStatus}
            </p>
          )}
        </form>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", maxHeight: "500px", overflowY: "auto", padding: "10px", border: "1px solid #E2E8F0", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", backgroundColor: "#FFFFFF" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #E2E8F0", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }}
            />
            <h3 style={{ margin: "10px 0 5px", fontSize: "18px", fontWeight: "bold", color: "#2D3748" }}>{product.name}</h3>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#4A5568" }}>{product.type}</p>
            <p style={{ margin: "5px 0", fontSize: "14px", fontWeight: "bold", color: "#2F855A" }}>Rp{product.price.toLocaleString()}</p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: product.status === "Available" ? "#38A169" : "#E53E3E" }}>{product.status}</p>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#718096" }}>{product.description}</p>
            <div style={{ marginTop: "10px", fontSize: "14px" }}>
              <span
                onClick={() => handleEditProduct(product)}
                style={{ cursor: "pointer", color: "#38A169", marginRight: "10px" }}
              >
                Edit
              </span>
              |
              <span
                onClick={() => handleDeleteProduct(product._id)}
                style={{ cursor: "pointer", color: "#E53E3E", marginLeft: "10px" }}
              >
                Delete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPlace;
