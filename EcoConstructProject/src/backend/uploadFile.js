import fs from "fs";
import axios from "axios";

const TOKEN = "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"; // Ganti dengan PAT Anda
const OWNER = "kevin-naufal"; // Ganti dengan username Anda
const REPO = "FotoBuatEcoConstruct"; // Ganti dengan nama repository Anda
const BRANCH = "main"; // Branch target
const FILE_PATH = "images/test.jpg"; // Path di repository
const LOCAL_FILE = "../../Images/search 02.png"; // Lokasi file di lokal

// Fungsi untuk upload atau update file
async function uploadFile() {
  try {
    // Baca file lokal
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

    console.log("File uploaded successfully:", response.data.content.html_url);

    // Ambil link dari file
    getFileLink(FILE_PATH);
  } catch (error) {
    console.error("Error uploading file:", error.response?.data || error.message);
  }
}

// Fungsi untuk mendapatkan link file
async function getFileLink(filePath) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const fileLink = response.data.download_url;
    console.log("File link:", fileLink);
  } catch (error) {
    console.error("Error fetching file link:", error.response?.data || error.message);
  }
}

// Jalankan fungsi upload
uploadFile();
