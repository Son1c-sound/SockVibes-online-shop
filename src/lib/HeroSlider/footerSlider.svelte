<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
   import * as Card from "$lib/components/ui/card/";
   import * as Carousel from "$lib/components/ui/carousel/";
   import supabase from "$lib/db";
   
   import Autoplay from "embla-carousel-autoplay";
 
   import { goto } from "$app/navigation";
   import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
   import { Progress } from "$lib/components/ui/progress/index.js";
   import Contentload from "$lib/loading/contentload.svelte";

   function navigateToSocks(otherId: any) {
       goto(`CheckOut/products/other/${otherId}`);
   }

 

  
 const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });


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

   // loading data from supabase
   let errorMessage:any = ''
   let items:any[] = []

   async function loadItems() {
   const { data, error } = await supabase.from("popular3").select("*");

   if (error) {
     errorMessage = `Error loading items: ${error.message}`;
     console.error(error);
   } else {
     items = data;
   }
 
 }
 
 loadItems();

 </script>
<br>
    
  <Carousel.Root bind:api  plugins={[plugin]}

  on:mousenter={plugin.stop}
  on:mouseleave={plugin.reset} 
  class="w-3/4 mx-auto my-5">
  <h1 class="text-5xl  text-center mb-10 bg-gradient-to-r from-gray-700 to-blue-500 text-transparent bg-clip-text  italic">Most bought of the week</h1>

 
   <Carousel.Content class="-ml-1">
     {#each items as slide}
       <Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/4">
         <button on:click={() => navigateToSocks(slide.id)}>
               
           <Card.Root class='border-none shadow-none bg-transparent'>
             <Card.Content>
             </Card.Content>

               <div class=" h-96 flex flex-col justify-center items-center">
                 <img src={slide.img} alt="" class="h-full  object-cover">
                 <p class="text-center  mt-2 text-xl text-gray-900">{slide.name}</p>
                 <p class="text-center  mt-2 text-xl text-gray-900">{slide.price}$</p>
               </div>
 

           </Card.Root>
         </button>
       </Carousel.Item>
     {/each}


   </Carousel.Content>



   <Carousel.Previous />
   
   <Carousel.Next />
   <Progress value={current} max={6} class='h-1 my-10' />
 </Carousel.Root>


 <style>
  * {
       font-family:  Arial, Helvetica, sans-serif;
   }
 </style>