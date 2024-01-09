<template>
  <section
    class="flex py-[20px] px-[50px] justify-between items-center self-stretch border-t border-black border-opacity-20"
  >
    <div class="flex flex-col items-center gap-[10px]">
      <div class="flex items-start gap-5">
        <div
          class="w-[78.014px] h-[20.352px] rounded-[80px] bg-[#F85A47]"
        ></div>
        <div
          class="w-[78.014px] h-[20.352px] rounded-[80px] bg-red-600 bg-opacity-20"
        ></div>
        <div
          class="w-[78.014px] h-[20.352px] rounded-[80px] bg-red-600 bg-opacity-20"
        ></div>
      </div>
      <h4 class="text-black text-2xl font-semibold">Intake</h4>
    </div>
    <span class="text-[32px] leading-[30px]">Total weight: 0.00 lbs</span>
    <div class="flex w-[274px] justify-end items-center gap-5">
      <button
        class="underline btn btn-sm gap-0 mt-2.5 px-2.5 border-0 shadow-none rounded-3xl border-brand-black bg-transparent hover:text-white hover:bg-[#F85A47] hover:rounded-3xl hover:px-2.5 hover:no-underline"
      >
        cancel
      </button>
      <button
        class="flex h-[60px] py-[5px] px-[40px] justify-center items-center gap-5 rounded-[40px] bg-[#F85A47]"
      >
        <span class="text-white text-[16px] font-semibold">Next</span>
      </button>
    </div>
  </section>
</template>
