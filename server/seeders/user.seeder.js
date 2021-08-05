const { name, internet } = require("faker");
const { hash } = require("bcrypt");
const { model } = require("../src/user");

async function seedUsers(count, clean = true) {
  if (clean) {
    await model.deleteMany();
  }

  for (let i = 0; i < count; i++) {
    try {
      model.create(await generateFakeUser());
    } catch (e) {
      console.log(e);
      await model.deleteMany();
      throw new Error("User seeder failed");
    }
  }
}

async function generateFakeUser() {
  return {
    name: name.findName(),
    email: internet.email(),
    avatar: internet.avatar(),
    password: await hash("password", +process.env.BCRYPT_ROUNDS),
    roles: Math.random() > 0.8 ? ["user", "admin"] : ["user"],
  };
}

module.exports = {
  seedUsers,
  generateFakeUser,
};
