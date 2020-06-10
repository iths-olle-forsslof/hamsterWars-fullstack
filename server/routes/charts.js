const { Router } = require('express');
const { db } = require('../firebase');
const router = new Router();

router.get('/top', async (req, res) => {
    try {
        let topHamsters = [];
        await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                topHamsters.push(doc.data())
            })
        })
        .catch(err => {throw err})
        res.send(topHamsters)
    }
    catch(err) {
        console.error(err)
        res.status(500).send(`Could not get top 5 winners: `, err)
    }
})

router.get('/bottom', async (req, res) => {
    try {
        let botHamsters = [];
        await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                botHamsters.push(doc.data())
            })
        })
        .catch(err => {throw err})
        res.send(botHamsters)
    }
    catch(err) {
        console.error(err)
        res.status(500).send(`Could not get top 5 losers: `, err)
    }
})


module.exports = router