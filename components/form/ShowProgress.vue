<script setup lang="ts">
defineProps<{
	complete: number
}>();
</script>

<template>
<div class="w-full h-2 transition-transform duration-500" :style="{transform: `translateX(min(0%, min(100%, ${complete-100}%)))`}" />
</template>
