const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 8080;

// automatically parse request body
app.use(bodyParser.json());

// Set headers to allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://linkon:Wmk4OOdE0SdGbgZU@cluster0.ixgki.mongodb.net/tasks-api?retryWrites=true"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
