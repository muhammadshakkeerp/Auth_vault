// index.js
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json()); // json middleware :- Automatically convert incoming JSON into JavaScript objects.

app.get('/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// BUG IS HERE ON PURPOSE — no validation. Don't fix yet, test it first.
app.post('/notes', async (req, res) => {
  const { title, body } = req.body;
  const result = await pool.query(
    'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *',
    [title, body]
  );
  res.status(201).json(result.rows[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mini-Vault running on port ${PORT}`))