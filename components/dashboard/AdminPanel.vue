<script setup lang="ts">
import CompletedJobs from '~/components/jobs/admin/Completed.vue';
</script>

<template>
<div class="max-w-4xl mx-auto px-4">
	<NuxtLink href="/customers" class="btn btn-sm btn-outline w-fit mt-6 btn-primary">Customers</NuxtLink>
	<div class="mt-6">
		<h1 class="flex items-center gap-x-2 text-2xl font-mono font-bold">Completed jobs</h1>
		<CompletedJobs />
	</div>
</div>
</template>
