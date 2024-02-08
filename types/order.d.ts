type Bags = null|number[];
export type OrderStatus = 'in_progress'|'complete';

export interface Order4Washer {
	bags_initial: Bags
	is_wet: boolean
	bags_final: Bags
	due_time: string|null
	customer_id: string
}
