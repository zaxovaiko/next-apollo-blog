const UserService = require("../services/UserService");
const PostService = require("../services/PostService");
const CommentService = require("../services/CommentService");

module.exports = {
  Query: {
    comments: () => CommentService.getAll(),
    comment: (_, args) => CommentService.getOneById(args.id),
  },
  Mutation: {
    createComment: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      if (!PostService.getOneById(args.postId)) {
        throw new Error("Post does not exists");
      }
      return CommentService.createComment(args);
    },
    updateComment: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await CommentService.checkUserPermission(args.id, context.user);
      return await CommentService.updateComment(args.id, args);
    },
    deleteComment: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await CommentService.checkUserPermission(args.id, context.user);
      return await CommentService.deleteComment(args.id);
    },
  },
  Comment: {
    user: (parent, _) => UserService.getOneById(parent.userId),
    post: (parent, _) => PostService.getOneById(parent.postId),
  },
};
