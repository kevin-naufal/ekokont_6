import mongoose from "mongoose";

const TransactionListSchema = new mongoose.Schema({
  product_status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductStatus", // Referensi ke koleksi ProductStatus
    required: true,
  },
}, { timestamps: true }); // timestamps untuk createdAt dan updatedAt

const TransactionList = mongoose.model("TransactionList", TransactionListSchema);

export default TransactionList;
