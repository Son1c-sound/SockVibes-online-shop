<script lang='ts'>
     import { onMount, onDestroy } from 'svelte';
    import Swiper from 'swiper';
    import 'swiper/swiper-bundle.css';
    import { Button } from "$lib/components/ui/button/";
    import  supabase  from '$lib/db'
    import Loading from '$lib/loading/loading.svelte';
  import { goto } from '$app/navigation';
    let swiperInstance:any;
    let interval:any;
    let loading = false;
    let errorMessage = "";
    let items:any[] = [];
    async function loadItems() {
    try {
      const { data, error } = await supabase.from("banners").select("*");
      if (error) {
        errorMessage = `Error loading items: ${error.message}`;
      } else {
        items = data;
      }
    } catch (error) {
      errorMessage = `Unexpected error:`;
      
    }
   
  }

    
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

  loadItems()
  </script>

 
<div class="w-full  relative">
    <div class="swiper default-carousel swiper-container ">
      <div class="swiper-wrapper">
        {#each items as slide}
          <div class="swiper-slide relative">
            <div class="h-96 lg:h-[650px] relative">
              <img src={slide.img} alt="" class="h-full w-full object-cover">
              <div class='absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center w-full'>
                <Button class='h-12 w-32 bg-white text-black text-md hover:text-gray-900 hover:bg-gray-200' on:click={() => goto('/categories/allItems')}>Shop Now</Button>
              </div>
            </div>
          </div>
        {/each}
      </div>
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
  