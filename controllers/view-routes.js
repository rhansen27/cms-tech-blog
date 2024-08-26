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

  const cleanedPosts = posts.map((post) => post.get({ plain: true }));
  console.log(cleanedPosts);
  res.render("home", {
    loggedIn: req.session.loggedIn,
    cleanedPosts,
  });
});

//login page
router.get("/login", async (req, res) => {
  res.render("sign-in");
});

//dashboard page
router.get("/dashboard", auth, async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });

  const cleanedPosts = posts.map((post) => post.get({ plain: true }));

  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
    cleanedPosts,
  });
});

//create post page

router.get("/post/:id", auth, async (req, res) => {
  let post = await Post.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Comment,
        include: [{ model: User, attributes: ["username"] }],
      },
    ],
  });

  post = post.get({ plain: true });

  res.render("single-post", {
    loggedIn: req.session.loggedIn,
    post,
  });
});

module.exports = router;
