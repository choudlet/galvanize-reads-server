const express = require('express')
const router = express.Router();
const knex = require('../db/knex.js');
const bookFunctions = require('../functions/books.js');
const Joi = require('joi');
const schema = require('../validation/newbook.js')
router.get('/', (req, res, next) => {
    knex('book')
        .join('book_author', 'book.id', '=', 'book_author.book_id')
        .join('author', 'book_author.author_id', 'author.id')
        .then(bookData => {
            let bookList = bookFunctions.formatBookData(bookData);
            console.log(bookList);
            res.json(bookList);
        });
});

router.get('/new', (req, res, next) => {
    knex('author').select('*').then((authors) => {
        res.json(authors);
    });
});

router.post('/new', (req, res, next) => {
    Joi.validate(req.body, schema, (err, value) => {
        if (!err) {
            let author_array = req.body.author_id;
            knex('book').insert({
                title: req.body.title,
                genre: req.body.genre,
                description: req.body.description,
                cover_url: req.body.cover_url
            }).returning('id').then((book_id) => {

                let promises = author_array.map((author_id) => {

                    knex('book_author').insert({
                        author_id: author_id,
                        book_id: book_id[0]
                    }).then(() => {})
                });

                return Promise.all(promises).then(() => {
                    res.send({
                        status: 'Book Stored Correctly',
                        success: true
                    })
                });
            });




        } else res.send({
            status: 'Not valid Book Input',
            success: false
        })
    })

});

router.get('/delete', (req, res, next) => {
    let id = req.query.id;
    knex('book').select('*').where('book.id', id)
        .join('book_author', 'book.id', '=', 'book_author.book_id')
        .join('author', 'book_author.author_id', 'author.id')
        .then(bookData => {
            let bookList = bookFunctions.formatBookData(bookData);
            res.send(bookList);
        })
});

router.get('/delete/confirm', (req, res, next) => {
    let id = req.query.id;
    knex('book').where('id', id).del().then(() => {
      console.log('cool');
        res.send({
            status: 'Deleted'
        });
    });
});

router.get('/edit', (req, res, next) => {
    let id = req.query.id;
    knex('book').select('*').where('book.id', id)
        .join('book_author', 'book.id', '=', 'book_author.book_id')
        .join('author', 'book_author.author_id', 'author.id')
        .then(bookData => {
            let bookList = bookFunctions.formatBookData(bookData);
            res.send(bookList);
        })
});

router.put('/edit', (req, res, next)=>{
  console.log(req.query);

});
module.exports = router;
