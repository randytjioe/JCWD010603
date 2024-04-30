const jwt = require("jsonwebtoken");
const secret = process.env.secret_key;

const verifyAdmin = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("access denied / unauthorized request");
  }

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token) {
      return res.status(401).send("unauthorized request 1");
    }

    let verifiedAdmin = jwt.verify(token, secret);
    if (!verifiedAdmin) {
      return res.status(401).send("unauthorized request 2");
    }
    req.admin = verifiedAdmin;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};

const checkAdminRole = async (req, res, next) => {
  if (req.admin.isSuperAdmin) {
    return next();
  }
  return res.status(401).send("unauthorized! / access denied");
};

module.exports = { verifyAdmin, checkAdminRole };
