import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts, onEdit, onDelete, onTogglePublish, loading }) => {
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No posts found</h3>
        <p>Create your first blog post to get started!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onEdit={() => onEdit(post)}
          onDelete={() => onDelete(post._id)}
          onTogglePublish={() => onTogglePublish(post._id)}
        />
      ))}
    </div>
  );
};

export default PostList;
