<!-- ProductDetail.svelte -->

<script lang="ts">
  import { page } from "$app/stores";
  import { Item } from "$lib/components/ui/carousel";
  import { braclets } from "../products"; // Importing products from external file
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress/index.js";

  // Get the productId from the URL params
  const footerId: any = $page.params.footerId;

  // Ensure productId is within valid range

  const selectedProduct: any = braclets[footerId - 1];

  const quanitity = [
    { value: "one", label: "1" },
    { value: "two", label: "2" },
    { value: "three", label: "3" },
    { value: "four", label: "4" },
    { value: "five", label: "5" },
  ];

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

<!-- Checkout.svelte -->

<!-- Checkout.svelte -->
<br />
<br />
<br />
<div class="flex flex-col mx-4 md:mx-20 md:flex-row md:space-x-8">
    <!-- Product Images -->
    <div class="w-full">
      <div class="">
        <Carousel.Root bind:api class="w-full md:w-3/4 mx-auto my-10 md:my-28">
          <Carousel.Content class="md:-ml-1">
            <Carousel.Item class="flex-shrink-0 w-full">
              <Card.Root class="border-none bg-transparent shadow-none">
                <img src={selectedProduct.urls[0]} alt={selectedProduct.name} class="w-full h-64 object-cover lg:h-1/2">
              </Card.Root>
            </Carousel.Item>
            <Carousel.Item class="flex-shrink-0 w-full">
              <Card.Root class="border-none bg-transparent shadow-none">
                <img src={selectedProduct.urls[1]} alt={selectedProduct.name} class="w-full h-64  lg:h-1/2 object-cover">
              </Card.Root>
            </Carousel.Item>
            <Carousel.Item class="flex-shrink-0 w-full">
              <Card.Root class="border-none bg-transparent shadow-none">
                <img src={selectedProduct.urls[2]} alt={selectedProduct.name} class="w-full h-64 lg:h-1/2 object-cover">
              </Card.Root>
            </Carousel.Item>
            <Carousel.Item class="flex-shrink-0 w-full">
              <Card.Root class="border-none bg-transparent shadow-none">
                <img src={selectedProduct.urls[3]} alt={selectedProduct.name} class="w-full h-64 lg:h-1/2 object-cover">
              </Card.Root>
            </Carousel.Item>
          </Carousel.Content>
          <div class="my-5  rounded-md ">
                <h1 class="text-center my-2">{current}</h1>       
            <Progress value={current} max={4} class='h-1'/>
          </div>
        </Carousel.Root>
      </div>
    </div>

  

  <!-- Selected Items -->
  <div class="w-full md:w-1/2 mt-4 md:mt-0">
    <div class="p-6 border border-gradient-purple-blue">
      <h2 class="text-3xl mb-2 font-bold">{selectedProduct.name}</h2>
      <div class="mb-2">
        <p class="text-2xl ">{selectedProduct.price}</p>
      </div>

      <hr class="mb-2" />

      <p class="text-gray-500">{selectedProduct.description}</p>
      <br />
      <h1 class="text-green-600 my-3 text-lg">{selectedProduct.status}</h1>
      <Select.Root>
        <Select.Trigger class="w-[80px] border-gray-400">            
          <Select.Value placeholder="Qty 1" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each quanitity as number}
              <Select.Item value={number.value} label={number.label}
                >{number.label}</Select.Item
              >
            {/each}
          </Select.Group>
     

        </Select.Content>
        <Select.Input name="quantity" />
       

      </Select.Root>
    </div>
    <div>
      <Button class="w-full bg-blue-600 text-white  my-5 text-md ">Add to Cart</Button>
      <Button class=" w-full text-md   text-gray-900 bg-yellow-400 hover:text-gray-900 hover:bg-gray-200">Buy now</Button>
      <br>
      <br />
      <hr />
      <br />
      <h1><span class="font-bold">Sold By:</span> Sock Vibes</h1>
      <h1><span class="font-bold">Ships From:</span> Sock Vibes</h1>
      <h1>
        <span class="font-bold">Store locations:</span>
        <span class="text-blue-700"> Read more </span>
      </h1>
      <h1>
        <span class="font-bold">Return Policy:</span>
        <span class="text-blue-700"> Read more </span>
      </h1>
      <br />


    </div>

    <br>
  </div>
</div>


<style>
  * {
    font-family: "Inter", sans-serif;
  }
</style>
