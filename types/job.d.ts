type JobStatus = 'resume'|'pause'|'complete';

interface JobWasher {
	id: string
	customer_id: string
	customer_name: string
	bags: number[]
	stopwatch: string
	stopwatch_at: string
	status: JobStatus
	created_at: string
}

export { JobStatus, JobWasher }
