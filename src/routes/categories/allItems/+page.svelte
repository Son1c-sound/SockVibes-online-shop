<script lang="ts">

  import supabase from "$lib/db";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import PriceTag from "$lib/Icons/pricetag.svelte";
  import Swipe from "$lib/Icons/swipe.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from 'svelte';

  onMount(() => {
    // Check if the current URL matches the success URL
    const successUrl = 'http://localhost:5173/Success';

    if (window.location.href === successUrl) {
      // Handle the success scenario
      console.log('User has been redirected to the success page');
      // Add any other logic you want to execute on success
    }
  });
  import type {Item} from '../../types'

  let items: Item[] = [];
  let errorMessage:any = ''
  let filterNew: Item[] = [];
  let filterMan: Item[] = []
  let filterWoman: Item[] = []
  async function loadItems() {
  try {
    const { data, error } = await supabase
      .from("allitems")
      .select("*");

    if (error) throw error;
    items = data;
    filterNew = items.filter(item => item.category === 'Unisex');
    filterMan = items.filter(item => item.category === 'Men');
    filterWoman = items.filter(item => item.category === 'Women');
    loadSale()
  } catch (error) {
    errorMessage = `Error loading items:`;
  }
}

  async function loadSale() {
    const { data, error } = await supabase.from('sale').select("*")
    if( error) {
      errorMessage = 'erorr'
    } else {
      items = data
    }
    
  }
  loadItems()
 

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

<body class="text-white">

  <h1 class="text-gray-900 text-center my-9">Sock Vibes </h1>
  <div class="mx-3 sm:mx-auto ">
    <h1 class="text-center  text-5xl  p-2 rounded-md font-bold font-mono text-gray-900 ">
      All items 
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
{#each filterNew as item} 
  
<div
  class="relative flex flex-col bg-clip-border m-1 text-gray-900  rounded-md "
>
  <div
    class="relative mx-1 mt-4 overflow-hidden text-gray-700  bg-clip-border "
  >
  
  <button class="w-full  p-1 rounded-md text-black " on:click={() => goto(`/categories/newitems/${item.id}`)}>
    <Carousel.Root class=" my-4 w-full mx-auto max-w-full" bind:api>
      <Carousel.Content>
        
        <Carousel.Item>
          
          <div class="p-1">
            
            <Card.Root>
             

              <Card.Content
                class="flex aspect-square items-center justify-center p-4 sm:p-6"
              >
             
                <img
                  src={item.img}
                  class="w-full h-full object-cover text-2xl font-semibold"
                alt='item' />
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
                  src={item.img2}
                  class="w-full h-full object-cover text-4xl font-semibold"
                 alt='item'/>
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
                  src={item.img3}
                  class="w-full h-full object-cover text-4xl font-semibold"
                alt='item'/>
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
        class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900"
      > {item.name}
      

      </p>
      <p class="text-black ml-2">{item.price}$</p>
 
    </div>
    <p class="text-gray-600 my-2">Category: {item.category}</p>
    <Badge class='my-2 rounded-none bg-orange-700'>Best Seller</Badge>

    {#if item.status === 'Sold out'}
    <p class=' text-red-500 text-sm'>{item.status}</p>
      {:else}
      <p class='  text-green-500 text-sm'>{item.status}</p>
    {/if}
  </div>

  <div class="p-2 sm:p-1 pt-0">
    <Button class="w-full hover:bg-yellow-400  bg-yellow-300 text-black " on:click={() => goto(`/categories/newitems/${item.id}`)}>Purchase</Button>
  </div>
</div>

{/each}
   
{#each filterMan as item} 
  
<div
  class="relative flex flex-col bg-clip-border m-1 text-gray-900  rounded-md "
>
  <div
    class="relative mx-1 mt-4 overflow-hidden text-gray-700  bg-clip-border "
  >
  <button class="w-full  p-1 rounded-md text-black " on:click={() => goto(`/categories/men/${item.id}`)}>
    <Carousel.Root class=" my-4 w-full mx-auto max-w-full" bind:api>
      <Carousel.Content>
        <Carousel.Item>
          <div class="p-1">
            <Card.Root>
              <Card.Content
                class="flex aspect-square items-center justify-center p-4 sm:p-6"
              >
                <img
                  src={item.img}
                  class="w-full h-full object-cover text-2xl font-semibold"
                alt='item' />
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
                  src={item.img2}
                  class="w-full h-full object-cover text-4xl font-semibold"
                 alt='item'/>
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
                  src={item.img3}
                  class="w-full h-full object-cover text-4xl font-semibold"
                alt='item'/>
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
        class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900"
      > {item.name}
      
       
      </p>
      
         
      <p class="text-black ml-2">{item.price}$</p>
        
 
    </div>
    <p class="text-gray-600 my-2">Category: {item.category}</p>
    
    {#if item.status !== 'Sold out'}
    
    <p class=' text-green-500 text-sm'>{item.status}</p>
      {:else}
      <p class='  text-red-500 text-sm'>{item.status}</p>
    {/if}
  </div>

  <div class="p-2 sm:p-1 pt-0">
    <Button class="w-full hover:bg-yellow-400  bg-yellow-300 text-black " on:click={() => goto(`/categories/men/${item.id}`)}>Purchase</Button>
  </div>
</div>

{/each}
   
{#each filterWoman as item} 
  
<div
  class="relative flex flex-col bg-clip-border m-1 text-gray-900  rounded-md "
>
  <div
    class="relative mx-1 mt-4 overflow-hidden text-gray-700  bg-clip-border "
  >
  <button class="w-full  p-1 rounded-md text-black " on:click={() => goto(`/categories/woman/${item.id}`)}>
    <Carousel.Root class=" my-4 w-full mx-auto max-w-full" bind:api>
      <Carousel.Content>
        <Carousel.Item>
          <div class="p-1">
            <Card.Root>
              <Card.Content
                class="flex aspect-square items-center justify-center p-4 sm:p-6"
              >
                <img
                  src={item.img}
                  class="w-full h-full object-cover text-2xl font-semibold"
                alt='item' />
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
                  src={item.img2}
                  class="w-full h-full object-cover text-4xl font-semibold"
                 alt='item'/>
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
                  src={item.img3}
                  class="w-full h-full object-cover text-4xl font-semibold"
                alt='item'/>
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
        class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900"
      > {item.name}
      
       
      </p>
      
      <p class="text-black ml-2">{item.price}$</p>
        
      
 
    </div>
    <p class="text-gray-600 my-2">Category: {item.category}</p>
    
    {#if item.status !== 'Sold out'}
    <p class=' text-green-500 text-sm'>{item.status}</p>
      {:else}
      <p class='  text-red-500 text-sm'>{item.status}</p>
    {/if}
  </div>

  <div class="p-2 sm:p-1 pt-0">
    <Button class="w-full hover:bg-yellow-400  bg-yellow-300 text-black " on:click={() => goto(`/categories/woman/${item.id}`)}>Purchase</Button>
  </div>
</div>

{/each}
{#each items as item} 
 

<div
  class="relative flex flex-col bg-clip-border m-1 text-gray-900  rounded-md "
>


  <div
    class="relative mx-1 mt-4 overflow-hidden text-gray-700  bg-clip-border "
  >

  <button class="w-full  p-1 rounded-md text-black " on:click={() => goto(`/categories/Sales/${item.id}`)}>
    <Carousel.Root class=" my-4 w-full mx-auto max-w-full" bind:api>
      <Carousel.Content>
        <Carousel.Item>
          <div class="p-1">
            <Card.Root>
              <Card.Content
                class="flex aspect-square items-center justify-center p-4 sm:p-6"
              >
                <img
                  src={item.img}
                  class="w-full h-full object-cover text-2xl font-semibold"
                alt='item' />
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
                  src={item.img2}
                  class="w-full h-full object-cover text-4xl font-semibold"
                 alt='item'/>
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
                  src={item.img3}
                  class="w-full h-full object-cover text-4xl font-semibold"
                alt='item'/>
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
        class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900"
      > {item.name}
      
       
      </p>
      
      <h1 class="text-md  p-1  text-gray-800 rounded-md">{item.price}$</h1>
 
    </div>
    <p>Category: {item.category}</p>
    <div class="mx-auto ">
      <Badge class='my-2 text-sm bg-red-500 rounded-none text-white text-center'>Sale {item.sale}%</Badge>
     </div>

    {#if item.status !== 'In Stock'}
    <p class="text-red-500 text-sm">{item.status}</p>
    {:else}

    <p class="text-green-500 text-sm">{item.status}</p>

    {/if}
  </div>

  <div class="p-2 sm:p-1 pt-0">
    <Button class="w-full hover:bg-yellow-400  bg-yellow-300 text-black " on:click={() => goto(`/categories/Sales/${item.id}`)}>Purchase</Button>
  </div>
</div>

{/each}
   
  
  </div>
</body>

<style>
  h1 {
    font-family: sans-serif;
  
  }


</style>
