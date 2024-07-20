<script lang="ts">
  import { goto } from "$app/navigation";
    import * as Card from "$lib/components/ui/card/";
    import * as Carousel from "$lib/components/ui/carousel/";
    import Autoplay from "embla-carousel-autoplay";
    import { fresh } from "../../../../routes/CheckOut/products/fresh/products";

    
    function navigateToProductDetail(footerId: any) {
      goto(`/CheckOut/products/fresh/${footerId}`, {  });
    }


    
  const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });
  function getFirstImageUrl(product:any) {
    if (product.type === 'image' && product.urls && product.urls.length > 0) {
      return product.urls[0]; // Return the first URL from urls array
    } else {
      return product.url; // Return the single URL if there's no urls array
    }
  }

  </script>
   <hr class="mx-16">
 
   <Carousel.Root  plugins={[plugin]}

   on:mousenter={plugin.stop}
   on:mouseleave={plugin.reset} 
   class="w-3/4 mx-auto  my-28">
   <h1 class=' font-style: italic text-5xl font-bold'>You might Like</h1>
   <br>
    <Carousel.Content class="-ml-1 bg-transparent border-none outline-none shadow-none">
      {#each fresh as product}
        <Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/4 bg-transparent border-none shadow-none ">
          <a href={`/CheckOut/products/fresh/${product.id}`} target="_blank">
                
            <Card.Root class='border-none bg-transparent outline-none shadow-none'>
              <Card.Content class='border-none bg-transparent shadow-none outline-none'>
              </Card.Content>
              {#if product.type === 'image'}
                <div class=" h-96 flex flex-col justify-center items-center">
                  <img src={getFirstImageUrl(product)} alt="" class="h-full  object-cover">
                  <p class="text-center  mt-2 p-2 text-xl text-gray-900">{product.name}</p>
                  <p class="text-center  mt-2 text-xl text-gray-900">{product.price}</p>
                </div>
              {:else if product.type === 'text'}
                <div class="rounded-2xl h-96 flex justify-center items-center">
                 
                </div>
              {/if}
            </Card.Root>
          </a>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
  
  <style>
    * {
        font-family: 'Jura', sans-serif; /* Ensure Noto Sans is applied universally */
    }
</style>
