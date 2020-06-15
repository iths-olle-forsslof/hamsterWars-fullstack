import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import HamsterCard from './HamsterCard'
import LoadingSpinner from '../LoadingSpinner'
import Winner from './Winner'
import {getHamster, getHamsterImg, updateContestant, postMatchData} from './battleFunctions'

const Battles = () => {
    const [hamster1, setHamster1] = useState({})
    const [hamster1Img, setHamster1Img] = useState({})
    const [h1IsLoading, setH1IsLoading] = useState(true)

    const [hamster2, setHamster2] = useState({})
    const [hamster2Img, setHamster2Img] = useState({})
    const [h2IsLoading, setH2IsLoading] = useState(true)

    const [winner, setWinner] = useState(null)
    const [loser, setLoser] = useState(null)

    const [matchData, setMatchData] = useState({})
    const [displayWinner, setDisplayWinner] = useState(false)
    
    // Hamster1 (Different way of using async in useEffect)
    useEffect(() => {
        getHamster()
        .then(setHamster1)
        .catch(e => console.log('Error: ', e.message))
    }, [])

    useEffect(()=> {
        getHamsterImg(hamster1.imgName)
        .then(setHamster1Img)
        .then(() => {
            setTimeout(() => {
                setH1IsLoading(false)
            }, 400)
        })
        .catch(e => console.log('Error: ', e.message))
    }, [hamster1])

    // Hamster 2
    useEffect(() => {
        const fetchHamster = async () => {
            getHamster()
            .then(hamster => {
                if(hamster.id === hamster1.id) {
                    fetchHamster();
                } else {
                    setHamster2(hamster)
                }
            })
            .catch(e => console.log('Error: ', e.message))
        }
        fetchHamster()
    }, [hamster1])

    useEffect(()=> {
        getHamsterImg(hamster2.imgName)
        .then(setHamster2Img)
        .then(() => {
            setTimeout(() => {
                setH2IsLoading(false)
            }, 400)
        })
        .catch(e => console.log('Error: ', e.message))
    }, [hamster2])

    const handleClick = async (winner, loser) => {
        try {
            const updatedWinner = { ...winner, wins: 1, defeats: 0}
            const updatedLoser = { ...loser, wins: 0, defeats: 1}
            const updatedMatchData = handleMatchData(updatedWinner, updatedLoser)
            const updateWinner = async (win) => await updateContestant(win)
            const updateLoser = async (loss) => await updateContestant(loss)
            const updateMatchStats = async (data) => await postMatchData(data)
            await Promise.all([updateWinner(updatedWinner), updateLoser(updatedLoser), updateMatchStats(updatedMatchData)])
            .then(() => {
                setWinner(updatedWinner)
                setLoser(updatedLoser)
                setMatchData(updatedMatchData)
            })
            .then(() => setDisplayWinner(true))
            .catch(err => {throw err}) 
        } catch (error) {
            console.log(error)
        }
    }

    const handleMatchData = (winner, loser) => {
        return {
            id: '',
            timeStamp: '',
            contestants: [{id: winner.id, name: winner.name}, {id: loser.id, name: loser.name}],
            winner: winner,
            loser: loser
        }
    }

    const playAgain = async () => {
        await getHamster()
        .then(hamster => setHamster1(hamster))
        .then(() => setDisplayWinner(false))
        .catch(e => console.log(e))
    }

    return (
        <StyledMain >
            <header>
                <StyledH1>
                    HamsterWARS ARENA
                </StyledH1>
            </header>

            { displayWinner && winner && loser && matchData &&
                 <Winner winner={winner} 
                 winnerImg={winner === hamster1 ? hamster1Img : hamster2Img} 
                 playAgain={playAgain} />
            }

            <StyledBattleContainer style={ displayWinner ? {display: 'none'} : null } >
                <StyledCardPlacer>
                    { h1IsLoading
                        ? <LoadingSpinner />
                        : <HamsterCard hamster={hamster1} 
                        hamsterImg={hamster1Img}
                        otherHamster={hamster2}
                        handleClick={handleClick} />
                    }
                </StyledCardPlacer>

                { !h1IsLoading && !h2IsLoading &&
                    <StyledVs>
                        <h1>VERSUS</h1>
                    </StyledVs>
                }
                
                <StyledCardPlacer>
                    { h2IsLoading
                        ? <LoadingSpinner />
                        : <HamsterCard hamster={hamster2} 
                        hamsterImg={hamster2Img} 
                        otherHamster={hamster1}
                        isRight={true} 
                        handleClick={handleClick} /> 
                    }
                </StyledCardPlacer>
            </StyledBattleContainer>
            <StyledH3 style={ displayWinner ? {display: 'none'} : null } >You decide the winner. Click on the cutest hamster!</StyledH3>
        </StyledMain>
    )
}

const StyledMain = styled.main`
    display: grid;
    grid-template-columns: 1fr 70vw 1fr;
    grid-template-rows: [header-start] 5em [battle-start] 5fr 2em auto;
    background-color: var(--white);
    height: 100%;

    & header {
        grid-column: 1 / 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: center;
        padding:.5em;
        text-align: center;
    }
`;

const StyledBattleContainer = styled.div`
    position: relative;
    display: flex;
    flex-flow: row;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-row: battle-start / 3;
    grid-column: 2 / 3;

    @media (min-width: 800px) {
        flex-direction: row;
    }
`

const StyledVs = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--black);
    max-width: 100%;
    z-index: 20;
    transform: rotate(-8deg);

    & h1 {
        color: var(--white);
        -webkit-text-stroke: 1px var(--black);
        padding: .2em 1em;
    }
`

const StyledCardPlacer = styled.div`
    display: flex;
    min-width: 350px;
    max-width: 450px;
    justify-content: center;
    align-items: center;
` 

const StyledH1 = styled.h1`
    display: flex;
    justify-content: center;
    grid-row: header-start / battle-start;
    grid-column: 2 / 3;
    `
const StyledH3 = styled.h3`
    grid-column: 2 / 3;
    display: block;
    align-self: center;
    justify-self: center;
    text-align: center;
    `



export default Battles