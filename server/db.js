const mongoose = require("mongoose");

// Connect to your database URI here
const mongoUrl = `mongodb://localhost:27017/notes-app`;

mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to mongodb");
});

module.exports = db;
