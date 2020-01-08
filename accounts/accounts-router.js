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

router.get('/:id', (req,res) => { 
    // select * from accounts where id = req.params.id 
    knex
    .select('*')
    .from('accounts')
    .where({id: req.params.id})
    .first()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'error woth getting account by ID'})
    })
})

router.post('/', (req,res) => {
    const accountData = req.body;
    //insert () into values
    knex('accounts')
    .insert(accountData, 'id')
    .then(ids => {
        const id = ids[0];
        res.status(200).json(id)
    })
    .catch(err => {
        console.log(err)
    res.status(500).json({ errorMessage: 'error creating account' })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    knex('accounts')
    .where({ id })
    .update(changes)
    .then(count => {
        res.status(200).json({ updated: count })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'ERROR updating'})
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    knex('accounts')
    .where({ id })
    .del()
    .then(count => {
        res.status(200).json({deleted: count})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'error deleting'})
    })
})


module.exports = router;