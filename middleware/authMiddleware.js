const jwt = require("jsonwebtoken");

//for auth!
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Not Authorized, Token missing!" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; //req the decoded value!
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized, Token invalid!" });
  }
};

module.exports = protect;
