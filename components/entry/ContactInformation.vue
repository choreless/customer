<script setup lang="ts">
import { z } from 'zod';
import type { Role } from '@/types/user';

type SignupResponse =
{ success: false, error: 'email_exists' } |
{ success: false, error: 'invalid_input' } |
{ success: false, error: 'invalid_operation' } |
{ success: true, roles: Role[], token: string }

const api = useApi();
const app = useApp();
const user = useUser();
const entry = usePageEntry();

const is_form_valid = computed(()=>Boolean((entry.customer_type==='retail' || (entry.customer_type==='commercial' && entry.company_name)) && entry.first_name && entry.last_name && z.string().email().safeParse(entry.email).success));

async function next(){
	if(entry.customer_type==='commercial') entry.error.company_name = !entry.company_name;
	entry.error.first_name = !entry.first_name;
	entry.error.last_name = !entry.last_name;
	entry.error.email = !z.string().email().safeParse(entry.email).success;
	if(!is_form_valid.value) return;

	app.loading = true;
	entry.error.email = 'progress';
	const {data: is_email_valid}: {data: boolean} = await api.get(`/users/is_email_valid?email=${entry.email}`);
	if(is_email_valid){
		entry.error.email = false;
		const { data }: { data: SignupResponse } = await api.post('/users', {
			first_name: entry.first_name,
			last_name: entry.last_name,
			business_name: entry.company_name || null,
			email: entry.email,
			referral_code: entry.referral,
			receive_offer_through_sms: entry.receive_offer_through_sms,
			phone: '+1'+entry.phone.unmasked
		})
		if(data.success){
			user.token = data.token;
			user.roles = data.roles;
			user.usertype = data.roles[0];
			await navigateTo('/dashboard');
			notify.success('Account has been created successfully');
		}
		else if(data.error==='email_exists') notify.error('Email already exists.');
		else if(data.error==='invalid_input') notify.error('Invalid input');
		else if(data.error==='invalid_operation') notify.error('Invalid operation');
	}
	else entry.error.email = true;
	app.loading = false;
}
</script>

<template>
<div>
	<div class="max-w-lg mx-auto my-12 px-2">
		<h1 class="text-2xl font-bold">Verified phone number</h1>
		<p class="input !input-bordered w-full h-[3.75rem] rounded-[0.3125rem] mt-2.5 px-5 py-[0.9375rem] text-[2rem] font-bold cursor-not-allowed !text-brand-black disabled:bg-transparent">{{ entry.phone.masked }}</p>
		<p class="text-xs mt-2 text-brand-black/50">Your order status will be updated via this phone number.</p>
		<hr class="border my-[1.125rem] border-brand-black/30">
		<p class="text-2xl font-bold">Personal Info</p>
		<div class="flex items-center gap-x-16 mt-2.5">
			<label class="flex items-center gap-x-2.5 cursor-pointer hover:text-primary">
				<input v-model="entry.customer_type" type="radio" name="customer_type" value="retail" class="checkbox checkbox-primary">
				<p>Individual</p>
			</label>
			<label class="flex items-center gap-x-2.5 cursor-pointer hover:text-primary">
				<input v-model="entry.customer_type" type="radio" name="customer_type" value="commercial" class="checkbox checkbox-primary">
				<p>Company</p>
			</label>
		</div>
		<div class="mt-[1.375rem] flex gap-x-5">
			<div>
				<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
					<label class="input-float">
						<input v-model="entry.first_name" type="text" placeholder="" class="!border-0">
						<p>First Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="entry.error.first_name===undefined" v-tooltip="{content: 'First name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="entry.error.first_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
						<img v-else-if="entry.error.first_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="entry.error.first_name" class="text-error">* First name is required</p>
			</div>
			<div>
				<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
					<label class="input-float">
						<input v-model="entry.last_name" type="text" placeholder="" class="!border-0">
						<p>Last Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="entry.error.last_name===undefined" v-tooltip="{content: 'Last name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="entry.error.last_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
						<img v-else-if="entry.error.last_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="entry.error.last_name" class="text-error">* Last name is required</p>
			</div>
		</div>
		<div v-if="entry.customer_type==='commercial'" class="mt-[1.375rem]">
			<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
				<label class="input-float">
					<input v-model="entry.company_name" type="text" placeholder="" class="!border-0">
					<p>Company Name</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="entry.error.company_name===undefined" v-tooltip="{content: 'Company name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
					<img v-else-if="entry.error.company_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					<img v-else-if="entry.error.company_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
				</div>
			</div>
			<p v-if="entry.error.company_name" class="text-error">* Company name is required</p>
		</div>
		<div class="mt-5">
			<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
				<label class="input-float">
					<input v-model="entry.email" type="text" placeholder="" class="!border-0">
					<p>Email</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="entry.error.email===undefined" v-tooltip="{content: 'Email is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
					<img v-else-if="entry.error.email===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					<span v-else-if="entry.error.email==='progress'" class="loading bg-primary" />
					<img v-else-if="entry.error.email" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
				</div>
			</div>
			<p v-if="entry.error.email===true" class="text-error">* {{ entry.email ? 'Invalid Email' : 'Email is required' }}</p>
		</div>
		<label class="input-float mt-5">
			<input v-model="entry.referral" type="text" placeholder="">
			<p>Referral</p>
		</label>
		<label class="mt-5 flex items-start gap-x-2.5 cursor-pointer">
			<input v-model="entry.receive_offer_through_sms" type="checkbox" class="checkbox checkbox-primary">
			<p class="-mt-0.5 text-xs">I want to receive text updates about promos and specials to the phone number provided. Message & Data rates may apply. Message frequency varies. Text HELP for help and STOP to cancel.</p>
		</label>
		<button :disabled="!is_form_valid" class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl mt-5 px-5 py-[0.9375rem] text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	</div>
</div>
</template>
