import format from 'date-fns/format';
import customer from '~/lib/customer';

export const usePageBook = defineStore('page_book', ()=>{
	const wash_types = ['mixed', 'separate'] as const;
	const service_speeds = ['next_day', '2_day'] as const;
	const frequencies = ['Just once', 'Weekly', 'Every two weeks', 'Every four weeks'] as const;
	const now = new Date();
	now.setHours(0, 0, 0, 0);

	const step = ref<0|1|2>(0);
	const wash_type = ref<typeof wash_types[number]>('mixed');
	const zip = ref('');
	const care_services = ref<typeof customer.care_services[number][]>([]);
	const addons = ref<(keyof typeof customer.addons2)[]>([]);
	const detergent = ref<typeof customer.detergents[number]>();
	const water_temperature = ref<typeof customer.water_temperatures[number]>();
	const dryer_temperature = ref<typeof customer.dryer_temperatures[number]>();
	const service_speed = ref<typeof service_speeds[number]>('next_day');
	const frequency = ref<typeof frequencies[number]>('Just once');
	const date = ref<string>(formatDate(now));

	const error = reactive({
		zip: false,
		detergent: false,
		water_temperature: false,
		dryer_temperature: false
	})

	watch(zip, n=>{error.zip = !n;})
	watch(detergent, n=>{error.detergent = !n;})
	watch(water_temperature, n=>{error.water_temperature = !n;})
	watch(dryer_temperature, n=>{error.dryer_temperature = !n;})

	function formatDate(d: Date){
		return format(d, 'yyyy-MM-dd');
	}

	return {
		wash_types, service_speeds, frequencies, now,
		step, wash_type, zip, care_services, addons, detergent, water_temperature, dryer_temperature, service_speed, frequency, date, error,
		formatDate
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(usePageBook, import.meta.hot))
