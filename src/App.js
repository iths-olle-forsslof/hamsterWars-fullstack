import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/menu/Menu'
import Battles from './components/battles/Battles'
import History from './components/history/History'
import Stats from './components/stats/Stats'
import Upload from './components/upload/Upload'
import './App.css';

function App() {

return (
	<Router>
	<div className="App">
	<header> 
		<Menu /> 
	</header>
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
