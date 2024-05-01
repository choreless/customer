<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
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

</script>

<template>
  <dialog
    id="my_modal_1"
    :class="book.add_note_modal ? 'modal-open' : ''"
    class="modal py-3"
  >
    <div
      class="modal-box max-w-[500px] w-full !rounded-[5px] py-3 flex flex-col gap-2.5"
    >
      <div
        class="px-5 py-2.5 flex justify-between items-center relative text-black"
      >
        <h1
          class="self-stretch text-xl leading-6 font-medium text-center w-full px-10"
        >
          Add note
        </h1>
        <div
          class="absolute w-[7px] h-[7px] right-0 top-3 cursor-pointer"
          @click="(book.add_note_modal = false)"
        >
          <IconClose2 />
        </div>
      </div>
      <div class="flex justify-between items-center self-stretch">
        <h1 class="text-base text-black">Add Special instructions</h1>
        <h1
          class="text-base leading-[15px] font-medium text-black cursor-pointer"
          @click="clear_note"
        >
          Clear
        </h1>
      </div>
      <textarea
        v-model="book.note"
        class="focus:outline-none focus:border-[1px] focus:border-b-[5px] focus:border-[#f85a47] px-5 pt-2.5 pb-[15px] placeholder:opacity-50 text-base placeholder:text-[#e5e5e5] !rounded-[5px] border-[1px] border-[#e5e5e5] w-full h-[90px] text-black"
        placeholder="Add note"
      />
      <button
        :disabled="!book.note"
        class="flex justify-center items-center px-5 py-[18px] rounded-[5px] bg-[#f85a47] disabled:bg-[#F8F8F8] h-[48px] text-base font-bold disabled:text-[#011631] text-white"
        @click="update_note()"
      >
        Save
      </button>
    </div>
  </dialog>
</template>
