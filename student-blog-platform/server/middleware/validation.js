// SOLUTION: Create validation middleware for post data
const validatePost = (req, res, next) => {
  const { title, content, author } = req.body;
  const errors = [];

  // SOLUTION: Validate title
  if (!title) {
    errors.push("Title is required");
  } else if (typeof title !== "string") {
    errors.push("Title must be a string");
  } else if (title.trim().length < 5 || title.trim().length > 100) {
    errors.push("Title must be between 5 and 100 characters");
  }

  // SOLUTION: Validate content
  if (!content) {
    errors.push("Content is required");
  } else if (typeof content !== "string") {
    errors.push("Content must be a string");
  } else if (content.trim().length < 10) {
    errors.push("Content must be at least 10 characters");
  }

  // SOLUTION: Validate author
  if (!author) {
    errors.push("Author is required");
  } else if (typeof author !== "string") {
    errors.push("Author must be a string");
  } else if (author.trim().length < 2) {
    errors.push("Author must be at least 2 characters");
  }

  // SOLUTION: Check if there are validation errors
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // SOLUTION: If validation passes, call next()
  next();
};

module.exports = { validatePost };
