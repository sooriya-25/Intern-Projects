const postList = document.getElementById("postList");
const message = document.getElementById("message");
const lastViewed = document.getElementById("lastViewed");

// Show Success / Error Message

const showMessage = (text, color = "green") => {
  message.textContent = text;
  message.style.color = color;

  setTimeout(() => {
    message.textContent = "";
  }, 3000);
};

// Clear Posts

const clearPosts = () => {
  postList.innerHTML = "";
};

// Render Posts

const renderPosts = (posts) => {
  clearPosts();

  if (!posts || posts.length === 0) {
    postList.innerHTML = `
            <h3 style="text-align:center;">
                No Posts Found
            </h3>
        `;

    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

            <h3>${post.title}</h3>

            <p>${post.body}</p>

            <small><strong>ID :</strong> ${post.id}</small>

            <div class="actions">

    <button
        onclick="viewPost(${post.id})">

        View

    </button>

    <button
        class="edit"
        onclick="editPost(${post.id})">

        Edit

    </button>

    <button
        class="delete"
        onclick="removePost(${post.id})">

        Delete

    </button>

</div>

        `;

    postList.appendChild(card);
  });
};

// Clear Form

const clearForm = () => {
  document.getElementById("postForm").reset();
};

// Fill Form While Editing

const fillForm = (post) => {
  document.getElementById("title").value = post.title;

  document.getElementById("body").value = post.body;
};

const displayLastViewed = () => {
  const title = localStorage.getItem("lastViewedPost");

  if (title) {
    lastViewed.textContent = `Last Viewed : ${title}`;
  }
};
