<script lang="ts" setup>
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
		d="M6 1.27316L6 13.2732M6 1.27316L10.5 5.77316M6 1.27316L1.5 5.77316" :stroke="stroke"
		stroke-width="1.13636" stroke-linecap="round" stroke-linejoin="round"
	/>
</svg>
</template>
