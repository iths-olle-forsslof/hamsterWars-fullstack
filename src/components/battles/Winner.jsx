import React from 'react';
import styled from 'styled-components'

const Winner = ({winner, winnerImg, playAgain}) => {
    return (
        <StyledContainer>
            <StyledCardWrapper >
                <StyledPictureContainer>
                    <img src={winnerImg.url ? winnerImg.url : null} alt="A very cute hamster" />
                </StyledPictureContainer>
            </StyledCardWrapper>
            <StyledInfo>
                <h2>THE WINNER IS {winner.name.toUpperCase()}</h2>
                <div>
                    <ul>
                        <li> Name: {winner.name} </li>
                        <li>Age: {winner.age}</li>
                        <li>Wins: {winner.wins}</li>
                        <li>Losses: {winner.defeats}</li>
                        <li>Favourite food: {winner.favFood}</li>
                    </ul>
                </div>
                <button onClick={playAgain} > NEW BATTLE </button>
            </StyledInfo>
        </StyledContainer>
    )
}

const StyledContainer = styled.main`
    grid-column: 1 / 4;
    grid-row: 2 / 6;
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: repeat (1fr, 9);
    
    /* @media (max-width: 800px) {
        flex-direction: row;
    } */
`

const StyledCardWrapper = styled.div`
    grid-row: 1 / 2;
    grid-column: 1 / 9;
    justify-self: center;
    display: grid;
    grid-template-rows: repeat()(1fr, 9);
    grid-template-columns: repeat(1fr, 5);
    max-width: 450px;
    width: 90%;
    transition: transform .1s ease-in-out, box-shadow .1s ease-in-out;
`

const StyledPictureContainer = styled.div`
    position: relative;
    grid-column: 1 / 6;
    grid-row: 1 / 7;
    width: 100%;
    align-self: center;
    background-color: var(--white);
    border-radius: .1em;
    border: 3px solid var(--black);
    box-shadow: 0 5px 3px -3px rgba(0,0,0,.3);
    background-color: white;
    overflow: hidden;
    
    &:after { /* This makes it so the image is always square. */
        content: '';
        display: block;
        padding-top: 100%;
    }

    & img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: .1em;
        padding: 10px;
        border: 1px solid var(--black);
    }
`

const StyledInfo = styled.div`
    grid-row: 5 / 9;
    grid-column: 2 / 8;
    display: flex;
    flex-flow: column wrap;
    /* flex-direction: column; */
    padding: 1em;
    align-self: center;

    & h2 {
        width: 100%;
        text-align: center;
    }

    & ul {
        width: 80%;
        font-size: .8em;
        list-style: none;
        align-self: center;
        border: 1px solid var(--black)
    }

    & button {
        align-self: center;
        min-width: 80%;
        border: 2px solid var(--black);
        background-color: white;
        box-shadow: 0 2px 4px -1px (0,0,0,.3);
    }
`

export default Winner