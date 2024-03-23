<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import { toSplitted } from '~/lib/text_manipulation';
import zips from '~/assets/data/zip_services.json';
type PlaceOption = {value: string, label: string};

type AddressComponentsType =
	'administrative_area_level_1'
	| 'administrative_area_level_2'
	| 'administrative_area_level_3'
	| 'administrative_area_level_4'
	| 'administrative_area_level_5'
	| 'administrative_area_level_6'
	| 'administrative_area_level_7'
	| 'archipelago'
	| 'colloquial_area'
	| 'continent'
	| 'country'
	| 'establishment'
	| 'finance'
	| 'floor'
	| 'food'
	| 'general_contractor'
	| 'geocode'
	| 'health'
	| 'intersection'
	| 'landmark'
	| 'locality'
	| 'natural_feature'
	| 'neighborhood'
	| 'place_of_worship'
	| 'plus_code'
	| 'point_of_interest'
	| 'political'
	| 'post_box'
	| 'postal_code'
	| 'postal_code_prefix'
	| 'postal_code_suffix'
	| 'postal_town'
	| 'premise'
	| 'room'
	| 'route'
	| 'street_address'
	| 'street_number'
	| 'sublocality'
	| 'sublocality_level_1'
	| 'sublocality_level_2'
	| 'sublocality_level_3'
	| 'sublocality_level_4'
	| 'sublocality_level_5'
	| 'subpremise'
	| 'town_square'

interface AddressComponents {
	long_name: string
	short_name: string
	types: AddressComponentsType[]
}

export interface Address {
	components: AddressComponents[]
	street_number: string
	route: string
	locality: string
	administrative_area_level_1: string
	postal_code: string
	postal_code_suffix: string
	lat: number
	lng: number
	label: string
	validity: 'invalid'|'out_of_range'|'valid'
}

const props = defineProps<{
	modelValue: Address
	intent: 'pick'|'drop'
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', address: Address): void
}>();

const { $google_loader } = useNuxtApp()

const address_computed = computed({
	get: ()=>props.modelValue,
	set(v: Address){
		emit('update:modelValue', v);
	}
})

// helper
const is_loading = ref(false);
const place_input = ref('');
const place_regexp = computed(()=>new RegExp(place_input.value, 'gi'));
const places = ref<PlaceOption[]>([]);
const id = ref<PlaceOption['value']>();

watch(place_input, async n=>{
	if(n) places.value = await getPlacePredictions(n);
})

async function getPlacePredictions(inputValue: string){
	is_loading.value = true;
	const {AutocompleteService} = await $google_loader.importLibrary('places');
	const autocomplete = new AutocompleteService();
	const {predictions} = await autocomplete.getPlacePredictions({
		input: inputValue,
		locationBias: {
			north: 49.107278678461164,
			east: -117.0433480206906,
			south: 45.519004922782216,
			west: -125.03590159667671
		},
		componentRestrictions: {
			country: 'us'
		}
	});
	is_loading.value = false;
	return predictions.map(v=>({ value: v.place_id, label: v.description }));
}

async function getPlaceDetails(id: string){
	is_loading.value = true;
	const {Geocoder} = await $google_loader.importLibrary('geocoding');
	const {geocode} = new Geocoder();
	const {results} = await geocode({placeId: id });
	const result = results[0];
	const tmp_address: Address = {
		components: [],
		street_number: '',
		route: '',
		locality: '',
		administrative_area_level_1: '',
		postal_code: '',
		postal_code_suffix: '',
		lat: 0,
		lng: 0,
		label: '',
		validity: 'invalid'
	};
	tmp_address.components = result.address_components as AddressComponents[];
	for(const ac of tmp_address.components){
		if(ac.types.includes('street_number')) tmp_address.street_number = ac.long_name;
		else if(ac.types.includes('route')) tmp_address.route = ac.long_name;
		else if(ac.types.includes('locality')) tmp_address.locality = ac.long_name;
		else if(ac.types.includes('administrative_area_level_1')) tmp_address.administrative_area_level_1 = ac.long_name;
		else if(ac.types.includes('postal_code')) tmp_address.postal_code = ac.long_name;
		else if(ac.types.includes('postal_code_suffix')) tmp_address.postal_code_suffix = ac.long_name;
	}
	tmp_address.lat = result.geometry.location.lat();
	tmp_address.lng = result.geometry.location.lng();
	tmp_address.label = result.formatted_address;
	if(tmp_address.street_number && tmp_address.route && tmp_address.locality && tmp_address.administrative_area_level_1 && tmp_address.postal_code)
		tmp_address.validity = zips.includes(tmp_address.postal_code) ? 'valid' : 'out_of_range';
	else tmp_address.validity = 'invalid';
	address_computed.value = tmp_address;
	is_loading.value = false;
}

watch(id, async n=>{
	if(n) await getPlaceDetails(n);
})
</script>

<template>
<div>
	<Multiselect ref="pick_multiselect_ref" v-model="id" mode="single" placeholder=" " :options="places" :searchable="true" :can-clear="false" :can-deselect="false" :close-on-deselect="true" class="input-md" :loading="is_loading" @search-change="(query: string)=>{place_input=query}">
		<template #placeholder>
			<div class="flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5">
				<div class="grid justify-around items-center gap-x-2 grid-cols-[auto_1fr]">
					<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaArrow2.svg" alt="icon" loading="lazy">
					<div>
						<p class="text-xs text-[#808080]">{{ intent==='pick' ? 'Pickup' : 'Drop off' }}</p>
						<p class="text-brand-black/40">Enter Address</p>
					</div>
				</div>
			</div>
		</template>
		<template #nooptions>
			<p class="py-2 px-3 text-gray-600 bg-white text-left rtl:text-right">{{ place_input ? 'No results found' : 'Type address' }}</p>
		</template>
		<template #option="{option}: {option: PlaceOption}">
			<p v-if="place_input"><span v-for="group, i of toSplitted(option.label, place_regexp)" :key="i" :class="group.is_match && 'text-primary font-medium'">{{ group.text }}</span></p>
			<p v-else :class="option.value===id && 'text-primary font-medium'">{{ option.label }}</p>
		</template>
	</Multiselect>
</div>
</template>
