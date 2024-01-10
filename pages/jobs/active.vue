<script setup lang="ts">
import { intervalToDuration, differenceInSeconds } from 'date-fns';
import Timer from 'easytimer.js';
import type { JobWasher } from '@/types/job';

useHead({ title: 'Jobs - Active' })
definePageMeta({ middleware: 'washer' })
const api = useApi();

const jobs = ref<JobWasher[]>([]);
const timers = reactive<{[key:string]: Timer}>({});
const stopwatches = reactive<{[key:string]: {seconds: number, minutes: number, hours: number}}>({});

async function getJobs(){
	const {data}: {data: JobWasher[]} = await api.get('/jobs?status=resume&status=pause');
	jobs.value = data;

	for(const job of data){
		timers[job.id] = new Timer();
		const end_seconds =
		job.status==='resume'
			? differenceInSeconds(Date.now(), new Date(job.stopwatch_at).valueOf())+Number(job.stopwatch)
			:Number(job.stopwatch);
		const interval = intervalToDuration({start: 0, end: end_seconds*1000});
		stopwatches[job.id] = {
			seconds: interval.seconds ?? 0,
			minutes: interval.minutes ?? 0,
			hours: interval.hours ?? 0
		};
	}
}

onMounted(async ()=>{
	await getJobs();
	for(const job of jobs.value){
		if(job.status==='resume'){
			timers[job.id].addEventListener('secondsUpdated', ()=>{
				const t = timers[job.id].getTimeValues();
				stopwatches[job.id].seconds = t.seconds;
				stopwatches[job.id].minutes = t.minutes;
				stopwatches[job.id].hours = t.hours;
			});
			timers[job.id].start({
				startValues: {...stopwatches[job.id]}
			})
		}
	}
})

</script>

<template>
<div class="mt-6 max-w-4xl mx-auto">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold font-mono">Active jobs</h1>
		<NuxtLink to="/dashboard" class="btn btn-sm btn-ghost btn-square hover:bg-brand-orange hover:text-white">
			<Icon name="material-symbols:close-rounded" class="text-3xl" />
		</NuxtLink>
	</div>
	<div class="overflow-x-auto mt-4">
		<table class="table">
			<thead>
				<tr>
					<th>No.</th>
					<th>Customer name</th>
					<th>Bags weight</th>
					<th>Status</th>
					<th>Stopwatch</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(job, key) of jobs" :key="job.id">
					<td>{{ key+1 }}</td>
					<td>{{ job.customer_name }}</td>
					<td>
						<div class="flex flex-wrap gap-1">
							<p v-for="(v, k) of job.bags" :key="k" class="badge badge-primary whitespace-nowrap">Bag {{ k+1 }}: {{ v }} lb</p>
						</div>
						<p class="whitespace-nowrap">Total weight: {{ Number(job.bags.reduce((a: number, v)=>v ? Number(v)+a : a, 0).toFixed(2)) }} lb</p>
					</td>
					<td class="capitalize">{{ job.status }}</td>
					<td>
						<div class="flex items-center gap-x-2 text-center">
							<div class="flex items-center">
								<span class="countdown font-mono">
									<span :style="{'--value': stopwatches[job.id].hours}" />
								</span>
								<p>h</p>
							</div>
							<div class="flex items-center">
								<span class="countdown font-mono">
									<span :style="{'--value': stopwatches[job.id].minutes}" />
								</span>
								<p>m</p>
							</div>
							<div class="flex items-center">
								<span class="countdown font-mono">
									<span :style="{'--value': stopwatches[job.id].seconds}" />
								</span>
								<p>s</p>
							</div>
						</div>
					</td>
					<td>
						<NuxtLink :to="`/jobs/${job.id}`" class="btn btn-sm btn-square btn-outline border-none btn-info hover:!text-white">
							<Icon name="material-symbols:edit-document-outline-rounded" class="text-2xl" />
						</NuxtLink>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
