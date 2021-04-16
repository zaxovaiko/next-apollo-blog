const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Post",
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
      comments: [
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
