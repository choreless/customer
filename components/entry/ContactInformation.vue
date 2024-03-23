<script setup lang="ts">
import { z } from 'zod';
import type { InputStatus, InputStatusWithProgress } from '~/types/misc';
import type { CustomerType } from '~/types/user';

const app = useApp();
const entry = useComponentEntry();
const api = useApi();

const customer_type = ref<CustomerType>('retail');
const first_name = ref('');
const last_name = ref('');
const email = ref('');

const error = reactive({
	first_name: ref<InputStatus>(),
	last_name: ref<InputStatus>(),
	email: ref<InputStatusWithProgress>()
})

const isFormValid = ()=>error.first_name===false && error.last_name===false && error.email===false;

async function next(){
	error.first_name = !first_name.value;
	error.last_name = !last_name.value;
	error.email = !z.string().email().safeParse(email.value).success;
	if(!isFormValid()) return;

	app.loading = true;
	error.email = 'progress';
	const {data: is_email_valid}: {data: boolean} = await api.get(`/users/email_verifier?email=${email.value}`);
	app.loading = false;

	if(!is_email_valid){
		error.email = true;
		return;
	}
	entry.step++;
	error.email = false;
}

watch(first_name, n=>{error.first_name = !n;})
watch(last_name, n=>{error.last_name = !n;})
watch(email, n=>{ error.email = !z.string().email().safeParse(n).success; })
</script>

<template>
<div>
	<div class="max-w-lg px-2 mx-auto my-12">
		<h1 class="text-2xl font-bold leading-loose">Verified phone number</h1>
		<p class="input !input-bordered w-full h-[3.75rem] rounded-[0.3125rem] px-5 py-[0.9375rem] mt-2.5 text-[2rem] font-bold cursor-not-allowed !text-brand-black disabled:bg-transparent">{{ entry.phone.masked }}</p>
		<p class="text-xs mt-[1.6875rem] text-brand-black/50">Your order status will be updated via this phone number.</p>
		<hr class="border my-[1.125rem] border-brand-black/30">
		<p class="text-2xl font-bold leading-loose">Personal Info</p>
		<div class="flex items-center gap-x-16 mt-2.5">
			<label class="flex gap-x-2.5 items-center cursor-pointer hover:text-primary">
				<input v-model="customer_type" type="radio" name="customer_type" value="retail" class="checkbox checkbox-primary">
				<p>Individual</p>
			</label>
			<label class="flex gap-x-2.5 items-center cursor-pointer hover:text-primary">
				<input v-model="customer_type" type="radio" name="customer_type" value="commercial" class="checkbox checkbox-primary">
				<p>Company</p>
			</label>
		</div>
		<div v-if="customer_type==='commercial'" class="mt-[1.375rem]">
			<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
				<label class="input-float">
					<input v-model="first_name" type="text" placeholder="" class="!border-0">
					<p>Company Name</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="error.first_name" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					<img v-else-if="error.first_name===false" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					<img v-else v-tooltip="{content: 'Company name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
				</div>
			</div>
			<p v-if="error.first_name" class="text-error">* First name is required</p>
		</div>
		<div class="mt-[1.375rem] flex gap-x-5">
			<div>
				<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
					<label class="input-float">
						<input v-model="first_name" type="text" placeholder="" class="!border-0">
						<p>First Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.first_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.first_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
						<img v-else v-tooltip="{content: 'First name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.first_name" class="text-error">* First name is required</p>
			</div>
			<div>
				<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
					<label class="input-float">
						<input v-model="last_name" type="text" placeholder="" class="!border-0">
						<p>Last Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.last_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.last_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
						<img v-else v-tooltip="{content: 'Last name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.last_name" class="text-error">* Last name is required</p>
			</div>
		</div>
		<div class="mt-5">
			<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
				<label class="input-float">
					<input v-model="email" type="text" placeholder="" class="!border-0">
					<p>Email</p>
				</label>
				<div class="w-6 h-6 me-4">
					<span v-if="error.email==='progress'" class="loading bg-primary" />
					<img v-else-if="error.email" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					<img v-else-if="error.email===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					<img v-else v-tooltip="{content: 'Email is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
				</div>
			</div>
			<p v-if="error.email" class="text-error">* {{ email ? 'Invalid Email' : 'Email is required' }} </p>
		</div>
		<button class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl px-5 py-[0.9375rem] mt-5 text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	</div>
</div>
</template>
