const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
