var Joi = require('joi');

var schema = Joi.object().keys({
    title: Joi.string().min(3).max(30).required(),
    genre: Joi.string().min(3).max(30),
    description: Joi.string(),
    cover_url: Joi.string(),
    author_id :Joi.array()
});

module.exports = schema
