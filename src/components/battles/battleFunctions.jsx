async function getHamster() {
    try {
        const rawHamster = await fetch('api/hamsters/random')
        const jsonHamster = await rawHamster.json()
        return jsonHamster
    } catch (error) {
        console.error('Error fetching hamster because ', error)
        return error
    }
}

async function getHamsterImg(fileName) {
    try {
        const hamsterURL = await fetch(`api/hamsters/hamsterImage/${fileName}`)
        const resp = await hamsterURL.json()
        return resp;
    } catch (error) {
        console.error('Error fetching hamster image because ', error)
        return error
    }
}

// post winner & loser function
async function updateContestant(hamster) {
    console.log('begining to upload hamster:', hamster )
    try {
        await fetch(`api/hamsters/${hamster.id}/results`, {
            method: "PUT",
            body: JSON.stringify(hamster),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(resp => console.log(resp))
        .catch(err => {throw err})
        
    } catch (error) {
        console.log('Error updating hamsterobj: ', error)
        return error
    }
}

// update matchobject function

function postMatch(data) {
    fetch('api/')
}

// function that posts the clicked "winner" to the db and update the games played (POST to /games)

export {getHamster, getHamsterImg, updateContestant}