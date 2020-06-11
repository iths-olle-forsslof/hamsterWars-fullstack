import React from 'react';
import styled from 'styled-components'

const HamsterCard = ({hamster, hamsterImg}) => {
    return (
        <StyledCardWrapper>
            <StyledTitle><h1> {hamster.name} </h1></StyledTitle>
            <StyledPictureContainer>
                <img src={hamsterImg.url} />
            </StyledPictureContainer>
            <StyledInfoCont>
                {hamster.age + ' ' + hamster.name}
            </StyledInfoCont>
        </StyledCardWrapper>
    )
}

const StyledCardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1em  minmax(320px, 450px)  1em;
    grid-template-rows: [name-start] auto [topframe-start] minmax(320px, 450px) [info-start] auto;
    /* grid-template-areas: ". . name . ."
    "image image image image image"
    ". . info . .";
    margin: 0 auto; */
`
const StyledTitle = styled.div`
    /* grid-area: name; */
    grid-column: 2 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: lightyellow; */
    border-radius: .5em;
    padding: .5em;
    max-width: 80%;
        & h1 {
            font-size: 3em;
            text-shadow: -3px -3px 0 white, -3px 3px 0 white, 3px -3px 0 white, 3px 3px 0 white;  
        }
`
const StyledPictureContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* grid-area: image; */
    grid-column: 2 / 3;
    padding: 1em;
    min-height: 320px;
    max-height: 450px;
    min-width: 320px;
    max-width: 450px;
    background-color: var(--pink);
    border-radius: 1em;
    overflow: hidden;
    box-shadow: 0 5px 7px 1px rgba(0,0,0,.3);

    & img {
        width: calc(100% - .5em);
        height: calc(100% - .5em);
        object-fit: cover;
        border-radius: .5em;
        box-shadow: 0 5px 14px -1px rgba(0,0,0,.3);
        margin: 0px;
        border: 4px solid white;
    }
`
const StyledInfoCont = styled.div`
    /* grid-area: info; */
    grid-column: 2 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightyellow;
    border-radius: .5em;
`

export default HamsterCard