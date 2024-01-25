<script setup lang="ts">
const setting = useSetting();
const { $pwa } = useNuxtApp();
</script>

<template>
<div>
	<VitePwaManifest />
	<div v-show="$pwa?.needRefresh" class="fixed w-full h-full z-20 flex flex-col items-center justify-center gap-y-2 bg-white">
		<button class="btn btn-outline btn-primary text-white" @click="$pwa?.updateServiceWorker()">
			<Icon name="material-symbols:deployed-code-update-outline-sharp" class="text-xl" />
			<p>Update</p>
		</button>
		<h1 class="text-xl">Update is available.</h1>
	</div>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<div v-if="setting.loading" class="fixed top-0 w-full h-full flex items-center justify-center bg-black/30">
		<span class="loading loading-infinity w-20 bg-gradient-to-r from-blue-500 to-green-500" />
	</div>
	<notifications position="bottom right" :duration="2000" :pause-on-hover="true" width="100%" />
</div>
</template>
