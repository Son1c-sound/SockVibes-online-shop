<script lang='ts'>
     import { onMount, onDestroy } from 'svelte';
    import Swiper from 'swiper';
    import 'swiper/swiper-bundle.css';
    import { Button } from "$lib/components/ui/button/";

    let swiperInstance:any;
    let interval:number;
    
    let slides = [
      { type: 'image', url: 'https://i.ibb.co/nwstfbf/Adobe-Stock-559145847.jpg' },
      { type: 'image', url: 'https://i.ibb.co/M5RQvM7/5fQUPDl.jpg' },
      { type: 'image', url: 'https://i.ibb.co/yPkqnCk/1350069.jpg' },
      { type: 'image', url: 'https://i.ibb.co/WyShy4h/3840x2160-uhd-4k-desktop-uc88j9mya6pyagua.jpg' },
      { type: 'image', url: 'https://i.ibb.co/8z2cCWv/blue-purple-beautiful-scenery-ultra-hd-wallpaper-4k-sr10012421-1706505497434-cover.webp' },
      { type: 'image', url: 'https://i.ibb.co/M5RQvM7/5fQUPDl.jpg' }
    ];
    
    onMount(() => {
      swiperInstance = new Swiper(".default-carousel", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      
      interval = setInterval(() => {
      swiperInstance.slideNext();
    }, 3000);
  });
  

  onDestroy(() => {
    clearInterval(interval);
  });
  </script>
<div class="w-full  relative">
    <div class="swiper default-carousel swiper-container ">
      <div class="swiper-wrapper">
        {#each slides as slide}
          <div class="swiper-slide relative">
            <div class="h-96 lg:h-[650px] relative">
              <img src={slide.url} alt="" class="h-full w-full object-cover">
              <div class='absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center w-full'>
                <Button class='h-12 w-32 bg-white text-black text-md hover:text-gray-900 hover:bg-gray-200'>Shop Now</Button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="flex justify-center items-center text-black">
        <p class="flex items-center">Swipe to see more 
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M473-80q-24 0-46-9t-39-26L184-320l30-31q16-16 37.5-21.5t42.5.5l66 19v-327q0-17 11.5-28.5T400-720q17 0 28.5 11.5T440-680v433l-97-27 102 102q5 5 12.5 8.5T473-160h167q33 0 56.5-23.5T720-240v-160q0-17 11.5-28.5T760-440q17 0 28.5 11.5T800-400v160q0 66-47 113T640-80H473Zm7-280v-160q0-17 11.5-28.5T520-560q17 0 28.5 11.5T560-520v160h-80Zm120 0v-120q0-17 11.5-28.5T640-520q17 0 28.5 11.5T680-480v120h-80ZM80-680q30-106 142-173t258-67q94 0 181 31t159 90v-81h60v200H680v-60h116q-66-58-147-89t-169-31q-118 0-208.5 48T143-680H80Zm500 400Z"/>
          </svg>
        </p>
      </div>
  </div>
  
  
  <style>
    .swiper-wrapper {
      width: 100%;
      height: max-content !important;
      padding-bottom: 64px !important;
      -webkit-transition-timing-function: linear !important;
      transition-timing-function: linear !important;
      position: relative;
    }
    .swiper-pagination-bullet {
      background: #000000;
    }
    .swiper-button-prev, .swiper-button-next {
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }
  </style>
  