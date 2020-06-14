import React from 'react';
import styled, {keyframes} from 'styled-components'

const LoadingSpinner = () => {
    return (
        <StyledLoader>
            LOADING
        </StyledLoader>
    )
}

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const StyledLoader = styled.div`
    font-size: 1.3em;
    color: black;
    animation: ${rotate} 2s linear infinite;
`

export default LoadingSpinner