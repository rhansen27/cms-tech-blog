const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const auth = require("../../utils/middleware/auth");

router.post("/", auth, async (req, res) => {
  const body = {
    user_id: req.session.user_id,
    ...req.body,
  };

  await Comment.create(body);

  res.status(201).json(body);
});

module.exports = router;
