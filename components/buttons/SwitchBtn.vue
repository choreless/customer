<script setup lang="ts">

const title = defineModel('service')

</script>

<template>
<label class="flex items-center cursor-pointer select-none text-dark ">
	<div class="relative">
		<input v-model="title" type="checkbox" class="sr-only">
		<div :class="service ? 'bg-brand-black' : 'bg-[#d9d9d9]'" class="block h-5 rounded-full  w-[37px]" />
		<div
			:class="{ 'translate-x-full ': service }"
			class="absolute flex items-center justify-center w-5 h-5  transition drop-shadow-md bg-[#ffffff] rounded-full dot dark:bg-dark-5 left-0 top-0"
		>
			<span>
				<p v-if="service" class="text-brand-black">
					&#x2713;
				</p>
			</span>

		</div>
	</div>
</label>
</template>
<style scoped>

</style>
