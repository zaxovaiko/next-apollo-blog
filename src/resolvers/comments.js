const UserService = require("../services/UserService");
const PostService = require("../services/PostService");
const CommentService = require("../services/CommentService");

module.exports = {
  Query: {
    comments: () => CommentService.getAll(),
    comment: (_, args) => CommentService.getOneById(args.id),
  },
  Mutation: {
    createComment: (_, args, context) => CommentService.createComment(args),
    updateComment: (_, args, context) => CommentService.updateComment(args.id, args),
    deleteComment: (_, args, context) => CommentService.deleteComment(args.id),
  },
  Comment: {
    user: (parent, _) => UserService.getOneById(parent.userId),
    post: (parent, _) => PostService.getOneById(parent.postId),
  },
};
