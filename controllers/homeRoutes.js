const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      /*  attributes: {
        exclude: ["id"], 
      },*/
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      raw: true,
    });

    res.render("homepage", {
      posts: postData,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.error("Error fetching quotes data:", error);
    res.status(500).json({ error: "Failed to fetch quotes data" });
  }
});

router.get("/editpost/:id", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findOne({
      where: { id: postId },
    });

    if (postData) {
      res.render("editpost", {
        postId: postId,
        post: postData,
        logged_in: req.session.logged_in,
      });
    } else {
      console.log(`Post with ID ${postId} not found.`);
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.session.user_id },
      attributes: { exclude: ["password"] },
      include: {
        model: Post,
        attributes: [
          "id",
          "post_title",
          "contents",
          "creator_name",
          "date_created",
        ],
        order: [["date_created", "DESC"]],
      },
    });
    const user = userData.get({ plain: true });

    res.render("dashboard", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comment/:id", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findOne({
      where: {
        id: postId,
      },
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment",
            "creator_name",
            "date_created",
            "user_id",
            "post_id",
          ],
          include: {
            model: User,
            attributes: ["id", "name"],
          },
        },
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });

    // console.log("Current Post: ", postData);

    const post = postData.get({ plain: true });
    console.log(post);
    if (postData) {
      res.render("comment", {
        post,
        logged_in: req.session.logged_in,
      });
    } else {
      console.log(`Post with ID ${postId} not found.`);
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup", { logged_in: req.session.logged_in });
});

router.get("/createpost", withAuth, async (req, res) => {
  res.render("createpost", { logged_in: req.session.logged_in });
});

// router.get("/comment", withAuth, async (req, res) => {
//   res.render("comment", { logged_in: req.session.logged_in });
// });
module.exports = router;
