<script setup lang="ts">
withDefaults(defineProps<{
    width?: string,
    height?: string,
    fill?: string,
    stroke?: string
}>(), {
	width: '12',
	height: '8',
	fill: 'none',
	stroke: 'currentColor'
})
</script>
<template>
<svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 12 8" :fill="fill">
	<path
		d="M1 1.5L6 6.5L11 1.5" :stroke="stroke" stroke-width="2" stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
</template>
