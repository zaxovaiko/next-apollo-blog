const { service: userService } = require("../user");
const postService = require("./post.service");

module.exports = {
  Query: {
    posts: () => postService.getAll(),
    post: (_, args) => postService.getOneById(args.id),
  },
  Mutation: {
    createPost: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      return postService.createPost(args);
    },
    editPost: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await postService.checkUserPermission(args.id, context.user);
      return await postService.editPost(args.id, args);
    },
    deletePost: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await postService.checkUserPermission(args.id, context.user);
      return await postService.deletePost(args.id);
    },
  },
  Post: {
    user: (parent, _) => userService.getOneById(parent.user),
  },
};
