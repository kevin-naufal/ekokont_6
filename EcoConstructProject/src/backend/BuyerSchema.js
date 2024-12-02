import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Mengacu pada ID user
    required: [true, "User ID is required"],
    ref: "User", // Referensi ke skema User
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId, // Mengacu pada ID produk
    required: [true, "Product ID is required"],
    ref: "Product", // Referensi ke skema Product
  },
});

const Buyer = mongoose.model("Buyer", BuyerSchema);
export default Buyer;
