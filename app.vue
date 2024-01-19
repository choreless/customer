<script setup lang="ts">
const setting = useSetting();
</script>

<template>
<div>
	<VitePwaManifest />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<div v-if="setting.loading" class="fixed top-0 w-full h-full flex items-center justify-center bg-black/30">
		<span class="loading loading-infinity w-20 bg-gradient-to-r from-blue-500 to-green-500" />
	</div>
	<notifications position="bottom right" :duration="2000" :pause-on-hover="true" width="100%" />
</div>
</template>
