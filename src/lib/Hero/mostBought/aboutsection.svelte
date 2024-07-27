<script lang='ts'>
  import supabase from "$lib/db";
  import { onMount } from "svelte";

  import type { Item } from "../../../routes/types";
  import { goto } from "$app/navigation";


  let errorMessage: string = ''
  let item:Item[] = []
  async function loadItems() {
    try {
      const { data, error } = await supabase.from("giftboxes").select("*")
      if (error ) {
        errorMessage = 'error'
      } else {
        item = data;
      }
    } catch {

    }
  }

  onMount(() => {
    loadItems()
  })
  function handleClick(id: number) {
    goto(`/categories/giftboxes/${id}`);
  }
</script>

<div class="bg-gray-100 py-8 gradient-bg">
  <p class="text-center text-gray-100">Grab a giftboxes</p>

  <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {#each item as collection}
    <button on:click={() => handleClick(collection.id)}>
      <div class="relative mb-6 sm:mb-0">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="rounded-lg image-link relative block overflow-hidden">
          <!-- svelte-ignore a11y-missing-attribute -->
          <img
            class="h-64 w-full object-cover transform transition-transform hover:scale-105"
            src={collection.img2}
            
          />
          <div class="overlay absolute top-0 left-0 w-full h-full opacity-0 bg-gray-800 hover:opacity-50 transition-opacity"></div>
          <div class="absolute bottom-0 left-0 p-4 w-full bg-gray-900 bg-opacity-75 text-white text-center">
            <span class="block text-sm font-semibold">{collection.name}</span>
            <span class="block text-xs">{collection.price}</span>
          </div>
        </a>
      </div>
    </button>
    {/each}
  </div>


</div>


  


<style>
  * {
    font-family:"Jura", sans-serif;
  }

  .image-link {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
  }

  .image-link:hover .overlay {
    opacity: 0.5;
  }

  .overlay {
    transition: opacity 0.3s ease-in-out;
  }


  .gradient-bg {
    background-image: linear-gradient(to bottom right, #000000, #262230);
    background-color: black; /* Fallback color if gradients are not supported */
  }

</style>
