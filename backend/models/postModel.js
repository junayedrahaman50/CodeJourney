const mongoose = require("mongoose");

// Define the notes schema
const noteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Define the main schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  notes: {
    type: [noteSchema], // An array of noteSchema
    default: [], // Default to an empty array if not provided
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// Create the model
module.exports = mongoose.model("Post", postSchema);
