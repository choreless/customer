<script setup lang="ts">
withDefaults(defineProps<{
    width?: string,
    height?: string,
    fill?: string,
    stroke?: string
}>(), {
	width: '12',
	height: '14',
	fill: 'none',
	stroke: 'black'
})
</script>
<template>
<svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 12 14" :fill="fill">
	<path
		d="M7.99996 1V3.66667M3.99996 1V3.66667M0.666626 6.33333H11.3333M11.3333 6.33333V11.6667C11.3333 12.403 10.7363 13 9.99996 13H1.99996C1.26358 13 0.666626 12.403 0.666626 11.6667V3.66667C0.666626 2.93029 1.26358 2.33333 1.99996 2.33333H9.99996C10.7363 2.33333 11.3333 2.93029 11.3333 3.66667V6.33333Z"
		:stroke="stroke" stroke-linecap="round" stroke-linejoin="round"
	/>
</svg>
</template>
