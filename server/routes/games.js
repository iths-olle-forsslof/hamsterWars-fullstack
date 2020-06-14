const { Router } = require('express');
const {db} = require('./../firebase')
const router = new Router();

// Sparar ett matchobjekt i db samt uppdaterar total number of games played samt uppdaterar hamsterobjekten
router.post('/', async (req, res) => {
    console.log('request of updating match recieved, req.body: ', req.body)
    try {
        // Hämta antal totalgames för att sätta ett match:id
        let snapshotGames = await db.collection('stats').doc('totalGames').get();

        // // Hämtar alla hamstrar och spara dem i en array samt sparar deras docID i en separat array
        // let snapshotHamsters = await db.collection('hamsters').orderBy('id', 'asc').get();

        // let docIds = []
        // let allHamsters = []
        // snapshotHamsters.forEach(doc => {
        //     allHamsters.push(doc.data())
        //     docIds.push(doc.id)
        // })

        // Spara ner req.body i ett gameObj, och ändra sedan id:t och sätt datum.
        // Lägger också till hela hamsterobjekten i contestants och winner samt loser
        let gameObj = req.body
        gameObj.id = snapshotGames.data().total + 1,
        gameObj.timeStamp = new Date()
        gameObj.contestants,
        gameObj.winner,
        gameObj.loser
        
        // Spara gameobjektet i db samt uppdaterar vinnar och loser hamster-obj i db
        await db.collection('games').doc().set(gameObj)
        .then( res.send({msg: `Game is saved with matchID: ${gameObj.id}`, winner: gameObj.winner, loser: gameObj.loser}))
        .catch((err) => {throw {errmsg: 'Error saving match response', error: err}})

        // Uppdatera totalGames
        db.collection('stats').doc('totalGames').set({total: gameObj.id})
        .then(console.log('Total number of games updated.'))
        .catch(err => {throw {errmsg: 'Error updating total games', error: err}})
    }
    catch(err) {
        console.log(err);
        res.status(500).send(`Something went wrong. Error msg: `, err.message)
    }
})

// Hämta alla matcher som spelats
router.get('/', async (req, res) => {

    let allGames = [];
    try {
        await db.collection('games').orderBy('timeStamp', 'asc').get()
        .then(querySnapshot => {
            querySnapshot.forEach(game => {
            allGames.push(game.data()) })
        })
        .then(() => res.send(allGames))
        .catch(err => {throw err})
        
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error retrieveing all games: ', err)
    }
})

module.exports = router