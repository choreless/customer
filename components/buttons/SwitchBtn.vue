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
		<div :class="is_toggle ? 'bg-brand-black' : 'bg-[#d9d9d9]'" class="block h-5 rounded-full  w-[37px]" />
		<div
			:class="{ 'translate-x-full ': is_toggle }"
			class="absolute flex items-center justify-center w-5 h-5  transition drop-shadow-md bg-[#ffffff] rounded-full dot dark:bg-dark-5 left-0 top-0"
		>
			<span>
				<p v-if="is_toggle" class="text-brand-black">
					&#x2713;
				</p>
			</span>

		</div>
	</div>
</label>
</template>
<style scoped>

</style>
