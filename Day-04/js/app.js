const form = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const submitBtn = document.getElementById("submitBtn");
const modal = document.getElementById("viewModal");
const closeModal = document.getElementById("closeModal");
const modalId = document.getElementById("modalId");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

let editPostId = null;

// Load All Posts
const loadPosts = async () => {
  const posts = await getPosts();

  renderPosts(posts.slice(0, 10));
};

loadPosts();
displayLastViewed();

// Add / Update Post
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (title === "" || body === "") {
    showMessage("Please fill all fields", "red");
    return;
  }

  const post = {
    title,
    body,
    userId: 1,
  };

  if (editPostId === null) {
    await createPost(post);

    showMessage("Post Created");
  } else {
    await updatePost(editPostId, post);

    showMessage("Post Updated");

    editPostId = null;

    sessionStorage.removeItem("editingPost");

    submitBtn.textContent = "Add Post";
  }

  clearForm();

  loadPosts();
});


// Edit Post
const editPost = async (id) => {
  const post = await getPost(id);

  fillForm(post);

  editPostId = id;

  sessionStorage.setItem("editingPost", id);

  submitBtn.textContent = "Update Post";

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
};

// Delete Post
const removePost = async (id) => {
  const confirmDelete = confirm("Delete this post?");

  if (!confirmDelete) return;

  const deleted = await deletePost(id);

  if (deleted) {
    showMessage("Post Deleted");

    loadPosts();
  } else {
    showMessage("Delete Failed", "red");
  }
};

const viewPost = async (id) => {

    const post = await getPost(id);

    localStorage.setItem("lastViewedPost", post.title);


    displayLastViewed();

    modalId.textContent = post.id;

    modalTitle.textContent = post.title;

    modalBody.textContent = post.body;

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

};

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

    document.body.style.overflow = "auto";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

        document.body.style.overflow = "auto";

    }

});