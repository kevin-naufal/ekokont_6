import mongoose from "mongoose";

const ProductStatusSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId, // Mengacu ke _id dalam koleksi Product
    required: [true, "Product ID is required"],
    ref: "Product", // Menghubungkan ke skema Product
  },
  description: {
    type: String,
    required: [true, "Description is required"], // Penjelasan tentang status
    trim: true,
  },
  purchase_date: {
    type: Date,
    required: [true, "Purchase date is required"], // Tanggal pembelian wajib diisi
    default: Date.now, // Atur nilai default ke tanggal saat ini
  },
  group_id: {
    type: Number, // Menambahkan field group_id sebagai pengelompokkan produk
    required: [true, "Group ID is required"], // Wajib untuk setiap produk status
    unique: true, // Setiap grup akan memiliki ID unik
  },
  total_price: {
    type: Number, // Menyimpan total harga dari produk
    required: [true, "Total price is required"], // Harga wajib diisi
    min: [0, "Total price must be at least 0"], // Validasi nilai minimum
  },
});

// Middleware untuk memastikan purchase_date hanya memiliki tahun, bulan, dan hari
ProductStatusSchema.pre("save", function (next) {
  if (this.purchase_date) {
    this.purchase_date = new Date(this.purchase_date.toISOString().split("T")[0]);
  }
  next();
});

const ProductStatus = mongoose.model("ProductStatus", ProductStatusSchema);
export default ProductStatus;
