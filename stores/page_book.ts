import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import customer from '~/lib/customer';

export const usePageBook = defineStore('page_book', ()=>{
	const wash_types = ['mixed', 'separate'] as const;
	const service_speeds = ['next_day', '2_day'] as const;
	const frequencies = ['Just once', 'Weekly', 'Every two weeks', 'Every four weeks'] as const;
	const now = useNow();

	const step = ref<0|1|2>(0);
	const wash_type = ref<typeof wash_types[number]>();
	const zip = ref('');
	const care_services = ref<typeof customer.care_services[number][]>([]);
	const addons = ref<(keyof typeof customer.addons2)[]>([]);
	const detergent = ref<typeof customer.detergents[number]>();
	const water_temperature = ref<typeof customer.water_temperatures[number]>();
	const dryer_temperature = ref<typeof customer.dryer_temperatures[number]>();
	const service_speed = ref<typeof service_speeds[number]>('next_day');
	const frequency = ref<typeof frequencies[number]>('Just once');
	const date = ref(formatISO(now.value, {representation: 'date'}));

	const error = reactive({
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

	watch(wash_type, n=>{error.wash_type = !n;})
	watch(detergent, n=>{error.detergent = !n;})
	watch(zip, n=>{error.zip = !n;})
	watch(water_temperature, n=>{error.water_temperature = !n;})
	watch(dryer_temperature, n=>{error.dryer_temperature = !n;})

	return {
		wash_types, service_speeds, frequencies, now,
		step, wash_type, zip, care_services, addons, detergent, water_temperature, dryer_temperature, service_speed, frequency, date, error,
		pinned_pickup_dates, scheduled_delivery
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(usePageBook, import.meta.hot))
