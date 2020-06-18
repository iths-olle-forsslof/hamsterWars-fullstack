import React from 'react';
import styled from 'styled-components'

const Start = () => {
    return (
        <StyledSection>
            <StyledDiv>

            <h1>Welcome to Hamster Wars!</h1>
		    <p>Here hamsters fight each other in a battle of cuteness... or something else. It's up to you to decide who will be the winner and why! Enjoy!</p>
            </StyledDiv>
        </StyledSection>
    )
}

const StyledSection = styled.section`
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: 50vh;
    justify-content: center;
    align-items: center;

`

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding: 2em;
    & h1 {
        margin-bottom: 1em;
    }
`
export default Start