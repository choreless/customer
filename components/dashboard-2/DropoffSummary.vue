<script setup lang="ts">
import Card from '~/components/dashboard-2/Card.vue';
import SearchAddress from '~/components/dashboard-2/SearchAddress.vue';
const dashboard=usePageDashboard()
function address_selected(address:string){
	dashboard.dropoff_address=address;
}
</script>

<template>
<div class="px-2.5 my-[3.125rem] max-w-[20rem] sm:max-w-[26.875rem] mx-auto w-full">
	<div class="flex flex-col gap-2.5 sm:gap-[1.25rem]">
		<img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" alt="Choreless" loading="lazy" class=" w-[9.375rem] h-[3.438rem] sm:w-[18.75rem] sm:h-[6.813rem] mx-auto ">
		<SearchAddress :address="dashboard.dropoff_address" class="w-full sm:w-[20.625rem] " @get_address="address_selected" />
		<Card v-for="(order,index) in dashboard.order_data_dropoff" :key="index" :index="index" :order_data="order" />
		<button class="px-[1.25rem] py-[1.125rem] text-center rounded-[0.313rem] bg-brand-orange text-white text-base sm:text-2xl leading-6 font-medium sm:font-bold">New Order</button>
	</div>
</div>
</template>
