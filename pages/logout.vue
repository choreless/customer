<script setup lang="ts">
useHead({ title: 'Logout' })
definePageMeta({ middleware: 'auth' })
const api = useApi();
const app = useApp();
const user = useUser();

app.loading = true;
await api.delete('/users/logout');
user.$reset();
app.loading = false;
await navigateTo('/');
</script>

<template>
<div />
</template>
