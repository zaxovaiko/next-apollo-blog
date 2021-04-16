const UserService = require("../services/UserService");
const PostService = require("../services/PostService");

module.exports = {
  Query: {
    posts: () => PostService.getAll(),
    post: (_, args) => PostService.getOneById(args.id),
  },
  Mutation: {
    createPost: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      return PostService.createPost(args);
    },
    editPost: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await PostService.checkUserPermission(args.id, context.user);
      return await PostService.editPost(args.id, args);
    },
    deletePost: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await PostService.checkUserPermission(args.id, context.user);
      return await PostService.deletePost(args.id);
    },
  },
  Post: {
    user: (parent, _) => UserService.getOneById(parent.userId),
  },
};
