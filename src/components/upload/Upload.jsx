import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './upload.css';

const Upload = () => {
    const [name ,setName] = useState('')
    const [age ,setAge] = useState('')
    const [likes ,setLikes] = useState('')
    const [food ,setFood] = useState('')
    const [className, setClassName] = useState([])
    const [nameTouched, setNameTouched] = useState(false)
    const [ageTouched, setAgeTouched] = useState(false)
    const [likeTouched, setLikeTouched] = useState(false)
    const [foodTouched, setFoodTouched] = useState(false)

    const stopSubmit = e => {
        e.preventDefault();
    }


        // switch(input) {
        //     case nameTouched:
        //         setClassName(validateTextInput(name))
        //     break;
        //     case ageTouched:
        //         return validateNumberInput(age)
        //         break;
        //     case likeTouched:
        //         return validateTextInput(likes)
        //     break;
        //     case foodTouched:
        //         return validateTextInput(food)
        //     break;
        //     default: return ['', '']
        // }


    let [ageClass, ageErr] = ageTouched
        ? validateNumberInput(age)
        : ['', '']
    
    let [nameClass, nameErr] = nameTouched
        ? validateTextInput(name)
        : ['', '']

    let [likeClass, likeErr] = likeTouched
        ? validateTextInput(likes)
        : ['', '']

    let [foodClass, foodErr] = foodTouched
        ? validateTextInput(food)
        : ['', '']

    return (
        <StyledUploadContainer>
            <h2>Upload your own Hamster Warrior</h2>
            <StyledFormWrapper>
                <form onSubmit={stopSubmit}>
                    <StyledInputDiv>
                        <label>Hamster Name </label>
                        <input type="text" placeholder="Name"
                            onChange={e => setName(e.target.value)}
                            onBlur={() => setNameTouched(true)}
                            value={name} />
                        <span className={"name-error " + nameClass}> {nameErr} </span> 
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <label>Hamster Age </label>
                        <input type="number" placeholder="Age"
                            onChange={e => setAge(e.target.value)}
                            onBlur={() => setAgeTouched(true)}
                            value={age} />
                        <span className={"age-error " + ageClass}>{ageErr}</span> 
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <label>Hamster Likes </label>
                        <input type="text" placeholder="Likes"
                            onChange={e => setLikes(e.target.value)}
                            onBlur={() => setLikeTouched(true)}
                            value={likes} />
                        <span className={"age-error " + likeClass}>{likeErr}</span> 
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <label>Favourite food</label>
                        <input type="text" placeholder="Prefered food"
                            onChange={e => setFood(e.target.value)}
                            onBlur={() => setFoodTouched(true)}
                            value={food} />
                        <span className={"age-error " + foodClass}>{foodErr}</span> 
                    </StyledInputDiv>

                    <StyledInputDiv>
                        <label htmlFor="image"> <p>Enter URL or select a file from your unit </p> </label>
                        <input type="text" placeholder="ImageURL or select a file" name="image" />
                        <span className="file-error"></span> 
                        <input type="file" name="image" />
                    </StyledInputDiv>
                </form>
            </StyledFormWrapper>
        </StyledUploadContainer>
    )
}

const validateTextInput = (input) => {
    const allowedSymbols = /^[0-9a-zA-Z ]+$/;
    if (input === '')  return ['invalid','Must be filled in']
    if (!input.match(allowedSymbols)) return ['invalid','May only contain letters and/or numbers']
    return ['valid','Good!']
}
const validateNumberInput = (input) => {
    const allowedSymbols = /^[0-9]+$/;
    if (input === '')  return ['invalid','Must be filled in']
    if (!input.match(allowedSymbols)) return ['invalid','May only contain numbers']
    return ['valid','Good!']
}

const StyledUploadContainer = styled.main`
    display: grid;
    grid-template-rows: auto auto 1em;
    grid-template-columns: repeat(1fr, 5);
    width: 100%;

    & h2 {
        grid-row: 1 / 2;
        grid-column: 2 / 5;
        justify-self: center;
        margin: 1em;
        text-align: center;
    }
`

const StyledFormWrapper = styled.section`
    grid-row: 2 / 3;
    grid-column: 2 / 5;
    display: flex;
    flex-direction: column;
    padding: 1em;
`
const StyledInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-bottom: 1em;

    & input {
        margin: .3em 1em 1em 0;
        padding: .5em;
        max-width: 400px;
    }
` 

export default Upload