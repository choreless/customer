import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import { z } from 'zod';
import customer from '~/lib/customer';

type InputStatus = 'info'|'success'|'error';
type EmailStatus = InputStatus|'progress';

export const usePageBook = defineStore('page_book', ()=>{
	const wash_types = ['mixed', 'separate'] as const;
	const service_speeds = ['next_day', '2_day'] as const;
	const frequencies = ['Just once', 'Weekly', 'Every two weeks', 'Every four weeks'] as const;
	const now = useNow();

	const usertype = ref<'new'|'old'>('new');
	const step = ref<-1|0|1|2|3|4>(0); // -1 means service is not available in the area
	const phone = reactive({masked: '', unmasked: ''});
	const first_name = ref('');
	const last_name = ref('');
	const email = ref('');
	const promo_code = ref('');
	const bags_count = ref(1);
	const wash_type = ref<typeof wash_types[number]>();
	const extra_service = ref<boolean>();
	const zip = ref('');
	const care_services = ref<typeof customer.care_services[number][]>([]);
	const addons = ref<(typeof customer.addons2[number]['name'])[]>([]);
	const detergent = ref<typeof customer.detergents[number]>();
	const water_temperature = ref<typeof customer.water_temperatures[number]>();
	const dryer_temperature = ref<typeof customer.dryer_temperatures[number]>();
	const service_speed = ref<typeof service_speeds[number]>('next_day');
	const frequency = ref<typeof frequencies[number]>('Just once');
	const date = ref();

	const error = reactive({
		phone: undefined as undefined | boolean,
		first_name: ref<InputStatus>('info'),
		last_name: ref<InputStatus>('info'),
		email: ref<EmailStatus>('info'),
		wash_type: false,
		zip: false,
		detergent: false,
		water_temperature: false,
		dryer_temperature: false
	})

	const pinned_pickup_dates = computed(()=>
		new Array(3).fill(null).map((_v, k)=>{
			const unformatted = addDays(now.value, k);
			return {
				unformatted,
				formatted: formatISO(unformatted, {representation: 'date'})
			}
		})
	);
	const scheduled_delivery = computed(()=>addDays(parseISO(date.value), service_speed.value==='next_day' ? 1 : 2));

	watch(phone, n=>{error.phone = n.unmasked.length===10 ? false : undefined;})
	watch(first_name, n=>{error.first_name = n ? 'success' : 'error';})
	watch(last_name, n=>{error.last_name = n ? 'success' : 'error';})
	watch(email, n=>{ error.email = z.string().email().safeParse(n).success ? 'success' : 'error'; })
	watch(wash_type, n=>{error.wash_type = !n;})
	watch(detergent, n=>{error.detergent = !n;})
	watch(zip, n=>{error.zip = !n;})
	watch(water_temperature, n=>{error.water_temperature = !n;})
	watch(dryer_temperature, n=>{error.dryer_temperature = !n;})

	return {
		wash_types, service_speeds, frequencies, now,
		usertype, step,
		phone, first_name, last_name, email, promo_code,
		bags_count, wash_type, extra_service, zip, care_services, addons, detergent, water_temperature, dryer_temperature, service_speed, frequency, date, error,
		pinned_pickup_dates, scheduled_delivery
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(usePageBook, import.meta.hot))
