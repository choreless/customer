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
          width="67"
          height="70"
          viewBox="0 0 67 70"
          fill="none"
        >
          <path
            d="M20.0111 41.2967V36.245C19.9499 33.9 17.9986 32.0479 15.6507 32.1092C13.3903 32.1675 11.5732 33.9875 11.5149 36.245V41.2967C11.5761 43.6417 13.5274 45.4938 15.8753 45.4325C18.1328 45.3742 19.9528 43.5571 20.0111 41.2967ZM17.3861 41.2967C17.3861 42.1979 16.6541 42.93 15.7528 42.93C14.8516 42.93 14.1195 42.1979 14.1195 41.2967V36.245C14.1195 35.3438 14.8516 34.6117 15.7528 34.6117C16.6541 34.6117 17.3861 35.3438 17.3861 36.245V41.2967Z"
            fill="black"
          />
          <path
            d="M31.8239 41.2967V36.245C31.8239 33.8971 29.9222 31.9955 27.5743 31.9955C25.2264 31.9955 23.3247 33.8971 23.3247 36.245V41.2967C23.3247 43.6446 25.2293 45.5463 27.5772 45.5434C29.9222 45.5434 31.8239 43.6417 31.8239 41.2967ZM29.1989 41.2967C29.1989 42.198 28.4668 42.93 27.5655 42.93C26.6643 42.93 25.9322 42.198 25.9322 41.2967V36.245C25.9322 35.3438 26.6643 34.6117 27.5655 34.6117C28.4668 34.6117 29.1989 35.3438 29.1989 36.245V41.2967Z"
            fill="black"
          />
          <path
            d="M43.6332 41.2967V36.245C43.572 33.9 41.6207 32.0479 39.2728 32.1092C37.0124 32.1675 35.1953 33.9875 35.137 36.245V41.2967C35.1982 43.6417 37.1495 45.4938 39.4974 45.4325C41.7549 45.3742 43.5749 43.5571 43.6332 41.2967ZM41.0082 41.2967C41.0082 42.1979 40.2761 42.93 39.3749 42.93C38.4736 42.93 37.7415 42.1979 37.7415 41.2967V36.245C37.7415 35.3438 38.4736 34.6117 39.3749 34.6117C40.2761 34.6117 41.0082 35.3438 41.0082 36.245V41.2967Z"
            fill="black"
          />
          <path
            d="M51.1961 32.0071C48.854 32.0071 46.9553 33.9029 46.9495 36.245V41.2967C46.9495 43.6417 48.8511 45.5434 51.1961 45.5434C53.5411 45.5434 55.4428 43.6417 55.4428 41.2967V36.245C55.437 33.9029 53.5382 32.0071 51.1961 32.0071ZM52.8265 41.2967C52.7886 42.1979 52.0274 42.8979 51.1261 42.86C50.2774 42.825 49.5978 42.1454 49.5628 41.2967V36.245C49.6007 35.3438 50.362 34.6438 51.2632 34.6817C52.112 34.7167 52.7915 35.3963 52.8265 36.245V41.2967Z"
            fill="black"
          />
          <path
            d="M21.6707 50.3908C19.3257 50.3879 17.424 52.2837 17.4182 54.6287V59.6804C17.4182 62.0283 19.3228 63.93 21.6707 63.9271C24.0157 63.9271 25.9174 62.0254 25.9174 59.6804V54.6287C25.9115 52.2866 24.0128 50.3908 21.6707 50.3908ZM23.3011 59.6804C23.3011 60.5816 22.569 61.3137 21.6678 61.3137C20.7665 61.3137 20.0345 60.5816 20.0345 59.6804V54.6287C20.0345 53.7275 20.7665 52.9954 21.6678 52.9954C22.569 52.9954 23.3011 53.7275 23.3011 54.6287V59.6804Z"
            fill="black"
          />
          <path
            d="M33.4806 50.3908C31.1385 50.3937 29.2397 52.2866 29.2339 54.6287V59.6804C29.2339 62.0283 31.1356 63.93 33.4835 63.93C35.8314 63.93 37.7331 62.0283 37.7331 59.6804V54.6287C37.7272 52.2837 35.8256 50.3879 33.4806 50.3908ZM35.1168 59.6804C35.1168 60.5816 34.3847 61.3137 33.4835 61.3137C32.5822 61.3137 31.8501 60.5816 31.8501 59.6804V54.6287C31.8501 53.7275 32.5822 52.9954 33.4835 52.9954C34.3847 52.9954 35.1168 53.7275 35.1168 54.6287V59.6804Z"
            fill="black"
          />
          <path
            d="M45.2901 50.3909C42.948 50.3909 41.0493 52.2867 41.0435 54.6288V59.6805C41.0435 62.0255 42.948 63.9271 45.293 63.9242C47.638 63.9242 49.5368 62.0225 49.5368 59.6805V54.6288C49.531 52.2867 47.6322 50.3909 45.2901 50.3909ZM46.9235 59.6805C46.8855 60.5817 46.1243 61.2817 45.223 61.2438C44.3743 61.2088 43.6947 60.5292 43.6597 59.6805V54.6288C43.6976 53.7275 44.4589 53.0275 45.3601 53.0655C46.2089 53.1005 46.8885 53.78 46.9235 54.6288V59.6805Z"
            fill="black"
          />
          <path
            d="M62.4954 20.8683H4.45959C2.00375 20.8625 0.00583801 22.8487 4.67508e-06 25.3045C-0.00291199 27.3316 1.35917 29.105 3.31917 29.6183L9.47042 63.195C9.73584 66.9137 12.7488 69.8391 16.4733 69.9996H50.4875C54.2092 69.8391 57.2221 66.9108 57.4875 63.195L63.6388 29.6154C66.0158 28.9912 67.4363 26.5587 66.8121 24.1845C66.2958 22.2245 64.5225 20.8595 62.4954 20.8683ZM54.9121 62.7896C54.7808 65.2046 52.8967 67.1587 50.4875 67.3746H16.4733C14.0642 67.1558 12.18 65.1987 12.0546 62.7808L5.99084 29.7641H60.9671L54.9121 62.7896ZM62.4954 27.1479H4.45959C3.4475 27.1479 2.62792 26.3283 2.62501 25.3191C2.62501 24.307 3.44459 23.4875 4.45376 23.4845H62.4983C63.5104 23.4845 64.33 24.3041 64.33 25.3162C64.33 26.3283 63.5075 27.1479 62.4954 27.1479Z"
            fill="black"
          />
          <path
            d="M57.2425 10.7475C58.1584 9.58377 58.6571 8.14585 58.6542 6.66419C58.6513 2.98335 55.6705 0.00251994 51.9896 -0.000396729H14.9684C11.2904 0.00251994 8.30962 2.98335 8.3067 6.66127C8.30378 8.14294 8.79961 9.58085 9.71545 10.7446C6.38461 11.1646 3.88503 13.9967 3.88211 17.3538C3.87628 19.1621 4.6142 20.8946 5.92378 22.1429L6.05211 22.2654H10.5438V21.3904C8.31545 21.3904 6.50711 19.585 6.5042 17.3567C6.50128 15.1284 8.30961 13.32 10.5379 13.3171H10.5409H56.42C58.6484 13.3171 60.4567 15.1225 60.4596 17.3509C60.4596 19.5792 58.6542 21.3875 56.4259 21.3904H56.423V21.8279V22.2654H60.9146L61.043 22.1429C62.3496 20.8946 63.0875 19.1621 63.0846 17.3538C63.0788 13.9938 60.5763 11.1646 57.2425 10.7475ZM56.0263 6.66419C56.0234 8.89252 54.218 10.6979 51.9896 10.6979H14.9684C12.74 10.6979 10.9317 8.89252 10.9317 6.66127C10.9288 4.43294 12.7371 2.6246 14.9654 2.6246H51.9896C54.218 2.62752 56.0234 4.43294 56.0263 6.66419Z"
            fill="black"
          />
        </svg>
        <div class="flex flex-col justify-center items-center gap-[10px]">
          <h1 class="text-black text-[31px] font-semibold leading-[38px]">
            CH-525
          </h1>
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
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
            >
              <path
                d="M17.1892 18.9996V16.9996C17.1892 14.7905 15.3983 12.9996 13.1892 12.9996H5.18921C2.98007 12.9996 1.18921 14.7905 1.18921 16.9996V18.9996M13.1892 4.9996C13.1892 7.20874 11.3983 8.9996 9.18921 8.9996C6.98007 8.9996 5.18921 7.20874 5.18921 4.9996C5.18921 2.79046 6.98007 0.999603 9.18921 0.999603C11.3983 0.999603 13.1892 2.79046 13.1892 4.9996Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Gazi Mostofa Z.</span>
          </div>
          <div class="flex items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
            >
              <path
                d="M12.1892 0.999603V4.9996M6.18921 0.999603V4.9996M1.18921 8.9996H17.1892M17.1892 8.9996V16.9996C17.1892 18.1042 16.2938 18.9996 15.1892 18.9996H3.18921C2.08464 18.9996 1.18921 18.1042 1.18921 16.9996V4.9996C1.18921 3.89503 2.08464 2.9996 3.18921 2.9996H15.1892C16.2938 2.9996 17.1892 3.89503 17.1892 4.9996V8.9996Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Due: 29-12-2023</span>
          </div>

          <div
            class="flex py-[5px] px-[10px] justify-center items-center gap-10 rounded-[25px] bg-red-600 bg-opacity-20"
          >
            <div class="flex py-[5px] px-[15px] items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
              >
                <path
                  d="M1.86958 7.50877C1.95584 6.60306 2.71653 5.91137 3.62634 5.91137H12.5179C13.4277 5.91137 14.1884 6.60305 14.2747 7.50876L14.947 14.5676C15.0456 15.6036 14.2309 16.4996 13.1902 16.4996H2.95407C1.91335 16.4996 1.09865 15.6036 1.19732 14.5676L1.86958 7.50877Z"
                  fill="#F85A47"
                />
                <path
                  d="M4.54273 8.55843V5.02902C4.54273 3.07977 6.1229 1.4996 8.07214 1.4996C10.0214 1.4996 11.6015 3.07977 11.6015 5.02902V8.55843M2.95407 16.4996H13.1902C14.2309 16.4996 15.0456 15.6036 14.947 14.5676L14.2747 7.50876C14.1884 6.60305 13.4277 5.91137 12.5179 5.91137H3.62634C2.71653 5.91137 1.95584 6.60306 1.86958 7.50877L1.19732 14.5676C1.09865 15.6036 1.91335 16.4996 2.95407 16.4996Z"
                  stroke="#F85A47"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
          >
            <path
              d="M2.7031 2.5154L2.27254 1.20984C2.21699 1.05706 2.05032 0.97373 1.89754 1.0154C1.74476 1.07095 1.66143 1.23762 1.7031 1.3904L2.18921 2.8904C2.23088 3.0154 2.34199 3.09873 2.46699 3.09873H10.8698V4.84873H2.48088C2.3281 4.84873 2.18921 4.97373 2.17532 5.12651L1.18921 19.321C1.18921 19.4043 1.21699 19.4876 1.27254 19.5432C1.3281 19.5987 1.41143 19.6404 1.49476 19.6404H20.8559C20.9392 19.6404 21.0225 19.5987 21.0781 19.5432C21.1337 19.4876 21.1614 19.4043 21.1614 19.321L20.1753 5.12651C20.1753 4.97373 20.0364 4.84873 19.8698 4.84873H11.467V3.09873H19.8698C19.9948 3.09873 20.1198 3.0154 20.1475 2.8904L20.6337 1.3904C20.6892 1.23762 20.592 1.07095 20.4392 1.0154C20.2864 0.959841 20.1198 1.05706 20.0642 1.20984L19.6337 2.5154H2.7031ZM19.6059 5.45984L20.5503 19.0571H1.8281L2.77254 5.45984H19.6198H19.6059Z"
              fill="black"
              stroke="black"
              stroke-miterlimit="10"
            />
            <path
              d="M11.1877 17.9182C14.2988 17.9182 16.8405 15.3765 16.8405 12.2654C16.8405 9.15431 14.2988 6.61264 11.1877 6.61264C8.07658 6.61264 5.53491 9.15431 5.53491 12.2654C5.53491 15.3765 8.07658 17.9182 11.1877 17.9182ZM11.1877 7.20986C13.9794 7.20986 16.2432 9.47375 16.2432 12.2654C16.2432 15.0571 13.9794 17.321 11.1877 17.321C8.39602 17.321 6.13213 15.0571 6.13213 12.2654C6.13213 9.47375 8.39602 7.20986 11.1877 7.20986Z"
              fill="black"
              stroke="black"
              stroke-miterlimit="10"
            />
            <path
              d="M11.1873 12.5571C11.2845 12.5571 11.3817 12.5154 11.4373 12.4321L13.2706 9.72374C13.3678 9.58485 13.3262 9.4043 13.1873 9.30708C13.0484 9.20985 12.8678 9.25152 12.7706 9.39041L10.9373 12.0987C10.84 12.2376 10.8817 12.4182 11.0206 12.5154C11.0762 12.5571 11.1317 12.571 11.1873 12.571V12.5571Z"
              fill="black"
              stroke="black"
              stroke-miterlimit="10"
            />
          </svg>
          <span class="leading-5">Weight: --</span>
        </div>
      </section>
      <div class="w-[1px] h-[88px] bg-black bg-opacity-20"></div>
      <div class="flex items-center gap-[50px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="8"
          viewBox="0 0 42 8"
          fill="none"
        >
          <path
            d="M21 6.4996C22.3807 6.4996 23.5 5.38032 23.5 3.9996C23.5 2.61889 22.3807 1.4996 21 1.4996C19.6193 1.4996 18.5 2.61889 18.5 3.9996C18.5 5.38032 19.6193 6.4996 21 6.4996Z"
            fill="black"
          />
          <path
            d="M38.5 6.4996C39.8807 6.4996 41 5.38032 41 3.9996C41 2.61889 39.8807 1.4996 38.5 1.4996C37.1193 1.4996 36 2.61889 36 3.9996C36 5.38032 37.1193 6.4996 38.5 6.4996Z"
            fill="black"
          />
          <path
            d="M3.5 6.4996C4.88071 6.4996 6 5.38032 6 3.9996C6 2.61889 4.88071 1.4996 3.5 1.4996C2.11929 1.4996 1 2.61889 1 3.9996C1 5.38032 2.11929 6.4996 3.5 6.4996Z"
            fill="black"
          />
          <path
            d="M21 6.4996C22.3807 6.4996 23.5 5.38032 23.5 3.9996C23.5 2.61889 22.3807 1.4996 21 1.4996C19.6193 1.4996 18.5 2.61889 18.5 3.9996C18.5 5.38032 19.6193 6.4996 21 6.4996Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M38.5 6.4996C39.8807 6.4996 41 5.38032 41 3.9996C41 2.61889 39.8807 1.4996 38.5 1.4996C37.1193 1.4996 36 2.61889 36 3.9996C36 5.38032 37.1193 6.4996 38.5 6.4996Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.5 6.4996C4.88071 6.4996 6 5.38032 6 3.9996C6 2.61889 4.88071 1.4996 3.5 1.4996C2.11929 1.4996 1 2.61889 1 3.9996C1 5.38032 2.11929 6.4996 3.5 6.4996Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 1.9996L2 21.9996M2.00006 1.9996L22.0001 21.9996"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
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
          <div class="leading-5 text-[14px] flex gap-1">
            <b>Add-ons:</b>
            <span class="w-[334px]">
              Fabric Softener, OxiClean, Hang Dry, Delicates Hangers, Don’t mix
              bags
            </span>
          </div>
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
