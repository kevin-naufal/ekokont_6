import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"], // Contoh: 'Home', 'Office'
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"], // Nama penerima
    trim: true,
  },
  telephoneNumber: {
    type: String,
    required: [true, "Telephone number is required"],
    match: [/^\+?[0-9]{7,15}$/, "Please enter a valid telephone number"], // Validasi format nomor telepon
  },
  address: {
    type: String,
    required: [true, "Address is required"], // Alamat lengkap
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"], // Username for user identification
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Email of the user
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation regex
  },
});

const Address = mongoose.model("Address", AddressSchema);
export default Address;
