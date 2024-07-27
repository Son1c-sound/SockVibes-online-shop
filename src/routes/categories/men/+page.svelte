<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import Loadcategory from '$lib/loading/categoryloading.svelte'
  import { onMount } from "svelte";
  import Swipe from "$lib/Icons/swipe.svelte";
  import { goto } from '$app/navigation'
  import supabase from "$lib/db";
  let api: CarouselAPI;
  let count = 0;
  let current = 0;

  import type { Item } from '../../types'

  let items: Item[] = []
  let errorMessage: string = ''
  let filterMen: Item[] = []
  let filterUni: Item[] = []
  let hasMorePages:boolean = true;

  let loading = true
  let page = 1;
  const pageSize = 20; 
  async function loadItems() {
    try {
      const { data, error } = await supabase
    .from('allitems')
    .select("*")
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) {
    errorMessage = `Error loading items: ${error.message}`;
  } else {
    items = data;
    filterMen = items.filter(men => men.category === 'Men');
    filterUni = items.filter(u => u.category === 'Unisex');
    
    hasMorePages = data.length === pageSize;
    scrollToTop()
     }

    } catch (error) {
      console.log("error", error)
    } finally {
      loading = false
    }
  }
async function loadNextPage() {
  page += 1;
  await loadItems();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Function to load the previous page
async function loadPreviousPage() {
  if (page > 1) {
    page -= 1;
    await loadItems();
  }
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
      loadItems()
  });
   

</script>


{#if loading}
<Loadcategory></Loadcategory>

{:else}
<body >
    
<!-- Pagination Controls -->


  <h1 class="text-gray-900 text-center my-9">Sock Vibes </h1>
  <div class="mx-3 sm:mx-auto ">
    <h1 class="text-center  text-5xl  p-2 rounded-md font-bold font-mono text-gray-900 ">
      Items in men category
    </h1>
  </div>

  
  <div class="flex flex-col items-center ">
    <h1 class="text-center mb-3 ">Swipe Pictures to preview items</h1>
    <div class="flex">
      <Swipe />
    </div>
  </div>
 
  
  <div class="my-3 flex justify-center space-x-4 mx-auto">      

  </div>
  

<div
  class=" my-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-auto max-w-screen-xl "
>
{#each filterMen as item}
  {#if item.img || item.img2 || item.img3 || item.img4}
    <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md">
      <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
        <button class="w-full p-1 rounded-md text-black" on:click={() => navigateToProductDetail(item.id)}>
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
      <div class="p-4 sm:p-6">
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
        <p class="text-gray-600 my-2">Category: {item.category}</p>
        {#if item.status !== 'Sold out'}
          <p class="text-green-500 text-sm">{item.status}</p>
        {:else}
          <p class="text-red-500 text-sm">{item.status}</p>
        {/if}
      </div>
    </div>
  {/if}
{/each}

{#each filterUni as item}
  {#if item.img || item.img2 || item.img3 || item.img4}
    <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md">
      <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
        <button class="w-full p-1 rounded-md text-black" on:click={() => goto(`/categories/unisex/${item.id}`)}>
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
      <div class="p-4 sm:p-6">
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
        <p class="text-gray-600 my-2">Category: {item.category}</p>
        {#if item.status !== 'Sold out'}
          <p class="text-green-500 text-sm">{item.status}</p>
        {:else}
          <p class="text-red-500 text-sm">{item.status}</p>
        {/if}
      </div>
    </div>
  {/if}
{/each}



</div>
<div class="my-5 mx-auto text-center pagination-controls">
  <div class="pagination-controls">
    <Button on:click={loadPreviousPage} disabled={page === 1}><i class="fa-solid fa-angle-left mx-1"></i>Previous Page</Button>
    <Button on:click={loadNextPage} disabled={!hasMorePages}>Next Page <i class="ml-1 fa-solid fa-angle-right"></i></Button>
  </div>
</div>

</body>

{/if}
<style>
  h1 {
    font-family: "Sans", sans-serif;
  
    
  }


</style>
