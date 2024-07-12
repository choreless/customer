<script setup lang="ts">
const book = usePageBook();
const props = defineProps<{
  note: string,
}>();
const emit=defineEmits(['update:note'])
const clear_note = () => {
	book.note=''
}

const update_note = () => {
	book.add_note_modal = false
	emit('update:note', { note: book.note });
}

const close_modal = () => {
	book.add_note_modal = false
}

</script>

<template>
<dialog
	id="my_modal_1"
	:class="book.add_note_modal ? 'modal-open  !bg-white sm:!bg-black/50' : ' '"
	class="modal  sm:py-3 overflow-scroll sm:overflow-hidden"
>
	<div
		class=" text-center  absolute top-0  sm:relative sm:modal-box sm:max-w-[31.313rem] w-full flex flex-col gap-2.5  !px-5 !p-0 sm:!px-5 !py-2.5  !rounded-[0.313rem] no-scrollbar"
	>
		<div
			class="px-5 py-2.5 flex justify-between items-center relative text-black"
		>
			<h1
				class="self-stretch text-xl leading-6 font-bold sm:font-medium text-center w-full px-10"
			>
				Add note
			</h1>
			<div
				class="absolute w-[0.438rem] h-[0.438rem] right-0 top-3 cursor-pointer"
				@click="close_modal"
			>
				<IconClose2 />
			</div>
		</div>
		<div class="flex justify-between items-center self-stretch">
			<h1 class="text-base text-black">Add Special instructions</h1>
			<h1
				class="text-base leading-[0.938rem] font-normal sm:font-medium text-black cursor-pointer"
				@click="clear_note"
			>
				Clear
			</h1>
		</div>
		<textarea
			v-model="book.note"
			class="focus:outline-none focus:border-[0.063rem] focus:border-b-[0.313rem] focus:border-brand-orange px-5 pt-2.5 pb-[0.938rem] placeholder:opacity-50 text-base placeholder:text-[#e5e5e5] !rounded-[0.313rem] border-[0.063rem] border-[#e5e5e5] w-full h-[5.625rem] text-black"
			placeholder="Add note"
		/>
		<button
			:disabled="!book.note"
			class="  mt-0 hidden sm:flex justify-center items-center px-5 py-5 rounded-[0.313rem] bg-brand-orange disabled:bg-[#f8f8f8] h-[3rem] text-base font-bold disabled:text-[#011631] text-white"
			@click="update_note()"
		>
			Save
		</button>
	</div>
	<div class=" absolute bottom-2.5 w-full px-5">
		<button
			:disabled="!book.note"
			class=" w-full  mt-3 flex sm:hidden justify-center items-center px-5 py-5 rounded-[0.313rem] bg-brand-orange disabled:bg-[#f8f8f8] h-[3rem] text-base font-bold disabled:text-[#011631] text-white"
			@click="update_note()"
		>
			Save
		</button>
	</div>
</dialog>
</template>
