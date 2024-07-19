<script lang="ts">
    import * as Card from "$lib/components/ui/card/";
    import * as Carousel from "$lib/components/ui/carousel/";
    import Autoplay from "embla-carousel-autoplay";
    import { onMount } from "svelte";
     import { Progress } from "$lib/components/ui/progress/index.js";
    import { fresh } from '../../routes/CheckOut/products/fresh/products'
    import { goto } from "$app/navigation";
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";

    const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

    function navigateToSocks(freshid: any) {
          goto(`CheckOut/products/fresh/${freshid}`);
      }


      function getFirstImageUrl(slide: any) {
        if (slide.type === 'image' && slide.urls && slide.urls.length > 0) {
            return slide.urls[0]; 
        } else {
            return slide.url; 
        }
    }



    let api: CarouselAPI;
    let count = 0;
    let current = 0;
  
    $: if (api) {
      count = api.scrollSnapList().length;
      current = api.selectedScrollSnap() + 1;
      api.on("select", () => {
        current = api.selectedScrollSnap() + 1;
      });
    }
  </script>
   


   <Carousel.Root bind:api plugins={[plugin]}

   on:mousenter={plugin.stop}
   on:mouseleave={plugin.reset} 
   class="w-3/4 mx-auto  my-28">

    <Carousel.Content class="-ml-1 ">
      {#each fresh as slide}
        <Carousel.Item class=" pl-4 md:basis-1/2 lg:basis-1/3">
          <button on:click={() => navigateToSocks(slide.id)}>   
            <Card.Root class='border-none bg-transparent  shadow-none'>
              <Card.Content>
              </Card.Content>
              {#if slide.type === 'image'}
                <div class=" h-96 flex flex-col justify-center items-center">
                  <img src={getFirstImageUrl(slide)} alt="" class="h-full object-cover">
                  <p class="text-center  mt-2 text-xl text-gray-900">{slide.name}</p>
                  <p class="text-center  mt-2 text-xl text-gray-900">{slide.price}</p>
                </div>
              {:else if slide.type === 'text'}
                <div class="rounded-2xl h-96 flex justify-center items-center">
                 
                </div>
              {/if}
            </Card.Root>
          </button>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
    <Progress value={current} max={6} class='h-1 my-10' />

  </Carousel.Root>
  
 
  <style>
    * {
         font-family: "Jura", sans-serif;
     }
   </style>