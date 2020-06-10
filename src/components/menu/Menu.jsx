import React from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css'
import styled from 'styled-components';
import HamburgerIcon from './HamburgerIcon';

const Menu = () => {

    return (
    <HeaderLayout>
        <Logo><h2>HAMSTER WARS</h2></Logo>
        <HamburgerIcon />
        <NavLayout>
            <ul>
                <NavLink to="/battle">
                    <li>
                        Battle
                    </li>
                </NavLink>
                <NavLink to="/stats">
                    <li>
                        Stats
                    </li>
                </NavLink>
                <NavLink to="/history">
                    <li>
                    History
                    </li>
                </NavLink>
                <NavLink to="/upload">
                    <li>
                    Upload
                    </li>
                </NavLink>
            </ul>
        </NavLayout>
    </HeaderLayout>
    )
}
// CSS styles
//Grid container
const HeaderLayout = styled.div`
    background-color: var(--menu-background);
    text-align: center;
    width: 100%;
    position: relative;

    @media(min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr auto minmax(500px, 3fr) 1fr;
    }
`
const NavLayout = styled.nav`
    position: absolute;
    text-align: left;
    top: 100%;
    left: 0;
    background-color: var(--menu-background);
    width: 100%;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform .2s ease-in-out;

    & ul {
        margin: 0;
        padding: 0;
        list-style: none;
        
        & li {
            font-size: .8em;
            margin: 0 0 1em 1em;
            /* padding: 1em; */
            opacity: 0;
            transition: opacity .1s ease-in;
            
            &:hover {
                color: red;
            }
        }
    }
    
    & a {
        cursor: pointer;
        text-decoration: none;
        font-size: 1.2em;
        text-transform: uppercase;
    }

/* MEDIA QUERY */
    @media(min-width: 768px) {
        position: relative;
        display: flex;
        justify-content: flex-end;
        transform: scale(1, 1);
        text-align: center;
        top: initial;
        left: initial;
        grid-column: 3 / 4;
        
        & ul {
            display: flex;
            align-items: center;

            & li {
                opacity: 1;
                margin: 0 0 0 1.5em;
            }
        }
    }
`
const Logo = styled.div`
    grid-column: 2 / 3;
    padding: 1em;
`

export default Menu