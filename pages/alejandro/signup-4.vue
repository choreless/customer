<template>
<div class="flex justify-center gap-32 my-10">
	<article class="inline-flex flex-col items-start gap-[30px]">
		<section>
			<div class="flex flex-col items-start gap-[30px]">
				<h1 class="text-brand-black text-2xl font-bold">
					Choose your pickup date:
				</h1>
				<summary class="flex items-start gap-[13px]">
					<dateBox :is-blue="true" month="Nov" :number="27" day="Fri" />
					<dateBox month="Nov" :number="28" day="Sat" />
					<dateBox month="Nov" :number="29" day="Sun" />
					<dateBox />
				</summary>
				<p class="w-[467px] leading-6 text-brand-black opacity-50">
					All deliveries are between 5pm and 10pm. Standard turnaround on all
					orders is 2-3 days. Rush turnaround is available for a small fee.
				</p>
				<span
					class="text-brand-orange text-xl font-medium leading-6 flex items-center gap-[10px]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							d="M10 15.25L10 8.25M10 5.25996V5.24997M19 10.25C19 15.2206 14.9706 19.25 10 19.25C5.02944 19.25 1 15.2206 1 10.25C1 5.27944 5.02944 1.25 10 1.25C14.9706 1.25 19 5.27944 19 10.25Z"
							stroke="#F85A47"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
					Learn more
				</span>
			</div>
		</section>
		<div class="flex flex-col items-start gap-5">
			<h2 class="text-brand-black text-2xl font-bold">
				Your delivery is schedule for
			</h2>
			<section class="flex">
				<section
					class="w-[107px] text-center flex-shrink-0 rounded-[5px] border-[0.5px] border-brand-black border-opacity-50"
					style="border-radius: 5px var(--bag, 0px) var(--bag, 0px) 5px"
				>
					<div class="inline-flex flex-col items-center text-[#011631]">
						<p class="leading-10">Sep</p>
						<p class="font-bold leading-10 text-5xl">01</p>
						<time class="leading-10">Fri</time>
					</div>
				</section>
				<div
					class="flex w-[360px] py-[39px] px-[30px] flex-col items-start border-[0.5px] border-brand-black border-opacity-50"
					style="border-radius: var(--bag, 0px) 5px 5px var(--bag, 0px)"
				>
					<h4 class="text-brand-black opacity-50 leading-6">All Services</h4>
					<p class="text-brand-black">Standard Turnaround is 3 days.</p>
				</div>
			</section>
			<div class="flex flex-col items-start gap-5">
				<h2 class="text-brand-black text-2xl font-bold">Frequency</h2>
				<section
					class="flex w-[467px] items-start content-start gap-5 flex-wrap"
				>
					<span
						class="flex w-[223.5px] py-[17px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[5px] border-2 border-brand-blue text-brand-blue text-center font-bold leading-6"
					>
						Just once
					</span>
					<span
						class="flex w-[223.5px] py-[17px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[5px] border-[0.5px] border-brand-black border-opacity-50 text-brand-black text-center font-bold leading-6"
					>
						Weekly
					</span>
					<span
						class="flex w-[223.5px] py-[17px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[5px] border-[0.5px] border-brand-black border-opacity-50 text-brand-black text-center font-bold leading-6"
					>
						Every two weeks
					</span>
					<span
						class="flex w-[223.5px] py-[17px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[5px] border-[0.5px] border-brand-black border-opacity-50 text-brand-black text-center font-bold leading-6"
					>
						Every four weeks
					</span>
				</section>
			</div>
		</div>
	</article>
	<billing />
</div>
</template>

<script lang="ts" setup>
import dateBox from './components/dateBox.vue';
import billing from './components/billing.vue';
</script>

<style></style>
