import React, { useState } from 'react';
import styled from 'styled-components'
import HamsterCard from './HamsterCard'

const Battles = () => {

    const [hamster1, setHamster1] = useState()
    const [hamster2, setHamster2] = useState()

    const handleClick = async () => {
        const arr = await getHamsterTest()
        console.log( 'arr i handleClick: ', arr)
        setHamsters([arr])
    }

    return (
        <StyledMain>
            <h1>
            BATTLE Section
            </h1>

            <HamsterCard hamster={hamsters} />

            <p> 
                <button onClick={handleClick} >Get random hamster</button>
            </p>
            <div>
                { hamsters 
                    ? hamsters.map(hamster => (
                        <p>{hamster.name} is {hamster.age} y/o and likes to eat {hamster.favFood}.</p>
                    ))
                    : null }
            </div>
        </StyledMain>
    )
}

async function getHamsterTest() {
    try {
        let randomHamster = await fetch('api/hamsters/random');
        console.log('fetch made and recieved')
        let response = await randomHamster.json()
        console.log(response)
        return response

    } catch (e) {
        console.log('Error fetching hamster because ', e)
        return null
    }
}

const StyledMain = styled.main`
    display: grid;
    grid-template-columns: auto 1fr 1fr auto;
    background-color: lightcoral;
    height: 100%;
    background-color: green;
`;

export default Battles