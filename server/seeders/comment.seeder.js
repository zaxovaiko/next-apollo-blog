const { lorem } = require("faker");
const { model: userModel } = require("../src/user");
const { model: postModel } = require("../src/post");
const { model: commentModel } = require("../src/comment");

async function seedComments(count, clean = true) {
  if (clean) {
    await commentModel.deleteMany();
  }

  const usersDocs = await userModel.count();
  const postsDocs = await postModel.count();
  if (usersDocs === 0 || postsDocs === 0) {
    throw new Error(
      "User or Post collections is empty. Fill them and try again."
    );
  }

  for (let i = 0; i < count; i++) {
    try {
      const user = await userModel.findRandom();
      const post = await postModel.findRandom();
      const comment = await commentModel.create(generateFakeComment());

      user.comments.push(comment.id);
      post.comments.push(comment.id);

      await user.save();
      await post.save();
    } catch (e) {
      console.log(e);
      await commentModel.deleteMany();
      throw new Error("Comments seeder failed");
    }
  }
}

function generateFakeComment() {
  return {
    text: lorem.sentences(Math.random() * 2 + 1),
  };
}

module.exports = {
  seedComments,
  generateFakeComment,
};
