const UserService = require("../services/UserService");
const PostService = require("../services/PostService");

module.exports = {
  Query: {
    posts: () => PostService.getAll(),
    post: (_, args) => PostService.getOneById(args.id),
  },
  Mutation: {
    createPost: (_, args) => PostService.createPost(args),
    editPost: (_, args) => PostService.editPost(args.id, args),
    deletePost: (_, args) => PostService.deletePost(args.id),
  },
  Post: {
    user: (parent, _) => UserService.getOneById(parent.userId),
  },
};
