const faker = require("faker");
const comments = require("../repos/comments");
const UserService = require("./UserService");

function getAll() {
  return comments;
}

function getOneById(id) {
  return comments.find((e) => e.id === id);
}

function createComment({ text, userId }) {
  if (!UserService.getOneById(userId)) {
    throw new Error("User does not exists");
  }

  const comment = { id: faker.datatype.uuid(), text, userId };
  comments.push(comments);
  return comment;
}

function updateComment(id, { text }) {
  const comment = getOneById(id);
  if (!comment) {
    throw new Error("Comment does not exists");
  }
  comment.text = text;
  return comment;
}

function deleteComment(id) {
  const comment = getOneById(id);
  if (!comment) {
    throw new Error("Comment does not exists");
  }
  comment.deleted = true;
  return comment;
}

module.exports = {
  getAll,
  getOneById,
  createComment,
  updateComment,
  deleteComment,
};
