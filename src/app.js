const express = require("express");
const app = express();

const notes = require("./data/notes-data");

// Parse JSON request bodies
app.use(express.json());

app.get("/notes/:noteId", (req, res) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    res.json({ data: foundNote });
  } else {
    res.status(404).json({ error: `Note id not found: ${req.params.noteId}` });
  }
});

app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

app.post("/notes", (req, res) => {
  const { data: { text } = {} } = req.body;
  if (text) {
    const newNote = {
      id: notes.length + 1,
      text,
    };
    notes.push(newNote);
    res.status(201).json({ data: newNote });
  } else {
    res.status(400).json({ error: "A 'text' property is required." });
  }
});
// Not found handler
app.use((req, res) => {
  res.status(404).json({ error: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

module.exports = app;