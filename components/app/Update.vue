<script setup lang="ts">
import Changelog from '~/components/app/Changelog.vue';

const { $pwa } = useNuxtApp();
</script>

<template>
<div class="fixed w-full h-full z-20 flex flex-col items-center justify-center gap-y-2 bg-white">
	<button class="btn btn-outline btn-primary text-white" @click="$pwa?.updateServiceWorker()">
		<Icon name="material-symbols:deployed-code-update-outline-sharp" class="text-xl" />
		<p>Update</p>
	</button>
	<h1 class="text-xl">Update is available.</h1>
	<div class="w-full px-4">
		<Changelog class="max-w-lg max-h-40 mx-auto px-2" />
	</div>
</div>
</template>
