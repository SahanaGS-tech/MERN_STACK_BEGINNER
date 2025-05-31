import React, { useState } from "react";

const PostForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    author: initialData?.author || "",
    category: initialData?.category || "other",
    tags: initialData?.tags?.join(", ") || "",
    published: initialData?.published || false,
  });

  const [errors, setErrors] = useState({});

  // SOLUTION: Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // SOLUTION: Update formData based on input type
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // SOLUTION: Validate form data
  const validateForm = () => {
    const newErrors = {};

    // SOLUTION: Validate title (required, min 5 chars)
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    // SOLUTION: Validate content (required, min 10 chars)
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    }

    // SOLUTION: Validate author (required, min 2 chars)
    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    } else if (formData.author.trim().length < 2) {
      newErrors.author = "Author must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SOLUTION: Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // SOLUTION: Validate form
    if (!validateForm()) {
      return;
    }

    // SOLUTION: Process tags (convert string to array)
    const processedData = {
      ...formData,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
    };

    // SOLUTION: Call onSubmit with processed data
    onSubmit(processedData);

    // Reset form if creating new post
    if (!isEditing) {
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "other",
        tags: "",
        published: false,
      });
    }
  };

  return (
    <form
      className="post-form"
      onSubmit={handleSubmit}
    >
      <h2>{isEditing ? "Edit Post" : "Create New Post"}</h2>

      {/* SOLUTION: Title Input */}
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title..."
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      {/* SOLUTION: Author Input */}
      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name..."
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>

      {/* SOLUTION: Category Select */}
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* SOLUTION: Tags Input */}
      <div className="form-group">
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="react, javascript, tutorial..."
        />
      </div>

      {/* SOLUTION: Content Textarea */}
      <div className="form-group">
        <label htmlFor="content">Content *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog post content here..."
          rows="8"
        />
        {errors.content && <span className="error">{errors.content}</span>}
      </div>

      {/* SOLUTION: Published Checkbox */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          Publish immediately
        </label>
      </div>

      {/* SOLUTION: Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
      >
        {isEditing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
