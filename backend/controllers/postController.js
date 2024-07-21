// Import post model
const Post = require("../models/postModel");
const mongoose = require("mongoose");

// Get all posts
const getPosts = async (req, res) => {
  // Grab all posts and sort them in descending order (newest to oldest)
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// Get a single post
const getPost = async (req, res) => {
  // Grab the id property from route parameters
  const { id } = req.params;
  // Do this if the id isn't valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post!" });
  }
  const post = await Post.findById(id);
  if (!post) {
    // Return not executing rest code
    return res.status(404).json({ error: "No such post" });
  }
  res.status(200).json(post);
};

// Create new post
const createPost = async (req, res) => {
  const { title, description, notes = [], username, userId } = req.body; // Default notes to an empty array if not provided

  // Get empty form fields
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!description) emptyFields.push("description");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Adding document to DB
  try {
    const post = await Post.create({
      title,
      description,
      notes,
      username,
      userId,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
};
