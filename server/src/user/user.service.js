const bcrypt = require("bcrypt");
const validator = require("validator");
const gravatar = require("gravatar");
const { generateJWT } = require("../helpers/auth-token.helper");
const userModel = require("./user.model");

function getAll() {
  return userModel.find();
}

function getOneByEmail(email) {
  return userModel.findOne({ email });
}

function getOneById(id) {
  return userModel.findById(id).catch(() => null);
}

async function login({ email, password }) {
  const user = await getOneByEmail(email);
  if (!user) {
    throw new Error("User does not exist");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
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

  const user = await userModel.create({
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
  return userModel
    .findByIdAndUpdate(id, {
      name,
      email,
      password: bcrypt.hashSync(password, +process.env.BCRYPT_ROUNDS),
    })
    .catch(() => null);
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id).catch(() => null);
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
