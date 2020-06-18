const { Router } = require('express');
const fs = require('fs')
const { db, storage } = require('../firebase');
const router = new Router();


// Hämta RANDOM hamster
router.get('/random', async (req, res) => {
    try{
        let snapshot = await db.collection('hamsters').get()
        let curHamsterTotal = 0;
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
        const bucket = storage.bucket(`hamster-wars.appspot.com`)
        const imageFile = bucket.file(`hamsterImgs/${req.params.fileName}`)

        // check if image exists in bucket then get the URL and send it back
        const fileExists = await imageFile.exists().then(data => data[0]).catch(error => {throw error})
        const imagePromise = fileExists 
            ? imageFile.getSignedUrl({
                action: "read",
                expires: '03-17-2025'
            })  
            .then(data => data[0])
            .catch(err => {throw err})
            : null;

        const hamsterImage = await imagePromise

        res.send({"url": hamsterImage})
        
    } catch (error) {
        console.log('file dosen\'t exist, error: ', error)
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
            .then(res.send(hamster))
            .catch(err => {throw err})
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

router.put('/reset', async (req, res) => {
    try {
        let snapshot = await db.collection('hamsters').get()
        snapshot.forEach(doc => {
            let hamster = doc.data();

            hamster.wins = 0
            hamster.defeats = 0
            hamster.games = 0

            db.collection('hamsters').doc(doc.id).set(hamster)
            .catch(err => {throw err})
        })
    }
    catch(err) {
        res.status(500).send('Was not able to reset hamster: ', err)
    }
})

router.delete('/:id/delete', async (req, res) => {
    try {
        let imgName = [];
        let snapshot = await db.collection('hamsters').where('id', '==' , req.params.id*1).get()
        snapshot.forEach(doc => {
            imgName.push(doc.data().imgName)
            doc.ref.delete()
            .then(`Hamster id: ${req.params.id} successfuly deleted`)
            .catch(err => {throw err})
        })
        res.send(`Hamster with id: ${req.params.id} have been successfully deleted`)
        const bucket = storage.bucket(`hamster-wars.appspot.com`)
        const file = bucket.file(`hamsterImgs/${imgName[0]}`)
        
        // file.delete(function(err, apiResponse) {});

        //-
        // If the callback is omitted, we'll return a Promise.
        //-
        file.delete().then(function(data) {
        const apiResponse = data[0];
        });

    } catch (error) {
        console.log({msg: 'Error deleteing hamster', error: error})
        return error
    }
})

//Lägg till en ny hamster
router.post('/add', async (req, res) => {
    try {
        //Saves the imagefile
        const imgData = req.files.image
        const bucket = storage.bucket(`hamster-wars.appspot.com`)
        const fileName = `hamsterImgs/${req.files.image.name}`;
        const file = bucket.file(fileName);

        const saveImage = await imgData.mv(__dirname + `./../uploads/${req.files.image.name}`,  (err) => {
            if (err) {console.log('Error saving file in uploadfolder:', err); throw err}
            console.log('fileimage saved in upload folder!')
        })
    
        const createStream = fs.createReadStream(__dirname + `./../uploads/${req.files.image.name}`)
        .pipe(file.createWriteStream({
            metadata: {
              contentType: 'image/jpeg',
              metadata: {
                custom: 'Cute hamster image'
              }
            }
        }))
        .on('error', function(err) {
            if (err) throw err
            console.log('error create readstream: ', err)
        })
        .on('finish', function() {
            // The file upload is complete.
            console.log('Image uploaded!')
        })
        
        Promise.all([saveImage, createStream])
        .then((data) => {
            fs.unlinkSync(__dirname + `./../uploads/${req.files.image.name}`, (err) => {
                if (err) throw err
            })
        })
    
        let curHamsterTotal = 0;
        let snapshot = await db.collection('hamsters').get()
        //Räknar alla hamstrar som finns i db
        snapshot.forEach(doc => {
            curHamsterTotal++
        })
        // Lägger till hamsterId beräknat på hur många som redan finns i db och lägger till samma id på bildnamnet
        let newHamster = {
            id: curHamsterTotal + 1,
            name: req.body.name,
            age: req.body.age,
            loves: req.body.likes,
            favFood: req.body.food,
            wins: 0,
            defeats: 0,
            games: 0,
            imgName: req.files.image.name
        }
        // Sparar den nya hamstern i db och uppdaterar hamsterCount i stats
        db.collection('hamsters').doc().set(newHamster)
        .then((console.log ({msg: `Hamster has been added.`, hamster: newHamster})))
        .catch(err => {throw {errmsg:`Error adding hamster`, error: err}})
        .then( db.collection('stats').doc('hamsterCount').set({total: curHamsterTotal + 1}))
        .catch(err => {throw {errmsg:`Error updating hamsterCount`, err: err}})
        .then(() => console.log('Image removed from temp directory'))
        .then(res.send(newHamster))
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Problem adding hamster: ', err)
    }
})

// router.put('/addImage', async (req, res) => {
//     try {

//         let storageRef = fbStorage.ref(`hamsterImgs/hamster-${curHamsterTotal + 1}.jpeg`)
//         storageRef.put(req.body)
//     } catch (error) {
        
//     }
// })
    
module.exports = router