const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
  return JSON.parse(data);
};

// Helper function to write notes to the db.json file
const writeNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
};

// Retrieve all notes
router.get('/', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Save a new note
router.post('/', (req, res) => {
  const newNote = {
    id: uuidv4(), // Generate a unique ID for the new note
    title: req.body.title,
    text: req.body.text,
  };

  const notes = readNotes();

  notes.push(newNote);

  writeNotes(notes);

  res.json(newNote);
});

router.delete('/:id', (req, res) => {
  let notes = readNotes();

  // Filter out the note with the specified ID
  notes = notes.filter((note) => note.id !== req.params.id);

  // Write the updated notes back to the file
  writeNotes(notes);

  // Send a response indicating success
  res.json({ message: 'Note deleted successfully' });
});

module.exports = router;
