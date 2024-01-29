<script setup lang="ts">
import Update from '~/components/app/Update.vue';

const setting = useSetting();
const { $pwa } = useNuxtApp();
</script>

<template>
<div>
	<VitePwaManifest />
	<Update v-if="$pwa?.needRefresh" />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<div v-if="setting.loading" class="fixed top-0 w-full h-full flex items-center justify-center bg-black/30">
		<span class="loading loading-infinity w-20 bg-gradient-to-r from-blue-500 to-green-500" />
	</div>
	<notifications position="bottom right" :duration="2000" :pause-on-hover="true" width="100%" />
</div>
</template>
