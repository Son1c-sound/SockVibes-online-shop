<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
     import * as Card from "$lib/components/ui/card/";
     import * as Carousel from "$lib/components/ui/carousel/";
     import Autoplay from "embla-carousel-autoplay";
     import { Socks } from "../../../../routes/CheckOut/products/Socks/products";
     import { goto } from "$app/navigation";
 
     function navigateToSocks(socksId: any) {
         goto(`CheckOut/products/Socks/${socksId}`);
     }
 
 
     
    
   const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });
 
   </script>
    
 
    <Carousel.Root  plugins={[plugin]}
 
    on:mousenter={plugin.stop}
    on:mouseleave={plugin.reset} 
    class="w-3/4 mx-auto  my-24">
    <h1 class=' font-style: italic text-5xl font-bold '>Might also like</h1>
   
     <Carousel.Content class="-ml-1">
       {#each Socks as slide}
         <Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/4">
           <button on:click={() => navigateToSocks(slide.id)}>
                 
             <Card.Root class='border-none shadow-none bg-transparent'>
               <Card.Content>
               </Card.Content>
               {#if slide.type === 'image'}
                 <div class=" h-96 flex flex-col justify-center items-center">
                   <img src={slide.url} alt="" class="h-full  object-cover">
                   <p class="text-center  mt-2 text-xl text-gray-900">{slide.text}</p>
                 </div>
               {:else if slide.type === 'text'}
                 <div class="rounded-2xl h-96 flex justify-center items-center">
               
                 </div>
                
               {/if}
             </Card.Root>
           </button>
         </Carousel.Item>
       {/each}
 
  
     </Carousel.Content>
 
 
 
     <Carousel.Previous />
     
     <Carousel.Next />
     
   </Carousel.Root>
 
 
   <style>
     h1 {
       font-family: "Abel", sans-serif;
 
     }
   </style>