<script setup lang="ts">
import { useIMask } from 'vue-imask';
import type { Role } from '@/types/user';

type LoginResponse =
{ success: false, error: 'invalid_input' } |
{ success: false, error: 'invalid_otp' } |
{ success: false, error: 'account_blocked' } |
{ success: true } |
{ success: true, roles: Role[], token: string }

const api = useApi();
const app = useApp();
const user = useUser();
const entry = usePageEntry();

const otp = ref('');
const step = ref<'phone'|'otp'>('phone');
const error = reactive({
	invalid_credential: false
});

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

async function sendOTP(){
	entry.error.phone = entry.phone.unmasked.length!==10;
	if(entry.error.phone) return false;
	app.loading = true;
	const usp = new URLSearchParams();
	usp.append('login_method', 'phone_otp');
	usp.append('step', 'send_otp');
	usp.append('phone', '+1'+entry.phone.unmasked);
	await api.get(`/users/login?${usp}`);
	notify.info('A code has been sent.');
	step.value = 'otp';
	app.loading = false;
}

async function verifyOTP(){
	app.loading = true;
	const usp = new URLSearchParams();
	usp.append('login_method', 'phone_otp');
	usp.append('step', 'verify_otp');
	usp.append('phone', '+1'+entry.phone.unmasked);
	usp.append('otp', otp.value);
	const {data}: {data: LoginResponse} = await api.get(`/users/login?${usp}`);
	if(data.success && 'token' in data){
		user.token = data.token;
		user.roles = data.roles;
		user.usertype = data.roles[0];
		await navigateTo('/dashboard');
		notify.success('Login is successful');
	}
	else if(data.success) entry.step = 1;
	else if(data.error==='invalid_input') notify.success('Invalid input');
	else if(data.error==='account_blocked') notify.success('Account is blocked.');
	else if(data.error==='invalid_otp') error.invalid_credential = true;
	app.loading = false;
}

const phone_imask = useIMask({
	mask: [{mask: '000'}, {mask: '(000) 000-0000'}]
}, {
	onAccept(){
		step.value = 'phone';
		entry.phone.masked=phone_imask.masked.value;
		entry.phone.unmasked=phone_imask.unmasked.value;
	}
})

watch(otp, n=>{ n.length===6 ? verifyOTP() : error.invalid_credential = false; })
</script>

<template>
<div class="w-full max-w-md mt-[15vh] mx-auto mb-12 px-4 sm:mt-[20vh]">
	<h1 class="text-center text-5xl font-bold">Hello there!</h1>
	<p class="text-center text-sm sm:text-base mt-2.5 text-brand-black/50">Enter your phone number below.</p>
	<div class="mt-6">
		<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border rounded-[0.3125rem] border-base-content/20">
			<label class="input-float">
				<input :ref="phone_imask.el" type="tel" class="!border-none" :value="entry.phone.masked" placeholder="" @paste="phonePaste" @keydown.enter="sendOTP()">
				<p>Phone number</p>
			</label>
			<div class="w-6 h-6 me-4">
				<img v-if="entry.error.phone===undefined" v-tooltip="{content: 'Phone number is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
				<img v-else-if="entry.error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
				<img v-else-if="entry.error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
			</div>
		</div>
		<p v-if="entry.error.phone" class="text-error">* Invalid phone number</p>
	</div>
	<div class="mt-3">
		<button v-if="step==='phone'" :disabled="entry.phone.unmasked.length!==10" class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl px-5 py-[0.9375rem] text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="sendOTP()">Verify</button>
		<div v-else class="grid grid-cols-[1fr_auto] justify-around items-center">
			<label class="input-float">
				<input v-model="otp" type="text" inputmode="numeric" maxlength="6" placeholder="" class="!border-r-0 !rounded-r-none">
				<p>Code</p>
			</label>
			<div class="input h-[3.75rem] rounded-[0.3125rem] rounded-s-none border-s-0 !outline-none flex items-center border-base-content/20">
				<button :disabled="app.loading" class="btn btn-sm border-none shadow-none text-base uppercase font-normal bg-transparent text-brand-black hover:bg-brand-orange hover:text-white" @click="otp=''; sendOTP()">RESEND!</button>
			</div>
		</div>
		<p v-if="error.invalid_credential" class="text-error">* Invalid OTP</p>
	</div>
	<p class="text-sm mt-1 text-black/50">Your order status will be updated via this phone number.</p>
</div>
</template>
