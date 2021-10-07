const { service: postService } = require("../post");
const commentService = require("./comment.service");

module.exports = {
  Query: {
    comments: () => commentService.getAll(),
    comment: (_, args) => commentService.getOneById(args.id),
  },
  Mutation: {
    createComment: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      if (!postService.getOneById(args.postId)) {
        throw new Error("Post does not exists");
      }
      return commentService.createComment(args);
    },
    updateComment: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await commentService.checkUserPermission(args.id, context.user);
      return await commentService.updateComment(args.id, args);
    },
    deleteComment: async (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      await commentService.checkUserPermission(args.id, context.user);
      return await commentService.deleteComment(args.id);
    },
  },
};
