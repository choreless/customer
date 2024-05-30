import { z } from 'zod';
import type { CustomerType } from '~/types/user';
import type { InputStatus, InputStatusWithProgress } from '~/types/form';

export const usePageEntry = defineStore('page_entry', ()=>{
	const phone = reactive({masked: '', unmasked: ''});
	const customer_type = ref<CustomerType>('retail');
	const company_name = ref('');
	const first_name = ref('');
	const last_name = ref('');
	const email = ref('');

	// helper
	const step = ref<0|1>(0);
	const error = reactive({
		phone: undefined as undefined | boolean,
		company_name: ref<InputStatus>(),
		first_name: ref<InputStatus>(),
		last_name: ref<InputStatus>(),
		email: ref<InputStatusWithProgress>()
	})

	watch(phone, n=>{error.phone = phone.unmasked.length===0 ? undefined : n.unmasked.length!==10;})
	watch(company_name, n=>{error.company_name = !n;})
	watch(first_name, n=>{error.first_name = !n;})
	watch(last_name, n=>{error.last_name = !n;})
	watch(email, n=>{ error.email = !z.string().email().safeParse(n).success; })

	return {
		phone, customer_type, company_name, first_name, last_name, email,
		step, error
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(usePageEntry, import.meta.hot))
