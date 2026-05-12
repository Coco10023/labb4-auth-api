const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Registrera ny användare
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kontrollerar att alla fält finns
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Användarnamn, e-post och lösenord krävs."
      });
    }

    // Kontrollerar lösenordslängd
    if (password.length < 6) {
      return res.status(400).json({
        message: "Lösenordet måste vara minst 6 tecken."
      });
    }

    // Kollar om användaren redan finns
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Användarnamn eller e-post finns redan."
      });
    }

    // Hashar lösenordet innan det sparas
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapar användare
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "Användarkonto skapat."
    });
  } catch (error) {
    res.status(500).json({
      message: "Serverfel vid registrering.",
      error: error.message
    });
  }
});

// Logga in användare
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kontrollerar att fält finns
    if (!username || !password) {
      return res.status(400).json({
        message: "Användarnamn och lösenord krävs."
      });
    }

    // Hittar användaren i databasen
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Fel användarnamn eller lösenord."
      });
    }

    // Jämför lösenordet med det hashade lösenordet
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Fel användarnamn eller lösenord."
      });
    }

    // Skapar JWT
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Inloggning lyckades.",
      token: token
    });
  } catch (error) {
    res.status(500).json({
      message: "Serverfel vid inloggning.",
      error: error.message
    });
  }
});

module.exports = router;