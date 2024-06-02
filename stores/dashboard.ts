export const usePageDashboard=defineStore('page_dashboard', ()=>{
	// Defining Constants

	const add_promo_modal=ref<boolean>(false)
	const selected_order_id=ref<number>(0)
	const status=ref(['Upcoming Pickup', 'Pickup Tomorrow', 'Pickup Today'])
	const addresses=ref(['720 seneca street, seattle, US, 98101', '720 pine street, seattle, US, 98101', '452 New Bride East Meadow, US, 11554'])
	const pickup_address=ref('720 seneca street, seattle, US, 98101')
	const dropoff_address=ref('452 New Bride East Meadow, US, 11554')
	const card_details=ref([
		{
			card_number: '****5468',
			expiry_date: '12/24',
			csv: '1234',
			zip: '22321'
		},
		{
			card_number: '****5859',
			expiry_date: '10/26',
			csv: '3212',
			zip: '12324'
		},
		{
			card_number: '****7854',
			expiry_date: '09/23',
			csv: '1232',
			zip: '44332'
		},
		{
			card_number: '****5954',
			expiry_date: '08/25',
			csv: '3421',
			zip: '12213'
		}
	])
	const add_card_details = reactive([
		{
			card_number: '',
			expiry_date: '',
			csv: '',
			zip: ''
		}
	]);
	const order_data_pickup = ref([
		{
			type: 'Pickup',
			price: 1.80,
			status: '',
			order_id: 123456789,
			order_date: '07/28/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Mixed Wash',
			service_speed: 'Next day delivery',
			pickup_from: '09:30 am',
			pickup_to: '10:30 pm',
			promo_code: ''

		},
		{
			type: 'Pickup',
			price: 'TBD',
			status: 'In Progress',
			order_id: 56789,
			order_date: '06/03/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Home & Bedding',
			service_speed: 'Next day delivery',
			pickup_from: '07:30am',
			pickup_to: '08:30pm',
			promo_code: 'get promo'
		},
		{
			type: 'Pickup',
			price: 'TBD',
			status: 'Collected',
			order_id: 1234567,
			order_date: '05/21/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Home & Bedding',
			service_speed: 'Next day delivery',
			pickup_from: '10:30 am',
			pickup_to: '11:30 pm',
			promo_code: 'get it'

		},
		{
			type: 'Pickup',
			price: 'TBD',
			status: 'Failed',
			order_id: 3456789,
			order_date: '05/23/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Wash & Steam',
			service_speed: 'Next day delivery',
			pickup_from: '07:30 am',
			pickup_to: '08:30 pm',
			promo_code: 'get promo'
		}
	]);
	const order_data_dropoff = ref([
		{
			type: 'Dropoff',
			price: 1.80,
			status: 'Ready for intake',
			order_id: 1232,
			order_date: '05/30/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Mixed Wash',
			service_speed: 'Next day delivery',
			pickup_from: '09:30 am',
			pickup_to: '10:30 pm',
			promo_code: ''

		},
		{
			type: 'Dropoff',
			price: 'TBD',
			status: 'Processing',
			order_id: 3453,
			order_date: '06/03/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Home & Bedding',
			service_speed: 'Next day delivery',
			pickup_from: '10:30 am',
			pickup_to: '11:30 pm',
			promo_code: 'get it'

		},
		{
			type: 'Dropoff',
			price: 'TBD',
			status: 'Ready for delivery',
			order_id: 23432,
			order_date: '06/02/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Wash & Steam',
			service_speed: 'Next day delivery',
			pickup_from: '07:30 am',
			pickup_to: '08:30 pm',
			promo_code: 'get promo'
		},
		{
			type: 'Dropoff',
			price: 'TBD',
			status: 'Order cancelled',
			order_id: 675643,
			order_date: '05/23/2024',
			order_time: '10:30 am',
			pickup_date: '2021-05-11',
			wash_type: 'Wash & Steam',
			service_speed: 'Next day delivery',
			pickup_from: '07:30 am',
			pickup_to: '08:30 pm',
			promo_code: 'get promo'
		}
	]);
	return{add_promo_modal, card_details, add_card_details, status, order_data_pickup, order_data_dropoff, addresses, selected_order_id, pickup_address, dropoff_address}
})
