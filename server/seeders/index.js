const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { seedUsers } = require("./user.seeder");
const { seedPosts } = require("./post.seeder");
const { seedComments } = require("./comment.seeder");

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    await seedUsers(15);
    console.log("Users were seeded");

    await seedPosts(15);
    console.log("Posts were seeded");

    await seedComments(30);
    console.log("Comments were seeded");
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
})();
