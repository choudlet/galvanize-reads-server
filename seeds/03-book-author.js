
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
return knex.raw('DELETE FROM book_author; ALTER SEQUENCE book_author_id_seq RESTART WITH 9')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('book_author').insert({id: 1, book_id: 1, author_id: 1}),
        knex('book_author').insert({id: 2, book_id: 1, author_id: 5}),
        knex('book_author').insert({id: 3, book_id: 1, author_id: 6}),
        knex('book_author').insert({id: 4, book_id: 2, author_id: 2}),
        knex('book_author').insert({id: 5, book_id: 3, author_id: 3}),
        knex('book_author').insert({id: 6, book_id: 4, author_id: 4}),
        knex('book_author').insert({id: 7, book_id: 5, author_id: 4}),
        knex('book_author').insert({id: 8, book_id: 6, author_id: 4}),
      ]);
    });
};
