<template>
<section
	:class="{
		'w-[107px] h-[126px] text-center flex-shrink-0 rounded-[5px]': true,
		'border-2 border-brand-blue': $props.isBlue,
		'border-brand-black border-[0.5px] border-opacity-50': !$props.isBlue,
	}"
>
	<div
		v-if="$props.month"
		class="inline-flex flex-col items-center text-[#011631]"
	>
		<p class="leading-10">{{ month }}</p>
		<p class="font-bold leading-10 text-5xl">{{ number }}</p>
		<time class="leading-10">{{ day }}</time>
	</div>
	<div
		v-else
		class="inline-flex flex-col pt-[10px] items-center text-[#011631]"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="34"
			viewBox="0 0 30 34"
			fill="none"
		>
			<path
				d="M20.0003 2.25V8.91667M10.0003 2.25V8.91667M1.66699 15.5833H28.3337M28.3337 15.5833V28.9167C28.3337 30.7576 26.8413 32.25 25.0003 32.25H5.00033C3.15938 32.25 1.66699 30.7576 1.66699 28.9167V8.91667C1.66699 7.07572 3.15938 5.58333 5.00033 5.58333H25.0003C26.8413 5.58333 28.3337 7.07572 28.3337 8.91667V15.5833Z"
				stroke="#F85A47"
				stroke-width="3"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<p class="leading-10">Other</p>
		<div class="flex pt-2 flex-col items-center gap-[28px]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="7"
				viewBox="0 0 12 7"
				fill="none"
			>
				<path
					d="M1 1.25L6 6.25L11 1.25"
					stroke="#011631"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</div>
</section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps({
	month: {
		type: String,
		default: '',
		required: false
	},
	number: {
		type: Number,
		default: 0,
		required: false
	},
	day: {
		type: String,
		default: 'Fri',
		required: false
	},
	isBlue: {
		type: Boolean,
		default: false,
		required: false
	}
});
</script>

<style></style>
