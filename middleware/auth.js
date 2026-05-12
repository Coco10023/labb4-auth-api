const jwt = require("jsonwebtoken");

// Middleware som kontrollerar JWT-token
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Om Authorization-header saknas
  if (!authHeader) {
    return res.status(401).json({
      message: "Ingen token skickades."
    });
  }

  // Headern ska se ut så här: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  // Om token saknas efter Bearer
  if (!token) {
    return res.status(401).json({
      message: "Token saknas."
    });
  }

  try {
    // Verifierar att token är giltig
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Sparar användarinformation i request-objektet
    req.user = decoded;

    // Går vidare till nästa funktion/route
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Ogiltig eller utgången token."
    });
  }
}

module.exports = auth;