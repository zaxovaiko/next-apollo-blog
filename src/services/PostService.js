const validator = require("validator");
const posts = require("../repos/posts");
const { getOneById: getOneUserById } = require("./UserService");

function getOneById(id) {
  return posts.find((e) => e.id === id);
}

function getAll() {
  return posts;
}

function getAllByUserId(userId) {
  return posts.filter((e) => e.userId === userId);
}

function createPost({ text, userId }) {
  if (validator.isEmpty(text)) {
    throw new Error("Validation error");
  }

  // no need to use it -> middleware will filter it
  const user = getOneUserById(userId);
  if (!user) {
    throw new Error("User does not exists");
  }

  const post = {
    id: Math.random().toString(36).slice(7),
    text,
    userId,
  };
  user.posts.push(post.id);
  return post;
}

function editPost(id, { text }) {
  if (validator.isEmpty(text)) {
    throw new Error("Validation error");
  }

  const post = getOneById(id);
  if (!post) {
    throw new Error("Post does not exists");
  }

  post.text = text;
  return post;
}

function deletePost(id) {
  const post = getOneById(id);
  if (!post) {
    throw new Error("Post does not exists");
  }
  post.deleted = true;
  return post;
}

module.exports = {
  getAll,
  getOneById,
  getAllByUserId,
  createPost,
  editPost,
  deletePost,
};
