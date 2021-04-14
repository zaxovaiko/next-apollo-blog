const faker = require("faker");
const users = require("./users");

function comments() {
  return Array.from({ length: 30 }, () => ({
    id: faker.datatype.uuid(),
    text: faker.lorem.sentence(),
    userId: users[Math.floor(Math.random() * users.length)].id,
  }));
}

module.exports = comments();
