const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");
const { FORCE } = require("sequelize/lib/index-hints");

const seedDB = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    indvidualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDB();
