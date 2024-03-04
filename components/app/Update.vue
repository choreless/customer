<script setup lang="ts">
import type { Changelog } from '~/types/misc';

const { $pwa } = useNuxtApp();
const api = useApi();

const changelog = ref<Changelog[]>([])

const {data}: {data: Changelog[]} = await api.get('/changelog/admin');
changelog.value = data;
</script>

<template>
<div class="fixed w-full h-full z-20 flex flex-col items-center justify-center gap-y-2 bg-white">
	<button class="btn btn-outline btn-primary text-white" @click="$pwa?.updateServiceWorker()">
		<Icon name="material-symbols:deployed-code-update-outline-sharp" class="text-xl" />
		<p>Update</p>
	</button>
	<h1 class="text-xl">Update is available.</h1>
	<div class="w-full px-4">
		<div class="max-w-lg max-h-40 w-full mx-auto px-2 flex flex-col gap-y-4 overflow-y-auto">
			<div v-for="cl of changelog" :key="cl.version">
				<p class="sticky top-0 text-lg font-bold bg-white text-success">v{{ cl.version }}</p>
				<p v-for="(change, change_key) of cl.changes" :key="change_key">{{ change }}</p>
			</div>
		</div>
	</div>
</div>
</template>
