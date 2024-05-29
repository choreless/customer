<script setup lang="ts">

type EmitFunction = (event: 'update:is_toggle', value: boolean) => void;

const is_toggle=ref<boolean>(false)

const emit = defineEmits<EmitFunction>();

const toggle_button = () => {
	is_toggle.value = !is_toggle.value
	emit('update:is_toggle', is_toggle.value);
};
</script>

<template>
<label class="flex items-center cursor-pointer select-none text-dark ">
	<div class="relative">
		<input v-model="is_toggle" type="checkbox" class="sr-only" @click="toggle_button">
		<div :class="is_toggle ? 'bg-brand-orange' : 'bg-[#d9d9d9]'" class="block h-5 rounded-full  w-10 sm:w-[3.125rem]" />
		<div
			:class="{ 'translate-x-full ': is_toggle }"
			class="absolute flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 transition drop-shadow-md bg-[#ffffff] rounded-full dot dark:bg-dark-5 -left-1 sm:left-0 top-[-0.125rem] sm:-top-1"
		>
			<span>
				<p v-if="is_toggle" class="text-brand-orange">
					&#x2713;
				</p>
			</span>

		</div>
	</div>
</label>
</template>
<style scoped>

</style>
