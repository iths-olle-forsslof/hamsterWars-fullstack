import React, { useState } from 'react';
import './success.css';


const Success = ({uploadedHamster}) => {

    const [classText, setClassText] = useState('')

    const handleClick = () => {
        setClassText('success-hidden')
    }

    return (
        <section className={"Success" + classText}>
            <article className={"upload-info" + classText} >
                <p onClick={(e) => {console.log(e); handleClick(e.currentTarget)} }>Close</p>
                <h2>Successful upload!</h2>
                {/* <ul>
                    <li> <b>Name:</b> {uploadedHamster.name} </li>
                    <li> <b>Age:</b> {uploadedHamster.age} </li>
                    <li> <b>Loves:</b> {uploadedHamster.loves} </li>
                    <li> <b>Favourite food:</b> {uploadedHamster.food} </li>
                    <li> <b>Image file:</b> {uploadedHamster.imgName} </li>
                </ul> */}
            </article>
        </section>
    )
}

export default Success