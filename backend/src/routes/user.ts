import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash });
    res.json({ username: user.username, cookies: user.cookies });
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !user.password) return res.status(400).json({ error: "User not found" });
  const valid = await bcrypt.compare(password, String(user.password));
  if (!valid) return res.status(400).json({ error: "Invalid password" });
  res.json({ username: user.username, cookies: user.cookies });
});

// Get cookies
router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ cookies: user.cookies });
});

// Update cookies
router.post("/:username/cookies", async (req, res) => {
  const { cookies } = req.body;
  const user = await User.findOneAndUpdate(
    { username: req.params.username },
    { cookies },
    { new: true }
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ cookies: user.cookies });
});

export default router;