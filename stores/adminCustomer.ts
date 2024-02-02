import Fuse from 'fuse.js';
import type { CustomerType } from '~/types/user';
interface Customer {
	id: string
	first_name: string
	last_name: string
	email: string
	phone: string
	type: CustomerType
	business_name: null|string
}

export const useAdminCustomer = defineStore('admin_customers', ()=>{
	const end_panel = ref<'create'|'show'>();
	const loading = reactive({
		index: false
	});
	// start panel
	const customers = ref<Customer[]>([]);
	const search = ref('');
	const filter_type = ref<CustomerType|''>('');
	const filter_customers = ref<Customer[]>([]);
	// end panel
	const id = ref<string>('');

	const fuse = computed(()=>{
		return new Fuse(customers.value, {
			threshold: 0.1,
			keys: ['email', 'phone',
				{
					name: 'person_name',
					getFn: customer=>`${customer.first_name} ${customer.last_name}`
				},
				{
					name: 'business_name',
					getFn: customer=>customer.business_name ?? ''
				}
			]
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
	watch([search, filter_type], ()=>{
		if(search.value.length) filter_customers.value = fuse.value.search(search.value).map(v=>v.item);
		else filter_customers.value = customers.value;
		if(filter_type.value) filter_customers.value = filter_customers.value.filter(v=>v.type===filter_type.value);
	})

	return {
		end_panel, loading, search, customers, filter_customers, id, filter_type,
		getCustomers
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useAdminCustomer, import.meta.hot))
