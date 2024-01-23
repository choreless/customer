export type OrderStatus = 'in_progress'|'complete';

export interface OrderWasher {
	id: string
	bags: number[]
	due_time: string
	completed_at: number[]
	status: OrderStatus
	customer_name: string
}

export interface JobAdmin {
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
