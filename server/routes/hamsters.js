const { Router } = require('express');
const { db, auth, storage } = require('../firebase');
const router = new Router();

let curHamsterTotal = 0;
// Hämta RANDOM hamster
router.get('/random', async (req, res) => {
    try{
        let snapshot = await db.collection('hamsters').get()
        //Sparar alla hamstrar i db i en array
        let hamster = [];
        snapshot.forEach(doc => {
            hamster.push(doc.data());
            curHamsterTotal++
        })

        let randomNr = Math.floor(Math.random() * hamster.length + 1);
        await res.send(hamster[randomNr])

        // Updates db with total num of hamsters
        // await db.collection('stats').doc('hamsterCount').set({ total: curHamsterTotal });
    }
    catch (err) {
        console.error(err);
    }
})

// Get the image from Storage. Img file name from hamsterobject provided as a param
router.get('/hamsterImage/:fileName', async (req, res) => {
    try {
        let imagePromise = storage.bucket(`hamster-wars.appspot.com`).file(`hamsterImgs/${req.params.fileName}`)
        .getSignedUrl({
            action: "read",
            expires: '03-17-2025'
        })
        .then(data => data[0])
        const hamsterImage = await imagePromise
        res.send({"url": hamsterImage})
        
    } catch (error) {
        console.log(error)
    }
})

// Hämta alla Hamstrar (sorterade i ID-ordning)
router.get('/', async (req, res) => {
    try{
        let hamsters = [];
        await db.collection('hamsters').orderBy("id").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
            hamsters.push(doc.data()) })
        })
        await res.send(hamsters)
    }
    catch (err) {
        console.error(err);
    }
})

// Hämta hamster med :id
router.get('/:id', async (req, res) => {
    try{
        let snapshot = await db.collection('hamsters').where("id", "==", req.params.id*1).get()
        let hamster;
        snapshot.forEach(doc => {
            hamster = doc.data();
        })
        if(!hamster) {
            res.send(`Could not retrieve hamster. ID "${req.params.id}" do not exist.`)
        } else {
            res.send(hamster)
        }
    }
    catch (err) {
        console.error(err);
    }
})

//Updatera hamsters matchresultat
router.put('/:id/results', async (req, res) => {
    // leta reda på hamster med ID
    try{
        let snapshot = await db.collection('hamsters').where("id", "==", req.params.id*1).get();

        // Jag uppdaterar totalgames i POST/games så det behöver inte göras här
        // let currentTotalGames = await db.collection('stats').doc('totalGames').get();
        
        snapshot.forEach(doc => {
            let hamster = doc.data();
            
            //uppdatera egenskaperna
            if(parseInt(req.body.wins) > 0) {
                hamster.wins++
                hamster.games++
            }
            else if(parseInt(req.body.defeats) > 0) {
                hamster.defeats++
                hamster.games++
            }

            //Skriv in den nya uppdaterade hamstern i db
            db.collection('hamsters').doc(doc.id).set(hamster)
            .then(res.send({msg:`The hamster known as ${hamster.name} with id ${hamster.id} is updated. Wins: ${hamster.wins}, Defeats: ${hamster.defeats}`}))
            .catch(err => {throw err})

            // //uppdatera totalgames i db
            // let totalGames = currentTotalGames.data();
            // totalGames.total++
            // db.collection('stats').doc('totalGames').set(totalGames)
        })
    }
    catch(err) {
        console.error(err)
        res.status(500).send(err);
    }
})

// Nollställ en hamsters resultat OBS! Endast för testsyften 
router.put('/:id/reset', async (req, res) => {
    try {
        let snapshot = await db.collection('hamsters').where("id", "==", req.params.id*1).get();

        snapshot.forEach(doc => {
            let hamster = doc.data();

            hamster.wins = 0
            hamster.defeats = 0
            hamster.games = 0

            db.collection('hamsters').doc(doc.id).set(hamster)
            .then(res.send( {msg: `Hamster with ${req.params.id} has ben reset.`} ))
            .catch(err => {throw err})
        })
    }
    catch(err) {
        res.status(500).send('Was not able to reset hamster: ', err)
    }
})

//Lägg till en ny hamster
router.post('/add', async (req, res) => {
    try {
        let snapshot = await db.collection('hamsters').get()

        //Räknar alla hamstrar som finns i db
        snapshot.forEach(doc => {
            curHamsterTotal++
        })
        
        // Lägger till hamsterId beräknat på hur många som redan finns i db och lägger till samma id på bildnamnet
        let newHamster = req.body
        newHamster.id = curHamsterTotal + 1
        newHamster.imgName = `hamster-${curHamsterTotal + 1}.jpg`

        // Sparar den nya hamstern i db och uppdaterar hamsterCount i stats
        db.collection('hamsters').doc().set(req.body)
        .then(res.send({msg: `Hamster has been added.`, hamster: req.body}))
        .catch(err => {throw {errmsg:`Error adding hamster`, err: err}})
        .then( db.collection('stats').doc('hamsterCount').set({total: curHamsterTotal + 1}))
        .catch(err => {throw {errmsg:`Error updating hamsterCount`, err: err}})

    }
    catch (err) {
        console.log(err)
        res.status(500).send('Problem adding hamster: ', err)
        
    }
})
    
module.exports = router