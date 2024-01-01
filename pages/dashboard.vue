<script setup lang="ts">
import AdminPanel from '~/components/dashboard/AdminPanel.vue';
import WasherPanel from '~/components/dashboard/WasherPanel.vue';

useHead({ title: 'Dashboard' })
definePageMeta({ middleware: 'auth' })
const {usertype} = useUser();
</script>

<template>
<div>
	<AdminPanel v-if="usertype==='admin'" />
	<WasherPanel v-if="usertype==='washer'" />
</div>
</template>
