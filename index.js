const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🐾 PuppyShop backend is live!!!! Hurray!!!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error("❌ DB query failed:", err.message);
    res.status(500).send("Server error");
  }
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting user:", err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
