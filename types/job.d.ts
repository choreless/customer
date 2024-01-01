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

interface JobAdmin {
	id: string
	cid: string
	customer_first_name: string
	customer_last_name: string
	washer_first_name: string
	washer_last_name: string
	bags: number[]
	stopwatch: number
	created_at: string
}


export { JobStatus, JobWasher, JobAdmin }
