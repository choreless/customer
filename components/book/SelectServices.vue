<script setup lang="ts">
import customer from '~/lib/customer';

const book = usePageBook();

const extra_service = ref<boolean>();

function next(){
	book.error.zip = !book.zip;
	if(!book.error.zip) book.step++;
}
</script>

<template>
<div>
	<div class="max-w-xl mx-auto my-6 px-2">
		<h1 class="text-xl sm:text-2xl font-bold leading-loose">What services do you need?</h1>
		<button v-for="v of book.wash_types" :key="v" class="w-full mt-2.5 p-2.5 border-2 rounded-md text-start group border-brand-black/10 [&:is(:hover,.active)]:border-brand-blue [&:is(:hover,.active)]:bg-[#f5f9fd]" :class="book.wash_type===v && 'active'" @click="book.wash_type=v">
			<div class="w-full flex items-center justify-between">
				<div class="flex flex-col sm:flex-row sm:items-center gap-x-2.5 gap-y-2">
					<div class="flex items-center gap-x-2.5">
						<img :src="`https://ik.imagekit.io/choreless/v2/icons/${v==='mixed' ? 'mixed_wash%203' : 'separate_wash%202'}.svg`" alt="icon" loading="lazy" class="w-12">
						<p class="text-xl sm:text-2xl font-bold capitalize">{{ v }} Wash</p>
					</div>
					<div class="flex items-center gap-x-1">
						<img src="https://ik.imagekit.io/choreless/v2/icons/time.svg" alt="icon" loading="lazy" class="w-4">
						<p class="text-sm font-medium">24-48h Service</p>
					</div>
				</div>
				<div class="btn btn-sm btn-outline text-base px-2 sm:px-3 text-brand-blue border-brand-blue group-[:is(.active,:hover)]:bg-brand-blue group-[:is(.active,:hover)]:border-brand-blue group-[:is(.active,:hover)]:text-white"><span class="text-2xl">+</span> {{ book.wash_type===v ? 'Added' : 'Add' }}</div>
			</div>
			<p class="mt-2.5">A <span class="font-bold">{{ v==='mixed' ? '$30' : '$40' }} minimum</span> order value applies.</p>
			<div class="flex gap-x-1.5 mt-2.5">
				<p class="text-xs px-3 py-0.5 rounded-full bg-zinc-200">WASH</p>
				<p class="text-xs px-3 py-0.5 rounded-full bg-zinc-200">TUMBLE-DRY</p>
				<p class="text-xs px-3 py-0.5 rounded-full bg-zinc-200">IN A BAG</p>
			</div>
			<p class="mt-2.5">{{ v==='mixed' ? 'Convenient wash & fold laundry service for individuals couples.' : 'Twice weekly wash & fold pickup & delivery handles extra loads.' }}</p>
		</button>
		<h1 class="text-xl sm:text-2xl font-bold leading-loose mt-2.5">Extra services</h1>
		<p class="mt-2.5">Do you have any large items, like a blanket, that will require their own load? <NuxtLink class="border-b border-brand-black">See pricing</NuxtLink></p>
		<div class="flex gap-x-5 mt-5">
			<button class="btn btn-outline text-xl grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-blue [&:is(:hover,.active)]:border-brand-blue [&:is(:hover,.active)]:text-white" :class="extra_service && 'active'" @click="extra_service=true">Yes</button>
			<button class="btn btn-outline text-xl grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-blue [&:is(:hover,.active)]:border-brand-blue [&:is(:hover,.active)]:text-white" :class="extra_service===false && 'active'" @click="extra_service=false">No</button>
		</div>
		<div v-if="extra_service" class="text-center border rounded-md mt-2.5 px-2 sm:px-16 py-2.5 border-brand-black/20">
			<p class="text-lg sm:text-2xl font-bold">$8 per large item (+ per pound rate)</p>
			<p class="text-sm sm:text-base mt-1 leading-[1.125rem]">Please note: We cannot accommodate extra large items, like king comforters. Extra large items will be returned without laundry at no charge.</p>
		</div>
		<div class="mt-2.5 rounded-md bg-[linear-gradient(177deg,#3063ff_2.82%,#678dff_97.18%)] text-white">
			<div class="flex gap-x-5 p-2.5">
				<img src="https://ik.imagekit.io/choreless/v2/icons/need_list_every_item%201.svg" alt="icon" loading="lazy" class="w-16">
				<div>
					<p class="text-lg sm:text-2xl font-bold">Do I need to list each item?</p>
					<p class="text-sm sm:text-base leading-4 mt-1">Item listing is not required. Simply book your choice of services, then pack one bag per service.</p>
				</div>
			</div>
		</div>
		<h2 class="text-lg sm:text-xl font-bold leading-loose mt-2.5 text-brand-black">Any specific notes about this order?</h2>
		<textarea rows="2" class="textarea textarea-bordered w-full mt-2.5" placeholder="Add specific notes about this order? " />
		<div class="flex flex-wrap gap-2.5 mb-2.5">
			<label v-for="v of customer.care_services" :key="v" class="badge !p-4 cursor-pointer bg-black/5 hover:scale-105 hover:bg-primary hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="book.care_services.includes(v) && 'active'">
				<input v-model="book.care_services" type="checkbox" :value="v" hidden>
				<p>{{ v }}</p>
			</label>
		</div>
		<h2 class="text-lg sm:text-xl font-bold leading-loose mt-2.5 text-brand-black">Add-ons</h2>
		<div class="flex flex-wrap gap-2.5 mb-2.5">
			<label v-for="v, p in customer.addons2" :key="p" class="badge !p-4 cursor-pointer bg-black/5 hover:scale-105 hover:bg-primary hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="book.addons.includes(p) && 'active'">
				<input v-model="book.addons" type="checkbox" :value="p" hidden>
				<p>{{ p }} + {{ v }} </p>
			</label>
		</div>
		<label class="input-float mt-5">
			<input v-model="book.zip" type="text" placeholder="">
			<p>Zip Code</p>
		</label>
		<p v-if="book.error.zip" class="text-error">* Zip is required</p>
		<button class="btn w-full h-[3.75rem] mt-2.5 px-5 py-[0.9375rem] rounded-[0.3125rem] text-2xl text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	</div>
</div>
</template>
