<script setup lang="ts">
import { format } from 'date-fns';
import { getCompletedJobInterval } from '~/lib/job';
import type { JobWasher } from "@/types/job";

useHead({ title: 'Jobs - Completed' })
definePageMeta({ middleware: 'washer' })
const api = useApi();

const jobs = ref<JobWasher[]>([]);

async function getJobs(){
	const {data}: {data: JobWasher[]} = await api.get('/jobs?status=complete');
	jobs.value = data;
}
getJobs();

async function deleteJob(id: string){
	await api.delete(`/jobs/${id}`);
	notify.info('Job has been removed');
	getJobs();
}
</script>

<template>
<div class="mt-6 max-w-4xl mx-auto">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold font-mono">Completed jobs</h1>
		<NuxtLink to='/dashboard' class="btn btn-sm btn-ghost btn-square hover:bg-brand-orange hover:text-white">
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
					<th>Stopwatch</th>
					<th>Created at</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
					<tr v-for="(job, key) of jobs" :key="job.id">
						<td>{{key+1}}</td>
						<td>{{job.customer_name}}</td>
						<td>
							<div class="flex flex-wrap gap-1">
								<p v-for="(v, k) of job.bags" :key="k" class="badge badge-primary whitespace-nowrap">Bag {{k+1}}: {{v}} lb</p>
							</div>
							<p class="whitespace-nowrap">Total weight: {{Number(job.bags.reduce((a: number, v)=>v ? Number(v)+a : a, 0).toFixed(2))}} lb</p>
						</td>
						<td class="whitespace-nowrap">{{getCompletedJobInterval(Number(job.stopwatch))}}</td>
						<td>
							<p class="whitespace-nowrap">{{format(new Date(job.created_at), 'yyyy-M-d')}}</p>
							<p class="whitespace-nowrap">{{format(new Date(job.created_at), 'h:m:s aaa')}}</p>
						</td>
						<td>
							<div class="flex gap-x-2">
								<button @click="deleteJob(job.id)" class="btn btn-sm btn-square btn-outline border-none btn-error hover:!text-white">
									<Icon name="ic:baseline-delete-forever" class="text-2xl" />
								</button>
							</div>
						</td>
					</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
