<script lang='ts'>
  import supabase from "$lib/db";
  import { onMount } from "svelte";

  import type { Item } from "../../../routes/types";
  import { goto } from "$app/navigation";


  let errorMessage: string = ''
  let item:Item[] = []
  async function loadItems() {
    try {
      const { data, error } = await supabase.from("banners").select("*")
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
  <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

      <div class="relative mb-6 sm:mb-0">
        <!-- svelte-ignore a11y-invalid-attribute -->

          <!-- svelte-ignore a11y-missing-attribute -->
          <div
            class="h-[450px] w-full object-cover transform transition-transform hover:scale-105"
      
            
          />
   
        
    
      </div>

  </div>


</div>


  


<style>
  .gradient-bg {
    background-image: url('https://cdn.filestackcontent.com/output=format:jpg,quality:input/resize=width:1800,height:1800,fit:max/ZiIebrPSliZ50wYwJhIK');
  }

</style>
