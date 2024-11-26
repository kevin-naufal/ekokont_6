import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  displayName: {
    type: String,
    required: [true, "Display name is required"],
    unique: true, // Display name masih bisa unik, jika diinginkan
  },
  username: {
    type: String,
    sparse: true, // Masih memperbolehkan nilai null pada username
    validate: {
      validator: function (value) {
        // Validasi jika email tidak disediakan
        return this.email || value;
      },
      message: "Either username or email is required",
    },
  },
  email: {
    type: String,
    sparse: true, // Masih memperbolehkan nilai null pada email
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"], // Email validation regex
    validate: {
      validator: function (value) {
        // Validasi jika username tidak disediakan
        return this.username || value;
      },
      message: "Either username or email is required",
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Pilihan jenis kelamin
    required: true,
  },
  phoneNumber: {
    type: String,
    match: [/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"], // Validasi format nomor telepon
  },
  birthDate: {
    type: Date,
    required: true, // Tanggal lahir wajib diisi
    validate: {
      validator: function (value) {
        // Validasi untuk memastikan tanggal lahir di masa lalu
        return value < new Date();
      },
      message: "Birth date must be in the past",
    },
  },
});

const Account = mongoose.model("Account", AccountSchema);
export default Account;
