<script setup lang="ts">
const props = defineProps<{
	modelValue:(number|null)[]
	error_weight: boolean
}>();
const emit = defineEmits(['update:modelValue', 'update:error_weight']);

const bags = computed({
	get: ()=>props.modelValue,
	set(v){emit('update:modelValue', v)}
})
const error_weight_computed = computed({
	get: ()=>props.error_weight,
	set(v){emit('update:error_weight', v)}
})
const total_weight = computed(()=>Number(bags.value.reduce((a: number, v)=>v ? Number(v)+a : a, 0).toFixed(2)));

function deleteBag(key: number){
	delete bags.value[key];
	bags.value = bags.value.filter(v=>v!==undefined);
}

watch(bags, ()=>{ error_weight_computed.value=false; }, {deep: true})

defineExpose({total_weight})
</script>

<template>
<div>
	<div v-for="(v, k) of bags" :key="k" class="grid items-center gap-x-2 mt-4" :class="{'grid-cols-[1fr_auto]': bags.length>1}">
		<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 border border-base-content/20 rounded-[0.3125rem]">
			<label class="input-float">
				<input v-model.number="bags[k]" type="number" placeholder="" min="0" class="!border-0">
				<p>Laundry bag {{ k+1 }} (lb)</p>
			</label>
		</div>
		<button v-if="bags.length>1" class="btn btn-square btn-outline border-none btn-error hover:!text-white" @click="deleteBag(k)"><Icon name="ic:baseline-delete-forever" class="text-3xl" /></button>
	</div>
	<p v-if="error_weight_computed" class="text-error">* Invalid weight</p>
	<div class="flex items-center justify-between">
		<button class="btn btn-sm gap-x-1 mt-2 btn-primary text-gray-20" @click="bags.push(null)">
			<Icon name="iconamoon:shopping-bag-bold" class="text-xl" />
			<p>Add bag</p>
		</button>
		<p>Total weight: <span class="text-primary font-bold">{{ total_weight }}</span>lb</p>
	</div>
</div>
</template>
