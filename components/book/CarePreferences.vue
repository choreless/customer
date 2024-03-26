<script setup lang="ts">
import customer from '~/lib/customer';
const book = usePageBook();

function next(){
	book.error.water_temperature = !book.water_temperature;
	book.error.dryer_temperature = !book.dryer_temperature;
	if(book.error.water_temperature || book.error.dryer_temperature) return;
	book.step++;
}
</script>

<template>
<div>
	<div class="max-w-xl mx-auto my-6 px-2">
		<h1 class="text-xl sm:text-2xl font-bold leading-loose">Care Preferences</h1>
		<h2 class="text-lg sm:text-xl font-bold leading-loose mt-2.5 text-brand-black">Water Temp</h2>
		<div class="sm:mt-2.5">
			<div class="flex flex-wrap gap-2.5">
				<label v-for="v of customer.water_temperatures" :key="v" class="btn btn-outline font-normal grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-blue [&:is(:hover,.active)]:border-brand-blue [&:is(:hover,.active)]:text-white" :class="book.water_temperature===v && 'active'">
					<input v-model="book.water_temperature" type="radio" :value="v" hidden>
					<p class="font-bold">{{ v }}</p>
				</label>
			</div>
			<p v-if="book.error.water_temperature" class="text-error">* Water Temperature is required</p>
		</div>
		<h2 class="text-lg sm:text-xl font-bold leading-loose mt-2.5 text-brand-black">Dryer Temp</h2>
		<div class="sm:mt-2.5">
			<div class="flex flex-wrap gap-2.5">
				<label v-for="v of customer.dryer_temperatures" :key="v" class="btn btn-outline font-normal grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-blue [&:is(:hover,.active)]:border-brand-blue [&:is(:hover,.active)]:text-white" :class="book.dryer_temperature===v && 'active'">
					<input v-model="book.dryer_temperature" type="radio" :value="v" hidden>
					<p class="font-bold">{{ v }}</p>
				</label>
			</div>
			<p v-if="book.error.dryer_temperature" class="text-error">* Dryer Temperature is required</p>
		</div>
		<div class=" h-12 min-h-12 flex items-center w-full border-brand-black/20 border rounded-lg mt-5 justify-between px-5">
			<p class="font-bold text-sm">Hang Dry</p>
			<div class="form-control w-fit">
				<label class="cursor-pointer label">
					<input type="checkbox" class="toggle bg-[#F85A47] hover:bg-[#F85A47] border-0" checked>
				</label>
			</div>
		</div>
		<button class="btn w-full h-[3.75rem] mt-2.5 px-5 py-[0.9375rem] rounded-[0.3125rem] text-2xl text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	</div>
</div>
</template>
