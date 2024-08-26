const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const auth = require("../../utils/middleware/auth");
// route from: /api/posts

router.get("/", async (req, res) => {
  const rawPosts = await Post.findAll({
    attributes: ["title", "body", ["id", "postID"]],
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Comment,
        attributes: ["body"],
        include: [{ model: User, attributes: ["username"] }],
      },
    ],
  });

  const posts = rawPosts.map((post) => post.get({ plain: true }));

  res.send(posts);
});

router.get("/:id", auth, async (req, res) => {
  let post = await Post.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ["username"] },
      { model: Comment, include: [{ model: User, attributes: ["username"] }] },
    ],
  });

  res.status(200).json(post);
});

router.post("/", auth, async (req, res) => {
  const newPost = {
    user_id: req.session.user_id,
    ...req.body,
  };

  console.log(newPost);
  await Post.create(newPost);

  res.status(201).end();
});

router.put("/:id", auth, async (req, res) => {
  let post = await Post.findByPk(req.body.post_id);
  post = post.get({ plain: true });

  if (req.session.user_id !== post.user_id) {
    res.status(401).end();
    return;
  }

  const newPost = await Post.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        user_id: req.session.user_id,
        id: req.body.post_id,
      },
    }
  );

  console.log(post);
  res.status(200).end();
});

router.delete("/:id", async (req, res) => {
  let post = await Post.findByPk(req.params.id);
  post = post.get({ plain: true });

  if (req.session.user_id !== post.user_id) {
    res.status(401).end();
    return;
  }

  const destroyed = await Post.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (destroyed === 1) {
    res.status(204).end();
  }
});

module.exports = router;
