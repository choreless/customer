<script setup lang="ts">
import { useIMask } from 'vue-imask';

const book = usePageBook();

function phonePaste(e: ClipboardEvent){
	const selection = getSelection()?.toString()?.replace(/[^\d]+/g, '');
	if(selection && selection.length===10) phone_imask.unmasked.value = '';
	if(phone_imask.unmasked.value.length!==0) return false;
	let phone = e.clipboardData?.getData('text/plain');
	if(phone){
		phone = phone.replace(/[^\d]+/g, '');
		if(phone.length===11) phone = phone.replace(/^1/, '');
		if(phone.length===10) phone_imask.unmasked.value = phone;
	}
}

function next(){
	book.error.phone = book.phone.unmasked.length!==10;
	if(book.error.phone) return false;
	book.step++;
}

const phone_imask = useIMask({
	mask: [{mask: '000'}, {mask: '(000) 000-0000'}]
}, {
	onAccept(){
		book.phone.masked=phone_imask.masked.value;
		book.phone.unmasked=phone_imask.unmasked.value;
	}
})
</script>

<template>
<div class="max-w-[28rem] w-full px-4">
	<h1 class="text-center text-5xl font-bold">Hello there!</h1>
	<p class="text-center text-sm sm:text-base mt-2.5 text-brand-black/50">Enter your phone number below to Sign up.</p>
	<div class="mt-6">
		<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
			<label class="input-float">
				<input :ref="phone_imask.el" type="tel" class="!border-none" :value="book.phone.masked" placeholder="" @paste="phonePaste" @keydown.enter="next()">
				<p>Phone number</p>
			</label>
			<div class="w-6 h-6 me-4">
				<img v-if="book.error.phone===undefined" v-tooltip="{content: 'Phone number is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
				<img v-else-if="book.error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
				<img v-else-if="book.error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
			</div>
		</div>
		<p v-if="book.error.phone" class="text-error">* Invalid phone number</p>
	</div>
	<button class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl px-5 py-[0.9375rem] mt-3 text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	<p>Your order status will be updated via this phone number.</p>
</div>
</template>
