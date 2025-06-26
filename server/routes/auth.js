const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User } = require("../models");

const router = express.Router();

// Email and password signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Email and password login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/dashboard");
});

// Facebook OAuth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/dashboard");
});

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/dashboard");
});

// Apple OAuth
router.get("/apple", passport.authenticate("apple"));
router.post("/apple/callback", passport.authenticate("apple", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/dashboard");
});

module.exports = router;