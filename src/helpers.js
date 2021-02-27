import moment from 'moment';

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getFormattedString(fractionCount) {
	return fractionCount < 10 ? `0${fractionCount}` : fractionCount;
}

export function getCurrentTime(){
	return moment();
}

export function getDifference(time, units){
	return moment().diff(time, units);
}