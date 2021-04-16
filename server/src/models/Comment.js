const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      text: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
      postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
