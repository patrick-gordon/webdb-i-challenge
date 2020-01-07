const express = require('express');

const AccountRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send('<h1>HI</H1>')
})

module.exports = server;