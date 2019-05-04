
//from API.js
const mongoose = require('mongoose');
const Book = require('../models/book');
const { Router } = require('express');

const router = new Router();

router.post('/books/:id', (req, res) => {
    //req.params.id
    console.log(req.body);
    // goes to mongodb, prob using mongoose, using the model Book
})

//router.get, etc.

module.exports = router;