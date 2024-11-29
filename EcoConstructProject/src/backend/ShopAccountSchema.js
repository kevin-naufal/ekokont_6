import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ShopAccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username toko wajib diisi.'],
    unique: true,
    trim: true,
    minlength: [3, 'Username harus memiliki minimal 3 karakter.'],
    match: [/^\w+$/, 'Username hanya boleh mengandung huruf, angka, dan garis bawah.'],
  },
  storeName: {
    type: String,
    required: [true, 'Nama toko wajib diisi.'],
    unique: true,
    trim: true,
    minlength: [3, 'Nama toko harus memiliki minimal 3 karakter.'],
  },
  email: {
    type: String,
    required: [true, 'Email toko wajib diisi.'],
    unique: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Harap masukkan alamat email yang valid.',
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Nomor telepon toko wajib diisi.'],
    trim: true,
    match: [/^\d{10,15}$/, 'Nomor telepon harus berupa angka dan panjangnya antara 10-15 digit.'],
  },
  address: {
    type: String,
    required: [true, 'Alamat toko wajib diisi.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password wajib diisi.'],
    minlength: [6, 'Password harus memiliki minimal 6 karakter.'],
  },
  accountStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password sebelum menyimpan data
ShopAccountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Metode untuk membandingkan password
ShopAccountSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Membuat model dan mengekspor dengan sintaks `export default`
const ShopAccount = mongoose.model("ShopAccount", ShopAccountSchema);
export default ShopAccount;
