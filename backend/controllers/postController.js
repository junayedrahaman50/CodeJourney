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

// delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;
  // do this if the id isn't valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post!" });
  }
  // delete single post document
  const post = await Post.findOneAndDelete({ _id: id });
  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }
  // do this on successful deletion
  res.status(200).json(post);
};

// update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post!" });
  }

  // 1st argument: document to find, 2nd argument: Object represents the updates to be made, 3rd argument: options
  const post = await Post.findOneAndUpdate(
    { _id: id },
    { ...req.body }, // spread the updated properties send in req.body
    { new: true } // option to return the new document after update
  );

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  // return the updated document
  res.status(200).json(post);
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};
