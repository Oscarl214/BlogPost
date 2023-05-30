const destroyPost = (postId) => {
    fetch(`/api/posts/delete/${postId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Post deleted successfully.');
          document.location.replace('/dashboard');
        } else {
          console.log('Failed to delete post.');
        }
      })
      .catch((error) => {
        console.error('An error occurred while deleting the post:', error);
      });
  };


const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
  const postId = deleteButton.dataset.postid; // Retrieve postId from data attribute
  destroyPost(postId);
});