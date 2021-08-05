const { lorem } = require("faker");
const { model: userModel } = require("../src/user");
const { model: postModel } = require("../src/post");

async function seedPosts(count, clean = true) {
  if (clean) {
    await postModel.deleteMany();
  }

  const usersDocs = await userModel.count();
  if (usersDocs === 0) {
    throw new Error("User table is empty. Fill user collection first.");
  }

  for (let i = 0; i < count; i++) {
    try {
      const user = await userModel.findRandom();
      const post = await postModel.create({
        ...generateFakePost(),
        user: user.id,
      });

      user.posts.push(post.id);
      await user.save();
    } catch (e) {
      console.log(e);
      await postModel.deleteMany();
      throw new Error("Post seeder failed");
    }
  }
}

function generateFakePost() {
  return {
    text: lorem.sentences(Math.random() * 20 + 1),
  };
}

module.exports = {
  generateFakePost,
  seedPosts,
};
