const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "user",
      },
      posts: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Post",
        },
      ],
      likedPosts: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Post",
        },
      ],
      likedComments: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
