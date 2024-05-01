<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  is_toggle: boolean,
}>();

const emit = defineEmits();

const toggle_button = () => {
  emit('update:is_toggle');
};
</script>

<template>
    	<label class="flex items-center cursor-pointer select-none text-dark ">
    					<div class="relative">
    					<input type="checkbox" class="sr-only" @click="toggle_button" />
    					<div :class="is_toggle ? 'bg-[#F85A47]' : 'bg-[#D9D9D9]'" class="block h-5 rounded-full  w-[50px]"></div>
      <div
        :class="{ 'translate-x-full ': is_toggle }"
        class="absolute flex items-center justify-center w-7 h-7 transition drop-shadow-md bg-[#FFFFFF] rounded-full dot dark:bg-dark-5 left-0 -top-1"
      >
        <span>
			<p  v-if="is_toggle" class="text-[#F85A47]">
				&#x2713;
			</p>
        </span>
       
      </div>
    </div>
  </label>
</template>
<style scoped>


</style>