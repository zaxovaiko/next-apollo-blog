const validator = require("validator");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { generateJWT } = require("../helpers/authToken");
const User = require("../models/User");

function getAll() {
  return User.find();
}

function getOneByEmail(email) {
  return User.findOne({ email });
}

function getOneById(id) {
  return User.findById(id).catch(() => null);
}

async function login({ email, password }) {
  const user = await getOneByEmail(email);
  if (!user) {
    throw new Error("User does not exist");
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("Password is wrong");
  }
  return generateJWT(user);
}

async function signup({ name, email, password }) {
  if (
    validator.isEmpty(name) ||
    !validator.isEmail(email) ||
    validator.isEmpty(password)
  ) {
    throw new Error("Validation error");
  }

  if (await getOneByEmail(email)) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, +process.env.BCRYPT_ROUNDS),
    avatar: gravatar.url(email, {
      s: "512",
      d: "identicon",
      r: "pg",
    }),
  });

  return generateJWT(user);
}

function editUser(id, { name, email, password }) {
  if (
    validator.isEmpty(name) ||
    !validator.isEmail(email) ||
    validator.isEmpty(password)
  ) {
    throw new Error("Invalid data");
  }
  return User.findByIdAndUpdate(id, {
    name,
    email,
    password: bcrypt.hashSync(password, +process.env.BCRYPT_ROUNDS),
  }).catch(() => null);
}

function deleteUser(id) {
  return User.findByIdAndDelete(id).catch(() => null);
}

module.exports = {
  getAll,
  getOneById,
  getOneByEmail,
  login,
  signup,
  editUser,
  deleteUser,
};
