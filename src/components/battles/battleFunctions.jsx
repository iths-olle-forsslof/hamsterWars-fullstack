// function that fetches two random hamsters
// let currentHamster1;

// console.log('currHamster outside function: ', currentHamster1)
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
        return 'https://image.freepik.com/free-vector/glitch-error-404-page-background_23-2148072533.jpg'
    }
}

// function that posts the clicked "winner" to the db and update the games played (POST to /games)

export {getHamster, getHamsterImg}