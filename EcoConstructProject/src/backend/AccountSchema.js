import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Tipe referensi ID MongoDB
    ref: "User", // Mereferensikan skema User
    required: [true, "User ID is required"], // Pastikan userId selalu ada
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  displayName: {
    type: String,
    required: [true, "Display name is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"], // Validasi nomor telepon
  },
  birthDate: {
    type: Date,
    required: [true, "Birth date is required"], // Tanggal lahir wajib diisi
    validate: {
      validator: function (value) {
        return value < new Date(); // Pastikan tanggal lahir di masa lalu
      },
      message: "Birth date must be in the past",
    },
  },
  image: {
    type: String, // Menyimpan URL gambar atau GitHub
    validate: {
      validator: function (value) {
        // Validasi URL GitHub atau URL gambar
        const isGitHubURL = /^(https?:\/\/(?:www\.)?github\.com\/.*)$/i.test(value);
        const isImageURL = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(value);
        return !value || isGitHubURL || isImageURL;
      },
      message: "Please enter a valid image URL or a GitHub URL",
    },
  },
});

// Model untuk AccountSchema
const Account = mongoose.model("Account", AccountSchema);
export default Account;
