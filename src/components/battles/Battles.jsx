import React, { useState } from 'react';
import styled from 'styled-components'

const Battles = () => {

    const [hamsters, setHamsters] = useState()

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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightcoral;
    height: 500px;
    background-color: green;
`;

export default Battles