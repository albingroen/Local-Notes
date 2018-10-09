const express = require("express");
const router = express.Router();
const Note = require("../schemas/note");

router
  .route("/")
  .post(async (req, res, err) => {
    await Note.create({
      title: "New note",
      text: ""
    });

    const notes = await Note.find();

    res.send(notes);
  })
  .get(async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
  });

router.get("/:id", async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id });
  res.send(note);
});

router.delete("/:id/delete", async (req, res) => {
  await Note.findOne({ _id: req.params.id })
    .remove()
    .exec();
  const notes = await Note.find();
  res.send(notes);
});

router.post("/update", async (req, res) => {
  await Note.findByIdAndUpdate(req.body.note._id, {
    title: req.body.title,
    text: req.body.text
  });

  const notes = await Note.find();

  res.send({ msg: "Note saved!", notes });
});

module.exports = router;
