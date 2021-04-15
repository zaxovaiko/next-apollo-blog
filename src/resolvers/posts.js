const UserService = require("../services/UserService");
const PostService = require("../services/PostService");

module.exports = {
  Query: {
    posts: () => PostService.getAll(),
    post: (_, args) => PostService.getOneById(args.id),
  },
  Mutation: {
    createPost: (_, args, context) => PostService.createPost(args),
    editPost: (_, args, context) => PostService.editPost(args.id, args),
    deletePost: (_, args, context) => PostService.deletePost(args.id),
  },
  Post: {
    user: (parent, _) => UserService.getOneById(parent.userId),
  },
};
