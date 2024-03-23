<script setup lang="ts">
const entry = useComponentEntry();

function next(){
	// entry.error.phone = entry.phone.phone.unmasked.length!==10;
	if(entry.error.phone) return false;
	entry.step++;
}
</script>

<template>
<div class="max-w-[28rem] w-full px-4 mt-[15vh] sm:mt-[20vh] mb-12 mx-auto">
	<h1 class="text-center text-5xl font-bold">Hello there!</h1>
	<p class="text-center text-sm sm:text-base mt-2.5 text-brand-black/50">Enter your phone number below.</p>
	<div class="mt-6">
		<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
			<label class="input-float">
				<input :ref="el=>{entry.phone.el = el as HTMLInputElement}" type="tel" class="!border-none" :value="entry.phone.masked" placeholder="" @keydown.enter="next()" @paste="entry.phone.phonePaste">
				<p>Phone number</p>
			</label>
			<div class="w-6 h-6 me-4">
				<img v-if="entry.error.phone===undefined" v-tooltip="{content: 'Phone number is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
				<img v-else-if="entry.error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
				<img v-else-if="entry.error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
			</div>
		</div>
		<p v-if="entry.error.phone" class="text-error">* Invalid phone number</p>
	</div>
	<button class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl px-5 py-[0.9375rem] mt-3 text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	<p>Your order status will be updated via this phone number.</p>
</div>
</template>
