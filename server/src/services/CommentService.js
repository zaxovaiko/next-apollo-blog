const validator = require("validator");
const Comment = require("../models/Comment");

function getAll() {
  return Comment.find();
}

function getOneById(id) {
  return Comment.findById(id).catch(() => null);
}

function createComment({ text, userId, postId }) {
  if (validator.isEmpty(text)) {
    throw new Error("Invalid data");
  }
  return Comment.create({ text, userId, postId });
}

function updateComment(id, { text }) {
  if (validator.isEmpty(text)) {
    throw new Error("Invalid data");
  }
  return Comment.findByIdAndUpdate(id, { text }).catch(() => null);
}

function deleteComment(id) {
  return Comment.findByIdAndDelete(id).catch(() => null);
}

async function checkUserPermission(commentId, user) {
  const comment = await getOneById(commentId);
  if (!comment) {
    throw new Error("Comment does not exists");
  }
  if (comment.userId !== user.id && user.role !== "admin") {
    throw new Error("You do not have permissions");
  }
}

module.exports = {
  getAll,
  getOneById,
  createComment,
  updateComment,
  deleteComment,
  checkUserPermission,
};
