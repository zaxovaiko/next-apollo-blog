const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");

function generateJWT({ id, name, email, avatar, role }) {
  return jwt.sign({ id, name, email, avatar, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

async function parseUserFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await UserService.getOneById(decoded.id);
  } catch (e) {
    return null;
  }
}

module.exports = {
  generateJWT,
  parseUserFromToken,
};
