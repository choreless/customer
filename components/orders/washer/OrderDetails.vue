<script setup lang="ts">
import type { Step, Customer } from '~/pages/orders/create.vue';

defineProps<{
	step: Step
	error_total_weight: boolean
	customer?: Customer
}>();
const emit = defineEmits<{
	(e: 'next'): void,
	(e: 'setTotalBag', count: number): void,
	(e: 'setTotalWeight', weight: number): void,
	(e: 'setBags', bags: (number|null)[]): void
}>();

const {bags, total_bag, total_weight, deleteBag} = useFormBags();

watch(total_bag, n=>{emit('setTotalBag', n)})
watch(total_weight, n=>{emit('setTotalWeight', n)})
watch(bags, n=>{emit('setBags', n)}, { deep: true })
</script>

<template>
<section class="bg-white z-10 flex-grow">
	<div class="max-w-lg mx-auto px-3 md:px-0">
		<h2 class="text-2xl text-center font-bold">{{ step==='order_details' ? 'Order details' : 'Weight order' }}</h2>
		<div class="flex flex-col gap-1.5">
			<h3 class="font-bold">Care Preferences:</h3>
			<p class="text-sm"><b>Detergent:</b> {{ customer?.detergent }}</p>
			<p class="text-sm"><b>Water Temp:</b> {{ customer?.water_temperature }}</p>
			<p class="text-sm"><b>Dryer Temp:</b> {{ customer?.dryer_temperature }}</p>
			<div class="flex text-sm gap-1">
				<b class="text-nowrap">Add-ons:</b>
				<p>{{ customer?.addons.join(', ') }}</p>
			</div>
		</div>
		<div class="mt-5">
			<h3 class="font-bold">Preferences Notes</h3>
			<p class="text-sm mt-1">{{ customer?.comment }}</p>
		</div>
		<div class="mt-5">
			<button v-if="step==='order_details'" class="btn rounded-3xl block mx-auto bg-brand-orange text-white hover:bg-primary hover:scale-105" @click="$emit('next')">Start weight intake</button>
			<div v-else-if="step==='weight_order'" class="flex flex-col md:flex-row items-start justify-center gap-x-4">
				<div class="flex items-center gap-x-4">
					<img src="https://ik.imagekit.io/choreless/v2/icons/weight.svg" alt="icon" loading="lazy" class="w-8">
					<h2 class="text-[2rem] font-bold">Weight # 1</h2>
				</div>
				<div class="w-full md:w-fit">
					<div class="flex flex-col gap-y-3 mt-4 md:mt-0">
						<div v-for="(v, k) of bags" :key="k" class="grid items-center gap-x-2" :class="{'grid-cols-[1fr_auto]': bags.length>1}">
							<label class="input-float !h-[3.125rem]">
								<input v-model.number="bags[k]" type="number" placeholder="">
								<p>Bag {{ k+1 }} (lb<template v-if="v && v>1">s</template>) </p>
							</label>
							<button v-if="bags.length>1" class="btn btn-square btn-outline border-none btn-error hover:!text-white" @click="deleteBag(k)"><Icon name="ic:baseline-delete-forever" class="text-3xl" /></button>
						</div>
					</div>
					<p v-if="error_total_weight" class="text-error">* Invalid weight</p>
					<button class="font-bold mt-2.5 block ms-auto hover:text-brand-orange" @click="bags.push(null)">+ Add another weight</button>
					<label class="flex items-center justify-end gap-5 mt-5 cursor-pointer">
						<span class="text-sm">Is the order wet ?</span>
						<input type="checkbox" class="toggle toggle-primary">
					</label>
				</div>
			</div>
		</div>
	</div>
</section>
</template>
