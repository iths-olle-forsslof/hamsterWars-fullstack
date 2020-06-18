import React, { useEffect, useState } from 'react';
import './stats.css'

const Stats = () => {

    const [totalHamsters, setTotalHamsters] = useState('')
    const [totalGames, setTotalGames] = useState('')

    useEffect(() => {
        const getStats = async () => {
            try {
                const request = await fetch('api/stats/totalGames')
                const response = await request.json()
                const request2 = await fetch('api/stats/contestants')
                const response2 = await request2.json()
    
                Promise.all([request, request2, response, response2])
                .then(data => {
                    setTotalHamsters(response2);
                    setTotalGames(response)
                }).catch(err => {throw err})
                
            } catch (error) {
                console.log(error)
            }
        }
        getStats()
    }, [])

    return (
        <div className="stats-container">
            <p>This statistics page is a work in progress... </p>
            <div className="hamsters stats">
                <h2>Hamster Count</h2>
                {totalHamsters 
                ? 'Total number of warriors fighting right now is: '+totalHamsters.msg 
                : '' }
            </div>
            <div className="games stats">
                <h2>Game Count</h2>
            {totalHamsters 
                ? 'Total number of fights fought so far: '+totalGames.msg 
                : '' }
            </div>
            
        </div>
    )
}

export default Stats