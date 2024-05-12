//create web server
const express = require('express');
const app = express();
app.use(express.json());
//import data
const comments = require('./data/comments');
//import functions
const { getNewId, getNewDate } = require('./utils');
// Path: /comments
//GET method
app.get('/comments', (req, res) => {
    res.json(comments);
});
//POST method
app.post('/comments', (req, res) => {
    const { body } = req;
    if (!body.text) {
        return res.status(400).json({ msg: 'Text is required' });
    }
    const newComment = {
        id: getNewId(comments),
        text: body.text,
        date: getNewDate(),
    };
    comments.push(newComment);
    res.json(newComment);
});
//GET method
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ msg: `Comment with id ${req.params.id} not found` });
    }
    res.json(comment);
});
//PUT method
app.put('/comments/:id', (req, res) => {
    const { body } = req;
    if (!body.text) {
        return res.status(400).json({ msg: 'Text is required' });
    }
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ msg: `Comment with id ${req.params.id} not found` });
    }
    comment.text = body.text;
    res.json(comment);
});
//DELETE method
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ msg: `Comment with id ${req.params.id} not found` });
    }
    comments.splice(index, 1);
    res.json({ msg: `Comment with id ${req.params.id} deleted` });
});
// Path: /comments/:id
module.exports = app;