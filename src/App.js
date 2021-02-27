import './App.css';
import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Button } from "reactstrap";
import Playground from './components/Playground';
import Timer from './components/Timer';
import { getCurrentTime, getDifference } from './helpers';
import GameSettings from './components/GameSettings';
import GameBar from './components/GameBar';

class App extends Component {
	constructor(){
		super();
		this.state = {
			startGame: false,
			startTimer: false,
			timerId: null,
			result: 0,
			time: 0,
			mistakes: 0,
			language: 'en',
			cheeterMode: false
		}
	}

	startGame(){
		this.setState({
			...this.state,
			startGame: true,
			result: 0,
			cheeterMode: false
		})
	}

	stopGame(){
		this.setState({
			...this.state,
			startGame: false,
			startTimer: false,
			time: 0,
			cheeterMode: false
		})
	}

	stopTimer(charCount, mistakes){
		clearInterval(this.state.timerId);
		this.calculateTheResult(charCount, mistakes)
	}

	calculateTheResult(charCount, mistakes){
		const durationInSeconds = getDifference(this.state.time, 's');
		const durationInMinutes = durationInSeconds / 60;

		this.setState({
			...this.state,
			result: Math.ceil(charCount / durationInMinutes),
			mistakes
		})
	}

	componentDidMount(){
		document.addEventListener('keypress', (event) => event.key === 'Enter' && this.startGame())
	}

	setupTimer(timerId) {
		if (!timerId) {
			return;
		}

		this.setState({
			...this.state,
			timerId
		})
	}

	tiggerStartGame(){
		this.setState({
			...this.state,
			time: getCurrentTime(),
			startTimer: true
		})
	}

	setupCheeterMode(){
		this.setState({
			...this.state,
			cheeterMode: true
		})
	}

	handleLanguageSelection(event){
		const { value } = event.target;
		this.setState({
			...this.state,
			language: value
		})
	}

  render(){
		const { startGame, result, mistakes, language, cheeterMode, startTimer } = this.state;
		return (
			<div className="App">
				<Navbar color="dark">
					<NavbarBrand href="/">Type Speed</NavbarBrand>
					<NavbarToggler />
					{ startGame && <GameBar 
					setTimer={this.setupTimer.bind(this)} 
					startGame={ startTimer }
					setCheeterMode={this.setupCheeterMode.bind(this)}
					stopGame={this.stopGame.bind(this)} /> }
					{ !startGame &&  <GameSettings 
					startGame={this.startGame.bind(this)} 
					stopGame={this.stopGame.bind(this)}
					onSelectLang={this.handleLanguageSelection.bind(this)}
					/>}
				</Navbar>
				{
					startGame &&
						<Playground 
						stop={this.stopTimer.bind(this)}
						startTimer={this.tiggerStartGame.bind(this)}
						language={language}
						result={result}
						isCheeter={cheeterMode}
						mistakes={mistakes}/>
				}

			</div>
		);
	}
}

export default App;
