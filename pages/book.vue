<script setup lang="ts">
import NotAvailableInYourArea from '@/components/book/NotAvailableInYourArea.vue';
import GettingStarted from '@/components/book/GettingStarted.vue';
import ContactInformation from '@/components/book/ContactInformation.vue';
import Header from '@/components/book/Header.vue';
import SelectServices from '@/components/book/SelectServices.vue';
import CarePreferences from '@/components/book/CarePreferences.vue';
import SelectPickupInfo from '@/components/book/SelectPickupInfo.vue';

useHead({ title: 'Book' })
definePageMeta({
	layout: 'clean'
})

const book = usePageBook();
const {query} = useRoute();
if('usertype' in query && typeof query.usertype==='string' && query.usertype==='old') book.usertype = 'old';
</script>

<template>
<div>
	<NotAvailableInYourArea v-if="book.step===-1" />
	<div v-else-if="book.usertype==='new' && book.step===0" class="min-h-[92vh] mx-auto flex items-center justify-center">
		<GettingStarted />
	</div>
	<template v-else>
		<Header />
		<ContactInformation v-if="book.usertype==='new' && book.step===1" />
		<SelectServices v-else-if="book.step===(book.usertype==='new' ? 2 : 0)" />
		<CarePreferences v-else-if="book.step===(book.usertype==='new' ? 3 : 1)" />
		<SelectPickupInfo v-else-if="book.step===(book.usertype==='new' ? 4 : 2)" />
	</template>
</div>
</template>
