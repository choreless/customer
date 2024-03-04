<script setup lang="ts">
import type { Changelog } from '~/types/misc';

const api = useApi();

const changelog = ref<Changelog[]>([])

const {data}: {data: Changelog[]} = await api.get('/changelog/admin');
changelog.value = data;
</script>

<template>
<div class="flex flex-col gap-y-4 overflow-y-auto">
	<div v-for="cl of changelog" :key="cl.version">
		<p class="sticky top-0 text-lg font-bold bg-white text-success">v{{ cl.version }}</p>
		<p v-for="(change, change_key) of cl.changes" :key="change_key">{{ change }}</p>
	</div>
</div>
</template>
