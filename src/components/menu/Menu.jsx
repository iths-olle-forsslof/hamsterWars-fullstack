import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css'
import styled from 'styled-components';
import HamburgerIcon from './HamburgerIcon';

const Menu = ({menuSize, handleMenuSize}) => {

    return (
    <HeaderLayout>
        <Logo><h1>HAMSTER WARS</h1></Logo>
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
                    Historic Hamster Battles
                    </li>
                </NavLink>
                <NavLink to="/upload">
                    <li>
                    Upload a Hamster Warrior
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
    position: fixed;

    @media(min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr auto 1fr 1fr; 
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
            margin: 0 0 1em 1em;
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
        justify-content: center;
        transform: scale(1, 1);
        text-align: center;
        top: initial;
        left: initial;
        
        & ul {
            display: flex;

            & li {
                opacity: 1;
            }
        }
    }
`

const Logo = styled.div`
    grid-column: 2 / 3;
`

const MenuLink = styled.div`
    background-color: hotpink;
`

export default Menu

    // <section className={'menu ' + menuSize } >
    //     <NavLink to="/" > <h1 onClick={() => handleMenuSize('home')} >HAMSTER WARS</h1> </NavLink>
    //     <nav>
    //         <ul>
    //             <li>
    //                 <NavLink to="/battle"
    //                  activeClassName="activeLink"
    //                  onClick={handleMenuSize} >Battle</NavLink>
    //             </li>
    //             <li>
    //                 <NavLink to="/stats" 
    //                 activeClassName="activeLink"
    //                 onClick={handleMenuSize} >HamsterWars Statistics</NavLink>
    //             </li>
    //             <li>
    //                 <NavLink to="/history" 
    //                 activeClassName="activeLink" 
    //                 onClick={handleMenuSize} >Historic Battles</NavLink>
    //             </li>
    //             <li>
    //                 <NavLink to="/upload" 
    //                 activeClassName="activeLink"
    //                 onClick={handleMenuSize} >Upload Hamster Warrior</NavLink>
    //             </li>
    //         </ul>
    //     </nav>
    // </section>