const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch the post details
    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    // Fetching associated comments for the post
    const comments = await Comment.findAll({
      where: {
        post_id: postId,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Include the comments in the post object
    post.comments = comments;

    res.json(post);
  } catch (error) {
    console.error("An error occurred while retrieving the post and comments:", error);
    res.status(500).json({ error: "Failed to retrieve post and comments" });
  }
});




// Creating a route to create a Post
router.post("/create", async (req, res) => {
  try {
    const userId = req.session.user_id; // Retriving the user ID from the session data
    const userData = await User.findByPk(userId);

    const currentDate = new Date(); // Get the current date and time
    const postData = {
      post_title: req.body.post_title,
      contents: req.body.contents,
      creator_name: userData.name, // Use the username (or any relevant property) of the logged-in user as the creator name
      date_created: currentDate, // Set the current date and time as the date_created property
      user_id: userId, // Corrected property name to match the column name in the model
    };

    const createdPost = await Post.create(postData);
    res.status(200).json(createdPost);
  } catch (err) {
    console.log(err); // Log the error for debugging purposes
    res.status(400).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(400).json({ message: "No Post with this id!" });
      return;
    }
    res.json({ message: "Successfully deleted Post" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Updating a Post

router.put("/update/:id", (req, res) => {
  const postId = req.params.id;

  Post.update(req.body, {
    where: {
      id: postId,
    },
  })
    .then((result) => {
      console.log(result);
      if (result[0] === 1) {
        res.status(200).json({ message: "Post updated successfully" });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    })
    .catch((error) => {
      console.error("An error occurred while updating the post:", error);
      res.status(500).json({ error: "Server error" });
    });
});

module.exports = router;
