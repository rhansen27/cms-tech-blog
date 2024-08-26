const commentBtn = document.querySelector("#add-comment");
const commentBox = document.querySelector("#comment-box");
const form = document.querySelector("#comment-form");
const submitBtn = document.querySelector("#comment-submit-btn");

const addComment = () => {
  console.log("clicked");
  commentBox.classList.toggle("d-none");
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const newComment = {
    body: e.target.elements.comment.value,
    post_id: submitBtn.dataset.postId,
  };
  await fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  }).then((res) => {
    if (res.status === 201) {
      location.reload();
    }
  });
};

commentBtn.addEventListener("click", addComment);
form.addEventListener("submit", handleSubmit);
