const faker = require("faker");

function users() {
  return Array.from({ length: 10 }, () => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    password: "password",
    role: ["user", "admin"][+(Math.random() > 0.8)],
    posts: [],
    likedPosts: [],
    likedComments: [],
    createdAt: Date(Date.now()),
    updatedAt: Date(Date.now()),
  }));
}

module.exports = users();
