const mongoose = require("mongoose");

// Define the notes schema with timestamps
const noteSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
); // Enable timestamps

// Define the main schema with timestamps
const postSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
); // Enable timestamps

// Create the model
module.exports = mongoose.model("Post", postSchema);
