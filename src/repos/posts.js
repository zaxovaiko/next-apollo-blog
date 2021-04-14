const faker = require("faker");
const users = require("./users");
const comments = require("./comments");

function posts() {
  const commentsCopy = [];
  for (let i = 10; i > 0; i--) {
    commentsCopy.push(comments.splice(0, Math.ceil(comments.length / i)));
  }

  return Array.from({ length: 10 }, (_, i) => ({
    id: faker.datatype.uuid(),
    text: faker.lorem.paragraph(),
    userId: users[Math.floor(Math.random() * users.length)].id,
    votes: 0,
    comments: commentsCopy[i].map((e) => e.id),
    createdAt: Date(Date.now()),
    updatedAt: Date(Date.now()),
  }));
}

module.exports = posts();
