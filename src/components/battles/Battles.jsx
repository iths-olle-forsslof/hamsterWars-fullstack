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
            setH1IsLoading(false)
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
            setH2IsLoading(false)
        })

        .catch(e => console.log('Error: ', e.message))
    }, [hamster2])

    const handleClick = async (winner, loser) => {
        let updatedWinner = { ...winner, wins: 1, defeats: 0}
        let updatedLoser = { ...loser, wins: 0, defeats: 1}
        let updatedMatchData = handleMatchData(updatedWinner, updatedLoser)
        // let updateWinner =  await updateContestant(updatedWinner)
        // let updateLoser = await updateContestant(updatedLoser)
        // let updateMatchStats = await postMatchData(updatedMatchData)
        Promise.all([ updateContestant(updatedWinner),  updateContestant(updatedLoser),  postMatchData(updatedMatchData)])
        .then((data) => {
            setWinner(data[0])
            setLoser(data[1])
            setMatchData(data[2])
        })
        .then(() => setDisplayWinner(true))
        .catch(err => console.log(err))
    }

    // const handleClick = async (winner, loser) => {
    //     try {
    //         let updatedWinner = { ...winner, wins: 1, defeats: 0}
    //         let updatedLoser = { ...loser, wins: 0, defeats: 1}
    //         let updatedMatchData = handleMatchData(updatedWinner, updatedLoser)

    //         const winnerPromise = async (winning) => await updateContestant(winning)
    //         .then((data) => { updatedWinner = data}).catch(err =>{throw err})

    //         const loserPromise = async (losing) => await updateContestant(losing)
    //         .then(data => updatedLoser = data).catch(err =>{throw err})

    //         const matchPromise = async (match) => await postMatchData(match)
    //         .then(data => updatedMatchData = data).catch(err =>{throw err})

    //         await Promise.all([winnerPromise(updatedWinner), loserPromise(updatedLoser), matchPromise(updatedMatchData)])
    //         .then(() => {
    //             setWinner(updatedWinner)
    //             setLoser(updatedLoser)
    //             setMatchData(updatedMatchData)
    //         })
    //         .then(() => setDisplayWinner(true))
    //         .catch(err => {throw err}) 
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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
        setH1IsLoading(true)
        setH2IsLoading(true)
        setDisplayWinner(false)
        
        await getHamster()
        .then(hamster => setHamster1(hamster))
        .catch(e => console.log(e))
    }

    return (
        <StyledMain >
            <header>
                <StyledH1>
                    HamsterWARS ARENA
                </StyledH1>
            </header>
            { displayWinner && winner && loser &&
                 <Winner winner={winner} 
                 winnerImg={winner.id === hamster1.id ? hamster1Img : hamster2Img} 
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
                
                <StyledCardPlacer2>
                    { h2IsLoading
                        ? <LoadingSpinner />
                        : <HamsterCard hamster={hamster2} 
                        hamsterImg={hamster2Img} 
                        otherHamster={hamster1}
                        isRight={true} 
                        handleClick={handleClick} /> 
                    }
                </StyledCardPlacer2>
            </StyledBattleContainer>
            <StyledH3 style={ displayWinner ? {display: 'none'} : null } >You decide the winner. Click on the cutest hamster!</StyledH3>
        </StyledMain>
    )
}

const StyledMain = styled.main`
    display: grid;
    grid-template-columns: repeat (1fr, 4);
    grid-template-rows: [header-start] 5em [battle-start] 5fr 2em auto;
    background-color: var(--white);
    /* height: 100%; */

    & header {
        grid-column: 1 / 4;
        grid-row: header-start / 2;
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
    grid-row: battle-start / 3;
    grid-column: 2 / 3;
    justify-self: center;
    position: relative;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: [left-start] auto [card1-left] auto [vs-left] minmax(.5em, 1.5em) [card1-right] auto [card2-left] minmax(.5em, 1.5em) [vs-right] auto [card2-right] auto [right-end] auto;
    grid-template-rows: [top-start] 1fr [card1-start2] auto [vs-start2] minmax(.5em, 1.5em) [card1-end2] auto [card2-start2] minmax(.5em, 1.5em) [vs-end2] auto [card2-end2] auto [bottom-end] 1fr;
    align-items: center;

    @media (min-width: 800px) {
        grid-column: 2 / 3;
       }
`

const StyledVs = styled.div`
    grid-row: vs-start2 / vs-end2;
    grid-column: 3 / 7;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--black);
    max-width: 100%;
    z-index: 20;
    transform: rotate(8deg);

    & h1 {
        color: var(--white);
        -webkit-text-stroke: 1px var(--black);
        padding: .2em 1em;
    }

    @media (min-width: 800px) {
        grid-row: 3 / 7;
        grid-column: vs-left / vs-right;
    }
`

const StyledCardPlacer = styled.div`
    grid-column: 2 / 8;
    grid-row: card1-start2 / card1-end2;
    display: flex;
    min-width: 300px;
    max-width: 400px;
    justify-content: center;
    align-items: center;
    
    @media (min-width: 800px) {
        grid-column: card1-left / card1-right;
        grid-row: 2 / 8;
    }
` 
const StyledCardPlacer2 = styled(StyledCardPlacer)`
    grid-row: card2-start2 / card2-end2;

    @media (min-width: 800px) {
        grid-column: card2-left / card-right;
        grid-row: 2 / 8;
    }
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