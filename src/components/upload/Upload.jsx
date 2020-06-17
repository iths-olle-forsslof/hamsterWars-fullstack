import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './upload.css';

const Upload = () => {
    const [name ,setName] = useState('')
    const [nameTouched, setNameTouched] = useState(false)
    const [age ,setAge] = useState('')
    const [ageTouched, setAgeTouched] = useState(false)
    const [likes ,setLikes] = useState('')
    const [likeTouched, setLikeTouched] = useState(false)
    const [food ,setFood] = useState('')
    const [foodTouched, setFoodTouched] = useState(false)
    const [imageTouched, setImageTouched] = useState(false)
    const [image, setImage] = useState('')
    const [formIsValid, setFormIsValid] = useState(false)

    const stopSubmit = e => {
        e.preventDefault();
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('age', age)
            formData.append('likes', likes)
            formData.append('food', food)
            formData.append('image', image)
            await fetch('api/hamsters/add', {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => {throw err})
            
        } catch (error) {
            console.log(error)
        }
    }

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

    let [imageClass, imageErr] = imageTouched
        ? validateFileInput(image)
        : ['', '']
    
    useEffect(() => {
        if(nameClass === 'valid' && ageClass === 'valid' && likeClass === 'valid' && foodClass === 'valid' && imageClass === 'valid') {
            if(name && age && likes && food && image) {
                setFormIsValid(true)
            }
        } else {
            setFormIsValid(false)
        }
    }, [nameClass, ageClass, likeClass, foodClass, imageClass, name, age, likes, food, image])


    return (
        <StyledUploadContainer>
            <h2>Upload your own Hamster Warrior</h2>
            <StyledFormWrapper>
                <form onSubmit={stopSubmit} encType="multipart/form-data" name="hamster-form">
                    <StyledInputDiv>
                        <label>Warrior hamster name </label>
                        <input type="text" placeholder="Name"
                            onChange={e => setName(e.target.value)}
                            onBlur={() => setNameTouched(true)}
                            value={name} />
                        <span className={"name-error " + nameClass}> {nameErr} </span> 
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <label>Age </label>
                        <input type="number" placeholder="Age"
                            onChange={e => setAge(e.target.value)}
                            onBlur={() => setAgeTouched(true)}
                            value={age} />
                        <span className={"age-error " + ageClass}>{ageErr}</span> 
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <label>Hamster loves to... </label>
                        <input type="text" placeholder="Loves to..."
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
                {/* </form>
                <form encType="multipart/form-data" name="imageform"> */}
                    <StyledInputDiv>
                        <label> <p>Select a JPG file from your unit </p> </label>
                        {/* <input type="text" placeholder="ImageURL or select a file" name="image" /> */}
                        <input type="file" name="image" 
                        onChange={e => setImage(e.target.files[0])}
                        onBlur={() => setImageTouched(true)} />
                        <span className={"image-error " + imageClass}> {imageErr} </span> 
                    </StyledInputDiv>
                <button className={formIsValid ? 'submit-btn' : 'disabled'}
                onClick={handleSubmit} disabled={formIsValid ? false : true } >Upload Warrior</button>
                </form>
            </StyledFormWrapper>
        </StyledUploadContainer>
    )
}
const validateTextInput = (input) => {
    const allowedSymbols = /^[0-9a-zA-Z ]+$/;
    if (input === '')  return ['invalid','Must be filled in']
    if (!input.match(allowedSymbols)) return ['invalid','May only contain letters and/or numbers']
    else {
        // switch (input) {
        //     case name:
        //         setNameIsValid(true)
        //     break;
        //     case likes:
        //         setLikesIsValid(true)
        //     break;
        //     case food:
        //         setFoodIsValid(true)
        //     break;
        //     default: break;
        // }
        return ['valid','Good!']
    }
}
const validateNumberInput = (input) => {
    const allowedSymbols = /^[0-9]+$/;
    if (input === '')  return ['invalid','Must be filled in']
    if (!input.match(allowedSymbols)) return ['invalid','May only contain numbers']
    else {
        // setAgeIsValid(true)
        return ['valid','Good!']
    }
}
const validateFileInput = (input) => {
    if (!input) return ['','']
    if (!input.name.endsWith('.jpg')) return ['invalid','You must upload a jpg image file']
    else {
        // setImageIsValid(true)
        return ['valid','Good!']
    }
}

const StyledUploadContainer = styled.main`
    display: grid;
    grid-template-rows: auto auto 1em;
    grid-template-columns: repeat(1fr, 4);
    width: 100%;

    & h2 {
        grid-row: 1 / 2;
        grid-column: 1 / 4;
        justify-self: center;
        margin: 1em;
        text-align: center;
    }
`

const StyledFormWrapper = styled.section`
    grid-row: 2 / 3;
    grid-column: 1 / 4;
    display: flex;
    flex-direction: column;
    padding: 1em;
    align-items: center;

    & form {
        display: flex;
        flex-flow: column wrap;
        /* align-items: center; */
        max-width: 100%;
    }
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
        width: 100%;
    }
` 

export default Upload