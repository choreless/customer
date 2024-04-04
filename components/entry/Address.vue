<script setup lang="ts">
import ChoreLessLocation from '../icon/ChorelessLocation.vue';
import Close from '../icon/Close.vue';
import GooglePlace from '~/components/form/place/Google.vue';
import MetaPlace from '~/components/form/place/Meta.vue';
import type { Address } from '~/components/form/place/Google.vue';
import type { AddressType, CollectionType } from '~/types/address';

const { $google_loader } = useNuxtApp()

type Dialog = false
	|'invalid_address_pick'|'out_of_range_address_pick'|'meta_pick'
	|'invalid_address_drop'|'out_of_range_address_drop'|'meta_drop';

const address_pick = ref<Address>({
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
})
const address_type_pick= ref<AddressType>('home');
const suite_pick = ref('');
const room_number_pick = ref('');
const instruction_pick = ref('');
const collection_type_pick = ref<CollectionType>();
const message_on_arrival_pick= ref(false);
const leave_at_door_pick= ref(false);

const address_drop = ref<Address>({
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
})
const address_type_drop = ref<AddressType>('home');
const suite_drop = ref('');
const room_number_drop = ref('');
const instruction_drop = ref('');
const collection_type_drop = ref<CollectionType>();
const message_on_arrival_drop = ref(false);
const leave_at_door_drop = ref(false);

// helper
const map_ref = ref<HTMLDivElement>();
const marker_pick_ref = ref<HTMLParagraphElement>();
const marker_drop_ref = ref<HTMLParagraphElement>();
const map = ref<google.maps.Map|null>(null);
const marker_pick = ref<google.maps.marker.AdvancedMarkerElement>();
const marker_drop = ref<google.maps.marker.AdvancedMarkerElement>();
const has_drop = ref(false);
const dialog = ref<Dialog>(false);
const validAddress=ref(false);
export type Error = {
	collection_type: boolean
}
const error_pick = reactive<Error>({
	collection_type: false
})
const error_drop = reactive<Error>({
	collection_type: false
})

const handleCheckboxChange = () => {
	has_drop.value = !has_drop.value
}
function next(){
	validAddress.value = true;
}

function saveMeta(){
	if(dialog.value==='meta_pick'){
		error_pick.collection_type = !collection_type_pick.value;
		if(!error_pick.collection_type) dialog.value = false;
	}
	else if(dialog.value==='meta_drop'){
		error_drop.collection_type = !collection_type_drop.value;
		if(!error_drop.collection_type) dialog.value = false;
	}
}

function closeDialog(){
	if((['invalid_address_pick', 'out_of_range_address_pick', 'invalid_address_pick', 'out_of_range_address_drop'] as Dialog[]).includes(dialog.value))
		dialog.value = false;
	else saveMeta();
}

watch(address_pick, ()=>{
	if(address_pick.value.validity==='invalid') dialog.value = 'invalid_address_pick';
	else if(address_pick.value.validity==='out_of_range') dialog.value = 'out_of_range_address_pick';
	else if(map.value){
		const latlng = {lat: address_pick.value.lat, lng: address_pick.value.lng};
		map.value.setCenter(latlng)
		map.value.setZoom(18);
		if(marker_pick.value){
			marker_pick.value.map = toRaw(map.value);
			marker_pick.value.position = latlng;
		}
		if(marker_pick_ref.value) marker_pick_ref.value.style.display = 'flex';
		dialog.value = 'meta_pick';
	}
})

watch(address_drop, ()=>{
	if(address_drop.value.validity==='invalid') dialog.value = 'invalid_address_drop';
	else if(address_drop.value.validity==='out_of_range') dialog.value = 'out_of_range_address_drop';
	else if(map.value){
		const latlng = {lat: address_drop.value.lat, lng: address_drop.value.lng};
		map.value.setCenter(latlng)
		map.value.setZoom(18);
		if(marker_drop.value){
			marker_drop.value.map = toRaw(map.value);
			marker_drop.value.position = latlng;
		}
		if(marker_drop_ref.value) marker_drop_ref.value.style.display = 'flex';
		dialog.value = 'meta_drop';
	}
})

watch(has_drop, n=>{
	if(marker_pick.value) marker_pick.value.content = n ? marker_pick_ref.value : null;
	if(marker_drop_ref.value) marker_drop_ref.value.style.display = n ? 'flex' : 'none';
})

onMounted(async ()=>{
	const {Map} = await $google_loader.importLibrary('maps');
	const latlng: google.maps.LatLngLiteral = { lat: 47.62, lng: -122.33 };
	const mapOptions: google.maps.MapOptions = {
		center: latlng,
		zoom: 9,
		mapTypeId: 'roadmap',
		disableDefaultUI: true,
		mapId: '548873f885812ca8',
		gestureHandling: 'none',
		keyboardShortcuts: false
	};
	map.value = new Map(map_ref.value as HTMLDivElement, mapOptions);

	const {AdvancedMarkerElement} = await $google_loader.importLibrary('marker');
	const priceTag = document.createElement('div');
	priceTag.className = 'btn btn-primary';
	priceTag.textContent = '$2.5M';
	marker_pick.value = new AdvancedMarkerElement();
	marker_drop.value = new AdvancedMarkerElement({content: marker_drop_ref.value});
})
const closeMeta = () => {
	validAddress.value = false
	const initialAddress : Omit<Address, 'validity'> & { validity: any }= {
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
		validity: false
	};
	address_pick.value = initialAddress
	dialog.value = false
}
</script>

<template>
<div class="mt-[3.12rem] h-full">
	<h1 class="text-[2rem] leading-10 font-bold text-center">Enter Your Address</h1>
	<p ref="marker_pick_ref" class="w-10 h-10 rounded-full border-2 hidden justify-center items-center text-2xl font-medium bg-brand-orange border-white text-white">P</p>
	<p ref="marker_drop_ref" class="w-10 h-10 rounded-full border-2 hidden justify-center items-center text-2xl font-medium bg-white border-brand-orange text-brand-orange">D</p>

	<div class="h-full flex flex-col gap-y-12 mt-[24px]">
		<div class=" px-2 mx-auto w-full max-w-[59.063rem]">
			<div class="cursor-pointer flex items-center gap-x-[1.86rem] justify-end pe-6">
				<span class="label-text text-xs" @click="handleCheckboxChange">Different drop-off</span>
				<label class="flex items-center cursor-pointer select-none text-dark dark:text-white">
					<div class="relative">
						<input type="checkbox" class="sr-only" @change="handleCheckboxChange">
						<div :class="{'!bg-[#F85A471A]' : has_drop}" class="h-5 rounded-full shadow-inner bg-[#D9D9D9] dark:bg-dark-2 w-[38px]" />
						<div
							:class="{ 'translate-x-full !bg-[#F85A47]': has_drop }"
							class="absolute left-[-8px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition bg-white rounded-full dot shadow-switch-1 dark:bg-dark-4 -top-1 h-7 w-7"
						/>
					</div>
				</label>
				<!-- <input v-model="has_drop" type="checkbox" class="toggle bg-black checked:bg-brand-orange"> -->
			</div>
			<div class="grid gap-x-2 mt-5 h-20 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.10)] pr-[10px] rounded" :class="has_drop ? 'grid-cols-[1fr_1fr_auto]' : 'grid-cols-[1fr_auto]'">
				<GooglePlace :key="validAddress" v-model="address_pick" intent="pick" :hasDrop="has_drop" />
				<GooglePlace v-model="address_drop" intent="drop" :class="!has_drop && 'hidden'" />
				<button :disabled="(dialog === false || ((['invalid_address_pick', 'invalid_address_drop'] as Dialog[]).includes(dialog) || (['out_of_range_address_pick', 'out_of_range_address_drop'] as Dialog[]).includes(dialog) )) || address_pick.validity !== 'valid'" class="my-auto btn w-full rounded-[0.3125rem] text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange px-[45px] py-[13px]" @click="next()">Continue</button>
			</div>
			<div class="flex items-center mt-5 gap-x-[10px]"><ChoreLessLocation class="w-4 h-[18px]" /><p class="text-[#3063FF] text-base not-italic font-bold leading-[normal]">Show hotels near me</p></div>
		</div>

		<div class="w-full h-full">
			<div ref="map_ref" class="h-full" />
		</div>
	</div>

	<dialog class="modal " :class="(dialog && ((['invalid_address_pick', 'invalid_address_drop'] as Dialog[]).includes(dialog) || (['out_of_range_address_pick', 'out_of_range_address_drop'] as Dialog[]).includes(dialog) ) || validAddress ) && 'modal-open'">
		<div class="modal-box max-w-[467px] h-fit rounded-2xl shadow-[0px_0px_15px_0px_#00000015] bg-white p-5 no-scrollbar overflow-y-auto">
			<div v-if="(['invalid_address_pick', 'invalid_address_drop'] as Dialog[]).includes(dialog)">
				<p class="text-center text-error"><Icon name="ph:smiley-sad" class="text-6xl" /></p>
				<p class="text-center text-4xl text-error">Invalid address</p>
				<p class="text-brand-black/70 mt-2"><span class="underline decoration-wavy decoration-error">{{ dialog==='invalid_address_pick' ? address_pick.label : address_drop.label }}</span> is not a valid address.</p>
				<button class="block mx-auto mt-6 btn btn-info btn-outline" @click="dialog=false">Back to search</button>
			</div>
			<div v-else-if="(['out_of_range_address_pick', 'out_of_range_address_drop'] as Dialog[]).includes(dialog)">
				<p class="text-center text-info"><Icon name="ph:smiley-sad" class="text-6xl" /></p>
				<p class="text-center text-4xl text-info">Oh, no.</p>
				<p class="mt-3">Unfortunately, we don't serve <span class="underline decoration-wavy decoration-error">{{ dialog==='out_of_range_address_pick' ? address_pick.label : address_drop.label }}</span> at this time. we'll notify you when the location becomes available.</p>
				<div class="flex flex-col items-center w-fit mx-auto gap-y-2 mt-4">
					<button class="w-full btn btn-info btn-outline" @click="dialog=false">Notify me</button>
					<button class="w-full btn btn-neutral btn-outline" @click="dialog=false">Back to search</button>
				</div>
			</div>
			<div v-else-if="dialog && ['meta_pick', 'meta_drop'].includes(dialog)">
				<template v-if="dialog==='meta_pick'">
					<div class="flex justify-between items-center"><p class="text-black text-base not-italic font-bold leading-[15px]">Tell us more</p> <Close class="w-5 h-5" @click=" closeMeta" /></div>
					<MetaPlace
						v-model:address_type="address_type_pick"
						v-model:suite="suite_pick"
						v-model:room_number="room_number_pick"
						v-model:instruction="instruction_pick"
						v-model:collection_type="collection_type_pick"
						v-model:message_me_on_arrival="message_on_arrival_pick"
						v-model:leave_it_at_my_door_if_i_am_not_home="leave_at_door_pick"
						v-model:error="error_pick"
						intent="pick"
						:has_drop="has_drop"
						:address="address_pick"
					/>
				</template>
				<!-- <template v-else>
					<MetaPlace
						v-model:address_type="address_type_drop"
						v-model:suite="suite_drop"
						v-model:room_number="room_number_drop"
						v-model:instruction="instruction_drop"
						v-model:collection_type="collection_type_drop"
						v-model:message_me_on_arrival="message_on_arrival_drop"
						v-model:leave_it_at_my_door_if_i_am_not_home="leave_at_door_drop"
						v-model:error="error_drop"
						intent="drop"
						:has_drop="has_drop"
						:address="address_drop"
					/>
				</template> -->
				<button :disabled=" address_type_pick =='hotel' ? (collection_type_pick == undefined && room_number_pick == '') : collection_type_pick == undefined " class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-lg mt-[1.6875rem] px-5 py-[0.9375rem] text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="saveMeta()">Save and Continue</button>
			</div>
		</div>
		<div class="modal-backdrop bg-black/40" @click="closeDialog()" />
	</dialog>
</div>
</template>
