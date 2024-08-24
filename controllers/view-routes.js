const router = require("express").Router();
const auth = require("../utils/middleware/auth");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    req.session.loggedIn = false;
  }

  const posts = await Post.findAll({
    include: [{ model: User, attributes: ["username"] }, { model: Comment }],
  });

  const preppedPosts = posts.map((post) => post.get({ plain: true }));
  console.log(preppedPosts);

  res.render("home", {
    loggedIn: req.session.loggedIn,
    preppedPosts,
  });
});

router.get("/post/:id", async (req, res) => {
  const post = await Post.findAll({
    include: [{ model: User, attributes: ["username"] }, { model: Comment }],
  });

  post = post.get({ plain: true });

  res.render("single-post", {
    loggedIn: req.session.loggedIn,
    post,
  });
});

router.get("/dashboard", auth, async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });

  const preppedPosts = posts.map((post) => post.get({ plain: true }));

  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
    preppedPosts,
  });
});

module.exports = router;
