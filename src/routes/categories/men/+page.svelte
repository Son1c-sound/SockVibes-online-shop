<script lang='ts'>
    import { men } from './data';
    import { Button } from '$lib/components/ui/button'
    import * as Card from "$lib/components/ui/card/index.ts";
    import * as Carousel from "$lib/components/ui/carousel/index.ts";
    import { Progress } from "$lib/components/ui/progress/";
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.ts";
  
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

<h1 class="text-center my-11 text-2xl font-bold font-mono">Men Categories</h1>

<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-auto max-w-screen-xl">
    {#each men as item}
    <div class="relative flex flex-col text-gray-700 bg-white  shadow-gray-200 bg-clip-border rounded-xl">
        <div class="relative mx-1 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl">
            <Carousel.Root class="w-full max-w-full" bind:api>
                <Carousel.Content>
                    <Carousel.Item>
                        <div class="p-1">
                            <Card.Root>
                                <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                                    <img src={item.urls[0]} class="w-full h-full object-cover text-4xl font-semibold">
                                </Card.Content>
                            </Card.Root>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div class="p-1">
                            <Card.Root>
                                <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                                    <img src={item.urls[1]} class="w-full h-full object-cover text-4xl font-semibold">
                                </Card.Content>
                            </Card.Root>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div class="p-1">
                            <Card.Root>
                                <Card.Content class="flex aspect-square items-center justify-center p-4 sm:p-6">
                                    <img src={item.urls[2]} class="w-full h-full object-cover text-4xl font-semibold">
                                </Card.Content>
                            </Card.Root>
                        </div>
                    </Carousel.Item>
                </Carousel.Content>
            </Carousel.Root>
        </div>
        <div class="p-4 sm:p-6">
            <div class="flex items-center justify-between mb-2">
                <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.name}
                </p>
                <p class="block font-sans text-sm sm:text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.price}
                </p>
            </div>
            <p class="block font-sans text-xs sm:text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {item.description}                
                
            </p>
            <p class="text-green-500">{item.status}</p>            
        </div>

        <div class="p-2 sm:p-1 pt-0">
            <Button class='w-full'>Add to Cart</Button>
        </div>
    </div>
    {/each}
</div>

<style>
    h1 {
        font-family: 'Jura', sans-serif;
        font-weight: bold;
    }
</style>
