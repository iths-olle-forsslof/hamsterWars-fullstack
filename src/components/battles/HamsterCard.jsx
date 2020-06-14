import React from 'react';
import styled from 'styled-components'

const HamsterCard = ({hamster, hamsterImg, otherHamster, isRight, handleClick}) => {

    return (
        <StyledCardWrapper
        onClick={ async () => await handleClick(hamster, otherHamster)} >
            { isRight
                ? <RightStyledTitle><h1> {hamster.name} </h1></RightStyledTitle>
                : <StyledTitle><h1> {hamster.name} </h1></StyledTitle>
             }
            <StyledPictureContainer>
                <img src={hamsterImg.url ? hamsterImg.url : null} alt="A very cute hamster" />
            </StyledPictureContainer>
            
        </StyledCardWrapper>
    )
}

const StyledCardWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat()(1fr, 9);
    grid-template-columns: repeat(1fr, 5);
    max-width: 450px;
    width: 100%;
    transition: transform .1s ease-in-out, box-shadow .1s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 0 8px 15px -1px rgba(0,0,0,.5);
    }
`

const StyledTitle = styled.div`
    grid-column: 1 / 2;
    grid-row: 6 / 7;
    display: flex;
    z-index: 10;

    & h1 {
        color: white;
        font-weight: bolder;
        text-align: center;
        text-transform: uppercase;
        text-shadow: 0px 2px 1px black;
        background-color: rgba(0,0,0,.4);
        padding: .2em .5em;
    }
`

const RightStyledTitle = styled(StyledTitle)`
    grid-column: 5 / 6;
    grid-row: 1 / 2;
    justify-content: flex-end;
`

const StyledPictureContainer = styled.div`
    position: relative;
    grid-column: 1 / 6;
    grid-row: 1 / 7;
    width: 100%;
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

export default HamsterCard

// ${ (function randomDeg(){
//     let rn = Math.floor(Math.random()*8)
//     if (rn % 2 === 0) return 'rotate(' + '-' + rn + 'deg)';
//     return 'rotate(' + '+' + rn + 'deg)';
// } () ) }; 