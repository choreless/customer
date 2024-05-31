<script setup lang="ts">
import DropoffSummary from '~/components/dashboard-2/DropoffSummary.vue';
useHead({ title: 'Dropoff' })
definePageMeta({
	layout: 'dashboard'
})
</script>

<template>
<DropoffSummary />
</template>
