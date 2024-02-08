export type Role = 'admin' | 'customer' | 'driver' | 'washer' | '';
export type CustomerType = 'retail' | 'commercial';

export interface CustomerInfo4Washer {
	detergent: string
	water_temperature: string
	dryer_temperature: string
	addons: string[]
	comment: string|null
	customer_name: string
}
