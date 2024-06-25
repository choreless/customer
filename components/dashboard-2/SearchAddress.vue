<script setup lang="ts">

// Defining Constants
const props = defineProps({
	address: {
		type: String,
		required: true
	}
});
const emits=defineEmits(['get_address'])
const dashboard=usePageDashboard()
const selected_address=ref('720 seneca street, seattle, US, 98101')
const search=ref('')
const is_address_expanded=ref(false)
const filtered_address=ref(dashboard.addresses)

// Defining Functions

function searchAddress() {
	filtered_address.value = dashboard.addresses.filter((address:string) => address.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()));
}
function deleteAddress(index:number) {
	dashboard.addresses.splice(index, 1)
}
function selectAddress(address:string) {
	selected_address.value=address
	emits('get_address', selected_address.value)
}
</script>

<template>
<div class="flex  flex-col mx-auto">
	<h1 class="text-xl sm:text-2xl font-bold leading-[1.875rem] text-center ">Welcome back, Wallace </h1>
	<div class="p-2.5 h-[2.813rem] flex gap-2.5 justify-between items-center border-b-[0.063rem] border-[#838383]">
		<img src="https://ik.imagekit.io/choreless/V2S/icons/location.svg" alt="choreless location" />
		<p class=" text-sm sm:text-base line-clamp-1 overflow-hidden leading-5 text-brand-black sm:mr-4 ">
			{{ address }}
		</p>
		<img src="https://ik.imagekit.io/choreless/V2S/icons/thin-dropdown.svg" alt="choreless dropdown" :class="is_address_expanded ? 'rotate-180' : 'rotate-0' " class="cursor-pointer transition-all ease-linear duration-150" @click="is_address_expanded=!is_address_expanded" />
	</div>
	<div v-if="is_address_expanded" class="flex p-2.5 flex-col">
		<div class="relative ">
			<div class="absolute inset-y-0 start-0 flex items-center px-2.5 py-[0.938rem] pointer-events-none">
			<img class="w-5 h-5" src="https://ik.imagekit.io/choreless/V2S/icons/search.svg" alt="choreless Search" />
			</div>
			<input id="default-search" v-model="search" type="text" class="block outline-none w-full p-4 ps-10 text-sm text-brand-black border border-[#e5e5e5] rounded-[0.313rem] bg-white dark:bg-white dark:border-[#e5e5e5] placeholder-[#e5e5e5] dark:text-white " placeholder="Search Address" required @input="searchAddress">
		</div>
		<div class="text-[#838383] p-2.5 bg-[#e5e5e5] rounded-t-[0.313rem] mt-2.5 ">Saved Address</div>
		<ul v-for="(addres,index) in filtered_address" :key="index">
			<li class="flex items-center justify-between p-2.5 border-b-[0.063rem] border-gray-200 cursor-pointer">
				<div class="flex gap-2.5 max-w-[160px]">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/location-2.svg" alt="choreless location" />
					<p @click="selectAddress(addres)"> {{ addres }}  </p>
				</div>
				<div class="flex gap-5 "><img src="https://ik.imagekit.io/choreless/V2S/icons/edit-2.svg" alt="choreless edit" class="cursor-pointer w-[0.938rem] h-[w-[0.938rem] " /><img src="https://ik.imagekit.io/choreless/V2S/icons/delete.svg" alt="choreless delete" class="w-[0.938rem] h-[w-[0.938rem] cursor-pointer" @click="deleteAddress(index)" /></div>
			</li>
		</ul>
	</div>
</div>
</template>
