const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

// Skyddad route som kräver giltig JWT
router.get("/secret", auth, (req, res) => {
  res.json({
    message: "Du är inloggad och får se skyddad data.",
    user: req.user,
    data: [
      {
        id: 1,
        title: "Skyddad information",
        description: "Denna data visas bara för användare med giltig JWT."
      }
    ]
  });
});

module.exports = router;