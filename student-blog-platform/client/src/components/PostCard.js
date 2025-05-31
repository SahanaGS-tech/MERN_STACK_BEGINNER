import React from "react";

const PostCard = ({ post, onEdit, onDelete, onTogglePublish }) => {
  // SOLUTION: Create helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // SOLUTION: Create helper function to truncate content
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + "...";
  };

  return (
    <div className={`post-card ${post.published ? "published" : "draft"}`}>
      {/* SOLUTION: Post Header */}
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <div className="post-meta">
          <span className="author">By {post.author}</span>
          <span className="date">{formatDate(post.createdAt)}</span>
          <span className={`status ${post.published ? "published" : "draft"}`}>
            {post.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* SOLUTION: Post Content */}
      <div className="post-content">
        <p>{truncateContent(post.content)}</p>
      </div>

      {/* SOLUTION: Post Footer */}
      <div className="post-footer">
        <div className="post-info">
          <span className="category">{post.category}</span>
          <span className="views">{post.views} views</span>
          {/* SOLUTION: Display tags if they exist */}
          {post.tags && post.tags.length > 0 && (
            <div className="tags">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* SOLUTION: Action Buttons */}
        <div className="post-actions">
          {/* SOLUTION: Edit Button */}
          <button
            className="btn btn-edit"
            onClick={onEdit}
          >
            Edit
          </button>

          {/* SOLUTION: Publish/Unpublish Button */}
          <button
            className={`btn ${
              post.published ? "btn-unpublish" : "btn-publish"
            }`}
            onClick={onTogglePublish}
          >
            {post.published ? "Unpublish" : "Publish"}
          </button>

          {/* SOLUTION: Delete Button */}
          <button
            className="btn btn-delete"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
