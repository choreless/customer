<script setup lang="ts">
import Timer from 'easytimer.js';
import { differenceInSeconds, intervalToDuration } from 'date-fns';
import Bags from '@/components/forms/jobs/Bags.vue';
import type { JobWasher } from '~/types/job';

definePageMeta({ middleware: 'washer' })
const {params} = useRoute();
const api = useApi();
const timer = ref<Timer>();

const bags_ref = ref<InstanceType<typeof Bags>>();
const job = ref<JobWasher>();
const bags = ref<(number|null)[]>([null]);
const stopwatch = reactive({
	seconds: 0,
	minutes: 0,
	hours: 0
});
const error_weight = ref(false);

function initializeStopwatch(){
	if(!job.value) return;
	const end_seconds =
		job.value.status==='resume'
			? differenceInSeconds(Date.now(), new Date(job.value.stopwatch_at).valueOf())+Number(job.value.stopwatch)
			:Number(job.value.stopwatch);
	const interval = intervalToDuration({start: 0, end: end_seconds*1000});
	stopwatch.seconds = interval.seconds ?? 0;
	stopwatch.minutes = interval.minutes ?? 0;
	stopwatch.hours = interval.hours ?? 0;
}

async function getJob(){
	const {data}: {data: JobWasher|false} = await api.get(`/jobs/${params.id}`);
	if(data){
		job.value = data;
		bags.value = !data.bags.length ? [null] : data.bags;
		initializeStopwatch();
	}
	else await navigateTo('/jobs/active');
}
await getJob();

function startStopwatch(){
	if(!timer.value) return;
	timer.value.start({
		startValues: {...stopwatch}
	});
}

async function toggleResumePause(){
	if(!(job.value && timer.value)) return;
	job.value.status = job.value.status==='pause' ? 'resume' : 'pause';
	if(job.value.status==='pause') timer.value.pause();
	const {data}: {data: {stopwatch: string, stopwatch_at: string}|false} = await api.post(`/jobs/${job.value.id}`, {
		bags: bags.value.filter(v=>v),
		status: job.value.status
	});
	if(data){
		job.value.stopwatch = data.stopwatch;
		job.value.stopwatch_at = data.stopwatch_at;
		initializeStopwatch();
		if(job.value.status==='resume') startStopwatch();
		notify.success('Job info has been updated.');
	}
	else await navigateTo('/jobs/active');
}

async function complete(){
	if(!(job.value && bags_ref.value)) return;
	error_weight.value = !(bags_ref.value.total_weight>0);
	if(error_weight.value) return;
	await api.post(`/jobs/${job.value.id}`, {
		bags: bags.value.filter(v=>v),
		status: 'complete'
	});
	await navigateTo('/jobs/completed');
}

onMounted(()=>{
	timer.value = new Timer();
	timer.value.addEventListener('secondsUpdated', ()=>{
		const t = timer.value!.getTimeValues();
		stopwatch.seconds = t.seconds;
		stopwatch.minutes = t.minutes;
		stopwatch.hours = t.hours;
	});
	if(job.value && job.value.status==='resume') startStopwatch();
})
</script>

<template>
<section>
	<Title>Job - {{ params.id }}</Title>
	<div class="max-w-4xl mx-auto mt-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-bold font-mono">Job</h1>
			<NuxtLink to="/jobs/active" class="btn btn-sm btn-ghost btn-square hover:bg-brand-orange hover:text-white">
				<Icon name="mynaui:minimize-one" class="text-2xl" />
			</NuxtLink>
		</div>
		<div v-if="job" class="mt-4">
			<div>
				<p>Id: {{ job.id }}</p>
				<p>Customer name: {{ job.customer_name }}</p>
				<Bags ref="bags_ref" v-model:error_weight="error_weight" v-model="bags" />
			</div>
			<div class="grid grid-flow-col auto-cols-max justify-center gap-5 text-center mt-4">
				<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
					<span class="countdown font-mono text-5xl">
						<span :style="{'--value': stopwatch.hours}" />
					</span>
					hour<template v-if="stopwatch.hours>1">s</template>
				</div>
				<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
					<span class="countdown font-mono text-5xl">
						<span :style="{'--value': stopwatch.minutes}" />
					</span>
					min
				</div>
				<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
					<span class="countdown font-mono text-5xl">
						<span :style="{'--value': stopwatch.seconds}" />
					</span>
					sec
				</div>
			</div>
			<div class="flex justify-center gap-x-20 mt-3">
				<button class="btn btn-outline" :class="job.status==='pause' ? 'btn-primary' : 'btn-error text-white'" @click="toggleResumePause()">{{ job.status==='pause' ? 'Resume' : 'Pause' }}</button>
				<button class="btn btn-success btn-outline text-white" @click="complete()">Complete</button>
			</div>
		</div>
	</div>
</section>
</template>
