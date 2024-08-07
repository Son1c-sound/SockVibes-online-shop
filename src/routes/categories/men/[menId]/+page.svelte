<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import DropIcon from "../../../../lib/Icons/dropdwon.svelte";
  import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { quantity } from '../../../types';
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import supabase from "$lib/db";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import { addnumber, increment } from "../../../CheckOut/products/fresh/store";
  import Categ from '$lib/loading/categoryloading.svelte';
  import type { Item } from "../../../types";
  import { goto } from "$app/navigation";

  let selectedProduct: Item | null = null;
  let errorMessage = "";
  let items: Item[] = [];
  let selectedQuantity = quantity[0].value;
  let loading = true;

  // Generate quantity options based on storage
  $: availableQuantities = Array.from({ length: Math.min(20, selectedProduct?.storage || 0) }, (_, i) => i + 1);

  async function loaditems() {
    try {
      const { data, error } = await supabase.from("allitems").select("*");

      if (error) {
        errorMessage = `Error loading items: ${error.message}`;
        console.error(error);
      } else {
        items = data;
        const menId: string = $page.params.menId;
        selectedProduct = items.find((men) => men.id === parseInt(menId)) || null;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      loading = false;
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

  let showStatusBar: boolean = true;
  let showActivityBar: boolean = false;
  let showPanel: boolean = false;

  // Add to cart function
  function addToCart() {
    if (!selectedProduct || !selectedQuantity) return;

    if (selectedProduct.storage <= 0) {
        toast.error("Item is sold out");
        return;
    }

    // Ensure quantity does not exceed storage
    if (selectedQuantity > selectedProduct.storage) {
        toast.error("Insufficient stock available");
        return;
    }

    const cartItem = {
        id: selectedProduct.id, // Ensure each item has a unique ID
        name: selectedProduct.name,
        image: selectedProduct.img,
        price: selectedProduct.price,
        quantity: selectedQuantity,
        status: selectedProduct.status,
        description: selectedProduct.description,
        category: selectedProduct.category,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Find if the item already exists in the cart
    const existingItemIndex = cart.findIndex((item: { id: number; }) => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity = selectedQuantity;
    } else {
        // Add new item to cart
        cart.push(cartItem);
    }

    toast.success("Added to Cart");

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Cart updated:", cart);
}


  onMount(() => {
    loaditems();
  });
</script>

{#if loading}
  <Categ></Categ>
{:else}



<!-- Product Details -->
<br />
<br />
<br />

<a href="/categories/men" class="text-blue-600 underline">
  <i class="mx-6 fa-solid fa-chevron-left"></i>Go back to Men
</a>

{#if errorMessage}
  <p class="text-red-600">{errorMessage}</p>
{/if}

{#if selectedProduct}
  <div class="flex flex-col mx-4 md:mx-20 md:flex-row md:space-x-8">
    <!-- Product Images -->
    <div class="w-full">
      <Carousel.Root bind:api class="w-full md:w-3/4 mx-auto my-4 md:my-6">
        <Carousel.Content class="md:-ml-1">
          {#each [selectedProduct.img, selectedProduct.img2, selectedProduct.img3, selectedProduct.img4].filter(url => url) as url}
            <Carousel.Item class="flex-shrink-0 w-full">
              <Card.Root class="border-none bg-transparent shadow-none">
                <img
                  src={url}
                  alt={selectedProduct.name || "Product image"}
                  class="object-cover w-80 h-80 md:w-80 md:h-80 mx-auto"
                />
              </Card.Root>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <div class="my-3 rounded-md">
          <h1 class="text-center my-2">{current}</h1>
          <Progress value={current} max={count} class="h-1" />
        </div>
      </Carousel.Root>
    </div>

    <!-- Selected Items -->
    <div class="w-full md:w-1/2 mt-4 md:mt-0">
      {#if selectedProduct.storage === 0}
        <Button
          class="w-full bg-gray-300 text-black my-5 text-md"
          disabled
        >
          Item Sold Out
        </Button>
      {:else}
        {#if selectedProduct.storage <= 20}
          <p class='text-red-800'>Only {selectedProduct.storage} left in stock</p>
        {/if}
        <Button
          class="w-full bg-yellow-300 hover:bg-yellow-400 text-black my-4 text-md"
          on:click={addToCart}
      
        >
          Add to Cart
          
        </Button>
        <Button
        class="w-full bg-yellow-400 hover:bg-yellow-500 text-black  text-md"
        on:click={addToCart}
        on:click={() => goto('/Cart')}
      >
        Buy now
      </Button>
      {/if}

      <div class="p-6 my-4 border border-gradient-purple-blue">
        <h2 class="text-3xl mb-2 font-bold">{selectedProduct.name}</h2>
        <div class="mb-2">
          <p class="text-2xl">{selectedProduct.price}$</p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button class="bg-white hover:bg-white mx-8 w-10 text-blue-600">
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

        <p class="text-gray-500">{selectedProduct.description}</p>

        <br />
        <h1 class="text-gray-900 my-3 text-md ">
          Select Quantity
          <select  class="w-1/4 rounded-lg bg-gray-100 p-2" bind:value={selectedQuantity}> 
            {#each availableQuantities as qty}
              <option  value={qty}>{qty}</option>
            {/each}
          </select>
        </h1>
      </div>
      {#if selectedProduct.saleprecent > 0}
        <Badge class="bg-red-500 rounded-none">Limited time deal</Badge>
        <Badge class="bg-red-500 rounded-none">{selectedProduct.saleprecent}% Sale</Badge>
      {/if}

      <div>
        <br />
        <br />
        <hr />
        <br />
        <h1><span class="font-bold">Sold By:</span> Sock Vibes</h1>
        <h1><span class="font-bold">Ships From:</span> Sock Vibes</h1>
        <h1>
          <span class="font-bold">Store locations:</span>
          <span class="text-blue-700">Read more</span>
        </h1>
        <h1>
          <span class="font-bold">Return Policy:</span>
          <span class="text-blue-700">Read more</span>
        </h1>
        <br />
      </div>
      <br />
    </div>
  </div>
{:else}
  <p class="text-gray-500">Loading product details...</p>
{/if}
{/if}
