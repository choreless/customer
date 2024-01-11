<script setup lang="ts">
const api = useApi();

const active_jobs_count = ref<number>();
const {data} = await api.get('/stats/jobs');
active_jobs_count.value = Number(data.count);
</script>

<template>
<section class="mt-6 max-w-4xl mx-auto px-4">
	<div class="flex flex-col justify-between min-h-[35rem] md:min-h-[25rem] h-[85vh] max-h-[35rem]">
		<div class="flex flex-col md:flex-row gap-x-[4.5rem] gap-y-10 min-h-[8.25rem] mt-2.5 mx-4 sm:mx-0">
			<NuxtLink to="/jobs/create" class="relative w-full max-w-[22.8125rem] h-[15.625rem]">
				<div class="btn w-full h-full flex flex-col items-center gap-x-3 border-2 rounded-3xl shadow-[0px_0px_15px_0px_#00000015] bg-white hover:border-brand-orange hover:bg-white">
					<img src="https://ik.imagekit.io/choreless/v2/icons/busket.svg" alt="icon" loading="lazy" class="w-20">
					<p class="text-2xl font-normal">New service order</p>
				</div>
				<p class="absolute -bottom-[1.45rem] -right-[1.45rem] flex items-center justify-center rounded-full w-12 h-12 lg:w-[4.375rem] lg:h-[4.375rem] bg-brand-orange"><Icon name="material-symbols:add" class="text-3xl text-white" /></p>
			</NuxtLink>
			<div class="relative w-full max-w-[22.8125rem] h-[15.625rem]">
				<div class="btn w-full h-full flex flex-col items-center gap-x-3 border-2 rounded-3xl cursor-not-allowed shadow-[0px_0px_15px_0px_#00000015] bg-white hover:border-brand-orange hover:bg-white">
					<img src="https://ik.imagekit.io/choreless/v2/icons/not_available.svg" alt="icon" loading="lazy" class="w-20">
					<p class="text-2xl font-normal">Not available</p>
				</div>
				<p class="absolute -bottom-[1.45rem] -right-[1.45rem] flex items-center justify-center rounded-full w-12 h-12 lg:w-[4.375rem] lg:h-[4.375rem] bg-brand-orange"><Icon name="material-symbols:add" class="text-3xl text-white" /></p>
			</div>
		</div>
		<NuxtLink to="/jobs/active" class="mt-16 shadow-[0px_0px_15px_0px_#00000015] rounded-b-md group">
			<div class="flex items-center justify-center rounded-t-[0.625rem] h-[1.875rem] bg-brand-orange">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="2" viewBox="0 0 24 2" fill="none">
					<path d="M1.95865 1H22.0414" stroke="white" strokeWidth="2" strokeLinecap="round" />
				</svg>
			</div>
			<div class="flex items-center gap-x-5 px-2.5 py-7 border border-t-0 rounded-b-[inherit] border-transparent group-hover:border-brand-orange">
				<span class="w-4 h-4 rounded-full bg-brand-orange" />
				<p class="text-2xl">{{ active_jobs_count }} Active orders</p>
			</div>
		</NuxtLink>
	</div>
</section>
</template>
