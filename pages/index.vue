<script setup lang="ts">
import { useIMask } from 'vue-imask';
import type { Role } from '@/types/user';
type LoginResponse = false|{roles: Role[], token: string}

useHead({ title: 'Login' })
definePageMeta({
	layout: 'clean',
	middleware: 'guest'
})
const app = useApp();
const user = useUser();
const api = useApi();

const login_method = ref<'phone_otp'|'phone_password'>('phone_otp');
const phone = reactive({masked: '', unmasked: ''});
const phone_otp_step = ref<'phone'|'otp'>('phone');
const otp = ref('');
const password = ref('');
const show_password = ref(false);
const error = reactive({
	phone: undefined as undefined | boolean,
	invalid_credential: false
})

function phone_paste(e: ClipboardEvent){
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

async function login(usp: URLSearchParams){
	const {data}: {data: LoginResponse} = await api.get(`/users/login?${usp}`);
	if(data){
		user.token = data.token;
		user.roles = data.roles;
		user.usertype = data.roles[0];
		await navigateTo('/dashboard');
		notify.success('Login is successful');
	}
	else error.invalid_credential = true;
}

async function verify(){
	error.invalid_credential = false;
	error.phone = phone.unmasked.length!==10;
	if(error.phone) return false;
	app.loading = true;
	if(login_method.value==='phone_otp' && phone_otp_step.value==='phone'){
		const usp = new URLSearchParams();
		usp.append('login_method', 'phone_otp');
		usp.append('step', 'send_otp');
		usp.append('phone', `+1${phone.unmasked}`);
		await api.get(`/users/login?${usp}`);
		notify.info('A code has been sent.');
		phone_otp_step.value = 'otp';
	}
	else {
		const usp = new URLSearchParams();
		usp.append('phone', `+1${phone.unmasked}`);
		usp.append('login_method', login_method.value);
		if(login_method.value==='phone_password') usp.append('password', password.value);
		else {
			usp.append('step', 'verify_otp');
			usp.append('otp', otp.value);
		}
		await login(usp);
	}
	app.loading = false;
}

watch(otp, n=>{ n.length===6 ? verify() : error.invalid_credential = false; })
const phone_imask = useIMask({
	mask: [{mask: '000'}, {mask: '(000) 000-0000'}]
}, {
	onAccept(){
		phone_otp_step.value = 'phone';
		error.phone = undefined;
		phone.masked=phone_imask.masked.value;
		phone.unmasked=phone_imask.unmasked.value;
	}
})
</script>

<template>
<div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[22rem] w-full px-4">
	<h1 class="text-brand-black text-center text-5xl leading-[3.5rem] font-bold">Hello there!</h1>
	<p class="text-brand-black/50 text-center leading-4 mt-2.5 text-sm sm:text-base">Enter your phone number <template v-if="login_method==='phone_password'">and password </template>below to Login.</p>
	<div class="mt-6">
		<div class="grid grid-cols-[1fr_auto] justify-around items-center gap-x-2 border border-base-content/20 rounded-[0.3125rem]">
			<label class="input-float">
				<input :ref="phone_imask.el" type="tel" class="!border-none" :value="phone.masked" placeholder="" @paste="phone_paste" @keydown.enter="verify()">
				<p>Phone number</p>
			</label>
			<div class="w-6 h-6 me-4">
				<img v-if="error.phone===undefined" v-tooltip="{content: 'Phone number is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
				<img v-else-if="error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
				<img v-else-if="error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
			</div>
		</div>
		<p v-if="error.phone" class="text-error">* Invalid phone number</p>
	</div>
	<div v-if="login_method==='phone_password'" class="mt-3">
		<div class="grid grid-cols-[1fr_auto] justify-around items-center px-0">
			<label class="input-float w-full h-full">
				<input v-model="password" :type="show_password ? 'text':'password'" placeholder="" class="!border-r-0 !rounded-r-none" @keydown.enter="verify()">
				<p>Password</p>
			</label>
			<div class="input border-base-content/20 rounded-[0.3125rem] !outline-none h-[3.75rem] rounded-s-none border-s-0 flex items-center ps-0">
				<button class="btn btn-sm btn-square bg-transparent border-none shadow-none text-[#727e8c]/50 hover:bg-brand-orange hover:text-white" @click="show_password=!show_password">
					<Icon :name="show_password ? 'zondicons:view-show' : 'zondicons:view-hide'" class="text-2xl" />
				</button>
			</div>
		</div>
	</div>
	<div class="mt-3">
		<p v-if="login_method==='phone_password' && error.invalid_credential" class="text-error">* Invalid credential</p>
		<button v-if="!app.loading && (login_method==='phone_password' || (login_method==='phone_otp' && phone_otp_step==='phone'))" class="btn w-full h-[3.75rem] rounded-[0.3125rem] text-2xl px-5 py-[0.9375rem] text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="verify()">Verify</button>
		<div v-if="login_method==='phone_otp' && phone_otp_step==='otp'">
			<div class="grid grid-cols-[1fr_auto] justify-around items-center px-0">
				<label class="input-float w-full h-full">
					<input v-model="otp" type="text" inputmode="numeric" maxlength="6" placeholder="" class="!border-r-0 !rounded-r-none">
					<p>Code</p>
				</label>
				<div class="input border-base-content/20 rounded-[0.3125rem] !outline-none h-[3.75rem] rounded-s-none border-s-0 flex items-center">
					<button :disabled="app.loading" class="btn btn-sm bg-transparent border-none shadow-none hover:bg-brand-orange hover:text-white uppercase" @click="phone_otp_step='phone';otp='';verify()">RESEND!</button>
				</div>
			</div>
			<p v-if="error.invalid_credential" class="text-error">* Invalid OTP</p>
		</div>
	</div>
	<button class="flex items-center gap-x-2 ms-auto mt-2 group" @click="login_method=login_method==='phone_otp' ? 'phone_password' : 'phone_otp'; error.invalid_credential = false;">
		<p class="group-hover:text-info">Login with:</p>
		<div class="btn btn-sm btn-outline btn-info group-hover:border-0 group-hover:bg-info group-hover:text-black" :class="login_method==='phone_otp' ? 'uppercase' : 'capitalize'">{{ login_method.slice(6) }}</div>
	</button>
</div>
</template>
