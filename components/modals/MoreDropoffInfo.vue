<script setup lang="ts">
import type { Address, AddressType, CollectionType } from '~/types';
import type { Error } from '~/components/entry/Address.vue';

const props = defineProps<{
  address: Address;
  address_type: AddressType;
  suite: string;
  room_number: string;
  instruction: string;
  collection_type: CollectionType | undefined;
  message_me_on_arrival: boolean;
  leave_it_at_my_door_if_i_am_not_home: boolean;
  error: Error;
  showMoreDropoffInfoModal?: Boolean | false
}>()
const emit = defineEmits<{
  (e: 'update:address_type', address_type: AddressType): void;
  (e: 'update:suite', pick_suite: string): void;
  (e: 'update:room_number', room_number: string): void;
  (e: 'update:instruction', instruction: string): void;
  (
    e: 'update:collection_type',
    collection_type: CollectionType | undefined
  ): void;
  (e: 'update:message_me_on_arrival', message_me_on_arrival: boolean): void;
  (
    e: 'update:leave_it_at_my_door_if_i_am_not_home',
    leave_it_at_my_door_if_i_am_not_home: boolean
  ): void;
  (e: 'update:error', error: Error): void;
  (e: 'hideMoreDropoffInfoModal'): void;
  (e: 'saveMoreDropoffInfo'): void;
}>();

const collection_type_computed = computed({
	get: () => props.collection_type,
	set(v: CollectionType | undefined) {
		emit('update:collection_type', v);
	}
});
const address_type_computed = computed({
	get: () => props.address_type,
	set(v: AddressType) {
		emit('update:address_type', v);
	}
});
const error_computed = computed({
	get: () => props.error,
	set(v: Error) {
		emit('update:error', v);
	}
});
const message_me_on_arrival_computed = computed({
	get: () => props.message_me_on_arrival,
	set(v: boolean) {
		emit('update:message_me_on_arrival', v);
	}
});
const leave_it_at_my_door_if_i_am_not_home_computed = computed({
	get: () => props.leave_it_at_my_door_if_i_am_not_home,
	set(v: boolean) {
		emit('update:leave_it_at_my_door_if_i_am_not_home', v);
	}
});
const instruction_computed = computed({
	get: () => props.instruction,
	set(v: string) {
		emit('update:instruction', v);
	}
});
const openType = ref(false);
watch(collection_type_computed, () => {
	error_computed.value.collection_type = false;
});
const morePickupInfoModalRef = ref<HTMLDialogElement | null>(null)
</script>

<template>
<dialog ref="morePickupInfoModalRef" :class="`modal ${showMoreDropoffInfoModal ? 'modal-open' : ''}`">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" @click="$emit('hideMoreDropoffInfoModal')">✕</button>
		</form>

		<div class="">
			<div class="mt-5">
				<!-- <h1 class="text-xl sm:text-2xl font-bold">
			Confirm your address for
			<template v-if="has_drop">{{ intent==='pick' ? 'pickup' : 'delivery' }}</template>
			<template v-else>pickup & delivery</template>
		</h1> -->
				<div class="flex">
					<div class="relative">
						<icon-pick-drop />
						<p
							class="absolute text-white text-[15px] not-italic font-bold leading-5 top-[2px] left-[6.8px]"
						>
							A
						</p>
					</div>
					<div class="ml-[10px]">
						<p class="text-black text-2xl not-italic font-medium leading-[30px]">
							{{ address.label.split(",")[0].trim() }}
						</p>
						<p
							class="text-[rgba(0,0,0,0.50)] text-lg not-italic font-normal leading-5"
						>
							{{ address.label.split(",").slice(1).join(",").trim() }}
						</p>
					</div>
				</div>
			</div>
			<div class="mt-5">
				<h2 class="text-black text-2xl not-italic font-bold leading-8">
					Choose address type
				</h2>
				<div class="flex items-center justify-between gap-x-[18px] gap-y-2 mt-[14px]">
					<button
						class="flex h-[50px] justify-center items-center gap-x-[6px] flex-[1_0_0] px-[14px] py-2.5 rounded-[5px] border-2 border-solid hover:border-[#F85A47]"
						:class="
							address_type_computed === 'home' &&
								'border-2 border-[#F85A47] bg-[#F85A47] !text-[white]'
						"
						@click="address_type_computed = 'home'"
					>
						<icon-home
							class="h-[25px] w-[36px]"
							:class="address_type_computed === 'home' && 'fill-white'"
							:color="address_type_computed === 'home' ? 'white' : 'black'"
						/>
						<p
							class="text-black text-2xl not-italic font-medium leading-[30px]"
							:class="address_type_computed === 'home' && 'text-white'"
						>
							Home
						</p>
					</button>
					<button
						class="flex h-[50px] justify-center items-center gap-x-[6px] flex-[1_0_0] px-[14px] py-2.5 rounded-[5px] border-2 border-solid hover:border-[#F85A47]"
						:class="
							address_type_computed === 'office' &&
								'border-2 border-[#F85A47] bg-[#F85A47] text-white'
						"
						@click="address_type_computed = 'office'"
					>
						<icon-office
							:color="address_type_computed === 'office' ? 'white' : 'black'"
						/>
						<p
							class="text-black text-2xl not-italic font-medium leading-[30px]"
							:class="address_type_computed === 'office' && 'text-white'"
						>
							Office
						</p>
					</button>
					<button
						class="flex h-[50px] justify-center items-center gap-x-[6px] flex-[1_0_0] px-[14px] py-2.5 rounded-[5px] border-2 border-solid hover:border-[#F85A47]"
						:class="
							address_type_computed === 'hotel' &&
								'border-2 border-[#F85A47] bg-[#F85A47] text-white'
						"
						@click="address_type_computed = 'hotel'"
					>
						<icon-hotel
							:color="address_type_computed === 'hotel' ? 'white' : 'black'"
						/>
						<p
							class="text-black text-2xl not-italic font-medium leading-[30px]"
							:class="address_type_computed === 'hotel' && 'text-white'"
						>
							Hotel
						</p>
					</button>
				</div>
				<div
					class="mt-5 bg-white border border-gray-400 rounded-md "
					@click="openType = !openType"
				>
					<div
						class="py-[18px] px-5 min-h-[60px] text-[20px] leading-6 uppercase flex justify-between items-center pe-4 font-bold"
					>
						<div class="flex gap-x-3 items-center">
							<icon-alarm
								v-if="collection_type_computed === 'Use Reception'"
								class="w-5 h-5 gap-x-2"
							/>
							<icon-book
								v-if="collection_type_computed === 'From Outside'"
								class="w-5 h-5 gap-x-2"
							/>
							<icon-person-deliver
								v-if="collection_type_computed === 'Meet Driver'"
								class="w-5 h-5 gap-x-2"
							/>
							{{ collection_type_computed ?? "Select collection type" }}
						</div>
						<Icon
							:name="
								!openType ? 'material-symbols:add-rounded' : 'ic:sharp-minus'
							"
						/>
					</div>
				</div>
				<ul
					v-if="openType"
					class="menu bg-white z-30 shadow-[rgba(0,0,0,0.35)_0px_5px_15px] w-56 rounded-box absolute mt-2.5"
				>
					<div @click="openType = !openType">
						<li class="text-base " @click="collection_type_computed = 'Use Reception' ">
							<a>
								<icon-alarm class="w-5" />
								Use reception
							</a>
						</li>
					</div>
					<div @click="openType = !openType">
						<li class="text-base " @click="collection_type_computed = 'From Outside'">
							<a>
								<icon-book class="w-5" />
								From outside
							</a>
						</li>
					</div>
					<div @click="openType = !openType">
						<li class="text-base " @click="collection_type_computed = 'Meet Driver'">
							<a>
								<icon-person-deliver class="w-5" />
								Meet driver
							</a>
						</li>
					</div>
				</ul>
				<div>
					<!-- <label v-if="address_type_computed!=='hotel'" class="input-float mt-5">
				<input v-model="suite_computed" type="text" placeholder="">
				<p>Apt / Suite / Unit*</p>
			</label>
			<label v-if="address_type_computed==='hotel'" class="input-float mt-5">
				<input v-model="room_number_computed" type="text" placeholder="">
				<p>Enter your room number*</p>
			</label>
			<textarea v-model="instruction_computed" class="textarea w-full textarea-bordered mt-3" :placeholder="`${intent==='pick' ? 'Pickup' : 'Drop off'} instruction`" /> -->
				</div>
			</div>
			<!-- <div class="mt-2.5">
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
	</div> -->
			<div class="mt-3 flex flex-col items-start">
				<label
					class="cursor-pointer w-full flex items-center justify-between border-b-[1px] border-[#0000001a] py-5"
				>
					<div>
						<div v-if="address_type_computed ==='hotel'" class="text-black text-xl leading-6">Room number <span class="text-[#838383] leading-6 text-xs font-normal">(Required)</span></div>
						<div v-else class="text-black text-xl leading-6">Unit/Apt</div>
					</div>
					<div class="text-base font-medium text-[#F85A47]">Add </div>
				</label>
				<label
					class="cursor-pointer w-full flex items-center justify-between border-b-[1px] border-[#0000001a] py-5"
				>
					<div class="text-black text-xl leading-6">Message me on arrival</div>
					<input
						v-model="message_me_on_arrival_computed"
						type="checkbox"
						class="checkbox border-[#838383] w-5 h-5 rounded-[4px]"
					>
				</label>
				<label
					v-if="address_type_computed === 'home'"
					class="cursor-pointer flex items-center w-full gap-x-3 justify-between border-b-[1px] border-[#0000001a] py-5"
				>
					<div class="text-black text-xl leading-6">
						Leave it at my door if i’m not home
					</div>
					<input
						v-model="leave_it_at_my_door_if_i_am_not_home_computed"
						type="checkbox"
						class="checkbox w-5 h-5 border-[#838383] rounded-[4px]"
					>
				</label>
				<label
					class="cursor-pointer flex items-center w-full gap-x-3 justify-between pt-5 pb-2"
				>
					<div class="text-black text-xl leading-6">Add {{ address_type_computed =='home' ? 'address' : address_type_computed }} details</div>
					<div class="text-base font-medium">Clear</div>
				</label>
				<textarea
					v-model="instruction_computed"
					class="text-base text-black leading-5 w-full transition-all focus:outline-0 p-3 border border-[#E5E5E5] rounded-[5px] hover:border-brand-orange  duration-200 focus:border-b-[5px] focus:border-brand-orange focus:pt-[20px]"
					placeholder="Add details..."
				/>
			</div>
			<button

				class="disabled:bg-[#F3F3F6] disabled:text-black disabled:hover:bg-[#f3f3f6d0] btn w-full h-[3.75rem] rounded-[0.3125rem] text-base mt-[1.6875rem] px-5 py-[19px] text-white bg-[#F85A47] border-[#F85A47] hover:text-[#F85A47] hover:bg-transparent hover:border-[#F85A47]"
				@click="$emit('saveMoreDropoffInfo')"
			>
				Save and Continue
			</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop" @click="$emit('hideMoreDropoffInfoModal')">
		<button>close</button>
	</form>
</dialog>
</template>
