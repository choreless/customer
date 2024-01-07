<script setup lang="ts">
useHead({ title: "Test" });
definePageMeta({
  layout: "clean",
  middleware: "guest",
});
</script>

<template>
  <div class="flex flex-col gap-[32px]">
    <nav
      class="flex py-5 px-[60px] justify-between items-center border-b border-black border-opacity-20"
    >
      <div class="flex w-[222.667px] items-center gap-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 128 128"
        >
          <path
            fill="currentColor"
            d="m20.906 35.197l43.091 26.757l43.095-26.835l-43.09-26.682zM63.993.64a3.561 3.561 0 0 0-1.883.533L12.216 32.146a3.605 3.605 0 0 0-1.693 3.058v57.592c0 1.242.64 2.403 1.693 3.058l49.893 30.973c.024.013.044.027.068.041c.027.016.055.038.082.055c.058.03.12.041.178.068c.059.03.118.072.177.096c.093.04.192.065.287.096c.056.018.107.039.164.054c.107.03.218.049.327.068c.047.006.09.02.137.027c.156.022.307.028.464.028a3.481 3.481 0 0 0 .97-.137h.013a3.018 3.018 0 0 0 .355-.122c.035-.013.072-.026.109-.041c.098-.044.19-.097.287-.15c.052-.03.112-.053.163-.083l.096-.068l49.798-30.905a3.585 3.585 0 0 0 1.693-3.058l-.096-28.871a3.58 3.58 0 0 0-1.843-3.126a3.583 3.583 0 0 0-3.631.095l-21.24 13.228l-16.368-10.143l41.485-25.827a3.58 3.58 0 0 0 1.693-3.044a3.596 3.596 0 0 0-1.707-3.044L65.89 1.173A3.607 3.607 0 0 0 63.993.64M17.568 41.565L53.7 64.007L17.567 86.435Zm49.934 26.646l16.38 10.143l-21.868 13.61a3.556 3.556 0 0 0-1.68 3.044l.055 22.318l-39.477-24.53l39.587-24.571l1.61.996a3.558 3.558 0 0 0 1.884.533a3.57 3.57 0 0 0 1.898-.533zm42.74 2.17l.054 20.436l-42.727 26.537l-.068-20.366z"
          />
        </svg>
        <div class="flex flex-col justify-center items-center gap-[10px]">
          <h1 class="text-black text-[32px] font-semibold leading-6">CH-525</h1>
          <div
            role="button"
            class="flex py-[5px] px-[10px] justify-center items-center gap-10 rounded-[25px] bg-red-600 bg-opacity-20"
          >
            <span class="text-[#F85A47] text-base font-bold leading-5"
              >Delivery</span
            >
          </div>
        </div>
      </div>
      <section class="flex flex-col items-start gap-[30px]">
        <div class="flex items-center gap-[50px]">
          <div class="flex items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-dasharray="20"
                stroke-dashoffset="20"
                stroke-linecap="round"
                stroke-width="2"
              >
                <path
                  d="M6 19V18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18V19"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="20;0"
                  />
                </path>
                <path
                  d="M12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.4s"
                    values="20;0"
                  />
                </path>
              </g>
            </svg>
            <span>Gazi Mostofa Z.</span>
          </div>
          <div class="flex items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <rect
                  width="16"
                  height="16"
                  x="4"
                  y="4"
                  stroke-dasharray="64"
                  stroke-dashoffset="64"
                  rx="1"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.5s"
                    values="64;0"
                  />
                </rect>
                <path
                  stroke-dasharray="6"
                  stroke-dashoffset="6"
                  d="M7 4V2M17 4V2"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.2s"
                    values="6;0"
                  />
                </path>
                <path stroke-dasharray="12" stroke-dashoffset="12" d="M7 11H17">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.8s"
                    dur="0.2s"
                    values="12;0"
                  />
                </path>
                <path stroke-dasharray="9" stroke-dashoffset="9" d="M7 15H14">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1s"
                    dur="0.2s"
                    values="9;0"
                  />
                </path>
              </g>
              <rect width="14" height="0" x="5" y="5" fill="currentColor">
                <animate
                  fill="freeze"
                  attributeName="height"
                  begin="0.5s"
                  dur="0.2s"
                  values="0;3"
                />
              </rect>
            </svg>
            <span>Due: 29-12-2023</span>
          </div>

          <div
            class="flex py-[5px] px-[10px] justify-center items-center gap-10 rounded-[25px] bg-red-600 bg-opacity-20"
          >
            <div class="flex py-[5px] px-[15px] items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 256 256"
              >
                <g fill="currentColor">
                  <path
                    d="M216 96v112a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V96a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8"
                    opacity=".2"
                  />
                  <path
                    d="M208 80h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16M96 56a32 32 0 0 1 64 0v24H96Zm112 152H48V96h160z"
                  />
                </g>
              </svg>
              <span class="text-[#F85A47] text-base font-normal leading-5"
                >Bag: --</span
              >
            </div>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m16.5 16.25l2.86 1.69l-.75 1.22L15 17v-5h1.5zM23 16c0 3.87-3.13 7-7 7a7 7 0 0 1-5.75-3C6.19 19.79 3 18.08 3 16V6c0-2.21 3.58-4 8-4s8 1.79 8 4v3.68c2.36 1.13 4 3.53 4 6.32m-6-6.92v-.44c-.23.13-.5.26-.76.36c.26 0 .51.04.76.08M5 6c0 .5 2.13 2 6 2s6-1.5 6-2s-2.13-2-6-2s-6 1.5-6 2m0 5.45c1.07.78 2.8 1.31 4.72 1.48c.61-1.26 1.6-2.31 2.82-3.01c-.5.05-1.01.08-1.54.08c-2.39 0-4.53-.53-6-1.36zm4.26 6.42C9.1 17.27 9 16.65 9 16c0-.39.04-.77.1-1.14c-1.54-.17-2.95-.53-4.1-1.09V16c0 .42 1.5 1.5 4.26 1.87M21 16c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5"
            />
          </svg>
          <span class="leading-5">Weight: --</span>
        </div>
      </section>
      <div class="w-[1px] h-[88px] bg-black bg-opacity-20"></div>
      <div class="flex items-center gap-[50px]">
        <div class="flex gap-3">
          <div class="h-3 w-3 border bg-black rounded-full border-black"></div>
          <div class="h-3 w-3 border bg-black rounded-full border-black"></div>
          <div class="h-3 w-3 border bg-black rounded-full border-black"></div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
          >
            <path d="M5 5L19 5">
              <animate
                fill="freeze"
                attributeName="d"
                begin="0.2s"
                dur="0.4s"
                values="M5 5L19 5;M5 5L19 19"
              />
            </path>
            <path d="M5 12H19">
              <animate
                fill="freeze"
                attributeName="d"
                dur="0.4s"
                values="M5 12H19;M12 12H12"
              />
              <set attributeName="opacity" begin="0.4s" to="0" />
            </path>
            <path d="M5 19L19 19">
              <animate
                fill="freeze"
                attributeName="d"
                begin="0.2s"
                dur="0.4s"
                values="M5 19L19 19;M5 19L19 5"
              />
            </path>
          </g>
        </svg>
      </div>
    </nav>
    <section
      class="flex h-[624.35px] flex-col justify-between items-center flex-shrink-0"
    >
      <summary class="flex w-[512px] flex-col items-center gap-5">
        <h1 class="text-black text-2xl font-semibold leading-6">
          Weight order
        </h1>
        <section class="flex flex-col items-start gap-[5px]">
          <div class="flex justify-between items-start self-stretch">
            <h3 class="font-semibold leading-5">Care Preferences:</h3>
            <span
              class="font-semibold leading-5 underline text-[#F85A47] text-[14px]"
              >Edit</span
            >
          </div>
          <span class="leading-5 text-[14px]"><b>Detergent:</b> Regular</span>
          <span class="leading-5 text-[14px]"><b>Water Temp:</b> Hot</span>
          <span class="leading-5 text-[14px]"><b>Dryer Temp:</b> Regular</span>
          <span class="leading-5 text-[14px]">
            <b>Add-ons:</b> Fabric Softener, OxiClean, Hang Dry, Delicates
            Hangers, Don’t mix bags
          </span>
        </section>
        <section>
          <div class="flex justify-between items-start self-stretch">
            <h3 class="font-semibold leading-5">Preferences Notes</h3>
            <span
              class="font-semibold leading-5 underline text-[#F85A47] text-[14px]"
              >Edit</span
            >
          </div>
          <p class="text-[14px] leading-5">
            Specific notes that i put in, don’t touch my clothes, but i want
            them clean, i don’t know how are you going to do it, but you have to
            do it, i belive in you.
          </p>
        </section>
        <section class="flex flex-col items-start gap-[10px]">
          <div class="flex items-center gap-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m16.5 16.25l2.86 1.69l-.75 1.22L15 17v-5h1.5zM23 16c0 3.87-3.13 7-7 7a7 7 0 0 1-5.75-3C6.19 19.79 3 18.08 3 16V6c0-2.21 3.58-4 8-4s8 1.79 8 4v3.68c2.36 1.13 4 3.53 4 6.32m-6-6.92v-.44c-.23.13-.5.26-.76.36c.26 0 .51.04.76.08M5 6c0 .5 2.13 2 6 2s6-1.5 6-2s-2.13-2-6-2s-6 1.5-6 2m0 5.45c1.07.78 2.8 1.31 4.72 1.48c.61-1.26 1.6-2.31 2.82-3.01c-.5.05-1.01.08-1.54.08c-2.39 0-4.53-.53-6-1.36zm4.26 6.42C9.1 17.27 9 16.65 9 16c0-.39.04-.77.1-1.14c-1.54-.17-2.95-.53-4.1-1.09V16c0 .42 1.5 1.5 4.26 1.87M21 16c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5"
              />
            </svg>
            <h2 class="text-[32px] font-semibold leading-6">Weight # 1</h2>
            <input
              type="text"
              name=""
              id=""
              class="flex w-[200px] h-[50px] p-[10px] justify-between items-center rounded-[5px] border border-black"
              placeholder="Bag 1                            lbs"
            />
          </div>
          <div class="flex w-[407px] flex-col items-end gap-5">
            <span class="font-semibold leading-5">+ Add another weight</span>
            <div class="flex items-center gap-5">
              <span class="text-[14px] leading-5">Is the order wet ?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="d"
                    dur="0.2s"
                    values="M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z;M17 7a5 5 0 0 1 0 10H7A5 5 0 1 1 7 7h10Zm-10 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"
                  />
                </path>
              </svg>
            </div>
          </div>
        </section>
      </summary>
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
          <p class="underline">cancel</p>
          <div
            role="button"
            class="flex h-[60px] py-[5px] px-[40px] justify-center items-center gap-5 rounded-[40px] bg-[#F85A47]"
          >
            <span class="text-white text-[16px] font-semibold">Next</span>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
