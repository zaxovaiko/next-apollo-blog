const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../repos/users");

function getAll() {
  return users;
}

function getOneByEmail(email) {
  return users.find((e) => e.email === email);
}

function getOneById(id) {
  return users.find((e) => e.id === id);
}

function login({ email, password }) {
  const user = getOneByEmail(email);
  if (!user) {
    throw new Error("User does not exist");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("Password is wrong");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
}

function signup({ name, email, password }) {
  if (
    validator.isEmpty(name) ||
    !validator.isEmail(email) ||
    validator.isEmpty(password)
  ) {
    throw new Error("Validation error");
  }

  if (getOneByEmail(email)) {
    throw new Error("User already exists");
  }

  const user = {
    id: Math.random().toString(36).substr(10),
    name,
    email,
    password: bcrypt.hashSync(password, +process.env.BCRYPT_ROUNDS),
    avatar: "",
    role: "user",
  };

  users.push(user);
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
}

function editUser(id, { name, email, password }) {
  if (
    validator.isEmpty(name) ||
    !validator.isEmail(email) ||
    validator.isEmpty(password)
  ) {
    throw new Error("Invalid data");
  }

  const user = getOneById(id);
  if (!user) {
    throw new Error("User does not exists");
  }

  user.name = name;
  user.email = email;
  user.password = password;

  return user;
}

module.exports = {
  getAll,
  getOneById,
  getOneByEmail,
  login,
  signup,
  editUser,
};
