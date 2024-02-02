<script setup lang="ts">
import Update from '~/components/app/Update.vue';

const setting = useSetting();
const { $pwa } = useNuxtApp();
const { isLoading, progress } = useLoadingIndicator();
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
	<p v-show="isLoading" class="fixed bottom-0 text-end text-xs font-bold rounded-r-lg pe-1.5 duration-200 bg-brand-orange text-white" :style="{width: `${progress.toFixed(0)}%` }">{{ progress.toFixed(0) }}%</p>
</div>
</template>
