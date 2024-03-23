<script setup lang="ts">
import type { Address } from '~/components/form/place/Google.vue';
import type { AddressType, CollectionType } from '~/types/address';
import type { Error } from '~/components/entry/Address.vue';

const props = defineProps<{
	intent: 'pick'|'drop'
	has_drop: boolean
	address: Address
	address_type: AddressType
	suite: string
	room_number: string
	instruction: string
	collection_type: CollectionType|undefined
	message_me_on_arrival: boolean
	leave_it_at_my_door_if_i_am_not_home: boolean
	error: Error
}>();

const emit = defineEmits<{
	(e: 'update:address_type', address_type: AddressType): void
	(e: 'update:suite', pick_suite: string): void
	(e: 'update:room_number', room_number: string): void
	(e: 'update:instruction', instruction: string): void
	(e: 'update:collection_type', collection_type: CollectionType|undefined): void
	(e: 'update:message_me_on_arrival', message_me_on_arrival: boolean): void
	(e: 'update:leave_it_at_my_door_if_i_am_not_home', leave_it_at_my_door_if_i_am_not_home: boolean): void
	(e: 'update:error', error: Error): void
}>();

const address_type_computed = computed({
	get: ()=>props.address_type,
	set(v: AddressType){emit('update:address_type', v)}
})
const suite_computed = computed({
	get: ()=>props.suite,
	set(v: string){emit('update:suite', v)}
})
const room_number_computed = computed({
	get: ()=>props.room_number,
	set(v: string){emit('update:room_number', v)}
})
const instruction_computed = computed({
	get: ()=>props.instruction,
	set(v: string){emit('update:instruction', v)}
})
const collection_type_computed = computed({
	get: ()=>props.collection_type,
	set(v: CollectionType|undefined){emit('update:collection_type', v)}
})
const message_me_on_arrival_computed = computed({
	get: ()=>props.message_me_on_arrival,
	set(v: boolean){emit('update:message_me_on_arrival', v)}
})
const leave_it_at_my_door_if_i_am_not_home_computed = computed({
	get: ()=>props.leave_it_at_my_door_if_i_am_not_home,
	set(v: boolean){emit('update:leave_it_at_my_door_if_i_am_not_home', v)}
})
const error_computed = computed({
	get: ()=>props.error,
	set(v: Error){emit('update:error', v)}
})

watch(collection_type_computed, ()=>{
	error_computed.value.collection_type = false;
})
</script>

<template>
<div>
	<div>
		<h1 class="text-xl sm:text-2xl font-bold">
			Confirm your address for
			<template v-if="has_drop">{{ intent==='pick' ? 'pickup' : 'delivery' }}</template>
			<template v-else>pickup & delivery</template>
		</h1>
		<p class="text-base sm:text-lg mt-2.5 text-brand-black/50">
			{{ address.label }}
		</p>
	</div>
	<div class="mt-6">
		<h2 class="text-xl sm:text-2xl font-bold">Choose address type*</h2>
		<div class="grid sm:grid-cols-3 gap-x-6 gap-y-2 mt-2.5">
			<button class="btn flex items-center gap-x-3 bg-transparent rounded-md border-brand-black hover:border-2 hover:border-brand-blue hover:bg-[#f5f9fd]" :class="address_type_computed==='home' && 'border-2 border-brand-blue bg-[#f5f9fd]'" @click="address_type_computed='home'">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaHome.svg" alt="icon" loading="lazy">
				<p class="text-base sm:text-xl font-normal">Home</p>
			</button>
			<button class="btn flex items-center gap-x-3 bg-transparent rounded-md border-brand-black hover:border-2 hover:border-brand-blue hover:bg-[#f5f9fd]" :class="address_type_computed==='office' && 'border-2 border-brand-blue bg-[#f5f9fd]'" @click="address_type_computed='office'">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaShop.svg" alt="icon" loading="lazy">
				<p class="text-base sm:text-xl font-normal">Office</p>
			</button>
			<button class="btn flex items-center gap-x-3 bg-transparent rounded-md border-brand-black hover:border-2 hover:border-brand-blue hover:bg-[#f5f9fd]" :class="address_type_computed==='hotel' && 'border-2 border-brand-blue bg-[#f5f9fd]'" @click="address_type_computed='hotel'">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaGirl.svg" alt="icon" loading="lazy">
				<p class="text-base sm:text-xl font-normal">Hotel</p>
			</button>
		</div>
		<div>
			<label v-if="address_type_computed!=='hotel'" class="input-float mt-5">
				<input v-model="suite_computed" type="text" placeholder="">
				<p>Apt / Suite / Unit*</p>
			</label>
			<label v-if="address_type_computed==='hotel'" class="input-float mt-5">
				<input v-model="room_number_computed" type="text" placeholder="">
				<p>Enter your room number*</p>
			</label>
			<textarea v-model="instruction_computed" class="textarea w-full textarea-bordered mt-3" :placeholder="`${intent==='pick' ? 'Pickup' : 'Drop off'} instruction`" />
		</div>
	</div>
	<div class="mt-2.5">
		<h2 class="text-brand-black text-xl sm:text-2xl font-bold">Select collection type*</h2>
		<div class="grid gap-x-6 gap-y-3 mt-2.5 min-h-32" :class="address_type_computed==='home' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'">
			<button class="btn h-auto flex flex-col items-center gap-x-3 bg-transparent rounded-md py-2 border-brand-black hover:border-2 hover:border-brand-blue hover:bg-[#f5f9fd]" :class="collection_type_computed==='use_reception' && 'border-2 border-brand-blue bg-[#f5f9fd]'" @click="collection_type_computed='use_reception'">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaAlarm.svg" alt="icon" loading="lazy">
				<p class="text-base sm:text-xl font-normal">Use reception</p>
			</button>
			<button v-if="address_type_computed==='home'" class="btn h-auto flex flex-col items-center gap-x-3 bg-transparent rounded-md py-2 border-brand-black hover:border-2 hover:border-brand-blue hover:bg-[#f5f9fd]" :class="collection_type_computed==='from_outside' && 'border-2 border-brand-blue bg-[#f5f9fd]'" @click="collection_type_computed='from_outside'">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaDoor.svg" alt="icon" loading="lazy">
				<p class="text-base sm:text-xl font-normal">From outside</p>
			</button>
			<button class="btn h-auto flex flex-col items-center gap-x-3 bg-transparent rounded-md py-2 border-brand-black hover:border-2 hover:border-brand-blue hover:bg-[#f5f9fd]" :class="collection_type_computed==='meet_driver' && 'border-2 border-brand-blue bg-[#f5f9fd]'" @click="collection_type_computed='meet_driver'">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaMan.svg" alt="icon" loading="lazy">
				<p class="text-base sm:text-xl font-normal">Meet driver</p>
			</button>
		</div>
		<p v-if="error.collection_type" class="text-error mt-1">* Collection type is required</p>
	</div>
	<div class="mt-3">
		<label class="cursor-pointer flex items-center gap-x-3">
			<input v-model="message_me_on_arrival_computed" type="checkbox" class="checkbox checkbox-primary w-5 h-5">
			<div class="text-black">Message me on arrival</div>
		</label>
		<label v-if="address_type_computed==='home'" class="cursor-pointer flex items-center gap-x-3">
			<input v-model="leave_it_at_my_door_if_i_am_not_home_computed" type="checkbox" class="checkbox checkbox-primary w-5 h-5">
			<div class="text-black">Leave it at my door if i’m not home</div>
		</label>
	</div>
</div>
</template>
