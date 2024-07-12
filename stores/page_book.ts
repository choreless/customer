import addDays from 'date-fns/addDays';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import customer from '~/lib/customer';

export const usePageBook = defineStore('page_book', ()=>{
	// Defining interfaces
	interface WashService {
		id: number;
		service_name: string;
		wash_type: string;
		price: number;
		per_lb?: number;
		note: string;
		service_speed: boolean;
		bags_count: number;
		tags: string[];
		is_selected: boolean;
		detergent: string;
		water_temp: string;
		dryer_temp: string;
		wash_cycle: string;
		on_hangers: boolean;
		mix_bags: boolean;
		preferences_note: string;
		scheduled_delivery:Date;
	}
	interface PreferenceItem {
		name: string;
		is_selected: boolean;
	  }
	  interface PreferenceCategory {
		heading: string;
		items: PreferenceItem[];
	  }
	  interface PricingItem {
		heading: string;
		title: string;
		from_price: number | null;
		to_price: number;
	  }

	  interface PricingCategory {
		heading: string;
		items: PricingItem[];
	  }
	  // Defining Constants
	  const care_services = ref([{value: 'On Hangers', is_active: false}, {value: 'Mix Bags', is_active: false}]);
	  const now = useNow();
	  const service_speeds = ['next_day', '2_day'] as const;
	  const frequencies = ['Just once', 'Weekly', 'Every two weeks', 'Every four weeks'] as const;
	  const frequency = ref<typeof frequencies[number]>('Just once');
	  const service_speed = ref<typeof service_speeds[number]>('next_day');
	  const step = ref<-1|0|1|2|3|4>(0);
	  const detergent = ref<typeof customer.detergents[number]>({value: 'Choose a detergent', description: '', isPopular: false});
	  const date = ref();
	  const note=ref('')
	  const add_note_modal=ref(false)
	  const info_modal=ref(false)
	  const pricing_modal=ref(false)
	  const learn_more_modal=ref(false)
	  const info_toggle=ref(false)
	  const learn_more_toggle=ref(false)
	  const preference_note=ref('')
	  const current_Screen=ref('select_services')
	  const selected_item_index = ref(0);
	  const selected_services=reactive<WashService[]>([])
	  const wash_services_data=reactive<WashService[]>([
	  	{
	  		id: 1,
	  		service_name: 'Wash & Fold',
	  		wash_type: 'Mixed wash',
	  		price: 35,
	  		per_lb: 1.80,
	  		note: '',
	  		service_speed: false,
	  		bags_count: 1,
	  		tags: ['Normal Cycle', 'Cold Water', 'Tumble-Med'],
	  		is_selected: false,
	  		detergent: '',
	  		water_temp: 'Cold',
	  		dryer_temp: 'Medium',
	  		wash_cycle: 'Deep',
	  		on_hangers: false,
	  		mix_bags: false,
	  		preferences_note: '',
	  		scheduled_delivery: new Date()
	  	},
	  	{
	  		id: 2,
	  		service_name: 'Delicate Wash',
	  		wash_type: 'Mixed wash',
	  		price: 35,
	  		per_lb: 1.80,
	  		note: '',
	  		service_speed: false,
	  		bags_count: 1,
	  		tags: ['Gentle Cycle', 'Tumble-low', 'In a bag'],
	  		is_selected: false,
	  		detergent: '',
	  		water_temp: 'Cold',
	  		dryer_temp: 'Medium',
	  		wash_cycle: 'Deep',
	  		on_hangers: false,
	  		mix_bags: false,
	  		preferences_note: '',
	  		scheduled_delivery: new Date()
	  	},
	  	{
	  		id: 3,
	  		service_name: 'Home & Bedding',
	  		wash_type: 'Mixed wash',
	  		price: 10,
	  		note: '',
	  		service_speed: false,
	  		bags_count: 1,
	  		tags: ['Custom Cleaning'],
	  		is_selected: false,
	  		detergent: '',
	  		water_temp: 'Cold',
	  		dryer_temp: 'Medium',
	  		wash_cycle: 'Deep',
	  		on_hangers: false,
	  		mix_bags: false,
	  		preferences_note: '',
	  		scheduled_delivery: new Date()
	  	}
	  ])

	  const preferences=reactive<PreferenceCategory[]>([
	  	{
	  		heading: 'Water Temp',
	  		items: [
	  			{
	  				name: 'Cold',
	  				is_selected: true
	  			},
	  			{
	  				name: 'Warm',
	  				is_selected: false
	  			},
	  			{
	  				name: 'Hot',
	  				is_selected: false
	  			}
	  		]
	  	},
	  	{
	  		heading: 'Wash cycle',
	  		items: [

	  			{
	  				name: 'Gentle',
	  				is_selected: false
	  			},
	  			{
	  				name: 'Normal',
	  				is_selected: false
	  			},
	  			{
	  				name: 'Deep',
	  				is_selected: true
	  			}
	  		]
	  	},
	  	{
	  		heading: 'Dryer Temp',
	  		items: [

	  			{
	  				name: 'Low',
	  				is_selected: false
	  			},
	  			{
	  				name: 'Medium',
	  				is_selected: true
	  			},
	  			{
	  				name: 'High',
	  				is_selected: false
	  			}
	  		]
	  	}
	  ])
	  const pricing_info=ref<PricingCategory[]>([
	  	{
	  		heading: 'Most Popular',
	  		items: [
	  			{
	  				heading: 'Most Popular',
	  				title: 'Bedspreads (All Sizes)',
	  				from_price: 6.40,
	  				to_price: 13.00
	  			},
	  			{
	  				heading: 'Most Popular',
	  				title: 'Down Comforter (All Sizes)',
	  				from_price: 16.00,
	  				to_price: 30.00
	  			},
	  			{
	  				heading: 'Most Popular',
	  				title: 'Odor removal',
	  				from_price: 0.00,
	  				to_price: 25.00
	  			},
	  			{
	  				heading: 'Most Popular',
	  				title: 'Rug (Lg)',
	  				from_price: null,
	  				to_price: 35.00
	  			}
	  		]
	  	},
	  	{
	  		heading: 'Wash & Fold',
	  		items: [
	  			{
	  				heading: 'Wash & Fold',
	  				title: 'Mixed Wash',
	  				from_price: 1.80,
	  				to_price: 2.25
	  			},
	  			{
	  				heading: 'Wash & Fold',
	  				title: 'Seperate Wash',
	  				from_price: 6.40,
	  				to_price: 13.00
	  			}
	  		]
	  	},
	  	{
	  		heading: 'Delicate Wash',
	  		items: [
	  			{
	  				heading: 'Delicate Wash',
	  				title: 'Mixed Wash',
	  				from_price: 1.80,
	  				to_price: 2.25
	  			},
	  			{
	  				heading: 'Delicate Wash',
	  				title: 'Seperate Wash',
	  				from_price: 6.40,
	  				to_price: 13.00
	  			}
	  		]
	  	},
	  	{
	  		heading: 'Blankets & Comforters',
	  		items: [
	  			{
	  				heading: 'Blankets & Comforters',
	  				title: 'Blankets & Comforters (All Sizes)',
	  				from_price: 8.00,
	  				to_price: 20.00
	  			}
	  		]
	  	},
	  	{
	  		heading: 'Misc',
	  		items: [
	  			{
	  				heading: 'Misc',
	  				title: 'Bath Mat',
	  				from_price: 16.00,
	  				to_price: 30.00
	  			}
	  		]
	  	},
	  	{
	  		heading: 'Pillows',
	  		items: [
	  			{
	  				heading: 'Pillows',
	  				title: 'Pillow Covers',
	  				from_price: 5.00,
	  				to_price: 20.00
	  			}
	  		]
	  	}
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
	  const scheduled_delivery = computed(()=> addDays(parseISO(date.value), service_speed.value==='next_day' ? 1 : 2));

	  return {
	  	now, note, add_note_modal, info_modal, selected_services, frequencies, frequency, selected_item_index, pricing_modal, preference_note,
	  	pricing_info, learn_more_modal, wash_services_data, preferences,
	  	step, care_services, detergent, date, pinned_pickup_dates, scheduled_delivery, current_Screen, info_toggle, learn_more_toggle
	  }
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(usePageBook, import.meta.hot))
