import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Menu from './components/menu/Menu'
import Battles from './components/battles/Battles'
import History from './components/history/History'
import Stats from './components/stats/Stats'
import Upload from './components/upload/Upload'
// import Footer from './Footer'
import styled from 'styled-components'
import './App.css';

function App() {

	const [isMenuFull, setIsMenuFull] = useState(true)
	const [menuClass, setMenuClass] = useState('menu--large')

	const handleMenuSize = (target = '') => {
		if (target !== 'home' || !target ) setMenuClass('menu--small')
		else setMenuClass('menu--large')
	}

return (
	<Router>
	<div className="App">
	<header> <Menu menuSize={menuClass} handleMenuSize={handleMenuSize} /> </header>
	<main>
	<Switch>
		<Route path="/battle" > <Battles />  </Route>
		<Route path="/stats" > <Stats /> </Route>
		<Route path="/upload" > <Upload /> </Route>
		<Route path="/history" > <History /> </Route>
	</Switch>
	</main>
	</div>
	</Router>
)}

export default App;
