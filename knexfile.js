// Update with your config settings.
if (process.env.NODE_ENV !== 'production') require('dotenv').config({
    silent: true
});
module.exports = {

    development: {
        client: 'pg',
        connection: 'postgres://localhost/galvanize-reads'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }

};
