const validator = require("validator");
const commentModel = require("./comment.model");

function getAll() {
  return commentModel.find();
}

function getOneById(id) {
  return commentModel.findById(id).catch(() => null);
}

function createComment({ text, user, post }) {
  if (validator.isEmpty(text || "")) {
    throw new Error("Invalid data");
  }
  return commentModel.create({ text, user, post }).catch(() => null);
}

function updateComment(id, { text }) {
  if (validator.isEmpty(text || "")) {
    throw new Error("Invalid data");
  }
  return commentModel.findByIdAndUpdate(id, { text }).catch(() => null);
}

function deleteComment(id) {
  return commentModel.findByIdAndDelete(id).catch(() => null);
}

async function checkUserPermission(commentId, user) {
  const comment = await getOneById(commentId);
  if (!comment) {
    throw new Error("Comment does not exists");
  }
  if (comment.user !== user.id && user.role !== "admin") {
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
