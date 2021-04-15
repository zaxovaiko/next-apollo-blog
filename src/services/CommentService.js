const Comment = require("../models/Comment");
const PostService = require("./PostService");

function getAll() {
  return Comment.find();
}

function getOneById(id) {
  return Comment.findById(id).catch(() => null);
}

function createComment({ text, userId, postId }) {
  if (!PostService.getOneById(postId)) {
    throw new Error("Post does not exists");
  }
  return Comment.create({ text, userId, postId });
}

function updateComment(id, { text }) {
  return Comment.findByIdAndUpdate(id, { text }).catch(() => null);
}

function deleteComment(id) {
  return Comment.findByIdAndDelete(id).catch(() => null);
}

module.exports = {
  getAll,
  getOneById,
  createComment,
  updateComment,
  deleteComment,
};
