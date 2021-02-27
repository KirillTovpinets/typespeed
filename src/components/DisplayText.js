import { size, startsWith, replace, isEmpty } from 'lodash';
import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap';
import { getRandomInt } from '../helpers';
import texts from '../textsToType.json';
import './styles/DisplayText.scss'

export default class DisplayText extends Component {
	constructor(){
		super();
		this.state = {
			text: null,
			userInput: '',
			mistakes: 0,
			cheeterTimerId: null,
			timerStarted: false
		}
	}

	componentDidMount(){
		const state = {
			text: texts[this.props.language][getRandomInt(size(texts))],
			userInput: ''
		};

		document.addEventListener('keypress', this.handleTyping.bind(this))

		this.setState(state);
	}

	componentDidUpdate(prevProps){
		if (prevProps.isCheeter === this.props.isCheeter) {
			return;
		}

		this.setState({
			...this.state,
			cheeterTimerId: this.props.isCheeter && this.setAutocompleteTimer()
		});
	}

	setAutocompleteTimer(){
		let curretSymbolIndex = 0;
		this.props.startTimer();
		return setInterval(() => {
			this.setState({
				...this.state,
				timerStarted: true
			})
			const updatedInput = this.getUpdatedUserInput(curretSymbolIndex++);
			this.validateInputAndCheckProgress(updatedInput);
		}, 50)
	}

	getUpdatedUserInput(index){
		return this.state.userInput + this.state.text.content[index];
	}

	handleTyping(event){
		if (!this.state.timerStarted) {
			this.props.startTimer();
			this.setState({
				...this.state,
				timerStarted: true
			})
		}

		const { userInput } = this.state;
		const updatedInput = userInput + event.key;
		this.validateInputAndCheckProgress(updatedInput);
	}

	validateInputAndCheckProgress(updatedInput){
		const { text } = this.state;
		if (startsWith(text.content, updatedInput)) {
			this.checkTheGameProgress(text.content, updatedInput);
		} else {
			this.setState({
				...this.state,
				mistakes: this.state.mistakes + 1,
				timerStarted: true
			})
		}
	}

	checkTheGameProgress(content, input) {
		this.setState({
			...this.state, 
			userInput: input,
			timerStarted: true
		});

		if (content === input) {
			this.finishTheGameAndStopTimer();
		}
	}

	finishTheGameAndStopTimer(){
		this.props.stop(size(this.state.text.content), this.state.mistakes);
		this.setState({
			...this.state,
			timerStarted: false
		})
		clearInterval(this.state.cheeterTimerId);
	}

	render() {
		const { text, userInput } = this.state;
		const displayText = text ? replace(text.content, userInput, '') : '';

		return (
			<Jumbotron className="text-container">
				<span className="text-container__user-input"> { userInput }</span>
				<span className="text-container__text-content">{ displayText }</span>
			</Jumbotron>
		)
	}
}
