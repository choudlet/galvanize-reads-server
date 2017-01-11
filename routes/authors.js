const express = require('express')
const router = express.Router();
const knex = require('../db/knex.js');
router.get('/', (req,res,next)=>{
knex.select('*').from('book').then(bookData=>{
  res.send(bookData);
})
});

module.exports = router;
