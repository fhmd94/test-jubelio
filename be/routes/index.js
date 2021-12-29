'use strict';

const products = require('./product');

module.exports = ({ server, pqsql }) => {
    
    products({server, pqsql});

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello Word';
        }
    });

    // glob.sync('api/**/routes/*.js', {
    //     root: __dirname
    //   }).forEach(file => {
    //     const route = require(path.join(__dirname, file));
    //     server.route(route);
    //   });

    return server;
}