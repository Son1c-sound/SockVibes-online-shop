<script lang="ts">
  import { woman } from "./products";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.ts";
  import * as Carousel from "$lib/components/ui/carousel/index.ts";
  import { Progress } from "$lib/components/ui/progress/";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.ts";
  import { Badge } from "$lib/components/ui/badge/index.js";

  import Swipe from "$lib/Icons/swipe.svelte";
    import { goto } from '$app/navigation'

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
     
     function navigateToProductDetail(womanId: any) {
        goto(`/categories/woman/${womanId}`);
    }   

 

</script>


<div class="mx-4 sm:mx-auto  sm:w-2/6">
  <h1 class="text-center my-8 sm:my-16 text-lg sm:text-xl p-2 rounded-md font-bold font-mono text-white bg-gradient-to-r from-pink-500 to-blue-500">
    Woman Categories
  </h1>
</div>

<div class="flex flex-col items-center ">
  <h1 class="text-center mb-3 ">Swipe Pictures to preview items</h1>
  <div class="flex">
    <Swipe />
  </div>
</div>

<div
  class=" my-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-auto max-w-screen-xl "
>
  {#each woman as item} 
    <div
      class="relative flex flex-col bg-clip-border m-1 text-gray-900  rounded-md"
    >
      <div
        class="relative mx-1 mt-4 overflow-hidden text-gray-700  bg-clip-border "
      >
    
        <Carousel.Root class=" my-4 w-full mx-auto max-w-full" bind:api>
          <Carousel.Content>
            <Carousel.Item>
              <div class="p-1">
                <Card.Root>
                  <Card.Content
                    class="flex aspect-square items-center justify-center p-4 sm:p-6"
                  >
                    <img
                      src={item.urls[0]}
                      class="w-full h-full object-cover text-2xl font-semibold"
                    />
                  </Card.Content>
                </Card.Root>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="p-1">
                <Card.Root>
                  <Card.Content
                    class="flex aspect-square items-center justify-center p-4 sm:p-6"
                  >
                    <img
                      src={item.urls[1]}
                      class="w-full h-full object-cover text-4xl font-semibold"
                    />
                  </Card.Content>
                  
                </Card.Root>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="p-1">
                <Card.Root>
                  <Card.Content
                    class="flex aspect-square items-center justify-center p-4 sm:p-6"
                  >
                    <img
                      src={item.urls[2]}
                      class="w-full h-full object-cover text-4xl font-semibold"
                    />
                  </Card.Content>
                </Card.Root>
              </div>
            </Carousel.Item>
            
          </Carousel.Content>

        </Carousel.Root>
      </div>
      <div class="p-4 sm:p-6">
        <div class="flex items-center justify-between mb-2">
          <p
            class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900"
          > {item.name}
           
          </p>
          <p
            class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900"
          ><Badge class='bg-yellow-300 text-black rounded-md'>{item.price}</Badge>
            
          </p>
        </div>
        <p class="text-gray-600 my-2">Category: {item.category}</p>
        <p class="text-green-500">{item.status}</p>
      </div>

      <div class="p-2 sm:p-1 pt-0">
        <Button class="w-full bg-yellow-300 text-black hover:bg-yellow-400" on:click={() => navigateToProductDetail(item.id)}>Purchase</Button>
      </div>
    </div>
  {/each}
</div>

<style>
  h1 {
    font-family: "Jura", sans-serif;
    font-weight: bold;
    
  }
</style>
