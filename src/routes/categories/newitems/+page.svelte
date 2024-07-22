<script lang="ts">
  import { newItems } from "./products";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import PriceTag from "$lib/Icons/pricetag.svelte";
  import Swipe from "$lib/Icons/swipe.svelte";
  import { goto } from "$app/navigation";
  import { Item } from "$lib/components/ui/dropdown-menu";

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

  function navigateToProductDetail(newItemsId: any) {
    goto(`/categories/newitems/${newItemsId}`);
  }
</script>

<body class="text-white">

  <h1 class="text-gray-900 text-center my-9">Sock Vibes </h1>
  <div class="mx-3 sm:mx-auto ">
    <h1 class="text-center  text-5xl  p-2 rounded-md font-bold font-mono text-gray-900 ">
      Newest Items
    </h1>
  </div>
    
  <div class="flex flex-col items-center ">
    <h1 class="text-center mb-3 text-gray-900">Swipe Pictures to preview items</h1>
    <div class="flex">
      <Swipe />
    </div>
  </div>
  <br>

  <div
    class="text-white my-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-auto max-w-screen-xl"
  >
    {#each newItems as item}
      <div
        class="text-white relative flex flex-col bg-clip-border m-1 rounded-md"
      >
        <div
          class="relative mx-1 mt-4 overflow-hidden text-gray-900 bg-clip-border"
        >
        <button
        class="w-full  border rounded-lg border-yellow-300 text-white hover:bg-yellow-500"
        on:click={() => navigateToProductDetail(item.id)}>
          <Carousel.Root class=" w-full mx-auto max-w-full" bind:api>
            <Carousel.Content>
              <Carousel.Item>
                <div class="p-1">
                  <Card.Root class='rounded-md'>
                    <div class="flex items-center">
                      <PriceTag />
                      <p class="text-black ml-2">{item.price}</p>
                    </div>

                    <Card.Content
                      class="flex aspect-square items-center justify-center p-2 sm:p-6 "
                    >
                      <img
                        src={item.urls[0]}
                        class="w-full h-full object-cover text-2xl font-semibold "
                        alt="item"
                      />
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div class="p-1">
                  <Card.Root>
                    <div class="flex items-center">
                      <PriceTag />
                      <p class="text-black ml-2">{item.price}</p>
                    </div>
                    <Card.Content
                      class="flex aspect-square items-center justify-center p-4 sm:p-6"
                    >
                      <img
                        src={item.urls[1]}
                        class="w-full h-full object-cover text-4xl font-semibold"
                        alt="item"
                      />
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div class="p-1">
                  <Card.Root>
                    <div class="flex items-center">
                      <PriceTag />
                      <p class="text-black ml-2">{item.price}</p>
                    </div>

                    <Card.Content
                      class="flex aspect-square items-center justify-center p-4 sm:p-6"
                    >
                      <img
                        src={item.urls[2]}
                        class="w-full h-full object-cover text-4xl font-semibold"
                        alt="item"
                      />
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            </Carousel.Content>
          </Carousel.Root>
          </button>
        </div>
        <div class="p-4 sm:p-6">
          <div class="flex items-center justify-between mb-2">
            <p
              class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-gray-900"
            >
              {item.name}
            </p>
            <p
              class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-yellow-gray-900"
            >
              <Badge class="bg-green-500 text-gray-100 rounded-md">New</Badge>
            </p>
          </div>
          <p class="text-gray-800 my-2">Category: {item.category}</p>
          <p class="text-green-500 my-5 "> {item.status}</p>
        </div>
       

  
        <div class="p-2 sm:p-1 pt-0">
          <Button
            class="w-full bg-yellow-300 border border-yellow-300 hover:bg-yellow-500 text-black"
            on:click={() => navigateToProductDetail(item.id)}>Check Item</Button
          >
        </div>
      </div>
    {/each}
  </div>
</body>

<style>
  h1 {
    font-family: sans-serif;
    font-weight: bold;
  }


</style>
