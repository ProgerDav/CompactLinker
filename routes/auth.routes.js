const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { authenticate } = require("../helpers/AuthService");
const router = Router();

const auth = require("../middleware/auth.middleware");

// /api/auth
router.post(
  "/register",
  [
    check("name", "Tells us your name, don't be shy").exists(),
    check("lastName", "Please enter a valid last name").exists(),
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

      const { name, lastName, email, password } = req.body;

      const canditate = await User.findOne({ email });

      if (canditate) {
        return res.status(400).json({ message: "The email is already taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name,
        lastName,
        email,
        password: hashedPassword,
      });
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

      const user = await authenticate(email, password);
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      const credentials = Buffer.from(`${email}:${password}`).toString(
        "Base64"
      );

      res.json({ credentials });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "An error occured. Try again later. " + e.message });
    }
  }
);

router.get("/user", auth, async (req, res) => {
  try {
    const { user } = req;

    res.json(user);
  } catch (e) {}
});

module.exports = router;
