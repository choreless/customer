<script setup lang="ts">
import Update from '~/components/app/Update.vue';

const app = useApp();
const { $pwa } = useNuxtApp();

const {isLoading} = useLoadingIndicator({throttle: 500});
</script>

<template>
<div>
	<VitePwaManifest />
	<Update v-if="$pwa?.needRefresh" />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<notifications position="bottom right" :duration="2000" :pause-on-hover="true" width="100%" />
	<div v-show="isLoading || app.loading" class="fixed w-full h-full top-0 flex justify-center bg-black/30">
		<span class="loading loading-bars w-12 bg-gradient-to-r from-success to-primary" />
	</div>
</div>
</template>
