<script setup lang="ts">
const api = useApi();

const active_jobs_count = ref<number>();
const {data} = await api.get('/stats/jobs');
active_jobs_count.value = Number(data.count);
</script>

<template>
<section class="mt-6 max-w-4xl mx-auto px-4">
	<div class="flex flex-col justify-between min-h-[35rem] md:min-h-[25rem] h-[85vh] max-h-[35rem]">
		<div class='flex flex-col md:flex-row gap-x-[4.5rem] gap-y-10 min-h-[8.25rem] mt-2.5 mx-4 sm:mx-0'>
			<NuxtLink to='/jobs/create' class="relative w-full max-w-[19.5rem] h-[12.5rem]">
				<div class='btn w-full h-full flex flex-col items-center gap-x-3 rounded-md shadow-[0px_0px_15px_0px_#00000015] border-2 bg-white hover:border-brand-orange hover:bg-white'>
					<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaDocumentPlus.svg" alt="icon" loading="lazy" class="w-[3.2rem] h-[4rem]">
					<p class="text-xl font-normal">Create job</p>
				</div>
				<p class="absolute -bottom-[1.45rem] -right-[1.45rem] flex items-center justify-center rounded-full w-12 h-12 bg-brand-orange"><Icon name="material-symbols:add" class="text-3xl text-white" /></p>
			</NuxtLink>
			<NuxtLink to='/jobs/completed' class="relative w-full max-w-[19.5rem] h-[12.5rem]">
				<div class='btn w-full h-full flex flex-col items-center gap-x-3 rounded-md shadow-[0px_0px_15px_0px_#00000015] border-2 bg-white hover:border-brand-orange hover:bg-white'>
					<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaDocumentRight.svg" alt="icon" loading="lazy" class="w-[3.2rem] h-[4rem]">
					<p class="text-xl font-normal">Completed jobs</p>
				</div>
				<p class="absolute -bottom-[1.45rem] -right-[1.45rem] flex items-center justify-center rounded-full w-12 h-12 bg-brand-orange"><Icon name="material-symbols:add" class="text-3xl text-white" /></p>
			</NuxtLink>
		</div>
		<NuxtLink to='/jobs/active' class="mt-4 shadow-[0px_0px_15px_0px_#00000015] group">
			<div class="flex items-center justify-center rounded-t-md h-5 bg-brand-orange">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="2" viewBox="0 0 24 2" fill="none">
					<path d="M1.95865 1H22.0414" stroke="white" strokeWidth="2" strokeLinecap="round"/>
				</svg>
			</div>
			<div class="flex items-center gap-x-5 p-2.5 rounded-b-md border border-t-0 border-transparent group-hover:border-brand-orange">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaDoubleBox.svg" alt="icon" loading="lazy" class="w-6 h-6">
				<p class="text-lg font-bold">{{ active_jobs_count }} Active jobs</p>
			</div>
		</NuxtLink>
	</div>
</section>
</template>
