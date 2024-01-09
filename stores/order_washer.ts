export const useOrderWasher = defineStore('order_washer', ()=>{
	const step = ref<'select_customer'|'order_details'|'weight_order'|'processing_order'>('select_customer');
	const customer_id = ref('');

	return {
		step, customer_id
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useOrderWasher, import.meta.hot))
