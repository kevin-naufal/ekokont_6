import express from "express";
import mongoose from "mongoose";

import User from "../backend/UserSchema.js";
const app = express();

const PORT = 4000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  "mongodb+srv://kevin-naufal:ecoconstruct@ecoconstruct.ohznq.mongodb.net/EcoConstruct?retryWrites=true&w=majority&appName=EcoConstruct"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB EcoConstruct");
});

app.post("/addMahasiswa", async (req, res) => {
  const { name, npm, jurusan } = req.body;
  const user = new User({ name, npm, jurusan });
  try {
  await user.save();
  res.status(201)
  .json({ message: "Data Mahasiswa berhasil ditambahkan", data: user });
} catch (err) {
res.status(400).send(err);
}
});
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

  
