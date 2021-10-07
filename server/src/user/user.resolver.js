const userService = require("./user.service");
const { service: postService } = require("../post");

module.exports = {
  Query: {
    users: () => userService.getAll(),
    user: (_, args) => userService.getOneById(args.id),
    login: (_, args) => userService.login(args),
  },
  Mutation: {
    signup: (_, args, context) => {
      if (context.user) {
        throw new Error("You are not logged in");
      }
      return userService.signup(args);
    },
    editUser: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      if (context.user.id !== args.id && context.user.role !== "admin") {
        throw new Error("You can not change other users info");
      }
      return userService.editUser(args.id, args);
    },
    deleteUser: (_, args, context) => {
      if (!context.user) {
        throw new Error("You are not logged in");
      }
      if (context.user.id !== args.id && context.user.role !== "admin") {
        throw new Error("You have no permissions to delete another user");
      }
      return userService.deleteUser(args.id);
    },
  },
  User: {
    posts: (parent, _) => postService.getAllByUserId(parent.id),
  },
};
