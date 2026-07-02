// GET ALL POSTS

const getPosts = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// GET SINGLE POST

const getPost = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Post not found");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// CREATE POST

const createPost = async (post) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("Unable to create post");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE POST

const updatePost = async (id, post) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error("Unable to update post");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// DELETE POST

const deletePost = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Unable to delete post");
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
