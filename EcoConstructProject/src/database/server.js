import express from "express";
import mongoose from "mongoose";
import User from "../backend/UserSchema.js"; // Ensure this path points to your actual User schema file
import Account from "../backend/AccountSchema.js";
import Address from "../backend/AddressSchema.js"; // Pastikan path sesuai lokasi AddressSchema
import Product from "../backend/ProductSchema.js";
import ShopAccount from "../backend/ShopAccountSchema.js"; // Pastikan path sesuai lokasi ShopAccountSchema
import Buyer from "../backend/BuyerSchema.js";
import ProductStatus from "../backend/ProductStatusSchema.js";
import bcrypt from 'bcrypt'; // Add this line at the top of your file
import cors from "cors"; // Import CORS
import axios from "axios"; // Import Axios for making HTTP requests to GitHub
import bodyParser from "body-parser"; // Import bodyParser
import dotenv from "dotenv"; // Import dotenv for .env variables
import multer from "multer"; // Untuk menangani upload file
import fs from "fs";




dotenv.config(); // Initialize dotenv to load environment variables

const app = express();
const PORT = 4000;

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "kevin-naufal"; // Ganti dengan username GitHub Anda
const REPO = "FotoBuatEcoConstruct"; // Ganti dengan nama repository Anda
const BRANCH = "main"; // Branch target
const upload = multer({ dest: "uploads/" }); // Temp folder untuk file yang diupload

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" })); // Batas 10MB
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://kevin-naufal:ecoconstruct@ecoconstruct.ohznq.mongodb.net/EcoConstruct?retryWrites=true&w=majority&appName=EcoConstruct",
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB EcoConstruct");
});

/**********************************Account**********************************************/
// Route untuk mengupdate data pengguna berdasarkan identifier (username/email)
app.put("/update-user/:identifier", async (req, res) => {
  const { identifier } = req.params;
  const { firstName, lastName, displayName, gender, phoneNumber, birthDate } = req.body;

  console.log("Identifier received:", identifier);
  console.log("Request body:", { firstName, lastName, displayName, gender, phoneNumber, birthDate });

  // Ensure required fields are present
  if (!firstName || !lastName || !displayName || !gender || !birthDate) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  try {
    // Search for the user by identifier
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure email and username are included in updatedData
    const updatedData = {
      firstName,
      lastName,
      displayName,
      gender,
      phoneNumber,
      birthDate: new Date(birthDate), // Ensure date format is correct
      email: user.email, // Add email from the User document
      username: user.username, // Add username from the User document
    };

    // Update or create the account if it doesn't exist
    const account = await Account.findOneAndUpdate(
      { $or: [{ username: identifier }, { email: identifier }] },
      { $set: updatedData },
      {
        new: true,    // Return the updated or newly created document
        upsert: true, // Create the document if it does not exist
      }
    );

    res.status(200).json({
      message: "User details updated successfully",
      account,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
});


// Route untuk mendapatkan data pengguna berdasarkan identifier (username/email)
app.get("/get-user/:identifier", async (req, res) => {
  const { identifier } = req.params;

  try {
    // Cari pengguna berdasarkan identifier (username atau email)
    const user = await Account.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with all required fields
    res.status(200).json({
      message: "User details retrieved successfully",
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      gender: user.gender,
      email: user.email,
      phoneNumber: user.phoneNumber || null, // Optional field
      birthDate: user.birthDate ? user.birthDate.toISOString().split("T")[0] : null, // Format date as YYYY-MM-DD
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

// Route untuk mendapatkan semua pengguna
app.get("/get-account", async (req, res) => {
  try {
    // Cari semua pengguna di collection Account
    const users = await Account.find({}, {
      firstName: 1,
      lastName: 1,
      displayName: 1,
      gender: 1,
      email: 1,
      phoneNumber: 1,
      birthDate: 1,
      _id: 0, // Opsional: tidak menyertakan field _id
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Respond dengan daftar pengguna
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
});




/**********************************Account**********************************************/


/********************************USER********************************************/

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

// Route for fetching a specific user by identifier
app.get("/users/:identifier", async (req, res) => {
  const { identifier } = req.params;

  try {
    // Search for the user by username or email
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Error retrieving user", error });
  }
});




// Route for checking if the user is logged in using a GET request with URL parameter
app.get("/check-login/:identifier", async (req, res) => {
  const { identifier } = req.params;

  console.log("Identifier received:", identifier);

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

app.post("/buyer", async (req, res) => {
  const { userId, productId } = req.body; // Mengambil userId dan productId dari body request

  if (!userId || !productId) {
    return res.status(400).json({
      message: "UserId and ProductId are required",
    });
  }

  try {
    // Validasi apakah userId dan productId ada di database
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: productId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Membuat entri baru untuk pembelian
    const newBuyer = new Buyer({
      user_id: userId, // ID Pengguna
      product_id: productId, // ID Produk yang dibeli
    });

    // Menyimpan pembelian ke dalam database
    await newBuyer.save();

    res.status(201).json({
      message: "Buyer added successfully",
      buyer: newBuyer,
    });
  } catch (error) {
    console.error("Error adding buyer:", error);
    res.status(500).json({
      message: "Error adding buyer",
      error: error.message,
    });
  }
});





/********************************USER********************************************/


/********************************Address********************************************/
// Route untuk menambahkan atau memperbarui alamat terkait pengguna
app.post("/add-address/:identifier", async (req, res) => {
  const { identifier } = req.params;
  const { title, name, telephoneNumber, address } = req.body;

  // Validasi input
  if (!title || !name || !telephoneNumber || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Cari pengguna berdasarkan identifier
    const user = await Account.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Buat alamat baru terkait pengguna
    const newAddress = new Address({
      title,
      name,
      telephoneNumber,
      address,
      username: user.username, // Menambahkan username pengguna
      email: user.email,       // Menambahkan email pengguna
    });

    // Simpan alamat baru ke database
    await newAddress.save();

    res.status(201).json({
      message: "Address successfully added",
      address: newAddress,
    });
  } catch (error) {
    console.error("Error adding new address:", error);
    res.status(500).json({ message: "Error adding new address", error: error.message });
  }
});

app.put("/update-address/:id", async (req, res) => {
  const { id } = req.params;
  const { title, name, telephoneNumber, address } = req.body;

  // Validasi input
  if (!title || !name || !telephoneNumber || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Cari dan perbarui alamat berdasarkan _id
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { title, name, telephoneNumber, address },
      { new: true } // Mengembalikan dokumen yang diperbarui
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found." });
    }

    res.status(200).json({
      message: "Address successfully updated",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Error updating address", error: error.message });
  }
});



app.get("/addresses/:identifier", async (req, res) => {
  const { identifier } = req.params;

  try {
    // Cari pengguna berdasarkan identifier (username atau email)
    const user = await Account.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Cari alamat-alamat terkait pengguna
    const addresses = await Address.find({
      username: user.username, // Assuming the Address schema stores username
      email: user.email,       // Assuming the Address schema stores email
    });

    // Jika tidak ada alamat ditemukan
    if (addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found." });
    }

    // Mengembalikan data alamat bersama username, email, dan _id
    const result = addresses.map((address) => ({
      _id: address._id, // Include _id in the response
      title: address.title,
      name: address.name,
      telephoneNumber: address.telephoneNumber,
      address: address.address,
      username: user.username,
      email: user.email,
    }));

    res.status(200).json({
      message: "Addresses fetched successfully",
      addresses: result,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Error fetching addresses", error: error.message });
  }
});

app.delete('/delete-address/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Address to delete: ${id}`); // Log the ID to the console
    await Address.findByIdAndDelete(id);
    res.status(200).send({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error(`Error deleting address with ID ${req.params.id}:`, error); // Log error details
    res.status(500).send({ message: 'Failed to delete address' });
  }
});

/********************************Address********************************************/

/********************************Product********************************************/
// Route untuk menambahkan produk baru
app.post("/add-product", async (req, res) => {
  const { name, type, price, status, description, image_url, shop_id} = req.body;

  // Log semua variabel
  console.log("Received input:");
  console.log("Name:", name);
  console.log("Type:", type);
  console.log("Price:", price);
  console.log("Status:", status);
  console.log("Description:", description);
  console.log("Image URL:", image_url);
  console.log("User ID:", shop_id);

  // Validasi input
  if (
    !name ||
    !type ||
    price === undefined ||
    !status ||
    !description ||
    !image_url ||
    !shop_id
  ) {
    console.log("Validation failed: Missing required fields.");
    return res.status(400).json({ message: "All fields are required, including user_id." });
  }

  try {
    // Buat produk baru
    const newProduct = new Product({
      name,
      type,
      price,
      status,
      description,
      image_url,
      shop_id, // Tambahkan user_id
    });

    // Simpan produk ke database
    await newProduct.save();

    // Log keberhasilan
    console.log("Product successfully added:", newProduct);

    res.status(201).json({
      message: "Product successfully added",
      product: newProduct,
    });
  } catch (error) {
    // Log kegagalan
    console.error("Error adding product:", error);

    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});




app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Mengambil semua produk dari database
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params; // Mengambil id dari parameter URL
  try {
    const product = await Product.findById(id); // Mencari produk berdasarkan ID
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
});


app.get("/products/shop/:shopId", async (req, res) => {
  const { shopId } = req.params; // Mengambil shopId dari parameter URL

  try {
    const products = await Product.find({ shop_id: shopId }); // Mencari produk berdasarkan shop_id

    if (products.length === 0) {
      return res.status(404).json({
        message: `No products found for shop ID: ${shopId}`,
      });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products for shop:", error);
    res.status(500).json({
      message: "Error fetching products for shop",
      error: error.message,
    });
  }
});


/********************************Product********************************************/

/********************************Shop Account********************************************/
app.post("/add-shop-account", async (req, res) => {
  const { username, storeName, email, phoneNumber, address, password } = req.body;

  // Validasi input
  if (!username || !storeName || !email || !phoneNumber || !address || !password) {
    console.error("Validation failed: Missing fields", {
      username: username || "Missing",
      storeName: storeName || "Missing",
      email: email || "Missing",
      phoneNumber: phoneNumber || "Missing",
      address: address || "Missing",
      password: password || "Missing",
    });
    return res.status(400).json({
      message: "All fields (username, storeName, email, phoneNumber, address, password) are required.",
    });
  }

  try {
    // Cek apakah username, nama toko, atau email sudah digunakan
    const existingShop = await ShopAccount.findOne({
      $or: [
        { username: username.trim() },
        { storeName: storeName.trim() },
        { email: email.trim() },
      ],
    });

    if (existingShop) {
      let conflictField = '';
      if (existingShop.username === username.trim()) conflictField = 'username';
      else if (existingShop.storeName === storeName.trim()) conflictField = 'store name';
      else conflictField = 'email';

      console.error(`Conflict: ${conflictField} already in use`, {
        username,
        storeName,
        email,
      });

      return res.status(409).json({
        message: `The ${conflictField} is already in use.`,
      });
    }

    // Buat akun toko baru
    const newShopAccount = new ShopAccount({
      username: username.trim(),
      storeName: storeName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      password, // Password akan di-hash oleh middleware schema
    });

    await newShopAccount.save();

    const { password: _, ...shopAccountData } = newShopAccount.toObject();

    console.log("New shop account created successfully:", shopAccountData);

    res.status(201).json({
      message: "Shop account successfully created",
      shopAccount: shopAccountData,
    });
  } catch (error) {
    console.error("Error creating shop account:", error.message, error.stack);
    res.status(500).json({
      message: "An error occurred while creating the shop account.",
      error: error.message,
    });
  }
});

// Get all Shop Accounts
app.get("/get-shop-accounts", async (req, res) => {
  try {
    // Retrieve all shop accounts from the database
    const shopAccounts = await ShopAccount.find();

    if (!shopAccounts || shopAccounts.length === 0) {
      return res.status(404).json({
        message: "No shop accounts found.",
      });
    }

    // Remove the password field from the response for security
    const shopAccountsData = shopAccounts.map(({ password, ...account }) => account);

    console.log("All shop accounts retrieved successfully:", shopAccountsData);

    res.status(200).json({
      message: "All shop accounts retrieved successfully.",
      shopAccounts: shopAccountsData,
    });
  } catch (error) {
    console.error("Error retrieving all shop accounts:", error.message, error.stack);
    res.status(500).json({
      message: "An error occurred while retrieving the shop accounts.",
      error: error.message,
    });
  }
});

app.post("/login-shop", async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required.",
    });
  }

  try {
    // Mencari akun toko berdasarkan username
    const shopAccount = await ShopAccount.findOne({ username });

    if (!shopAccount) {
      return res.status(404).json({
        message: "Shop account not found.",
      });
    }

    // Membandingkan password yang diterima dengan password yang terenkripsi
    const isMatch = await bcrypt.compare(password, shopAccount.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password.",
      });
    }

    // Jika login berhasil, kirimkan respon
    console.log(`Shop account login successful: username=${shopAccount.username}, id=${shopAccount._id}`);

    res.status(200).json({
      message: "Login successful.",
      shopAccount: {
        id: shopAccount._id,
        username: shopAccount.username,
        email: shopAccount.email,
        // tambahkan data yang relevan lainnya
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message, error.stack);
    res.status(500).json({
      message: "An error occurred during login.",
      error: error.message,
    });
  }
});


/********************************Shop Account********************************************/
// Route untuk upload file ke GitHub
app.post("/upload-file", upload.single("LOCAL_FILE"), async (req, res) => {
  const { FILE_PATH } = req.body; // Ambil FILE_PATH dari body
  const LOCAL_FILE = req.file.path; // Ambil path file yang diupload melalui multer

  console.log("TOKEN:", TOKEN ? "Exists" : "Not set");
  console.log("FILE_PATH:", FILE_PATH);
  console.log("LOCAL_FILE:", LOCAL_FILE);

  if (!FILE_PATH || !LOCAL_FILE) {
    return res.status(400).json({ message: "FILE_PATH and LOCAL_FILE are required." });
  }

  try {
    // Baca file yang diupload dan encode ke base64
    const fileContent = fs.readFileSync(LOCAL_FILE, { encoding: "base64" });

    // Cek apakah file sudah ada di repository
    let sha = null;
    try {
      const getFileResponse = await axios.get(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      sha = getFileResponse.data.sha; // Ambil sha jika file sudah ada
    } catch (error) {
      if (error.response?.status !== 404) {
        throw new Error("Error checking file existence: " + error.message);
      }
      // File belum ada, lanjutkan untuk membuat file baru
    }

    // Siapkan request body
    const requestBody = {
      message: sha ? "Update file via API" : "Upload file via API", // Pesan commit
      content: fileContent,
      branch: BRANCH,
      ...(sha && { sha }), // Sertakan sha jika file sudah ada
    };

    // Kirim request ke GitHub API
    const response = await axios.put(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Hapus file dari server setelah upload selesai
    fs.unlinkSync(LOCAL_FILE);

    // Ubah html_url menjadi raw_url
    const rawUrl = response.data.content.html_url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/");

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: rawUrl, // URL raw file
    });
    console.log("File successfully uploaded. Raw URL:", rawUrl);
  } catch (error) {
    console.error("Error uploading file:", error.response?.data || error.message);
    res.status(500).json({ message: "Error uploading file", error });
  }
});


/********************************ProductStatus**************************************/

app.post("/post-status", async (req, res) => {
  try {
    const { user_id, product_id, description, purchase_date, group_id, total_price } = req.body;

    // Validasi input
    if (!user_id || !product_id || !description || !purchase_date || !group_id || total_price === undefined) {
      console.log("Missing fields:", { user_id, product_id, description, purchase_date, group_id, total_price });
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validasi user_id
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validasi group_id harus berupa angka dan >= 1
    if (typeof group_id !== "number" || group_id < 1) {
      return res.status(400).json({ error: "group_id must be a valid number greater than 0" });
    }

    // Log input untuk memastikan semua data terpenuhi
    console.log("Received data:", { user_id, product_id, description, purchase_date, group_id, total_price });

    // Validasi format tanggal pembelian
    const validDate = new Date(purchase_date);
    if (isNaN(validDate.getTime())) {
      return res.status(400).json({ error: "Invalid purchase date" });
    }

    // Cek apakah produk ada di koleksi Product
    const product = await Product.findById(product_id).populate({
      path: "shop_id", // Populate shop_id untuk mendapatkan data toko
      select: "storeName", // Hanya ambil storeName dari ShopAccount
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Log nama toko
    if (product.shop_id) {
      console.log("Shop name:", product.shop_id.storeName);
    } else {
      console.log("Shop information not available.");
    }

    // Format tanggal pembelian
    const formattedDate = new Date(validDate.toISOString().split("T")[0]);

    // Simpan status baru dengan total_price
    const newStatus = new ProductStatus({
      user_id, // Tambahkan user_id ke status baru
      product_id,
      description,
      purchase_date: formattedDate,
      group_id, // Menambahkan group_id
      total_price, // Menambahkan total_price
    });

    await newStatus.save();

    // Populate nama produk dan nama toko
    const populatedStatus = await ProductStatus.findById(newStatus._id).populate({
      path: "product_id",
      populate: {
        path: "shop_id", // Populate shop_id untuk mendapatkan storeName
        select: "storeName", // Hanya ambil nama toko
      },
      select: "name shop_id", // Ambil name dan shop_id dari Product
    });

    res.status(201).json({
      _id: populatedStatus._id,
      user_id: user_id, // Tambahkan user_id dalam respons
      product_name: populatedStatus.product_id.name, // Ambil nama produk
      store_name: populatedStatus.product_id.shop_id.storeName, // Ambil nama toko
      description: populatedStatus.description,
      purchase_date: populatedStatus.purchase_date.toISOString().split("T")[0], // Format YYYY-MM-DD
      group_id: populatedStatus.group_id, // Mengembalikan group_id
      total_price: populatedStatus.total_price, // Mengembalikan total_price
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: error.message });
  }
});





// READ: Ambil semua status produk
app.get("/get-status", async (req, res) => {
  try {
    const statuses = await ProductStatus.find()
      .populate({
        path: "product_id",
        populate: {
          path: "shop_id", // Pastikan juga populate nama toko
          select: "storeName",
        },
        select: "name shop_id", // Pastikan juga nama produk diambil
      });


    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// READ: Ambil status produk berdasarkan ID
app.get("/get-status/:id", async (req, res) => {
  try {
    const status = await ProductStatus.findById(req.params.id).populate("product_id");
    if (!status) {
      return res.status(404).json({ error: "Product status not found" });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Ambil status produk berdasarkan ID user
app.get("/get-status-account/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Validasi format ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Cari user berdasarkan ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cari semua status produk terkait user
    const productStatuses = await ProductStatus.find({ user_id: userId })
      .populate({
        path: "product_id",
        populate: {
          path: "shop_id", // Populate untuk data toko
          select: "storeName", // Ambil nama toko saja
        },
        select: "name shop_id price", // Ambil nama produk, toko, dan harga
      })
      .select("-__v"); // Hilangkan versi internal

    if (productStatuses.length === 0) {
      return res.status(404).json({ error: "No product statuses found for this user" });
    }

    // Kirimkan data status produk dengan format yang lebih rapi
    const response = productStatuses.map((status) => ({
      status_id: status._id,
      product_name: status.product_id?.name || "Unknown",
      store_name: status.product_id?.shop_id?.storeName || "Unknown",
      total_price: status.total_price,
      description: status.description,
      purchase_date: status.purchase_date.toISOString().split("T")[0],
      group_id: status.group_id,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in /get-status-account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

