<script setup lang="ts">
const app = useApp();

const {isLoading} = useLoadingIndicator({throttle: 500});
</script>

<template>
<div>
	<NuxtLayout>
		<NuxtPage  />
	</NuxtLayout>
	<notifications position="bottom right" :duration="2000" :pause-on-hover="true" width="100%" />
	<div v-show="isLoading || app.loading" class="fixed w-full h-full top-0 flex justify-center bg-black/30">
		<span class="loading loading-bars w-12 bg-gradient-to-r from-success to-primary" />
	</div>
</div>
</template>
