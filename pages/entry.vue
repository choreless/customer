<script setup lang="ts">
import Header from '@/components/entry/Header.vue';
import GettingStarted from '@/components/entry/GettingStarted.vue';
import ContactInformation from '~/components/entry/ContactInformation.vue';

useHead({ title: 'Entry' })
definePageMeta({
	layout: 'clean'
})

const entry = usePageEntry();
</script>

<template>
<div>
	<Header />
	<div class="mt-2.5">
		<FormShowProgress class="bg-brand-orange" :value="entry.step/1" />
	</div>
	<GettingStarted v-if="entry.step===0" />
	<ContactInformation v-else-if="entry.step===1" />
</div>
</template>
