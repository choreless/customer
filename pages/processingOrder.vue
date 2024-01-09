<script setup lang="ts">
import navbarCustomer from "~/components/navBars/navbarCustomer.vue";
useHead({ title: "Processing Order" });
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
      <article class="flex w-full justify-around">
        <section
          class="flex flex-col w-[695px] h-[557px] p-[30px] items-center gap-5 flex-shrink-0"
        >
          <h1 class="text-black text-[32px] font-semibold">Processing Order</h1>
          <div class="flex items-start gap-[50px]">
            <section
              class="flex flex-col items-center justify-center w-[300px] py-[50px] px-[60px] gap-10 self-stretch rounded-[25px] bg-white shadow-md"
            >
              <h2>Wash</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="100"
                viewBox="0 0 75 100"
                fill="none"
              >
                <path
                  d="M1.89098 93.7818H5.00007V98.6364C5.00007 99.3909 5.60916 100 6.36371 100H13.0637C13.8183 100 14.4273 99.3909 14.4273 98.6364V93.7818H60.5728V98.6364C60.5728 99.3909 61.1819 100 61.9364 100H68.6364C69.391 100 70.0001 99.3909 70.0001 98.6364V93.7818H73.1092C73.8637 93.7818 74.4728 93.1727 74.4728 92.4182V5.54545C74.4728 2.49091 71.9819 0 68.9273 0H6.0728C3.01825 0 0.527344 2.49091 0.527344 5.54545V92.4182C0.527344 93.1727 1.13643 93.7818 1.89098 93.7818ZM11.7001 97.2727H7.72734V93.7818H11.7001V97.2727ZM67.2728 97.2727H63.3001V93.7818H67.2728V97.2727ZM3.25462 5.54545C3.25462 3.99091 4.51825 2.72727 6.0728 2.72727H68.9273C70.4819 2.72727 71.7455 3.99091 71.7455 5.54545V18.4364H3.25462V5.54545ZM3.25462 21.1636H71.7455V91.0546H3.25462V21.1727V21.1636Z"
                  fill="black"
                />
                <path
                  d="M37.5004 80.8C50.9186 80.8 61.8368 69.7273 61.8368 56.1182C61.8368 42.5091 50.9186 31.4364 37.5004 31.4364C24.0822 31.4364 13.1641 42.5091 13.1641 56.1182C13.1641 69.7273 24.0822 80.8 37.5004 80.8ZM37.5004 34.1546C49.4186 34.1546 59.1095 44.0091 59.1095 56.1091C59.1095 68.2091 49.4186 78.0636 37.5004 78.0636C25.5822 78.0636 15.8913 68.2091 15.8913 56.1091C15.8913 44.0091 25.5822 34.1546 37.5004 34.1546Z"
                  fill="black"
                />
                <path
                  d="M37.5002 73.5818C47.0002 73.5818 54.7275 65.7454 54.7275 56.1091C54.7275 46.4727 47.0002 38.6364 37.5002 38.6364C28.0002 38.6364 20.2729 46.4727 20.2729 56.1091C20.2729 65.7454 28.0002 73.5818 37.5002 73.5818ZM37.5002 41.3636C45.5002 41.3636 52.0002 47.9818 52.0002 56.1091C52.0002 64.2364 45.4911 70.8545 37.5002 70.8545C29.5093 70.8545 23.0002 64.2364 23.0002 56.1091C23.0002 47.9818 29.5093 41.3636 37.5002 41.3636Z"
                  fill="black"
                />
                <path
                  d="M61.8552 5.54544C59.1097 5.54544 56.8643 7.80908 56.8643 10.5909C56.8643 13.3727 59.1006 15.6363 61.8552 15.6363C64.6097 15.6363 66.8461 13.3727 66.8461 10.5909C66.8461 7.80908 64.6097 5.54544 61.8552 5.54544ZM61.8552 12.9C60.6097 12.9 59.5915 11.8636 59.5915 10.5818C59.5915 9.29998 60.6097 8.26362 61.8552 8.26362C63.1006 8.26362 64.1188 9.29998 64.1188 10.5818C64.1188 11.8636 63.1006 12.9 61.8552 12.9Z"
                  fill="black"
                />
                <path
                  d="M48.7551 5.54544C46.0096 5.54544 43.7642 7.80908 43.7642 10.5909C43.7642 13.3727 46.0005 15.6363 48.7551 15.6363C51.5096 15.6363 53.746 13.3727 53.746 10.5909C53.746 7.80908 51.5096 5.54544 48.7551 5.54544ZM48.7551 12.9C47.5096 12.9 46.4914 11.8636 46.4914 10.5818C46.4914 9.29998 47.5096 8.26362 48.7551 8.26362C50.0005 8.26362 51.0187 9.29998 51.0187 10.5818C51.0187 11.8636 50.0005 12.9 48.7551 12.9Z"
                  fill="black"
                />
                <path
                  d="M29.8725 6.18179H9.51794C8.76339 6.18179 8.1543 6.79088 8.1543 7.54543V13.6272C8.1543 14.3818 8.76339 14.9909 9.51794 14.9909H29.8725C30.627 14.9909 31.2361 14.3818 31.2361 13.6272V7.54543C31.2361 6.79088 30.627 6.18179 29.8725 6.18179ZM28.5088 12.2636H10.8816V8.90907H28.5088V12.2636Z"
                  fill="black"
                />
              </svg>
              <span>0 turnos</span>
              <button
                class="uppercase flex items-center py-[15px] px-[50px] rounded-[40px] border-2 border-[#F85A47] bg-white gap-[10px] shadow-md"
              >
                Machines
              </button>
            </section>
            <section
              class="flex flex-col items-center justify-center w-[300px] py-[50px] px-[60px] gap-10 self-stretch rounded-[25px] bg-white shadow-md"
            >
              <h2>Wash</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="100"
                viewBox="0 0 75 100"
                fill="none"
              >
                <path
                  d="M1.89098 93.7818H5.00007V98.6364C5.00007 99.3909 5.60916 100 6.36371 100H13.0637C13.8183 100 14.4273 99.3909 14.4273 98.6364V93.7818H60.5728V98.6364C60.5728 99.3909 61.1819 100 61.9364 100H68.6364C69.391 100 70.0001 99.3909 70.0001 98.6364V93.7818H73.1092C73.8637 93.7818 74.4728 93.1727 74.4728 92.4182V5.54545C74.4728 2.49091 71.9819 0 68.9273 0H6.0728C3.01825 0 0.527344 2.49091 0.527344 5.54545V92.4182C0.527344 93.1727 1.13643 93.7818 1.89098 93.7818ZM11.7001 97.2727H7.72734V93.7818H11.7001V97.2727ZM67.2728 97.2727H63.3001V93.7818H67.2728V97.2727ZM3.25462 5.54545C3.25462 3.99091 4.51825 2.72727 6.0728 2.72727H68.9273C70.4819 2.72727 71.7455 3.99091 71.7455 5.54545V18.4364H3.25462V5.54545ZM3.25462 21.1636H71.7455V91.0546H3.25462V21.1727V21.1636Z"
                  fill="black"
                />
                <path
                  d="M37.5004 80.8C50.9186 80.8 61.8368 69.7273 61.8368 56.1182C61.8368 42.5091 50.9186 31.4364 37.5004 31.4364C24.0822 31.4364 13.1641 42.5091 13.1641 56.1182C13.1641 69.7273 24.0822 80.8 37.5004 80.8ZM37.5004 34.1546C49.4186 34.1546 59.1095 44.0091 59.1095 56.1091C59.1095 68.2091 49.4186 78.0636 37.5004 78.0636C25.5822 78.0636 15.8913 68.2091 15.8913 56.1091C15.8913 44.0091 25.5822 34.1546 37.5004 34.1546Z"
                  fill="black"
                />
                <path
                  d="M37.5002 73.5818C47.0002 73.5818 54.7275 65.7454 54.7275 56.1091C54.7275 46.4727 47.0002 38.6364 37.5002 38.6364C28.0002 38.6364 20.2729 46.4727 20.2729 56.1091C20.2729 65.7454 28.0002 73.5818 37.5002 73.5818ZM37.5002 41.3636C45.5002 41.3636 52.0002 47.9818 52.0002 56.1091C52.0002 64.2364 45.4911 70.8545 37.5002 70.8545C29.5093 70.8545 23.0002 64.2364 23.0002 56.1091C23.0002 47.9818 29.5093 41.3636 37.5002 41.3636Z"
                  fill="black"
                />
                <path
                  d="M61.8552 5.54544C59.1097 5.54544 56.8643 7.80908 56.8643 10.5909C56.8643 13.3727 59.1006 15.6363 61.8552 15.6363C64.6097 15.6363 66.8461 13.3727 66.8461 10.5909C66.8461 7.80908 64.6097 5.54544 61.8552 5.54544ZM61.8552 12.9C60.6097 12.9 59.5915 11.8636 59.5915 10.5818C59.5915 9.29998 60.6097 8.26362 61.8552 8.26362C63.1006 8.26362 64.1188 9.29998 64.1188 10.5818C64.1188 11.8636 63.1006 12.9 61.8552 12.9Z"
                  fill="black"
                />
                <path
                  d="M48.7551 5.54544C46.0096 5.54544 43.7642 7.80908 43.7642 10.5909C43.7642 13.3727 46.0005 15.6363 48.7551 15.6363C51.5096 15.6363 53.746 13.3727 53.746 10.5909C53.746 7.80908 51.5096 5.54544 48.7551 5.54544ZM48.7551 12.9C47.5096 12.9 46.4914 11.8636 46.4914 10.5818C46.4914 9.29998 47.5096 8.26362 48.7551 8.26362C50.0005 8.26362 51.0187 9.29998 51.0187 10.5818C51.0187 11.8636 50.0005 12.9 48.7551 12.9Z"
                  fill="black"
                />
                <path
                  d="M29.8725 6.18179H9.51794C8.76339 6.18179 8.1543 6.79088 8.1543 7.54543V13.6272C8.1543 14.3818 8.76339 14.9909 9.51794 14.9909H29.8725C30.627 14.9909 31.2361 14.3818 31.2361 13.6272V7.54543C31.2361 6.79088 30.627 6.18179 29.8725 6.18179ZM28.5088 12.2636H10.8816V8.90907H28.5088V12.2636Z"
                  fill="black"
                />
              </svg>
              <span>0 turnos</span>
              <button
                class="uppercase flex items-center py-[15px] px-[50px] rounded-[40px] border-2 border-[#F85A47] bg-white gap-[10px] shadow-md"
              >
                Machines
              </button>
            </section>
          </div>
        </section>
        <div class="flex justify-center items-center">
          <section
            class="flex w-[350px] p-[10px] flex-col items-center gap-5 shadow-md"
          >
            <div
              class="flex flex-col justify-center items-start gap-[10px] self-stretch px-5"
            >
              <h3 class="text-2xl font-semibold leading-[30px]">
                Processing & Packaging
              </h3>
              <div
                role="banner"
                class="flex py-[10px] px-5 gap-5 rounded-[135px] bg-red-600 bg-opacity-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M1 13.9996L0.292893 13.2925C0.105357 13.48 0 13.7344 0 13.9996H1ZM14 0.999603L14.7071 0.292497C14.3166 -0.0980278 13.6834 -0.0980278 13.2929 0.292497L14 0.999603ZM18 4.9996L18.7071 5.70671C19.0976 5.31619 19.0976 4.68302 18.7071 4.2925L18 4.9996ZM5 17.9996V18.9996C5.26522 18.9996 5.51957 18.8942 5.70711 18.7067L5 17.9996ZM1 17.9996H0C0 18.5519 0.447715 18.9996 1 18.9996L1 17.9996ZM9 16.9996C8.44772 16.9996 8 17.4473 8 17.9996C8 18.5519 8.44772 18.9996 9 18.9996V16.9996ZM17.5 18.9996C18.0523 18.9996 18.5 18.5519 18.5 17.9996C18.5 17.4473 18.0523 16.9996 17.5 16.9996V18.9996ZM1.70711 14.7067L14.7071 1.70671L13.2929 0.292497L0.292893 13.2925L1.70711 14.7067ZM13.2929 1.70671L17.2929 5.70671L18.7071 4.2925L14.7071 0.292497L13.2929 1.70671ZM17.2929 4.2925L4.29289 17.2925L5.70711 18.7067L18.7071 5.70671L17.2929 4.2925ZM5 16.9996H1V18.9996H5V16.9996ZM2 17.9996V13.9996H0V17.9996H2ZM10.2929 4.70671L14.2929 8.70671L15.7071 7.2925L11.7071 3.2925L10.2929 4.70671ZM9 18.9996H17.5V16.9996H9V18.9996Z"
                    fill="#F85A47"
                  />
                </svg>
                <span class="text-[#F85A47] font-semibold leading-[20px]"
                  >Preferences & Notes</span
                >
              </div>
            </div>
            <hr class="border border-black w-full" />
            <div
              class="flex flex-col items-start gap-[5px] self-stretch h-[140px]"
            >
              <h3><b>Care Preferences:</b></h3>
              <ul class="text-[14px]">
                <li><b>Detergente:</b> Regular</li>
                <li><b>Water Temp:</b> Hot</li>
                <li><b>Dryer Temp:</b> Regular</li>
                <li>
                  <b>Add-ons:</b> Add-ons: Fabric Softener, OxiClean, Hang Dry,
                  Delicates Hangers, Don’t mix bags
                </li>
              </ul>
            </div>
            <div class="flex flex-col items-start gap-[5px] self-stretch">
              <h3><b>Preferences Note:</b></h3>
              <p class="text-[14px]">
                Specific notes that i put in, don’t touch my clothes, but i want
                them clean, i don’t know how are you going to do it, but you
                have to do it, i belive in you.
              </p>
            </div>
          </section>
        </div>
      </article>

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
          <div
            role="button"
            class="underline btn btn-sm gap-0 mt-2.5 px-2.5 border-0 shadow-none rounded-3xl border-brand-black bg-transparent hover:text-white hover:bg-[#F85A47] hover:rounded-3xl hover:px-2.5 hover:no-underline"
          >
            cancel
          </div>
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
