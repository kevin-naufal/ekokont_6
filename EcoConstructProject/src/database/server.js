import express from "express";
import mongoose from "mongoose";
import User from "../backend/UserSchema.js"; // Ensure this path points to your actual User schema file
import bcrypt from 'bcrypt'; // Add this line at the top of your file
import cors from "cors"; // Import CORS

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://kevin-naufal:ecoconstruct@ecoconstruct.ohznq.mongodb.net/EcoConstruct?retryWrites=true&w=majority&appName=EcoConstruct",
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB EcoConstruct");
});

// Route for creating a new user
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newUser = new User({ username, email, password });

  try {
    await newUser.save();
    res.status(201).json({ message: "User successfully created", user: newUser });
  } catch (error) {
    console.error("Signup error:", error); // Log the error for debugging
    res.status(400).json({ message: "Error creating user", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Update loggedIn to true
    user.loggedIn = true;
    await user.save();

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});


// Route for fetching all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});

// Route for checking if the user is logged in using a GET request with URL parameter
app.get("/check-login/:identifier", async (req, res) => {
  const { identifier } = req.params;

  if (!identifier) {
    return res.status(400).json({ message: "Identifier is required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.loggedIn) {
      return res.status(200).json({ message: "User is logged in", user });
    } else {
      return res.status(200).json({ message: "User is not logged in" });
    }
  } catch (error) {
    console.error("Check login error:", error);
    res.status(500).json({ message: "Error checking login status", error: error.message });
  }
});


