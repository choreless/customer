<script setup lang="ts">
import AdminPanel from '~/components/dashboard/AdminPanel.vue';

useHead({ title: 'Dashboard' })
definePageMeta({ middleware: 'auth' })
const {usertype} = useUser();
</script>

<template>
<div>
	<AdminPanel v-if="usertype==='admin'" />
</div>
</template>
