const { Router } = require('express');
const {db} = require('./../firebase')
const router = new Router();

// How many games have been played
router.get('/total', async (req, res) => {

    try{
        let snapshot = await db.collection('stats').doc('totalGames').get()

        res.send({msg: `Total number of games held: ${snapshot.data().total}`})
     }
    catch(err) {
        console.log(err)
        res.status(500).send('Error getting total number of games', err)
    }
})

router.get('/contestants', async (req, res) => {
    try{
        let snapshot = await db.collection('stats').doc('hamsterCount').get()
        res.send({msg: `Number of hamsters competing in the war: ${snapshot.data().total}`})
     }
    catch(err) {
        console.log(err)
        res.status(500).send('Error getting total number of hamsters', err)
    }
})

module.exports = router