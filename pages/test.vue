<script setup lang="ts">
import navbarCustomer from "~/components/navBars/navbarCustomer.vue";

useHead({ title: "Test" });
definePageMeta({
  layout: "clean"
});
</script>

<template>
  <div class="flex flex-col justify-center pb-[1.65px]">
    <navbarCustomer />
    <section
      class="flex h-screen flex-col justify-between items-center flex-shrink-0"
    >
      <summary
        class="flex-grow flex w-[512px] flex-col items-center justify-center gap-5"
      >
        <h1 class="text-black text-2xl font-semibold leading-6">
          Weight order
        </h1>
        <section class="flex w-full flex-col gap-[5px]">
          <div class="flex justify-between items-start self-stretch">
            <h3 class="font-semibold leading-5">Care Preferences:</h3>
            <button
              class="font-semibold leading-5 underline text-[#F85A47] text-[14px]"
            >
              Edit
            </button>
          </div>
          <span class="leading-5 text-[14px]"><b>Detergent:</b> Regular</span>
          <span class="leading-5 text-[14px]"><b>Water Temp:</b> Hot</span>
          <span class="leading-5 text-[14px]"><b>Dryer Temp:</b> Regular</span>
          <div class="flex leading-5 text-[14px] gap-1">
            <span><b>Add-ons:</b></span>
            <p class="w-[300px]">
              Fabric Softener, OxiClean, Hang Dry, Delicates Hangers, Don’t mix
              bags
            </p>
          </div>
        </section>
        <section class="flex flex-col gap-[10px]">
          <div class="flex justify-between items-start self-stretch">
            <h3 class="font-semibold leading-5">Preferences Notes</h3>
            <button
              role="button"
              class="font-semibold leading-5 underline text-[#F85A47] text-[14px]"
            >
              Edit
            </button>
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
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
            >
              <path
                d="M2.52781 2.195L2.09725 0.889445C2.04169 0.736667 1.87503 0.653334 1.72225 0.695C1.56947 0.750556 1.48614 0.917222 1.5278 1.07L2.01392 2.57C2.05558 2.695 2.16669 2.77833 2.29169 2.77833H10.6945V4.52833H2.30558C2.1528 4.52833 2.01392 4.65333 2.00003 4.80611L1.01392 19.0006C1.01392 19.0839 1.04169 19.1672 1.09725 19.2228C1.1528 19.2783 1.23614 19.32 1.31947 19.32H20.6806C20.7639 19.32 20.8472 19.2783 20.9028 19.2228C20.9584 19.1672 20.9861 19.0839 20.9861 19.0006L20 4.80611C20 4.65333 19.8611 4.52833 19.6945 4.52833H11.2917V2.77833H19.6945C19.8195 2.77833 19.9445 2.695 19.9722 2.57L20.4584 1.07C20.5139 0.917222 20.4167 0.750556 20.2639 0.695C20.1111 0.639445 19.9445 0.736667 19.8889 0.889445L19.4584 2.195H2.52781ZM19.4306 5.13944L20.375 18.7367H1.6528L2.59725 5.13944H19.4445H19.4306Z"
                fill="black"
                stroke="black"
                stroke-miterlimit="10"
              />
              <path
                d="M11.0124 17.5978C14.1235 17.5978 16.6652 15.0561 16.6652 11.945C16.6652 8.8339 14.1235 6.29224 11.0124 6.29224C7.90129 6.29224 5.35962 8.8339 5.35962 11.945C5.35962 15.0561 7.90129 17.5978 11.0124 17.5978ZM11.0124 6.88946C13.8041 6.88946 16.068 9.15335 16.068 11.945C16.068 14.7367 13.8041 17.0006 11.0124 17.0006C8.22073 17.0006 5.95684 14.7367 5.95684 11.945C5.95684 9.15335 8.22073 6.88946 11.0124 6.88946Z"
                fill="black"
                stroke="black"
                stroke-miterlimit="10"
              />
              <path
                d="M11.012 12.2367C11.1092 12.2367 11.2064 12.195 11.262 12.1117L13.0953 9.40335C13.1925 9.26446 13.1509 9.08391 13.012 8.98669C12.8731 8.88946 12.6925 8.93113 12.5953 9.07002L10.762 11.7784C10.6647 11.9172 10.7064 12.0978 10.8453 12.195C10.9009 12.2367 10.9564 12.2506 11.012 12.2506V12.2367Z"
                fill="black"
                stroke="black"
                stroke-miterlimit="10"
              />
            </svg>
            <h2 class="text-[32px] font-semibold leading-6">Weight # 1</h2>
            <div
              class="flex items-center justify-center border border-black w-[200px] rounded-[5px]"
            >
              <label class="input-float" style="height: 50px">
                <input
                  type="tel"
                  class="!border-none placeholder:text-right"
                  placeholder="lbs"
                />
                <p>Bag 1</p>
              </label>
            </div>
          </div>
          <div class="flex w-[407px] flex-col items-end gap-5">
            <span class="font-semibold leading-5">+ Add another weight</span>
            <div class="flex items-center gap-5">
              <span class="text-[14px] leading-5">Is the order wet ?</span>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="53"
                  height="34"
                  viewBox="0 0 53 34"
                  fill="none"
                >
                  <rect
                    x="14.0139"
                    y="5.9996"
                    width="38"
                    height="20"
                    rx="10"
                    fill="#D9D9D9"
                  />
                  <g filter="url(#filter0_d_961_452)">
                    <circle cx="17.0139" cy="15.9996" r="13" fill="white" />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_961_452"
                      x="0.013916"
                      y="-0.000396729"
                      width="34"
                      height="34"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_961_452"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_961_452"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </button>
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
    </section>
  </div>
</template>
