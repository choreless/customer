<script setup lang="ts">
const entry = usePageEntry();

const step_names = ['Getting started', 'Contact information'];
</script>

<template>
<div class="sticky top-0 py-2.5 bg-white">
	<NuxtLink class="block w-fit mx-auto md:hidden" to="/"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless2.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:350px)]:h-9 [@media(min-width:450px)]:h-12 xl:h-[3.75rem]"></NuxtLink>
	<section class="max-w-7xl mx-auto mt-1.5 px-4 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr] items-center">
		<div class="flex items-center">
			<button v-if="entry.step>0" class="btn btn-sm btn-ghost hover:bg-transparent hover:fill-brand-orange" @click="--entry.step">
				<IconArrow />
			</button>
			<p class="w-7 h-7 rounded-full font-bold flex items-center justify-center bg-red-500 text-white">{{ entry.step+(entry.step>0 ? 0 : 1) }}</p>
			<p class="font-bold ms-2.5">{{ step_names[entry.step] }}</p>
		</div>
		<NuxtLink class="justify-self-center hidden md:block" to="/"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless2.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:350px)]:h-9 [@media(min-width:450px)]:h-12 xl:h-[3.75rem]"></NuxtLink>
	</section>
</div>
</template>
