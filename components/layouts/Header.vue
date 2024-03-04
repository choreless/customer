<script setup lang="ts">
import Changelog from '~/components/app/Changelog.vue';

const show_changelog = ref(false);
</script>
<template>
<div>
	<nav class="flex justify-between items-center px-6 sm:px-[6.25rem] py-2 bg-brand-orange">
		<div>
			<NuxtLink to="/dashboard">
				<img src="https://ik.imagekit.io/choreless/v2/icons/choreless-white.svg" alt="logo" loading="lazy" class="h-10">
			</NuxtLink>
			<button class="block text-xs font-bold px-1 ms-0.5 -mt-2 rounded-sm text-white hover:bg-warning hover:text-black" @click="show_changelog=true">v{{ $config.public.base.AppVersion }}</button>
		</div>
		<NuxtLink href="/logout" class="btn btn-sm flex items-center h-[1.1875rem] rounded-md text-base text-brand-orange hover:bg-brand-orange hover:text-white">Logout</NuxtLink>
	</nav>
	<dialog class="modal" :class="show_changelog && 'modal-open'">
		<div class="modal-box max-w-2xl rounded-2xl shadow-[0px_0px_15px_0px_#00000015] bg-white">
			<div class="flex justify-between items-center">
				<div />
				<p class="text-2xl text-center font-bold text-success">Changelog:</p>
				<button class="btn btn-sm btn-square text-error hover:btn-error" @click="show_changelog=false"><Icon name="radix-icons:cross-1" class="text-2xl" /></button>
			</div>
			<Changelog class="max-h-[45vh] mt-4" />
		</div>
		<div class="modal-backdrop bg-black/40" @click="show_changelog=false" />
	</dialog>
</div>
</template>
