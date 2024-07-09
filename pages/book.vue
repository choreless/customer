<script setup lang="ts">
import Header from '@/components/book/Header.vue';
import SelectServices from '@/components/book/SelectServices.vue';
import LearnMore from '~/components/book/LearnMore.vue';
import LoadLabel from '~/components/book/LoadLabel.vue';
useHead({ title: 'Book' })
definePageMeta({
	layout: 'clean'
})

const book = usePageBook();
</script>

<template>
<div :class="!book.learn_more_toggle && book.step ===1 ? 'overflow-hidden' : book.current_Screen ==='select_services' ? 'overflow-hidden' :''" class=" relative min-h-screen h-auto bg-[#f2f2f2] ">
	<Header />
	<SelectServices class="" />
	<!-- Load Label  -->
	<LoadLabel />
	<!-- Learn More -->
	<LearnMore />
</div>
</template>
