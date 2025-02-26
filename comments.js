// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let comments = [];

// Endpoint to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Endpoint to add a new comment
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
        return res.status(400).json({ error: 'Name and comment are required' });
    }
    const newComment = { id: comments.length + 1, name, comment };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Endpoint to delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(comment => comment.id !== parseInt(id));
    res.status(204).end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});