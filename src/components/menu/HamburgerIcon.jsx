import React from 'react';
import styled from 'styled-components';

const HamburgerIcon = () => {
    return (
        <>
        <CheckboxLayout type="checkbox" id="nav-toggle" />
        <LabelLayout htmlFor="nav-toggle"> <HamburgerMenu /></LabelLayout>
        </>
    )
}

const CheckboxLayout = styled.input`
    display: none;

    &:checked ~ nav {
        transform: scale(1, 1);
        /* The links in the menu shows up after the drop is finished */
        & li {
            opacity: 1;
            transition: opacity .1s ease-in .2s;
        }
    }
`
const LabelLayout = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 1em;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    @media(min-width: 768px) {
        display: none;
    }
`
const HamburgerMenu = styled.span`
    display: block;
    position: relative;
    height: .3em;
    width: 2em;
    background-color: white;
    border-radius: 2px;
    transition: transform .1s ease-in-out;
    
    &::before, ::after {
        content: '';
        position: absolute;
        left: 0;
        height: .3em;
        width: 2em;
        background-color: white;
        border-radius: 2px;
    }

    &::before {
        bottom: 7px;
    }

    &::after {
        top: 7px;
    }
        
    ${LabelLayout}:hover & {
        transform: rotate(90deg);
        ::before {
            transform: rotate(45deg);
            left: 11px;
            width: 1.5em;
        }
        ::after {
            transform: rotate(-45deg);
            left: 11px;
            width: 1.5em;
        }
    }
`
export default HamburgerIcon