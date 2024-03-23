<script setup lang="ts">
import Header from '@/components/entry/Header.vue';
import GettingStarted from '@/components/entry/GettingStarted.vue';
import ContactInformation from '@/components/entry/ContactInformation.vue';
import Address from '@/components/entry/Address.vue';

const entry = useComponentEntry();
</script>

<template>
<div :class="entry.step===2 && 'h-screen flex flex-col'">
	<Header />
	<GettingStarted v-if="entry.step===0" />
	<ContactInformation v-else-if="entry.step===1" />
	<Address v-else-if="entry.step===2" />
</div>
</template>
