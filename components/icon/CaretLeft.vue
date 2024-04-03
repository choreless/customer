<script setup lang="ts">
withDefaults(defineProps<{
    width?: string,
    height?: string,
    fill?: string,
    stroke?: string
}>(), {
	width: '12',
	height: '22',
	fill: 'none',
	stroke: 'black'
})
</script>
<template>
<svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 12 22" :fill="fill">
	<path d="M11 1L1 11L11 21" :stroke="stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
</template>
