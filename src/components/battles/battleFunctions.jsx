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
    try {
        const request = await fetch(`api/hamsters/${hamster.id}/results`, {
            method: "PUT",
            body: JSON.stringify(hamster),
            headers: {"Content-Type": "application/json"}
        })
        const response = await request.json()
    
        return response
        
    } catch (error) {
        console.log('Error updating hamsterobj because: ', error)
        return error
    }
}

// update matchobject function

async function postMatchData(data) {
    try {
        const request = await fetch('api/games/', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        .catch(err => {throw err})
        const response = await request.json()

        return response

    } catch (error) {
        console.log('Error posting match because: ', error)
        return error;
    }
}

// function that posts the clicked "winner" to the db and update the games played (POST to /games)

export {getHamster, getHamsterImg, updateContestant, postMatchData}