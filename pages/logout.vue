<script setup lang="ts">
useHead({ title: 'Logout' })
definePageMeta({ middleware: 'auth' })
const api = useApi();
const setting = useSetting();
const user = useUser();

setting.loading = true;
await api.delete('/users/logout');
user.$reset();
setting.loading = false;
await navigateTo('/');
</script>

<template>
<div />
</template>
