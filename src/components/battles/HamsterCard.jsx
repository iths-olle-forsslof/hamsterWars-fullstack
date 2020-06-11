import React from 'react';
import styled from 'styled-components'

const HamsterCard = ({hamster, hamsterImg}) => {
    return (
        <StyledCardContainer>
            <img src={hamsterImg.url} />
        </StyledCardContainer>
    )
}

const StyledCardContainer = styled.div`
    display: block;
    padding: 1em;
    margin: 1em;
    width: 100;
    max-width: 350px;
    max-height: 350px;
    background-color: white;
    border-radius: 1em;
    overflow: hidden;
        & img {
            width: 100%;
            max-width: 350px;
            height: 100%;
            max-height: 350px;
            object-fit: cover;
            border-radius: .5em;
            box-shadow: 0 5px 8px -1px rgba(0,0,0,.2);
        }
`

export default HamsterCard