const validator = require("validator");
const Post = require("../models/Post");
const UserService = require("./UserService");

function getOneById(id) {
  return Post.findById(id).catch(() => null);
}

function getAll() {
  return Post.find();
}

function getAllByUserId(userId) {
  return Post.find({ userId });
}

async function createPost({ text, userId }) {
  if (validator.isEmpty(text)) {
    throw new Error("Validation error");
  }

  const post = await Post.create({ text, userId });
  const user = await UserService.getOneUserById(userId);
  user.posts.push(post.id);
  await user.save();

  return post;
}

function editPost(id, { text }) {
  if (validator.isEmpty(text)) {
    throw new Error("Validation error");
  }
  return Post.findByIdAndUpdate(id, { text }).catch(() => null);
}

function deletePost(id) {
  return Post.findByIdAndDelete(id).catch(() => null);
}

module.exports = {
  getAll,
  getOneById,
  getAllByUserId,
  createPost,
  editPost,
  deletePost,
};
