<!-- ProductDetail.svelte -->

<script lang="ts">
  import { page } from "$app/stores";
  import { fresh } from "../products"; // Importing products from external file
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { Progress } from "$lib/components/ui/progress/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import DropIcon from '../../../../../lib/Icons/dropdwon.svelte'
    import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
    import { quantity } from "../products";
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import LoaderCircle from "lucide-svelte/icons/loader-circle";

    import { addnumber, increment } from '../store';


  const freshId: any = $page.params.freshId;



  const selectedProduct = fresh[freshId - 1];
  const qty = quantity[freshId - 1]

 

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




  let showStatusBar:boolean = true;
  let showActivityBar:boolean = false;
  let showPanel:boolean = false;

  // localstorage test 
  let selectedQuantity = quantity[0].value;
  function addToCart() {
    if (!selectedProduct && !qty ) return; // Check if selectedProduct is defined

    const cartItem = {
      name: selectedProduct.name,
      image: selectedProduct.urls[0], 
      price: selectedProduct.price, 
      quantity: selectedQuantity,
      status: selectedProduct.status,
      description: selectedProduct.description
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Add new item to cart
    cart.push(cartItem);
    toast.success("Added to Cart")

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Cart updated:', cart);
  }
</script>
<Toaster />

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
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button class='bg-white hover:bg-white mx-8 w-10 text-blue-600' builders={[builder]}>Free returns     <DropIcon></DropIcon>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content class="w-56">   
              <DropdownMenu.Label>Return this item for free: <br> <span class="font-light">We offer easy, convenient returns for any item. <br> <span class="text-blue-500 font-bold"> Read more about our return policy </span>
               </span>
                
            </DropdownMenu.Label>


            </DropdownMenu.Content>
          </DropdownMenu.Root>
      </div>

      <hr class="mb-2" />

      <p class="text-gray-500">{selectedProduct.description}</p>
      <br />
      <h1 class="text-gray-900 my-3 text-md">Qty<select bind:value={selectedQuantity}>
        {#each quantity as { value, label }}
          <option value={value}>{label}</option>
        {/each}
      </select>
    </div>
    <div>
      <Button class="w-full bg-yellow-300 hover:bg-yellow-400 text-black my-5 text-md" on:click={addToCart} on:click={increment} >Add to Cart</Button>

      

      <Button class=" w-full text-md  bg-white text-black hover:text-gray-900 hover:bg-yellow-400 border border-yellow-400">Buy now</Button>
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