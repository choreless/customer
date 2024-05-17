<script setup lang="ts">
import DashboardHeader from '~/components/layouts/DashboardHeader.vue';
</script>
<template>
<main>
	<DashboardHeader />
	<slot>
		<slot />
	</slot>
</main>
</template>
