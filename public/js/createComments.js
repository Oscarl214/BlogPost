const createComment=()=>{
    const comment=document.querySelector("#comment");
    const commentValue=comment.value;

    let postId = window.location.pathname.split("/")[2];

    if(commentValue===''){
        console.log("Failed to save comment")
    }else{
        console.log("postId:", postId);
        fetch('/api/comment/create',{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({comment: commentValue, postId}),
        })
        .then((response)=>{
            if(response.ok){
                console.log("Comment saved succesfully");
                comment.value="";
                // document.location.reload('/comment')
            }else{
                console.log("Failed to save comment")
            }
        })
        .catch((error)=>{
            console.log("An error occured while saving comment", error)
        })
    }
}

const createButton=document.querySelector("#comment-btn");

createButton.addEventListener("click", createComment);



