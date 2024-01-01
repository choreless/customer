<script setup lang="ts">
import { format } from 'date-fns';
import { getCompletedJobInterval } from '~/lib/job';
import type { JobAdmin } from '~/types/job';

const api = useApi();

const jobs = ref<JobAdmin[]>([]);
const {data}: {data: JobAdmin[]} = await api.get('/jobs');
jobs.value = data;
</script>

<template>
<div>
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>No.</th>
					<th>Customer name</th>
					<th>Washer name</th>
					<th>Bags weight</th>
					<th>Stopwatch</th>
					<th>Created at</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(job, key) of jobs" :key="job.id">
					<td>{{key+1}}</td>
					<td>{{job.customer_first_name}} {{job.customer_last_name}}</td>
					<td>{{job.washer_first_name}} {{job.washer_last_name}}</td>
					<td>
						<div class="flex flex-wrap gap-1">
							<p v-for="(v, k) of job.bags" :key="k" class="badge badge-primary whitespace-nowrap">Bag {{k+1}}: {{v}} lb</p>
						</div>
						<p class="whitespace-nowrap">Total weight: {{Number(job.bags.reduce((a: number, v)=>v ? Number(v)+a : a, 0).toFixed(2))}} lb</p>
					</td>
					<td class="whitespace-nowrap">{{getCompletedJobInterval(job.stopwatch)}}</td>
					<td>
						<p class="whitespace-nowrap">{{format(new Date(job.created_at), 'yyyy-M-d')}}</p>
						<p class="whitespace-nowrap">{{format(new Date(job.created_at), 'h:m:s aaa')}}</p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>
