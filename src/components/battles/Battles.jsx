import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import HamsterCard from './HamsterCard'
import {getHamster, getHamsterImg} from './battleFunctions'

const Battles = () => {
    const [hamster1, setHamster1] = useState({})
    const [hamster1Img, setHamster1Img] = useState({})
    const [hamster2, setHamster2] = useState({})
    const [hamster2Img, setHamster2Img] = useState({})

    // Hamster1
    useEffect(() => {
        const fetchData = async () => { 
            const result = await getHamster()
            setHamster1(result)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchImg = async () => {
            const imgURL = await getHamsterImg(hamster1.imgName)
            setHamster1Img(imgURL)
        }
        fetchImg();
    }, [hamster1])
    
    //Hamster2
    useEffect(() => {
        const fetchData = async () => { 
            const result = await getHamster()
            setHamster2(result)
        }
        fetchData();
    }, [])
    
    useEffect(() => {
        const fetchImg = async () => {
            const imgURL = await getHamsterImg(hamster2.imgName)
            setHamster2Img(imgURL)
        }
        fetchImg();
    }, [hamster2])
    // Fetches the image that corresponds with the hamster
   
    return (
        <StyledMain>
            <StyledContainer>

            <StyledH1>
                BATTLE Section
            </StyledH1>
            {hamster1 && hamster1Img
                ? <StyledCardPlacer>
                        <HamsterCard hamster={hamster1} hamsterImg={hamster1Img ? hamster1Img : null} />
                    </StyledCardPlacer>
                : null 
            }
            <h2>VS</h2>
            {hamster2 && hamster2Img
                ? <StyledCardPlacer>
                        <HamsterCard hamster={hamster2} hamsterImg={hamster2Img ? hamster2Img : null} />
                    </StyledCardPlacer>
                : null 
            }
            </StyledContainer>
        </StyledMain>
    )
}

const StyledMain = styled.main`
    display: grid;
    grid-template-columns: 1fr 80vw 1fr;
    grid-template-rows: 1fr 45vh 5em auto;
    background-color: lightcoral;
    height: 100%;
    background-color: grey;
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 2 / 3;
`

const StyledH1 = styled.h1`
    display: flex;
    justify-content: center;
    grid-column: 2 / 3;
`

const StyledCardPlacer = styled.div`
    display: flex;
    grid-column: 2 / 3;

`

export default Battles