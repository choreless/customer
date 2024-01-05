interface Customer {
	id: string
	first_name: string
	last_name: string
	phone: string
	email: string
}

export const useAdminCustomer = defineStore('admin_customers', ()=>{
	const end_panel = ref<'create'|'show'>();
	const loading = reactive({
		index: false
	});
	// start panel
	const search = ref('');
	const customers = ref<Customer[]>([]);
	// end panel
	const id = ref<string>('');

	async function getCustomers(){
		loading.index = true;
		const api = useApi();
		const usp = new URLSearchParams();
		if(search.value) usp.append('search', search.value);
		const {data} = await api.get(`/users?${usp}`);
		customers.value = data;
		loading.index = false;
	}

	watch(id, ()=>{ end_panel.value = id.value ? 'show' : undefined; })
	watch(search, ()=>{ getCustomers() })

	return {
		end_panel, loading, search, customers, id,
		getCustomers
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useAdminCustomer, import.meta.hot))
