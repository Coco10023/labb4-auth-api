const mongoose = require("mongoose");

// Schema beskriver hur användaren ska se ut i databasen
const userSchema = new mongoose.Schema({
  
  // Användarnamn
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // E-postadress
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Hashat lösenord
  password: {
    type: String,
    required: true
  },

  // Datum då kontot skapades
  account_created: {
    type: Date,
    default: Date.now
  }
});

// Exporterar modellen
module.exports = mongoose.model("User", userSchema);