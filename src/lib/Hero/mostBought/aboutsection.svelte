<script>
  
  
  // Define an array of objects containing image data
  const collections = [
    {
      src: "https://img.freepik.com/free-photo/galactic-night-sky-astronomy-science-combined-generative-ai_188544-9656.jpg",
      alt: "First Image",
    },
    {
      src: "https://i.imgur.com/5fQUPDl.jpg",
      alt: "Second Image",
    },
    {
      src: "https://i.ibb.co/8z2cCWv/blue-purple-beautiful-scenery-ultra-hd-wallpaper-4k-sr10012421-1706505497434-cover.webp",
      alt: "Third Image",
    },
    {
      src: "https://i.ibb.co/8z2cCWv/blue-purple-beautiful-scenery-ultra-hd-wallpaper-4k-sr10012421-1706505497434-cover.webp",
      alt: "Third Image",
    },
    // Add more objects as needed
  ];
</script>

<div class="bg-gray-100 py-8 gradient-bg">
  <p class="text-center text-gray-100">Grab a giftboxes</p>

  <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {#each collections as collection}
      <div class="relative mb-6 sm:mb-0">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="rounded-lg image-link relative block overflow-hidden">
          <img
            class="h-64 w-full object-cover transform transition-transform hover:scale-105"
            src={collection.src}
            alt={collection.alt}
          />
          <div class="overlay absolute top-0 left-0 w-full h-full opacity-0 bg-gray-800 hover:opacity-50 transition-opacity"></div>
          <div class="absolute bottom-0 left-0 p-4 w-full bg-gray-900 bg-opacity-75 text-white text-center">
            <span class="block text-sm font-semibold">Sock</span>
            <span class="block text-xs">20,00$</span>
          </div>
        </a>
      </div>
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
