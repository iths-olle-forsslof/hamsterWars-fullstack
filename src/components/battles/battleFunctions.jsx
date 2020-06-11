// function that fetches two random hamsters
let currentHamster1;

console.log('currHamster outside function: ', currentHamster1)
async function getHamster() {
    try {
        const rawHamster = await fetch('api/hamsters/random')
        const jsonHamster = await rawHamster.json()
        if (!currentHamster1){
            currentHamster1 = jsonHamster;
            console.log('currHamster inside function: ', currentHamster1)
        } else if (currentHamster1.id === jsonHamster.id){
            getHamster()
        }
        return jsonHamster
    } catch (error) {
        console.error('Error fetching hamster because ', error)
        return null
    }
}

async function getHamsterImg(fileName) {
    try {
        const hamsterURL = await fetch(`api/hamsters/hamsterImage/${fileName}`)
        const resp = await hamsterURL.json()
        return resp;
    } catch (error) {
        console.error('Error fetching hamster image because ', error)
        return null
    }
}

// function that posts the clicked "winner" to the db and update the games played (POST to /games)

export {getHamster, getHamsterImg}