<script setup lang="ts">
// Defining Constants
const book = usePageBook();
const step_names = ['Select Services', 'Select services'];

// Defining functions

function nextStep(){
	book.step=1
	book.current_Screen='pickup_date'
}
</script>

<template>
<div class="sticky top-0  mx-auto shadow-md sm:shadow-none bg-white z-50 max-w-[120rem] ">
	<section class="py-2.5 px-2.5  sm:px-[3.125rem] sm:pt-5 sm:pb-4 mx-auto grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr] items-center">
		<div class="flex items-center gap-2.5">
			<button v-if="book.step>0" class="btn btn-sm btn-ghost fill-black hover:bg-transparent" @click="--book.step">
				<img src="https://ik.imagekit.io/choreless/V3/icons/back-arrow.svg" alt="choreless back arrow">
			</button>
			<p class="sm:w-7 sm:h-7 w-5 h-5 sm:text-base text-sm rounded-full font-bold sm:leading-[0.875rem] leading-[0.938rem] flex items-center justify-center bg-[#d4e8e6] text-black">{{ book.step+1 }}</p>
			<p class="font-bold sm:leading-7 leading-5 text-base sm:text-2xl text-black  ms-2.5">{{ step_names[book.step] }}</p>
		</div>
		<NuxtLink class="  justify-self-center hidden md:block" to="https://chorelesslaundry.bookingkoala.com/dashboard"><img src="https://ik.imagekit.io/choreless/V3/Logo.svg" alt="Choreless" loading="lazy" class="h-[2.813rem] w-[15.625rem]"></NuxtLink>
		<button class="px-5 py-[18px] rounded-[25px] bg-[#f8f8f8] flex h-[45px] justify-center items-center text-brand-black text-base font-medium leading-6 sm:hidden" @click="nextStep()">Next</button>
	</section>
</div>
</template>
