const express = require('express')
const router = express.Router();
const knex = require('../db/knex.js');
const bookFunctions = require('../functions/books.js');
router.get('/', (req, res, next) => {
    knex('book')
        .join('book_author', 'book.id', '=', 'book_author.book_id')
        .join('author', 'book_author.author_id', 'author.id')
        .then(bookData => {
        let bookList = bookFunctions.formatBookData(bookData);
        res.json(bookList);
        });
});

module.exports = router;
