const router = require("express").Router();
const postRoutes = require("./post-routes");
const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");

router.use("/posts", postRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
