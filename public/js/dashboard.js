const newBtn = document.querySelector("#newpost-btn");
const editor = document.querySelector("#editor");
const newForm = document.querySelector("#new-form");
const editForm = document.querySelector("#edit-form");
const postContainer = document.querySelector("#post-container");
const editTitleInput = document.querySelector("#editTitleInput");
const editContentInput = document.querySelector("#editContentInput");

const handleEdit = (e) => {
  e.preventDefault();

  const { title, body } = e.target.elements;

  const newPost = {
    title: title.value,
    body: body.value,
    post_id: editForm.dataset.id,
  };
  console.log(newPost);

  fetch(`/api/posts/${editForm.dataset.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  }).then((res) => {
    if (res.status === 200) {
      location.reload();
    }
  });
};

const handleNew = (e) => {
  e.preventDefault();
  const { title, body } = e.target.elements;

  const newPost = {
    title: title.value,
    body: body.value,
  };
  console.log(newPost);

  fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  }).then((res) => {
    if (res.status === 201) {
      location.reload();
    }
  });
};

const handlePost = async (e) => {
  if (e.target.dataset.id) {
    editForm.classList.remove("d-none");
    if (!newForm.classList.contains("d-none")) {
      newForm.classList.add("d-none");
    }

    await fetch(`/api/posts/${e.target.dataset.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        editTitleInput.value = data.title;
        editContentInput.innerHTML = data.body;
        editForm.dataset.id = data.id;
      });
  } else if (e.target.dataset.delete) {
    //hiding the editor on delete
    if (!editForm.classList.contains("d-none")) {
      editForm.classList.add("d-none");
    }

    await fetch(`/api/posts/${e.target.dataset.delete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 204) {
        location.reload();
      }
    });
  }
};

const showNewEditor = () => {
  if (!editForm.classList.contains("d-none")) {
    editForm.classList.add("d-none");
  }
  if (newForm.classList.contains("d-none")) {
    newForm.classList.remove("d-none");
  }
};

editForm.addEventListener("submit", handleEdit);
newForm.addEventListener("submit", handleNew);
newBtn.addEventListener("click", showNewEditor);
postContainer.addEventListener("click", handlePost);
