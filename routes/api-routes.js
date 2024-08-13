const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get("/api/notes", async (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(db);
});

router.post("/api/notes", (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

router.delete("/api/notes/:id", (req, res) => {
    let data = fs.readFileSync('./db/db.json', 'utf8');
    const dataJSON = JSON.parse(data);
    const newData = dataJSON.filter((note) => {
        return note.id !== req.params.id
    });
fs.writeFileSync('./db/db.json', JSON.stringify(newData));
res.json(newData);
}); 

module.exports = router;
