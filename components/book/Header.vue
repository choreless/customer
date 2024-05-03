<script setup lang="ts">
// Defining Constants
const book = usePageBook();
const step_names = ['Select Services', 'Care preferences', 'Select pickup info'];
</script>

<template>
<div class="sticky top-0 mx-auto bg-white z-50 max-w-[1920px]  ">
	<!-- <NuxtLink class="block w-fit mx-auto md:hidden" to="https://chorelesslaundry.bookingkoala.com/dashboard"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:350px)]:h-9 [@media(min-width:450px)]:h-12 xl:h-[3.75rem]"></NuxtLink> -->
	<section class="py-5  px-[50px] mx-auto mt-1.5 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr] items-center">
		<div class="flex items-center gap-2.5">
			<button v-if="book.step>0" class="btn btn-sm btn-ghost hover:bg-transparent hover:fill-brand-orange" @click="--book.step">
				<IconArrow />
			</button>
			<p class="w-7 h-7 rounded-full font-bold leading-[15px] flex items-center justify-center bg-red-500 text-white">{{ book.step+1 }}</p>
			<p class="font-bold leading-[15px] ms-2.5">{{ step_names[book.step] }}</p>
		</div>
		<NuxtLink class="  justify-self-center hidden md:block" to="https://chorelesslaundry.bookingkoala.com/dashboard"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:350px)]:h-9 [@media(min-width:450px)]:h-12 xl:h-[3.75rem]"></NuxtLink>
		<NuxtLink to="https://chorelesslaundry.bookingkoala.com/dashboard" class="btn btn-sm btn-ghost justify-self-end w-8 p-1.5 stroke-2 stroke-brand-orange hover:stroke-white hover:bg-transparent">
			<IconClose class="stroke-inherit" />
		</NuxtLink>
	</section>
	<div class="w-full h-[8px] bg-[#DBDBDB]">
		<div class=" h-[8px] bg-brand-orange transition-width duration-500" :style="{width: `${book.bookProgress}%`}" />
	</div>
</div>
</template>
