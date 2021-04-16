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
  const user = await UserService.getOneById(userId);
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

async function checkUserPermission(postId, user) {
  const post = await getOneById(postId);
  if (!post) {
    throw new Error("Post does not exists");
  }
  if (post.userId !== user.id && user.role !== "admin") {
    throw new Error("You do not have permissions");
  }
}

module.exports = {
  getAll,
  getOneById,
  getAllByUserId,
  createPost,
  editPost,
  deletePost,
  checkUserPermission,
};
