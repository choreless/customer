<script setup lang="ts">
import { useIMask } from 'vue-imask';
import type { Role } from '@/types/user';

useHead({ title: 'Login' })
definePageMeta({
	layout: 'clean',
	middleware: 'guest'
})
const setting = useSetting();
const user = useUser();
const api = useApi();

const step = ref<'phone'|'otp'>('phone');
const phone = reactive({masked: '', unmasked: ''});
const uid = ref('');
const otp = ref('');
const loading = ref(false);
const error = reactive({
	otp: false,
	phone: undefined as undefined | boolean,
	does_account_exist: true
})

async function sendOtp(){
	if(phone.unmasked.length===10){
		setting.loading = true;
		loading.value = true;
		error.phone = false;
		const usp = new URLSearchParams();
		usp.append('step', 'send_otp');
		usp.append('phone', `+1${phone.unmasked}`);
		const {data} = await api.get(`/users/login?${usp}`);
		if(data){
			notify.info('A code has been sent.');
			step.value = 'otp';
			uid.value = data;
		}
		else error.does_account_exist = false;
		loading.value = false;
		setting.loading = false;
	}
	else error.phone = true;
}

function resendOtp(){
	sendOtp();
	otp.value = '';
}

async function verifyOtp(){
	setting.loading = true;
	loading.value = true;
	const usp = new URLSearchParams();
	usp.append('step', 'verify_otp');
	usp.append('uid', uid.value);
	usp.append('otp', otp.value);
	const {data}: {data: false|{roles: Role[], token: string}} = await api.get(`/users/login?${usp}`);
	if(data){
		error.otp = false;
		user.token = data.token;
		user.roles = data.roles;
		user.usertype = data.roles[0];
		await navigateTo('/dashboard');
		notify.success('Login is successful');
	}
	else error.otp = true;
	loading.value = false;
	setting.loading = false;
}

watch(otp, n=>{ n.length===6 ? verifyOtp() : error.otp = false; })
const phone_imask = useIMask({
	mask: [{mask: '000'}, {mask: '(000) 000-0000'}]
}, {
	onAccept(){
		step.value = 'phone';
		error.phone = undefined;
		error.does_account_exist = true;
		phone.masked=phone_imask.masked.value;
		phone.unmasked=phone_imask.unmasked.value;
	}
})
</script>

<template>
<div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[22rem] w-full px-4">
	<h1 class="text-brand-black text-center text-5xl leading-[3.5rem] font-bold">Hello there!</h1>
	<p class="text-brand-black/50 text-center leading-4 mt-2.5 text-sm sm:text-base">Enter your phone number below to Login.</p>
	<div class="mt-6">
		<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border border-base-content/20 rounded-[0.3125rem]">
			<label class="input-float">
				<input :ref="phone_imask.el" type="tel" class="!border-none" :value="phone.masked" placeholder="" @keydown.enter="sendOtp()">
				<p>Phone number</p>
			</label>
			<div class="w-6 h-6 me-4">
				<img v-if="error.phone===undefined" v-tooltip="{content: 'Phone number is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
				<img v-else-if="error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
				<img v-else-if="error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
			</div>
		</div>
		<p v-if="error.phone" class="text-error">* Invalid phone number</p>
		<p v-if="!error.does_account_exist" class="text-error">* Account does not exists</p>
	</div>
	<div class="mt-6">
		<button v-if="step==='phone' && !loading" class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl px-5 py-[0.9375rem] text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="sendOtp()">Verify</button>
		<div v-if="step==='otp'">
			<div class="grid grid-cols-[1fr_auto] justify-around items-center px-0">
				<label class="input-float w-full h-full">
					<input v-model="otp" type="text" inputmode="numeric" maxlength="6" placeholder="" class="!border-r-0 !rounded-r-none">
					<p>Code</p>
				</label>
				<div class="input border-base-content/20 rounded-[0.3125rem] !outline-none h-[3.75rem] rounded-s-none border-s-0 flex items-center">
					<button :disabled="loading" class="btn btn-sm bg-transparent border-none shadow-none hover:bg-brand-orange hover:text-white uppercase" @click="resendOtp()">RESEND!</button>
				</div>
			</div>
			<p v-if="error.otp" class="text-error">* Invalid OTP</p>
		</div>
	</div>
	<p v-if="loading" class="flex items-center justify-center gap-x-2 text-xl font-bold mt-6 text-brand-orange">Verifying <span class="loading loading-bars" /></p>
</div>
</template>
