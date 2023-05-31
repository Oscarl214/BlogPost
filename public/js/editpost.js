const destroyPost = (postId) => {
  fetch(`/api/posts/delete/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Post deleted successfully.");
        document.location.replace("/dashboard");
      } else {
        console.log("Failed to delete post.");
      }
    })
    .catch((error) => {
      console.error("An error occurred while deleting the post:", error);
    });
};

const getPost = (postId) => {
  let editTitle = document.querySelector("#edittitle");
  let editContent = document.querySelector("#editcontents");

  fetch(`/api/posts/${postId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ postId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      editTitle.value = data.post_title;
      editContent.value = data.contents;

      const editBtn = document.querySelector("#edit");
      editBtn.setAttribute("data-postId", postId);
    });
};

let postId = window.location.pathname.split("/")[2];
getPost(postId);

const updatePost = () => {
  const editBtn = document.querySelector("#edit");
  const postId = editBtn.getAttribute("data-postId");
  const editTitle = document.querySelector("#edittitle").value;
  const editContent = document.querySelector("#editcontents").value;

  const updatedPost = {
    post_title: editTitle,
    contents: editContent,
  };

  fetch(`/api/posts/update/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      document.location.replace("/dashboard");
    })
    .catch((error) => {
      console.error("An error occurred while updating the post:", error);
    });
};

const editBtn = document.querySelector("#edit");
editBtn.addEventListener("click", updatePost);

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click");
