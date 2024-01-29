import Fuse from 'fuse.js';
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
	const customers = ref<Customer[]>([]);
	const search = ref('');
	const filter_customers = ref<Customer[]>([]);
	// end panel
	const id = ref<string>('');

	const fuse = computed(()=>{
		return new Fuse(customers.value, {
			threshold: 0.1,
			keys: ['email', 'phone', {
				name: 'name',
				getFn: customer=>`${customer.first_name} ${customer.last_name}`
			}]
		});
	})

	async function getCustomers(){
		loading.index = true;
		const api = useApi();
		const usp = new URLSearchParams();
		if(search.value) usp.append('search', search.value);
		const {data} = await api.get(`/users?${usp}`);
		customers.value = data;
		filter_customers.value = data;
		loading.index = false;
	}

	watch(id, ()=>{ end_panel.value = id.value ? 'show' : undefined; })
	watch(search, ()=>{
		if(search.value.length) filter_customers.value = fuse.value.search(search.value).map(v=>v.item);
		else filter_customers.value = customers.value;
	})

	return {
		end_panel, loading, search, customers, filter_customers, id,
		getCustomers
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useAdminCustomer, import.meta.hot))
