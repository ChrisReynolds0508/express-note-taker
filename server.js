const express = require('express')
const html_routes = require('./routes/html-routes');
const api_routes = require('./routes/api-routes');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(html_routes);
app.use(api_routes);

app.get('/api/notes', (req, res) => {
    res.json([
      { id: 1, title: 'Note 1', text: 'This is the first note' },
      { id: 2, title: 'Note 2', text: 'This is the second note' }
    ]);
  });
  
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    // In a real app, you would save this to a database
    newNote.id = Date.now(); // Mock ID generation
    res.status(201).json(newNote);
  });
  
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id, 10);
    // In a real app, you would delete this from a database
    res.status(204).end(); // No content to return
  });

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
}); 