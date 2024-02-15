type Bags = null|number[];
export type OrderStatus = 'in_progress'|'complete';

export interface Order4Washer {
	bags_initial: Bags
	is_wet: boolean
	bags_final: Bags
	due_time: string|null
	customer_id: string
}

export type Orders4Washer = {
	id: string
	bags_initial: number[]
	is_wet: boolean
	bags_final: Bags
	due_time: string|null
	created_at: string
	customer_name: string
} &
({
	status: 'in_progress'
	completed_at: null
} |
{
	status: 'complete'
	completed_at: string
})

export type UpdateResponseApi4Washer =
{ success: false, error: 'input'|'bags_initial'|'bags_final' } |
{ success: true }
