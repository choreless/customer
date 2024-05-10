<script setup lang="ts">
const props = defineProps<{
	/** min is 0 and max is 1 */
	value: number
}>();

const progress = computed(()=>{
	if(props.value<0) return 0;
	if(props.value>1) return 1;
	return props.value;
});
</script>

<template>
<div class="overflow-hidden">
	<div class="h-2 transition-transform duration-500 bg-zinc-300" :style="{transform: `translateX(${progress*100}%)`}" />
</div>
</template>
