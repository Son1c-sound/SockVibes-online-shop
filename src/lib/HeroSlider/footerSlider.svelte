<script lang="ts">
  import { goto } from "$app/navigation";
    import * as Card from "$lib/components/ui/card/";
    import * as Carousel from "$lib/components/ui/carousel/";
    import Autoplay from "embla-carousel-autoplay";
    import { other } from "../../routes/CheckOut/products/other/products";
    import { Progress } from "$lib/components/ui/progress/index.js";
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";

    
    function navigateToProductDetail(otherId: any) {
        goto(`CheckOut/products/other/${otherId}`);
    }


    
  const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

  function getFirstImageUrl(product:any) {
    if (product.type === 'image' && product.urls && product.urls.length > 0) {
      return product.urls[0]; // Return the first URL from urls array
    } else {
      return product.url; // Return the single URL if there's no urls array
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
   <h1 class="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-blue-700 to-gray-500 text-transparent bg-clip-text italic">Braclet Collections</h1>

   <br>
    <Carousel.Content class="-ml-1 bg-transparent border-none outline-none shadow-none">
      {#each other as product}
        <Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/4 bg-transparent border-none shadow-none ">
          <button on:click={() => navigateToProductDetail(product.id)}>
                
            <Card.Root class='border-none bg-transparent outline-none shadow-none'>
              <Card.Content class='border-none bg-transparent shadow-none outline-none'>
              </Card.Content>
              {#if product.type === 'image'}
                <div class=" h-96 flex flex-col justify-center items-center">
                  <img src={getFirstImageUrl(product)} alt="" class="h-full  object-cover">
                  <p class="text-center  mt-2 p-2 text-xl text-gray-900">{product.name}</p>
                  <p class="text-center  mt-2 text-xl text-gray-900">{product.price}</p>
                </div>
              {:else if product.type === 'text'}
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
    <Progress value={current} max={4} class='h-1 my-10 ' />
  </Carousel.Root>
  
 
  <style>
   * {
        font-family: "Jura", sans-serif;
    }
  </style>