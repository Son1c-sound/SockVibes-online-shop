<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import Loadcategory from '$lib/loading/categoryloading.svelte';
  import Sidebar from '$lib/cartSidebar/sidebar.svelte';
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
  let filterNew: Item[] = [];
  let errorMessage: string = '';
  let filterMen: Item[] = [];
  let filterUni: Item[] = [];
  let filterwoman: Item[] = [];
  let hasMorePages: boolean = true;
  let loading = true;
  let page = 1;
  const pageSize = 13;

  async function loadItems() {
    try {
      const { data, error } = await supabase
        .from("allitems")
        .select("*")
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      items = data;
      filterNew = items.filter(item => item.category === 'Unisex');
      filterwoman = items.filter(item => item.category === 'Women');
      filterMen = items.filter(item => item.category === 'Men');
      filterUni = items.filter(item => item.category === 'Unisex'); // Changed from filterWomen to filterUni
      hasMorePages = data.length === pageSize;
      loadSlippers()
      scrollToTop();
    } catch (error:any) {
      errorMessage = `Error loading items: ${error.message}`;
    } finally {
      loading = false;
    }
  }


  async function loadSlippers() {
    try {
      const { data, error } = await supabase
        .from("slippers")
        .select("*")
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      items = data;
      hasMorePages = data.length === pageSize;
    } catch (error:any) {
      errorMessage = `Error loading items: ${error.message}`;
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

  function navigateToProductDetail(menId: any) {
    goto(`/categories/men/${menId}`);
  }

  onMount(() => {
    loadItems();
  });
</script>

<Toaster/>
{#if loading}
  <Loadcategory/>
{:else}


  <div>
 <br>
 <br>
    <div class="mx-3 sm:mx-auto">
      <h1 class="text-center text-5xl p-2 rounded-md font-bold text-gray-900">
        All Items
      </h1>
    </div>
    
    <p class='text-center my-5'>Currently showing page {page}</p>
    <div class="flex justify-center space-x-2 my-5">
      
      <Button on:click={loadPreviousPage} disabled={page === 1}>Previous</Button>
      
      <Button on:click={loadNextPage} disabled={!hasMorePages}>Next page</Button>
    </div>
    <div class="flex flex-col items-center">
 
    </div>

    <div class="my-3 flex justify-center space-x-4 mx-auto"></div>

    <div class="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 mx-auto max-w-screen-xl gap-4">
      {#each filterMen as item}
        {#if item.img || item.img2 || item.img3 || item.img4}
          <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md hover:border-gray-900 hover:border-2">
            <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
              <button class="w-full p-1 rounded-md text-black" on:click={() => navigateToProductDetail(item.id)}>
                <Carousel.Root class="my-4 w-full mx-auto max-w-full" bind:api>
                  <Carousel.Content>
                    {#if item.img}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                              <img src={item.img2} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                              <img src={item.img3} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                              <img src={item.img4} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}
                  </Carousel.Content>
                </Carousel.Root>
              </button>
            </div>
            <div class="p-4 sm:p-6 flex flex-col justify-between h-64">
              <div class="flex-grow">
                <div class="flex items-center justify-between mb-2">
                  
                  <p class="block font-sans sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.name}
                    
                  </p>
                  <p class="text-black ml-2">{item.price}$</p>
                  
                </div>
                <p class='text-gray-500'> Category:  {item.category}</p>
                {#if item.saleprecent > 0}
                  <Badge class='text-white rounded-none bg-red-600 my-2'>Sale {item.saleprecent}%</Badge>
                {/if}
              </div>
              {#if item.storage !== 0}
              <Button class='rounded-3xl w-full my-2' on:click={() => addToCart(item, 1)}>Add to Cart</Button>
              <Sidebar></Sidebar>
            {:else}
              <Button class='rounded-3xl w-full my-2'>Item sold out</Button>
            {/if}
            </div>
          </div>
        {/if}
      {/each}

      {#each filterUni as item}
        {#if item.img || item.img2 || item.img3 || item.img4}
          <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md hover:border-gray-900 hover:border-2">
            <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
              <button class="w-full p-1 rounded-md text-black" on:click={() => navigateToProductDetail(item.id)}>
                <Carousel.Root class="my-4 w-full mx-auto max-w-full" bind:api>
                  <Carousel.Content>
                    {#if item.img}
                      <Carousel.Item>
                        <div class="p-1">
                          <Card.Root>
                            <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                              <img src={item.img} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                              <img src={item.img2} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                              <img src={item.img3} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                              <img src={item.img4} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                            </Card.Content>
                          </Card.Root>
                        </div>
                      </Carousel.Item>
                    {/if}
                  </Carousel.Content>
                </Carousel.Root>
              </button>
            </div>
            <div class="p-4 sm:p-6 flex flex-col justify-between h-64">
              <div class="flex-grow">
                <div class="flex items-center justify-between mb-2">
                  
                  <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.name}
                    
                  </p>
                  <p class="text-black ml-2">{item.price}$</p>
                  
                </div>
                <p class='text-gray-500'> Category:   {item.category}</p>
                {#if item.saleprecent > 0}
                  <Badge class='text-white rounded-none bg-red-600 my-2'>Sale {item.saleprecent}%</Badge>
                {/if}
              </div>
              {#if item.storage !== 0}
              <Button class='rounded-3xl w-full my-2' on:click={() => addToCart(item, 1)}>Add to Cart</Button>
              <Sidebar></Sidebar>
            {:else}
              <Button class='rounded-3xl w-full my-2'>Item sold out</Button>
            {/if}
            </div>
          </div>
        {/if}
      {/each}


      {#each filterwoman as item}
      {#if item.img || item.img2 || item.img3 || item.img4}
        <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md hover:border-gray-900 hover:border-2">
          <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
            <button class="w-full p-1 rounded-md text-black" on:click={() => goto(`/categories/woman/${item.id}`)}>
              <Carousel.Root class="my-4 w-full mx-auto max-w-full" bind:api>
                <Carousel.Content>
                  {#if item.img}
                    <Carousel.Item>
                      <div class="p-1">
                        <Card.Root>
                          <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                            <img src={item.img} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                            <img src={item.img2} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                            <img src={item.img3} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                            <img src={item.img4} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                          </Card.Content>
                        </Card.Root>
                      </div>
                    </Carousel.Item>
                  {/if}
                </Carousel.Content>
              </Carousel.Root>
            </button>
          </div>
          <div class="p-4 sm:p-6 flex flex-col justify-between h-64">
            <div class="flex-grow">
              <div class="flex items-center justify-between mb-2">
                <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {item.name}
                </p>
                <p class="text-black ml-2">{item.price}$</p>
              </div>
              <p class='text-gray-500'> Category:   {item.category}</p>
              {#if item.saleprecent > 0}
                <Badge class='text-white rounded-none bg-red-600 my-2'>Sale {item.saleprecent}%</Badge>
              {/if}
            </div>
            {#if item.storage !== 0}
            <Button class='rounded-3xl w-full my-2' on:click={() => addToCart(item, 1)}>Add to Cart</Button>
            <Sidebar></Sidebar>
          {:else}
            <Button class='rounded-3xl w-full my-2'>Item sold out</Button>
          {/if}
          </div>
        </div>
      {/if}
    {/each}
   
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
                        <img src={item.img} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                        <img src={item.img2} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                        <img src={item.img3} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
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
                        <img src={item.img4} loading="lazy" class="w-full h-full object-cover text-2xl font-semibold" alt="item" />
                      </Card.Content>
                    </Card.Root>
                  </div>
                </Carousel.Item>
              {/if}
            </Carousel.Content>
          </Carousel.Root>
        </button>
      </div>
      <div class="p-4 sm:p-6 flex flex-col justify-between h-64">
        <div class="flex-grow">
          <div class="flex items-center justify-between mb-2">
            <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              {item.name}
              
            </p>
          
            <p class="text-black ml-2">{item.price}$</p>
          </div>
          <p class="text-gray-500">Category: Unisex</p>
          {#if item.saleprecent > 0}
            <Badge class='text-white rounded-none bg-red-600 my-2'>Sale {item.saleprecent}%</Badge>
          {/if}
        </div>
        {#if item.storage !== 0}
        <Button class='rounded-3xl w-full my-2' on:click={() => addToCart(item, 1)}>Add to Cart</Button>
        <Sidebar></Sidebar>
      {:else}
        <Button class='rounded-3xl w-full my-2'>Item sold out</Button>
      {/if}
      </div>
    </div>
  {/if}
{/each}
    </div>
    <p class='text-center my-5'>Currently showing page {page}</p>
    <div class="flex justify-center space-x-2 my-5">
      <Button on:click={loadPreviousPage} disabled={page === 1}>Previous</Button>
      
      <Button on:click={loadNextPage} disabled={!hasMorePages}>Next page</Button>
    </div>
  </div>
{/if}


