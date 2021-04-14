const UserService = require("../services/UserService");
const CommentService = require("../services/CommentService");

module.exports = {
  Query: {
    comments: () => CommentService.getAll(),
    comment: (_, args) => CommentService.getOneById(args.id),
  },
  Mutation: {
    createComment: (_, args) => CommentService.createComment(args),
    updateComment: (_, args) => CommentService.updateComment(args.id, args),
    deleteComment: (_, args) => CommentService.deleteComment(args.id),
  },
  Comment: {
    user: (parent, _) => UserService.getOneById(parent.userId),
  },
};
