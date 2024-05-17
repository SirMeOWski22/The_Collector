const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dbPath = path.join(__dirname, '../db/db.json');

// Helper functions
const readNotes = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
};

// Return all notes
router.get('/', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

//Delete notes
router.delete('/:id', (req, res) => {
  let notes = readNotes();
  notes = notes.filter((note) => note.id !== req.params.id);
  writeNotes(notes);
  res.json({ ok: true });
});

module.exports = router;
