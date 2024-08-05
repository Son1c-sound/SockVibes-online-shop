<script lang='ts'>
  import supabase from "$lib/db";
  import { onMount } from "svelte";
  
  import type { Item } from "../../../routes/types";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";


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
<div class="w-full  relative">
  <div class="swiper default-carousel swiper-container ">
    <div class="swiper-wrapper">

        <div class="swiper-slide relative">
          <div class="lg:h-[550px] relative">
            <img src='https://cdn.filestackcontent.com/output=format:jpg,quality:input/resize=width:1800,height:1800,fit:max/ZiIebrPSliZ50wYwJhIK' alt="" class="h-full w-full object-cover">
            <div class='absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center w-full'>
              <Button class='rounded-none p-6 bg-gray-100 text-md text-black'>Categories</Button>
            </div>
          </div>
        </div>

    </div>
  </div>

</div>



