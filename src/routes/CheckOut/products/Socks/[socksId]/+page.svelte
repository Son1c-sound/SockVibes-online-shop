<script lang="ts">
  import supabase from "$lib/db";
  import { page } from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import DropIcon from "../../../../../lib/Icons/dropdwon.svelte";
  import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import Categ from '$lib/loading/categoryloading.svelte'
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";

  import  { quantity } from "../../../../types";
  import { increment } from "../../fresh/store";
  import Badge from "../../../../../lib/components/ui/badge/badge.svelte";
  import Loading from '$lib/loading/loading.svelte'

  let errorMessage: string = "";
  let items: any[] = [];
  let selectedProduct: any = null;
  let selectedQuantity = quantity[0].value;
  let load = true

  async function loadItems() {
    try {
      const { data, error } = await supabase.from("popularItems").select("*");

if (error) {
  errorMessage = `Error loading items: ${error.message}`;
  console.error(error);
} else {
  items = data;

  // Get the productId from the URL params
  const socksId = $page.params.socksId;

  // Set the selectedProduct based on the socksId
  selectedProduct =
    items.find((item) => item.id === parseInt(socksId)) || null;
}

    } catch {

    } finally {
      load = false
    }
      }

  // Fetch product data on mount
  onMount(() => {
    loadItems();
  });
  let max: number = 4;
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

  function addToCart() {
    if (!selectedProduct) return; // Check if selectedProduct is defined

    const cartItem = {
      name: selectedProduct.name,
      image: selectedProduct.img, // Default image
      price: selectedProduct.price,
      quantity: selectedQuantity,
      status: selectedProduct.status,
      description: selectedProduct.description,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add new item to cart
    cart.push(cartItem);
    toast.success("Added to Cart");

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Cart updated:", cart);
  }
</script>

{#if load }
  <Categ></Categ>
{:else}
<Toaster />

<!-- Product Details -->
<br />

<div class="flex flex-col mx-4 md:mx-20 md:flex-row md:space-x-8">

  <!-- Product Images -->
  <div class="w-full">
    <Carousel.Root bind:api class="w-full md:w-3/4 mx-auto my-10 md:my-28">
      <a href="/" class="text-blue-500 text-md underline">Go back</a>
      <Carousel.Content class="md:-ml-1">
        {#if selectedProduct}
          {#each [selectedProduct.img, selectedProduct.img2, selectedProduct.img3, selectedProduct.img4] as url, index}
            {#if url}
              <Carousel.Item class="flex-shrink-0 w-full" key={index}>
                <Card.Root class="border-none bg-transparent shadow-none">
                  <img
                    src={url}
                    alt={selectedProduct.name || "Product image"}
                    class="w-full h-64 object-cover lg:h-1/2"
                  />
                 
                </Card.Root>
              </Carousel.Item>
            {/if}
          {/each}
        {/if}
      </Carousel.Content>
      <div class="my-5 rounded-md">
        <h1 class="text-center my-2">{current}</h1>
        <Progress value={current} max={count} class="h-1" />
      </div>
    </Carousel.Root>
  </div>
  

  <!-- Selected Items -->
  <div class="w-full md:w-1/2 mt-4 md:mt-0">
    <br />
    <br />

    {#if !selectedProduct || selectedProduct.status === "Sold Out"}
    <p class="text-lg text-center">Item will be available soon</p>
    {:else if selectedProduct || selectedProduct.status === "In Stock"}
    <Button
      class="w-full  bg-yellow-300 hover:bg-yellow-400 text-black my-5 text-md"
      on:click={addToCart}
      on:click={increment}
    >
      Add to Cart
    </Button>
    {:else}
    <Loading></Loading>
{/if}
    <div class="my-5 p-6 border border-gradient-purple-blue">
      <h2 class="text-3xl mb-2 font-bold">{selectedProduct?.name}</h2>
      <div class="mb-2">
        <p class="text-2xl">{selectedProduct?.price}$</p>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button
              class="bg-white hover:bg-white mx-8 w-10 text-blue-600"
              builders={[builder]}
            >
              Free returns <DropIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-56">
            <DropdownMenu.Label>
              Return this item for free: <br />
              <span class="font-light">
                We offer easy, convenient returns for any item. <br />
                <span class="text-blue-500 font-bold">
                  Read more about our return policy
                </span>
              </span>
            </DropdownMenu.Label>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <hr class="mb-2" />
      <p class="text-gray-500">{selectedProduct?.description}</p>
      <br />
      <h1 class="text-gray-900 my-3 text-md">
        Qty
        <select bind:value={selectedQuantity}>
          {#each quantity as { value, label }}
            <option {value}>{label}</option>
          {/each}
        </select>
      </h1>
    </div>
    <div>
      <br />
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
    <br />
  </div>
</div>
{/if}
<style>
  * {
    font-family: "Inter", sans-serif;
  }
</style>
