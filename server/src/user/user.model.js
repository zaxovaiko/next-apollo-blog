const { model, Schema, Types } = require("mongoose");
const { findRandom } = require("../helpers/schema-methods.helper");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    roles: { type: [String], default: ["user"] },
    posts: [{ type: Types.ObjectId, ref: "Post" }],
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
    likedPosts: [{ type: Types.ObjectId, ref: "Post" }],
    likedComments: [{ type: Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
userSchema.statics.findRandom = function () {
  return findRandom(this);
};

module.exports = model("User", userSchema);
