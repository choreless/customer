import Timer from 'easytimer.js';

export function formatSeconds(seconds: number){
	const timer = new Timer({startValues: {seconds}}).getTimeValues();
	let value = '';
	if(timer.days>0) value = `${timer.days}d ${timer.hours}h ${timer.minutes}m ${timer.seconds}s`;
	else if(timer.hours>0) value = `${timer.hours}h ${timer.minutes}m ${timer.seconds}s`;
	else if(timer.minutes>0) value = `${timer.minutes}m ${timer.seconds}s`;
	else value = `${timer.seconds}s`;
	return {value, ...timer};
}
