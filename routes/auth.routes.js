const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const TokenGenerator = require("../helpers/TokenGenerator");
const auth = require("../middleware/auth.middleware");
const router = Router();

// /api/auth
router.post(
  "/register",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must contain at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const canditate = await User.findOne({ email });

      if (canditate) {
        return res.status(400).json({ message: "The email is already taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "The User was created successfully" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "An error occured. Try again later" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").normalizeEmail().isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: config.get("jwtTokenLifeTime"),
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "An error occured. Try again later" });
    }
  }
);

router.post("/login/refresh", auth, (req, res) => {
  const token = req.token;

  const tokenGenerator = new TokenGenerator(
    config.get("jwtSecret"),
    config.get("jwtSecret"),
    { expiresIn: "1h" }
  );

  res.status(201).json({
    token: tokenGenerator.refresh(token, { jwtid: "2" }),
  });
});

module.exports = router;
