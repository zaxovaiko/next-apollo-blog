const { model, Schema } = require("mongoose");
const { findRandom } = require("../helpers/schema-methods.helper");

const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);
commentSchema.statics.findRandom = function () {
  return findRandom(this);
};

module.exports = model("Comment", commentSchema);
