import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true, // Ensure the username is unique
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure the email is unique
    match: [/\S+@\S+\.\S+/, "Email is invalid"], // Simple email validation
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

// Hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Add a method to compare passwords for login
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
