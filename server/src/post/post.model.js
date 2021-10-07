const { model, Schema, Types } = require("mongoose");
const { findRandom } = require("../helpers/schema-methods.helper");

const postSchema = new Schema(
  {
    text: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User" },
    likes: { type: Number, default: 0 },
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
postSchema.statics.findRandom = function () {
  return findRandom(this);
};

module.exports = model("Post", postSchema);
