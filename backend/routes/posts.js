const express = require("express");
// import the controller functions
const {
  getPosts,
  getPost,
  createPost,
} = require("../controllers/postController");
const router = express.Router();
// GET all Posts
router.get("/", getPosts);
// GET a single Post , : represents a route parameter that can be changed
router.get("/:id", getPost);
// POST a new Post
router.post("/", createPost);

// Export the router
module.exports = router;
