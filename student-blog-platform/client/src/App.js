import React, { useState, useEffect } from "react";
import "./App.css";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { postAPI } from "./services/api";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    published: "",
    author: "",
  });

  // SOLUTION: Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await postAPI.getAllPosts(filters);
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // SOLUTION: Handle creating new post
  const handleCreatePost = async (postData) => {
    try {
      await postAPI.createPost(postData);
      await fetchPosts();
      setShowForm(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    }
  };

  // SOLUTION: Handle updating existing post
  const handleUpdatePost = async (postData) => {
    try {
      await postAPI.updatePost(editingPost._id, postData);
      await fetchPosts();
      setEditingPost(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Please try again.");
    }
  };

  // SOLUTION: Handle deleting post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await postAPI.deletePost(postId);
      await fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post. Please try again.");
    }
  };

  // SOLUTION: Handle toggling publish status
  const handleTogglePublish = async (postId) => {
    try {
      await postAPI.togglePublish(postId);
      await fetchPosts();
    } catch (error) {
      console.error("Error toggling publish status:", error);
      alert("Error updating post status. Please try again.");
    }
  };

  // SOLUTION: Handle editing post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  // SOLUTION: Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // SOLUTION: Fetch posts when component mounts or filters change
  useEffect(() => {
    fetchPosts();
  }, [filters]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Student Blog Platform</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingPost(null);
          }}
        >
          {showForm ? "Cancel" : "New Post"}
        </button>
      </header>

      <main className="app-main">
        <div className="container">
          {/* SOLUTION: Filters Section */}
          <div className="filters">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
              <option value="travel">Travel</option>
              <option value="other">Other</option>
            </select>

            <select
              value={filters.published}
              onChange={(e) => handleFilterChange("published", e.target.value)}
            >
              <option value="">All Posts</option>
              <option value="true">Published Only</option>
              <option value="false">Drafts Only</option>
            </select>

            <input
              type="text"
              placeholder="Filter by author..."
              value={filters.author}
              onChange={(e) => handleFilterChange("author", e.target.value)}
            />
          </div>

          {/* SOLUTION: Conditional Form Rendering */}
          {showForm && (
            <PostForm
              onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
              initialData={editingPost}
              isEditing={!!editingPost}
            />
          )}

          {/* SOLUTION: Posts List */}
          <PostList
            posts={posts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onTogglePublish={handleTogglePublish}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
