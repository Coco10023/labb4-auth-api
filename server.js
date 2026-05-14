// Importerar paket
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


// Importerar Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// Skapar Express-applikationen
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kopplar routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes );

// Enkel test-route
app.get("/", (req, res) => {
  res.json({
    message: "API fungerar!"
  });
});

// Ansluter till MongoDB och startar servern
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Ansluten till MongoDB");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server körs på port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Fel vid anslutning till MongoDB:", error);
  });