const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { validatePost } = require("../middleware/validation");

// SOLUTION: GET /api/posts - Get all posts with optional filtering
router.get("/", async (req, res) => {
  try {
    // SOLUTION: Build query object based on query parameters
    let query = {};

    // SOLUTION: Add filtering logic
    if (req.query.published !== undefined) {
      query.published = req.query.published === "true";
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: "i" };
    }

    // SOLUTION: Execute query and sort results
    const posts = await Post.find(query).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SOLUTION: GET /api/posts/:id - Get single post and increment views
router.get("/:id", async (req, res) => {
  try {
    // SOLUTION: Find post by ID and increment views by 1
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SOLUTION: POST /api/posts - Create new post with validation
router.post("/", validatePost, async (req, res) => {
  try {
    // SOLUTION: Create new post with request body
    const post = new Post(req.body);
    // SOLUTION: Save the post
    const savedPost = await post.save();
    // SOLUTION: Return the saved post with status 201
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// SOLUTION: PUT /api/posts/:id - Update existing post
router.put("/:id", validatePost, async (req, res) => {
  try {
    // SOLUTION: Find post by ID and update with request body
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// SOLUTION: DELETE /api/posts/:id - Delete post
router.delete("/:id", async (req, res) => {
  try {
    // SOLUTION: Find and delete post by ID
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SOLUTION: PATCH /api/posts/:id/publish - Toggle post publish status
router.patch("/:id/publish", async (req, res) => {
  try {
    // SOLUTION: Find post by ID
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // SOLUTION: Toggle the published status
    post.published = !post.published;

    // SOLUTION: Save the post and return it
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
