import { intervalToDuration } from 'date-fns';

export function getCompletedJobInterval(stopwatch: number){
	const i2d = intervalToDuration({start: 0, end: stopwatch*1000});
	return `${i2d.hours ?? 0}h ${i2d.minutes ?? 0}m ${i2d.seconds ?? 0}s`;
}
