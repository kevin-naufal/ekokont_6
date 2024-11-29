import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Product type is required"], // Contoh: 'Electronics', 'Furniture'
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be greater than or equal to 0"], // Validasi harga minimal
  },
  status: {
    type: String,
    required: [true, "Product status is required"], // Contoh: 'Available', 'Unavailable'
    enum: ["Available", "Unavailable"], // Validasi nilai status
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"], // Deskripsi produk
    trim: true,
  },
  image_url: {
    type: String,
    required: [true, "Image URL is required"], // URL gambar produk
    trim: true,
    match: [
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      "Please enter a valid URL for the image",
    ], // Validasi URL
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
