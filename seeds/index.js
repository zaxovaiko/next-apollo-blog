const faker = require("faker");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// models
const User = require("../src/models/User");
const Post = require("../src/models/Post");
const Comment = require("../src/models/Comment");

dotenv.config();

// FIXME: Divide into parts (user, post, comment)
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();

    const counts = {
      users: 10,
      posts: 15,
      comments: 30,
    };

    const users = [];
    const posts = [];
    const comments = [];

    for (let i = 0; i < counts.users; i++) {
      const user = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        password: bcrypt.hashSync("password", +process.env.BCRYPT_ROUNDS),
        role: ["user", "admin"][+(Math.random() > 0.8)],
      });
      users.push(user.id);
    }
    console.log("Users were seeded");

    for (let i = 0; i < counts.posts; i++) {
      const post = await Post.create({
        text: faker.lorem.sentences(Math.random() * 20 + 1),
        userId: users[Math.floor(Math.random() * users.length)],
      });
      posts.push(post.id);
    }
    console.log("Posts were seeded");

    for (let i = 0; i < counts.comments; i++) {
      const comment = await Comment.create({
        text: faker.lorem.sentences(Math.random() * 2 + 1),
        userId: users[Math.floor(Math.random() * users.length)],
        postId: posts[Math.floor(Math.random() * posts.length)],
      });
      comments.push(comment.id);
    }
    console.log("Comments were seeded");
  } catch (e) {
    console.error(e);
  }

  process.exit(0);
})();
