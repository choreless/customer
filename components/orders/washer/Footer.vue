<script setup lang="ts">
import type { Step } from '~/pages/orders/create.vue';
defineProps<{
	step: Step,
	total_weight: number
	loading: boolean
}>();

defineEmits<{(e: 'next'): void}>();
</script>

<template>
<section class="grid grid-cols-1 items-center justify-between gap-y-1 px-4 lg:px-[3.125rem] border-t py-5 border-black/20" :class="['order_details', 'weight_order'].includes(step) ? 'lg:grid-cols-3' : 'lg:grid-cols-2' ">
	<div class="flex lg:flex-col items-center gap-x-2.5 mr-auto">
		<h4 class="text-lg lg:text-2xl font-bold lg:mt-2.5 lg:order-2"><b>Intake</b></h4>
		<div class="flex gap-2.5 lg:gap-5 h-3 lg:h-5 lg:order-1">
			<span class="w-14 lg:w-20 rounded-full" :class="['order_details', 'weight_order'].includes(step) ? 'bg-brand-orange' : 'bg-brand-orange/20'" />
			<span class="w-14 lg:w-20 rounded-full" :class="step==='weight_order' ? 'bg-brand-orange' : 'bg-brand-orange/20'" />
			<span class="w-14 lg:w-20 rounded-full bg-brand-orange/20" />
		</div>
	</div>
	<p v-if="['order_details', 'weight_order'].includes(step)" class="text-lg lg:text-[2rem] text-center">Total weight: {{ total_weight }} lb<template v-if="total_weight>1">s</template></p>
	<div class="flex gap-x-5 w-full lg:w-fit lg:h-[3.75rem] ms-auto justify-between">
		<NuxtLink to="/dashboard" class="btn btn-sm lg:btn-md px-1 border-0 shadow-none h-full underline rounded-full !bg-transparent hover:no-underline hover:text-brand-orange hover:scale-105">Cancel</NuxtLink>
		<button class="btn btn-sm lg:btn-md gap-0 text-base flex rounded-full h-full lg:!px-10 bg-brand-orange text-white hover:scale-105 hover:bg-primary" :class="loading && 'pe-1'" @click="$emit('next')">
			<p>
				<template v-if="step==='order_details'">Next</template>
				<template v-else>Complete order</template>
			</p>
			<span v-if="loading" class="loading loading-sm loading-ball" />
		</button>
	</div>
</section>
</template>
