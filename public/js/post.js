const createPost = () => {
  const title = document.querySelector("#title");
  const contents = document.querySelector("#contents");
  const postTitle = title.value;
  const postContents = contents.value;
  if (postTitle === "" || postContents === "") {
    console.log("Failed to save Post");
    alert("Please provide a post.");
  } else {
    fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_title: postTitle, contents: postContents }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post saved successfully.");
          // Optionally, you can clear the input field after saving the quote
          title.value = "";
          contents.value = "";
          document.location.replace("/dashboard");
        } else {
          console.log("Failed to save post.");
        }
      })
      .catch((error) => {
        console.error("An error occurred while saving the posts:", error);
      });
  }
};

// const getPost=()=>{
//   let editTitle=document.querySelector("#edittitle");
//   let editContent=document.querySelector("#editcontents");

//   fetch(`/${postId}`,{
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//   })
//   .then((response)=>{
//     return response.json();
// }).then((data)=>{

// editTitle.textContent= data.post_title;
// editContent.textContent=data.contents;
// });
// };

// getPost();

const createButton = document.querySelector("#create");
createButton.addEventListener("click", createPost);
