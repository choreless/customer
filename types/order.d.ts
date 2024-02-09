type Bags = null|number[];
export type OrderStatus = 'in_progress'|'complete';

export interface Order4Washer {
	bags_initial: Bags
	is_wet: boolean
	bags_final: Bags
	due_time: string|null
	customer_id: string
}

export interface Orders4Washer {
	id: string
	bags_initial: Bags,
	is_wet: boolean,
	bags_final: Bags,
	due_time: string|null,
	completed_at: string|null,
	status: OrderStatus
	created_at: string
	customer_name: string
}

export type UpdateResponseApi4Washer =
{ success: false, error: 'input'|'bags_initial'|'bags_final' } |
{ success: true }
