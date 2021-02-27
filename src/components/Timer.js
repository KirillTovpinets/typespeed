import React, { Component } from 'react'
import { getFormattedString } from '../helpers';
import './styles/Timer.scss'

export default class Timer extends Component {

	constructor(){
		super();
		this.state = {
			minutes: 0,
			seconds: 0,
		}
	}

	componentDidUpdate(prevProps){
		if (prevProps.start == this.props.start) {
			return;
		}
		
		const timerId = setInterval(() => {
			const { minutes, seconds } = this.state;
			const isNewMinute = seconds === 59;
			const updatedMinutes = isNewMinute ? minutes + 1 : minutes;
			const updatedSeconds = isNewMinute ? 0 : seconds + 1;
			
			this.setState({
				...this.state,
				minutes: updatedMinutes,
				seconds: updatedSeconds
			})
		}, 1000)
		this.props.setTimer(timerId);
	}

	render() {
		const { minutes, seconds } = this.state;
		return (
			<span className="timer">{ getFormattedString(minutes) }:{ getFormattedString(seconds) }</span>
		)
	}
}
