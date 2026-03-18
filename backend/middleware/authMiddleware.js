const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey"; 

module.exports = function(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    console.log("DECODED TOKEN:", decoded); // ✅ DEBUG

    req.userId = decoded.id;

    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message); // ✅ DEBUG
    return res.status(401).json({ message: "Invalid token" });
  }

};