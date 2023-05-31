const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

router.get("/:id/comments", (req, res) => {
  const postId = req.params.postId;

  Comment.findAll({
    where: {
      post_id: postId,
    },
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((comments) => {
      res.json(comments);
    })
    .catch((error) => {
      console.error("An error occurred while retrieving the comments:", error);
      res.status(500).json({ error: "Failed to retrieve comments" });
    });
});

// Creating a route to create a Post
router.post("/create", async (req, res) => {
  try {
    const userId = req.session.user_id; // Retriving the user ID from the session data
    const userData = await User.findByPk(userId);

    const currentDate = new Date(); // Get the current date and time
    const commentData = {
      comment: req.body.post_title,
      creator_name: userData.name, // Use the username (or any relevant property) of the logged-in user as the creator name
      date_created: currentDate, // Set the current date and time as the date_created property
      user_id: userId, // Corrected property name to match the column name in the model
    };

    const createdComment = await Comment.create(commentData);
    res.status(200).json(createdComment);
  } catch (err) {
    console.log(err); // Log the error for debugging purposes
    res.status(400).json(err);
  }
});

module.exports = router;
