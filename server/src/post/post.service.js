const validator = require("validator");
const postModel = require("./post.model");
const { service: userService } = require("../user");

function getOneById(id) {
  return postModel.findById(id).catch(() => null);
}

function getAll() {
  return postModel.find();
}

function getAllByUserId(id) {
  return postModel.find({ user: id });
}

async function createPost({ text, user }) {
  if (validator.isEmpty(text || "")) {
    throw new Error("Validation error");
  }

  const post = await postModel.create({ text, user });
  user = await userService.getOneById(user).catch(() => null);
  user.posts.push(post.id);
  await user.save();

  return post;
}

function editPost(id, { text }) {
  if (validator.isEmpty(text || "")) {
    throw new Error("Validation error");
  }
  return postModel.findByIdAndUpdate(id, { text }).catch(() => null);
}

function deletePost(id) {
  return postModel.findByIdAndDelete(id).catch(() => null);
}

async function checkUserPermission(postId, user) {
  const post = await getOneById(postId).catch(() => null);
  if (!post) {
    throw new Error("Post does not exists");
  }
  if (post.user !== user.id && !user.roles.includes("admin")) {
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
