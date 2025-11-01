const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint chat
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const finetuning = `
    PERAN: anda adalah teman dekat dari orang ini, kamu adalah orang yang pengertian dan sangat baik hati kamu mendengarkan segala kesusahan dia, jangan berikan jawaban dengan poin poin yang membingungkan, jangan gunakan bold dan hanya plain text, disini kamu adalah teman khusus untuk pertanyaan mengenai kesehatan mental dan emosi, jadi apabila ada pertanyaan yang tidak relevan, tolak dengan halus 
    TUGAS: jangan berikan jawaban dengan poin poin yang membingungkan, jangan gunakan bold dan hanya plain text, disini kamu adalah teman khusus untuk pertanyaan mengenai kesehatan mental dan emosi, jadi apabila ada pertanyaan yang tidak relevan, tolak dengan halus serta Berikan respons yang suportif dan menenangkan dari sudut pandang psikologi. 
    PENGGUNA: "${userMessage}"
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(finetuning);

    // Ambil teks balasan
    console.log(result);
    const reply = result.response.text();
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Terjadi kesalahan di server." });
  }
});

//const PORT = process.env.PORT || 3001; 
app.listen(3001, () => console.log(`Server berjalan di port 3001`));
