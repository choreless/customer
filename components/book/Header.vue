<script setup lang="ts">
const book = usePageBook();

const step_names = ['Contact information', 'Select Services', 'Care preferences', 'Select pickup info'];
</script>

<template>
<div class="sticky top-0 p-2.5 bg-white">
	<NuxtLink class="block w-fit mx-auto md:hidden" to="https://chorelesslaundry.bookingkoala.com/dashboard"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:350px)]:h-9 [@media(min-width:450px)]:h-12 xl:h-[3.75rem]"></NuxtLink>
	<section class="max-w-7xl mx-auto mt-1.5 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr] items-center">
		<div class="flex items-center">
			<button v-if="book.step>0" class="btn btn-sm btn-ghost hover:bg-transparent hover:fill-brand-orange" @click="--book.step">
				<IconArrow />
			</button>
			<p class="w-7 h-7 rounded-full font-bold leading-[15px] flex items-center justify-center bg-red-500 text-white">{{ book.step+1 }}</p>
			<p class="font-bold leading-[15px] ms-2.5">{{ step_names[book.step+(book.usertype==='new' ? -1 : 1)] }}</p>
		</div>
		<NuxtLink class="justify-self-center hidden md:block" to="https://chorelesslaundry.bookingkoala.com/dashboard"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:350px)]:h-9 [@media(min-width:450px)]:h-12 xl:h-[3.75rem]"></NuxtLink>
		<NuxtLink to="https://chorelesslaundry.bookingkoala.com/dashboard" class="btn btn-sm btn-ghost justify-self-end w-8 p-1.5 stroke-2 stroke-brand-orange hover:stroke-white hover:bg-brand-orange">
			<IconClose class="stroke-inherit" />
		</NuxtLink>
	</section>
	<div class="h-[1px] bg-[#f2f2f2] mt-2.5" />
</div>
</template>
