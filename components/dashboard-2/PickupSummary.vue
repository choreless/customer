<script setup lang="ts">
import Card from '~/components/dashboard-2/Card.vue';
import SearchAddress from '~/components/dashboard-2/SearchAddress.vue';
const dashboard=usePageDashboard()
</script>

<template>
<div class="my-[3.125rem] max-w-[26.875rem] mx-auto w-full">
	<div class="flex flex-col gap-2.5 sm:gap-[1.25rem]">
		<SearchAddress />
		<Card v-for="(order,index) in dashboard.order_data" :key="index" :order_data="order" />
		<button class="px-[1.25rem] py-[1.125rem] text-center rounded-[0.313rem] bg-brand-orange text-white text-2xl leading-6 font-bold">New Order</button>
	</div>
</div>
</template>
