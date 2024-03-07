<script setup lang="ts">
import NotAvailableInYourArea from '@/components/book/NotAvailableInYourArea.vue';
import Header from '@/components/book/Header.vue';
import SelectServices from '@/components/book/SelectServices.vue';
import CarePreferences from '@/components/book/CarePreferences.vue';
import SelectPickupInfo from '@/components/book/SelectPickupInfo.vue';

useHead({ title: 'Book' })
definePageMeta({
	layout: 'clean'
})

const book = usePageBook();
</script>

<template>
<div>
	<NotAvailableInYourArea v-if="book.step===-1" />
	<template v-else>
		<Header />
		<SelectServices v-if="book.step===0" />
		<CarePreferences v-else-if="book.step===1" />
		<SelectPickupInfo v-else-if="book.step===2" />
	</template>
</div>
</template>
