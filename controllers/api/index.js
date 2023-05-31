const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./posts");
const commentRoutes = require("./comment");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
