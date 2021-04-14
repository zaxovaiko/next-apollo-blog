const UserService = require("../services/UserService");
const PostService = require("../services/PostService");

module.exports = {
  Query: {
    users: () => UserService.getAll(),
    user: (_, args) => UserService.getOneById(args.id),
    login: (_, args) => UserService.login(args),
  },
  Mutation: {
    signup: (_, args) => UserService.signup(args),
    editUser: (_, args) => UserService.editUser(args.id, args),
  },
  User: {
    posts: (parent, _) => PostService.getAllByUserId(parent.id),
  },
};
