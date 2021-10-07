const jwt = require("jsonwebtoken");

function generateJWT({ id, name, email, avatar, role }) {
  return jwt.sign({ id, name, email, avatar, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function parseUserFromToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

module.exports = {
  generateJWT,
  parseUserFromToken,
};
