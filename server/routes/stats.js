const { Router } = require('express');
const {db} = require('./../firebase')
const router = new Router();

// How many games have been played
router.get('/totalGames', async (req, res) => {

    try{
        let snapshot = await db.collection('stats').doc('totalGames').get()

        res.send({msg: snapshot.data().total})
     }
    catch(err) {
        console.log(err)
        res.status(500).send('Error getting total number of games', err)
    }
})

router.put('/totalGames/reset', async (req, res) => {
    try{
        let snapshot = await db.collection('stats').doc('totalGames').get()
        let total = snapshot.data()
        total.total = 0
        db.collection('stats').doc('totalGames').set(total)
        .then( res.send({msg: `Total number of games reset to ${total.total}`}) )
        .catch(err => {throw err})
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Error resetting total number of games', err)
    }
})

router.get('/contestants', async (req, res) => {
    try{
        let snapshot = await db.collection('stats').doc('hamsterCount').get()
        res.send({msg: snapshot.data().total})
     }
    catch(err) {
        console.log(err)
        res.status(500).send('Error getting total number of hamsters', err)
    }
})

module.exports = router