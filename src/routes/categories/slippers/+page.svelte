<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import Loadcategory from '$lib/loading/categoryloading.svelte';
  import Sidebar from '$lib/cartSidebar/sidebar.svelte'
  import { onMount } from "svelte";
  import Swipe from "$lib/Icons/swipe.svelte";
  import { goto } from '$app/navigation';
  import supabase from "$lib/db";
  import type { Item } from '../../types';
  import toast, { Toaster } from "svelte-french-toast";

  let api: CarouselAPI;
  let count = 0;
  let current = 0;
  
  

  let items: Item[] = [];
  let errorMessage: string = '';
 
  let filterUni: Item[] = [];
  let hasMorePages: boolean = true;
  let loading = true;
  let page = 1;
  const pageSize = 15;

  async function loadItems() {
    try {
      const { data, error } = await supabase
        .from('slippers')
        .select("*")
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        errorMessage = `Error loading items: ${error.message}`;
      } else {
        items = data;
        
        scrollToTop();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      loading = false;
    }
  }

  async function loadNextPage() {
    page += 1;
    await loadItems();
  }

  async function loadPreviousPage() {
    if (page > 1) {
      page -= 1;
      await loadItems();
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addToCart(product: Item, quantity: number) {
    if (!product || quantity <= 0) return;

    if (product.storage <= 0) {
      toast.error("Item is sold out");
      return;
    }

    if (quantity > product.storage) {
      toast.error("Insufficient stock available");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.img,
      price: product.price,
      quantity,
      status: product.status,
      description: product.description,
      category: product.category,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex((item: { id: number; }) => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = quantity;
    } else {
      cart.push(cartItem);
    }

    toast.success("Added to Cart");
    localStorage.setItem("cart", JSON.stringify(cart));
  }  

  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on("select", () => {
      current = api.selectedScrollSnap() + 1;
    });
  }



  onMount(() => {
    loadItems();
  });
</script>

<Toaster/>
{#if loading}
  <Loadcategory></Loadcategory>

{:else}
  <body>
<br>
<br>
    <div class="mx-3 sm:mx-auto">
      <h1 class="text-center text-5xl p-2 rounded-md font-bold  text-gray-900">
        Slippers
      </h1>
    </div>

    <div class="flex flex-col items-center">
      <p class='text-center my-5'>Currently showing page {page}</p>
      <div class="flex justify-center space-x-2 ">
        <Button on:click={loadPreviousPage} disabled={page === 1}>Previous</Button>
        
        <Button on:click={loadNextPage} disabled={!hasMorePages}>Next page</Button>
    </div>

    <div class="my-3 flex justify-center space-x-4 mx-auto"></div>

    <div class="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 mx-auto max-w-screen-xl gap-4">
      {#each items as item}
        {#if item.img || item.img2 || item.img3 || item.img4}
          <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md hover:border-gray-900 hover:border-2">
            <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
              <button class="w-full p-1 rounded-md text-black" on:click={() => goto(`/categories/slippers/${item.id}`)}>
                <Carousel.Root class="my-4 w-full mx-auto max-w-full" bind:api>
                  <Carousel.Content>
                    {#if item.img}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}

                    {#if item.img2}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img2} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}

                    {#if item.img3}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img3} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}

                    {#if item.img4}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img4} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}
                  </Carousel.Content>
                </Carousel.Root>
              </button>
            </div>
            <div class="p-4 sm:p-6 flex flex-col justify-between h-64"> <!-- Fixed height for button container -->
              <div class="flex-grow">
                <div class="flex items-center justify-between mb-2">
                  <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.name}
                  </p>
                  <p class="text-black ml-2">{item.price}$</p>
                </div>
                {#if item.saleprecent > 0}
                  <Badge class='text-white rounded-none bg-red-600 my-2'>Sale {item.saleprecent}%</Badge>
                {/if}
                {#if item.newitem === 'yes'}
                  <Badge class='my-2 rounded-none bg-green-600'>New</Badge>
                {/if}
                {#if item.seller === 'yes'}
                  <Badge class='my-2 rounded-none bg-orange-700'>Best Seller</Badge>
                {/if}
                <p class="text-gray-600 my-2">Category: Unisex</p>
                {#if item.status !== 'Sold out'}
                  <p class="text-green-500 text-sm">{item.status}</p>
                {:else}
                  <p class="text-red-500 text-sm">{item.status}</p>
                {/if}
              </div>
              <div class="flex-shrink-0"> <!-- Button stays fixed -->
                <div class="flex flex-col items-center">
                  {#if item.storage !== 0}
                    <Button class='rounded-3xl w-full my-2' on:click={() => addToCart(item, 1)}>Add to Cart</Button>
                    <Sidebar></Sidebar>
                  {:else}
                    <Button class='rounded-3xl w-full my-2'>Item sold out</Button>
                  {/if}
                </div>
                
              </div>
            </div>
          </div>
        {/if}
      {/each}

      {#each filterUni as item}

        {#if item.img || item.img2 || item.img3 || item.img4}
    
          <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md">
            <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
              <button class="w-full p-1 rounded-md text-black" on:click={() => goto(`/categories/slippers/${item.id}`)}>
   
                <Carousel.Root class="my-4 w-full mx-auto max-w-full" bind:api>
                  <Carousel.Content>
                    {#if item.img}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}

                    {#if item.img2}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img2} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}

                    {#if item.img3}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img3} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}

                    {#if item.img4}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img4} class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}
                  </Carousel.Content>
                </Carousel.Root>
              </button>
       
            </div>
            <div class="p-4 sm:p-6 flex flex-col justify-between h-64"> <!-- Fixed height for button container -->
              <div class="flex-grow">
                <div class="flex items-center justify-between mb-2">
                  <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.name}
                  </p>
                  <p class="text-black ml-2">{item.price}$</p>
                </div>
                {#if item.saleprecent > 0}
                  <Badge class='text-white rounded-none bg-red-600 my-2'>Sale {item.saleprecent}%</Badge>
                {/if}
                {#if item.newitem === 'yes'}
                  <Badge class='my-2 rounded-none bg-green-600'>New</Badge>
                {/if}
                {#if item.seller === 'yes'}
                  <Badge class='my-2 rounded-none bg-orange-700'>Best Seller</Badge>
                {/if}
                <p class="text-gray-600 my-2">Category: Unisex</p>
                {#if item.status !== 'Sold out'}
                  <p class="text-green-500 text-sm">{item.status}</p>
                {:else}
                  <p class="text-red-500 text-sm">{item.status}</p>
                {/if}
              </div>
              <div class="flex-shrink-0"> <!-- Button stays fixed -->
                {#if item.status !== 'Sold out'}
                  <Button class='rounded-3xl w-full my-9' on:click={() => addToCart(item, 1)}>Add to Cart</Button>
               
                {/if}
              </div>
            </div>
          </div>
  
        {/if}
      {/each}
    </div>
    <p class='text-center my-5'>Currently showing page {page}</p>
    <div class="flex items-center justify-center">
   
      <div class="flex justify-center space-x-2 ">
        <Button on:click={loadPreviousPage} disabled={page === 1}>Previous</Button>
        
        <Button on:click={loadNextPage} disabled={!hasMorePages}>Next page</Button>
    </div>
  </body>
  <br>





<!-- End Sidebar -->

{/if}


