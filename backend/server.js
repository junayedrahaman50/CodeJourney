require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const app = express();

// global middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// attach all routes specified in router to the app, on getting request to the specified path use the routes
app.use("/api/posts", postRoutes);

// attach all routes specified in router to the app, on getting request to the specified path use the routes
// app.use("/api/posts", postRoutes);

// Connect to database:
// connect method is asynchronus it returns a promise, then method works when the promise is fulfilled
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests when connected to database
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
