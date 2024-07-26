<script lang='ts'>
  import supabase from '$lib/db';

  import type { Item } from '../../routes/types'

  let items:Item[] = []
  let errorMessage = ''
  async function loadreport() {
    const { data, error } = await supabase.from("banerText").select("*");

    if (error) {
      errorMessage = `Error loading items: ${error.message}`;
    } else {
      items = data;
    }
  }
  loadreport()
</script>

<div class="bg-gradient-to-r from-pink-800 to-blue-400">
    <div class="max-w-[85rem] px-3 py-2 sm:px-6 lg:px-8 mx-auto">
      <!-- Centered Text -->
      <div class="max-w-[85rem] px-2 py-1 sm:px-6 lg:px-8 mx-auto">
        <!-- Centered Text -->
        <div class="flex flex-col sm:flex-row justify-center items-center text-center sm:text-left">
          <p class="text-sm font-semibold text-white flex flex-col sm:flex-row items-center">
            {#each items as item}
             {item.text}
            {/each}
          </p>
        </div>
        <!-- End Centered Text -->
      </div>
      <!-- End Centered Text -->
    </div>
    <!-- End Announcement Banner -->
  </div>
  <!-- End Announcement Banner -->
  