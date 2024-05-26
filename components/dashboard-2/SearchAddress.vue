<script setup lang="ts">

// Defining Constants

const dashboard=usePageDashboard()
const selected_address=ref('720 seneca street, seattle, US, 98101')
const search=ref('')
const is_address_expanded=ref(false)
const filtered_address=ref(dashboard.addresses)

// Defining Functions

function search_address() {
	filtered_address.value = dashboard.addresses.filter((address:string) => address.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()));
}
function delete_address(index:number) {
	dashboard.addresses.splice(index, 1)
}
</script>

<template>
<div class="flex  flex-col mx-auto">
	<h1 class="text-xl sm:text-2xl font-bold leading-[1.875rem] text-center ">Welcome back, Wallace </h1>
	<div class="p-2.5 h-[2.813rem] flex gap-2.5 justify-between items-center border-b-[0.063rem] border-brand-secondary">
		<IconLocation class="stroke-brand-secondary" />
		<p class=" text-sm sm:text-base line-clamp-1 overflow-hidden leading-5 text-brand-black sm:mr-4 ">
			{{ selected_address }}
		</p>
		<IconDropdownThin :class="is_address_expanded ? 'rotate-180' : 'rotate-0' " class="cursor-pointer transition-all ease-linear duration-150" @click="is_address_expanded=!is_address_expanded" />
	</div>
	<div v-if="is_address_expanded" class="flex gap-2.5 mt-2.5 flex-col">
		<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
		<div class="relative">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
				</svg>
			</div>
			<input id="default-search" v-model="search" type="text" class="block outline-none w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-brand-orange focus:border-brand-orange dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-orange dark:focus:border-brand-orange" placeholder="Search Address" required @input="search_address">
		</div>
		<div class="text-brand-secondary p-2 bg-gray-300 rounded-[0.313rem] ">Saved Address</div>
		<ul v-for="(address,index) in filtered_address" :key="index">
			<li class="flex gap-2.5 items-center justify-between p-2.5 border-b-[0.063rem] border-gray-200 cursor-pointer">
				<div class="flex gap-2.5">
					<IconLocation class="stroke-brand-black" />
					<p @click="selected_address=address"> {{ address }}  </p>
				</div>
				<div class="flex gap-2.5"><IconEdit class="!fill-brand-black cursor-pointer" /> <div class="cursor-pointer" @click="delete_address(index)">DLT</div></div>
			</li>
		</ul>
	</div>
</div>
</template>
