<script lang="ts">
  
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import Swipe from "$lib/Icons/swipe.svelte";
    import { goto } from '$app/navigation'
  import supabase from "$lib/db";
  import type { Item } from '../../types'
  import Categoryload from '$lib/loading/categoryloading.svelte'
  import { onMount } from 'svelte';

  let api: CarouselAPI;
  let count = 0;
  let current = 0;

  let items: Item[] = []
  let errorMessage: string = ''

  let loading = true
  let salefilter: Item[] = []

  
  async function loaditems() {
    try {
      const { data, error } = await supabase.from('allitems').select("*")

        if(error) {
          errorMessage = 'error'
        } else {
          items = data
          salefilter = items.filter(s => s.saleprecent > 0)

        }
    } catch (error) {
      console.log("error", error)
    } finally {
      loading = false
    }
    
  }

  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on("select", () => {
      current = api.selectedScrollSnap() + 1;
    });
  }
  onMount(() => {
    loaditems()
  })

</script>

{#if loading}
  <Categoryload></Categoryload>
{:else}


<body >
    


  <h1 class="text-gray-900 text-center my-9">Sock Vibes </h1>
  <div class="mx-3 sm:mx-auto ">
    <h1 class="text-center  text-5xl  p-2 rounded-md  text-gray-900 ">
      Items on Sale
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


{#each salefilter as item}
  {#if item.img || item.img2 || item.img3}
    <div class="relative flex flex-col bg-clip-border m-1 text-gray-900 rounded-md">
      <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-clip-border">
        <button class="w-full p-1 rounded-md text-black" on:click={() => goto(`/categories/Sales/${item.id}`)}>
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
            </Carousel.Content>
          </Carousel.Root>
        </button>
      </div>
      <div class="p-4 sm:p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {item.name}
          </p>
          <h1 class="text-md p-1 text-gray-800 rounded-md">{item.price}$</h1>
        </div>
        <p class="text-gray-600 my-2">Category: {item.category}</p>
        {#if item.new === 'yes'}
          <Badge class='my-2 rounded-none bg-green-600'>New</Badge>
        {/if}
        {#if item.saleprecent > 0}
          <div class="mx-auto">
            <Badge class='my-2 text-sm bg-red-600 rounded-none text-white text-center'>Sale {item.saleprecent}%</Badge>
          </div>
        {/if}
        {#if item.status !== 'In Stock'}
          <p class="text-red-500 text-sm">{item.status}</p>
        {:else}
          <p class="text-green-500 text-sm">{item.status}</p>
        {/if}
      </div>
    </div>
  {/if}
{/each}




</div>
</body>
{/if}
<style>
  h1 {
    font-family: "Sans", sans-serif;
    
    
  }


</style>