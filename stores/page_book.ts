import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import customer from '~/lib/customer';

export const usePageBook = defineStore('page_book', ()=>{

// Defining Interfaces 

interface Service {
	id:number;
    wash_type: string;
    from_price: number;
    to_price: number;
	bags_count: number;
    service_speed: string;
    note: string;
	is_active: boolean;
}

// Defining Constants 

	const wash_types = ['Mixed Wash', 'Seperate Wash'] as const;
	const service_speeds = ['next_day', '2_day'] as const;
	const frequencies = ['Just once', 'Weekly', 'Every two weeks', 'Every four weeks'] as const;
	const care_services = [{value: 'Hang Dry', is_active: false, }, {value: 'On Hangers', is_active: false,}, {value: 'Delictes', is_active: false,},{value: 'Mix Bags', is_active: false,}] as const;
	const now = useNow();
	const step = ref<-1|0|1|2|3|4>(0);
	const bags_count = ref(1);
	const wash_type = ref<typeof wash_types[number]>();
	const extra_service = ref<boolean>(false);
	const do_not_show_page = ref<boolean>();
	const zip = ref('');
	const addons = ref<(typeof customer.addons2[number]['name'])[]>([]);
	const detergent = ref<typeof customer.detergents[number]>(customer.detergents[1]);
	const water_temperature = ref<typeof customer.water_temperatures[number]>('Cold');
	const dryer_temperature = ref<typeof customer.dryer_temperatures[number]>('Medium');
	const service_speed = ref<typeof service_speeds[number]>('next_day');
	const frequency = ref<typeof frequencies[number]>('Just once');
	const date = ref();
	const totalStep = 2;
	const note=ref('')
	const add_note_modal=ref(false)
	const info_modal=ref(false)
	const pricing_modal=ref(false)
	const learn_more_modal=ref(false)
	const preference_note=ref('')
	const error = reactive({
		wash_type: false,
		zip: false,
		detergent: false,
		water_temperature: false,
		dryer_temperature: false
	})

	// Optional Item Object

	const optional_item=reactive<Service>({
		id: 141232,
		wash_type: 'Home & Bedding',
		from_price: 10,
		service_speed: '3 Day Service',
		note: '',
		bags_count: 1,
		is_active: false,
		to_price: 10
	})

	// Pricing object for pricing modal

	const pricing_info=ref([
		{
			heading:'Most Popular',
			items:[
				{
					heading:'Most Popular',
					title:'Bedspreads (All Sizes)',
					from_price:6.40,
					to_price:13.00
				},
				{
					heading:'Most Popular',
					title:'Down Comforter (All Sizes)',
					from_price:16.00,
					to_price:30.00
				},
				{
					heading:'Most Popular',
					title:'Odor removal',
					from_price:0.00,
					to_price:25.00
				},
				{
					heading:'Most Popular',
					title:'Rug (Lg)',
					from_price:null,
					to_price:35.00
				},
			]
		},
		{
			heading:'Bedspread',
			items:[
				{
					heading:'Bedspread',
					title:'Bedspreads (All Sizes)',
					from_price:6.40,
					to_price:13.00
				},
			]
		},
		{
			heading:'Blankets & Comforters',
			items:[
				{
					heading:'Blankets & Comforters',
					title:'Blankets & Comforters (All Sizes)',
					from_price:8.00,
					to_price:20.00
				},
			]
		},
		{
			heading:'Misc',
			items:[
				{
					heading:'Misc',
					title:'Bath Mat',
					from_price:16.00,
					to_price:30.00
				},
			]
		},
		{
			heading:'Down Comforter',
			items:[
				{
					heading:'Down Comforter',
					title:'Bath Mat',
					from_price:16.00,
					to_price:30.00
				},
			]
		},
		{
			heading:'Down Comforter',
			items:[
				{
					heading:'Down Comforter',
					title:'Down Comforter (All Sizes)',
					from_price:16.00,
					to_price:30.00
				},
				{
					heading:'Most Popular',
					title:'Odor removal',
					from_price:0.00,
					to_price:25.00
				},
			]
		},
		{
			heading:'Pillows',
			items:[
				{
					heading:'Pillows',
					title:'Pillow Covers',
					from_price:5.00,
					to_price:20.00
				},
			]
		},
		])
	

	const pinned_pickup_dates = computed(()=>
		new Array(3).fill(null).map((_v, k)=>{
			const unformatted = addDays(now.value, k);
			return {
				unformatted,
				formatted: formatISO(unformatted, {representation: 'date'})
			}
		})
	);
	const bookProgress = computed(()=> step.value / totalStep *100)
	const scheduled_delivery = computed(()=>  addDays(parseISO(date.value), service_speed.value==='next_day' ? 1 : 2));

	watch(zip, n=>{error.zip = !n;})

	return {
		wash_types, service_speeds, frequencies, now, note, add_note_modal, info_modal, pricing_modal, pricing_info, preference_note,learn_more_modal,
		step, totalStep, bookProgress, bags_count, wash_type, extra_service, do_not_show_page, zip, care_services, optional_item, addons, detergent, water_temperature, dryer_temperature, service_speed, frequency, date, error,
		pinned_pickup_dates, scheduled_delivery
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(usePageBook, import.meta.hot))
