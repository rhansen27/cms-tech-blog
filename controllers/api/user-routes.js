const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();

  res.json(users);
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { usernmame: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username." });
      return;
    }

    const validPassword = await userData.checkPasword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password." });
      return;
    }

    req.session.loggedIn = true;
    req.session.user_id = userData.id;
    res.status(200).json({
      message: "You are now logged in",
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (userData) {
      res.status(400).json({ message: "Username already exists." });
      return;
    }

    const newUser = await User.create(req.body);

    req.session.user_id = newUser.id;
    req.session.loggedIn = true;
    req.status(201).end();
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
