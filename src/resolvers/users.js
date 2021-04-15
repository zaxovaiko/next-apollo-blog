const UserService = require("../services/UserService");
const PostService = require("../services/PostService");

module.exports = {
  Query: {
    users: () => UserService.getAll(),
    user: (_, args) => UserService.getOneById(args.id),
    login: (_, args) => UserService.login(args),
  },
  Mutation: {
    signup: (_, args, context) => {
      if (context.user) {
        throw new Error("You are not logged in");
      }
      return UserService.signup(args);
    },
    editUser: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      if (context.user.id !== args.id && context.user.role !== "admin") {
        throw new Error("You can not change other users info");
      }
      return UserService.editUser(args.id, args);
    },
    deleteUser: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      if (context.user.id !== args.id && context.user.role !== "admin") {
        throw new Error("You have no permissions to delete another user");
      }
      return UserService.deleteUser(args.id);
    },
  },
  User: {
    posts: (parent, _) => PostService.getAllByUserId(parent.id),
  },
};
