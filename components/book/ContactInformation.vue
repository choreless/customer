<script setup lang="ts">
import { z } from 'zod';

const setting = useSetting();
const book = usePageBook();
const api = useApi();

const isFormValid = ()=>book.error.first_name==='success' && book.error.last_name==='success' && book.error.email==='success';

async function next(){
	book.error.first_name = book.first_name ? 'success' : 'error';
	book.error.last_name = book.last_name ? 'success' : 'error';
	book.error.email = z.string().email().safeParse(book.email).success ? 'success' : 'error';
	if(isFormValid()){
		setting.loading = true;
		book.error.email = 'progress';
		const {data} = await api.get(`/users/email_verifier?email=${book.email}`);
		book.error.email = data ? 'success' : 'error';
		setting.loading = false;

		if(isFormValid()) book.step++;
	}
}
</script>

<template>
<div>
	<div class="max-w-lg px-2 mx-auto my-12">
		<h1 class="text-2xl font-bold leading-loose">Verified phone number</h1>
		<p class="input !input-bordered w-full h-[3.75rem] rounded-[0.3125rem] px-5 py-[0.9375rem] mt-2.5 text-[2rem] font-bold cursor-not-allowed !text-brand-black disabled:bg-transparent">{{ book.phone.masked }}</p>
		<p class="text-xs mt-[1.6875rem] text-brand-black/50">Your order status will be updated via this phone number.</p>
		<hr class="border my-[1.125rem] border-brand-black/30">
		<p class="text-2xl font-bold leading-loose">Personal Info</p>

		<div class="mt-[1.375rem] flex gap-x-5">
			<div>
				<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
					<label class="input-float">
						<input v-model="book.first_name" type="text" placeholder="" class="!border-0">
						<p>First Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="book.error.first_name==='info'" v-tooltip="{content: 'First name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-if="book.error.first_name==='success'" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
						<img v-if="book.error.first_name==='error'" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="book.error.first_name==='error'" class="text-error">* First name is required</p>
			</div>
			<div>
				<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
					<label class="input-float">
						<input v-model="book.last_name" type="text" placeholder="" class="!border-0">
						<p>Last Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="book.error.last_name==='info'" v-tooltip="{content: 'Last name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-if="book.error.last_name==='success'" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
						<img v-if="book.error.last_name==='error'" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="book.error.last_name==='error'" class="text-error">* Last name is required</p>
			</div>
		</div>
		<div class="mt-5">
			<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
				<label class="input-float">
					<input v-model="book.email" type="text" placeholder="" class="!border-0">
					<p>Email</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="book.error.email==='info'" v-tooltip="{content: 'Email is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
					<img v-if="book.error.email==='success'" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					<img v-if="book.error.email==='error'" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					<span v-if="book.error.email==='progress'" class="loading bg-primary" />
				</div>
			</div>
			<p v-if="book.error.email==='error'" class="text-error">* {{ book.email ? 'Invalid Email' : 'Email is required' }}</p>
		</div>
		<label class="input-float mt-5">
			<input v-model="book.promo_code" type="text" placeholder="">
			<p>Referral / Promo Code</p>
		</label>
		<button class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl px-5 py-[0.9375rem] mt-5 text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	</div>
</div>
</template>
