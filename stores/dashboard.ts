export const usePageDashboard=defineStore('page_dashboard', ()=>{
	const promo_code=ref<string>('')
	const add_promo_modal=ref<boolean>(false)
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
	return{promo_code, add_promo_modal, card_details, add_card_details}
})
