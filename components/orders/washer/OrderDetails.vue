<script setup lang="ts">
import type { UnwrapRef } from 'vue';
import type { CustomerInfo4Washer } from '~/types/user';
type Step = 'order_details'|'weight_order'|'wet_weight';
type Bags = UnwrapRef<ReturnType<typeof useFormBags>['bags']>;

const props = defineProps<{
	step: Step
	error_total_weight: boolean
	customer?: CustomerInfo4Washer
	bags: Bags
	is_wet?: boolean
	deleteBag: ReturnType<typeof useFormBags>['deleteBag']
}>();
const emit = defineEmits<{
	(e: 'next'): void,
	(e: 'setTotalBag', count: number): void,
	(e: 'setTotalWeight', weight: number): void,
	(e: 'setBags', bags: (number|null)[]): void,
	(e: 'update:bags', bags: Bags): void
	(e: 'update:is_wet', is_wet: boolean): void
}>();

const computed_bags = computed({
	get: ()=>props.bags,
	set(set_value: Bags){
		emit('update:bags', set_value)
	}
})

const computed_is_wet = computed({
	get: ()=>props.is_wet ?? false,
	set(set_value: boolean){
		emit('update:is_wet', set_value);
	}
})
</script>

<template>
<section class="bg-white flex-grow flex items-center">
	<div class="max-w-3xl mx-auto px-3 md:px-0">
		<div v-if="step==='wet_weight'">
			<h2 class="text-4xl text-center font-medium">How much does the order weight?</h2>
		</div>
		<div v-else>
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
		</div>
		<div class="mt-5">
			<button v-if="step==='order_details'" class="btn rounded-3xl block mx-auto bg-brand-orange text-white hover:bg-primary hover:scale-105" @click="$emit('next')">Start weight intake</button>
			<div v-else class="flex flex-col md:flex-row items-start justify-center gap-x-4" :class="step==='wet_weight' && 'mt-12'">
				<div class="flex items-center gap-x-4">
					<img src="https://ik.imagekit.io/choreless/v2/icons/weight.svg" alt="icon" loading="lazy" class="w-8">
					<h2 class="text-[2rem] font-bold">Weight # {{ step==='weight_order' ? 1 : 2 }}</h2>
				</div>
				<ClientOnly>
					<div class="w-full md:w-fit">
						<div class="flex flex-col gap-y-3 mt-4 md:mt-0">
							<div v-for="(v, k) of computed_bags" :key="k" class="grid items-center gap-x-2" :class="{'grid-cols-[1fr_auto]': computed_bags.length>1}">
								<label class="input-float2">
									<input v-model.number="computed_bags[k]" type="number" placeholder="" min="0">
									<p>Bag {{ k+1 }} (lb<template v-if="v && v>1">s</template>)</p>
								</label>
								<button v-if="bags.length>1" class="btn btn-square btn-outline border-none btn-error hover:!text-white" @click="deleteBag(k)"><Icon name="ic:baseline-delete-forever" class="text-3xl" /></button>
							</div>
						</div>
						<p v-if="error_total_weight" class="text-error">* Invalid weight</p>
						<button class="font-bold mt-2.5 block ms-auto hover:text-brand-orange" @click="computed_bags.push(null)">+ Add another weight</button>
						<label v-if="step==='weight_order'" class="flex items-center justify-end gap-5 mt-5 cursor-pointer">
							<span class="text-sm">Is the order wet ?</span>
							<input v-model="computed_is_wet" type="checkbox" class="toggle toggle-primary">
						</label>
					</div>
				</ClientOnly>
			</div>
		</div>
	</div>
</section>
</template>
