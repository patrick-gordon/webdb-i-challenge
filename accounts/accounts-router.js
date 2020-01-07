const express = require('express');

// database access using knex
const knex = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    //select all from accounts
    knex
    .select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: 'error getting accounts' })
    })
})


router.post('/', (req,res) => {
    const accountData = req.body;
    //insert () into values
    knex('accounts')
    .insert(accountData, 'id')
    .first()
    .then(ids => {
        const id = ids[0];
        res.status(200).json(id)
    })
    .catch(err => {
        console.log(err)
    res.status(500).json({ errorMessage: 'error creating account' })
})
})


module.exports = router;