<script lang="ts">
  import Accic from "./accic.svelte";
  import Anouncment from "./Anouncment.svelte";
  import Burger from "./burger.svelte";
  import CartIc from "./cartIc.svelte";
  import SearchIc from "./searchIc.svelte";
  import { goto } from "$app/navigation";

  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function menucart() {
    goto("/Cart");
  }
</script>

<header
  class="bg-white text-black shadow-md fixed md:block z-50 top-0 left-0 w-full"
>
  <Anouncment></Anouncment>
  <div class="container mx-auto flex items-center h-24">
    <a href="/" class="flex items-center justify-center">
      <img
        class="h-14"
        src="https://i.ibb.co/9497j0z/450211942-845890467465486-8095787243396923148-n.jpg"
        alt="Logo"
      />
    </a>
    <nav class="relative hidden md:flex ml-4 flex-grow">
      <ul class="flex items-center justify-center mx-auto">
        <li class="p-2 w-full text-center mx-5 font-bold">
          <a href="/categories/allItems">All Items</a>
        </li>
        <!-- Dropdown item 1 -->
        <li class="relative text-uppercase p-5 xl:p-8 font-bold group">
          <a href="/categories/men" class="block mx-5">Men</a>
          <!-- Dropdown menu -->
          <div
            class="absolute left-1/2 mt-2 w-64 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2"
          >
            <ul class="flex flex-col items-start p-2">
              <li class="p-2 w-full text-center hover:bg-gray-200">
                <a href="/categories/men">All Items</a>
              </li>
              <li class="p-2 w-full text-center hover:bg-gray-200">
                <a href="/categories/men/menSlippers">Men Slippers</a>
              </li>
              <li class="p-2 w-full text-center hover:bg-gray-200">
                <a href="/categories/men/menSocks">Men Socks</a>
              </li>
              <!-- Add more categories here -->
            </ul>
          </div>
        </li>

        <!-- Dropdown item 2 -->
        <li class="relative text-uppercase p-5 xl:p-8 font-bold group mx-4">
          <a href="/categories/woman" class="block mx-5">Women</a>
          <!-- Dropdown menu -->
          <div
            class="absolute left-1/2 mt-2 w-64 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2"
          >
            <ul class="flex flex-col items-start p-2">
              <li class="p-2 w-full text-center hover:bg-gray-200">
                <a href="/categories/woman">All Items</a>
              </li>
              <li class="p-2 w-full text-center hover:bg-gray-200">
                <a href="/categories/woman/womanSocks">Women Socks</a>
              </li>
              <li class="p-2 w-full text-center hover:bg-gray-200">
                <a href="/categories/woman/womanSlipper">Women Slippers</a>
              </li>
              <!-- Add more categories here -->
            </ul>
          </div>
        </li>

        <li class="relative text-uppercase p-5 xl:p-8 font-bold group mx-4">
          <a href="/categories/newitems" class="block mx-5">Unisex</a>
          <!-- Dropdown menu -->
          <div
            class="absolute left-1/2 mt-2 w-64 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2"
          ></div>
        </li>

        <!-- Dropdown item 4 -->
        <li class="relative text-uppercase p-5 xl:p-8 font-bold group mx-4">
          <a href="/categories/Sales" class="block mx-5">Sales</a>
          <!-- Dropdown menu -->
        </li>
      </ul>
    </nav>

    <div class="ml-auto md:hidden">
      <button class="md:hidden mx-5" on:click={toggleMobileMenu}>
        <SearchIc></SearchIc>
      </button>
      <button class="md:hidden" on:click={menucart}>
        <CartIc></CartIc>
      </button>
      <button class="md:hidden ml-6" on:click={toggleMobileMenu}>
        <Burger></Burger>
      </button>
    </div>

    <div class="hidden md:flex items-center ml-auto">
      <button
        class="border border-white rounded-full font-bold px-4 py-2 hidden md:block"
      >
        <SearchIc></SearchIc>
      </button>
      <button
        on:click={menucart}
        class="border border-white rounded-full font-bold px-4 py-2 hidden md:block"
      >
        <CartIc></CartIc>
      </button>
    </div>
  </div>

  <div
  class="md:hidden fixed inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6"
  style="display: {isMobileMenuOpen ? 'flex' : 'none'}; z-index: 50;"
>
  <h2 class="text-2xl font-extrabold text-black mb-10 text-shadow-lg text-center">Sock Vibes  Menu</h2>

  <ul class="w-full max-w-md flex flex-col items-center space-y-6">
    
    <li class="w-full">
      <a
        href="/categories/allItems"
        on:click={toggleMobileMenu}
        class="block text-center text-lg font-medium py-3 px-2  text-black border border-gray-700 rounded-lg  hover:bg-gray-700 hover:border-gray-600 w-2/4 mx-auto"
      >
        All items in shop
      </a>
    </li>

    <li class="w-full">
      <a
        href="/categories/men"
        on:click={toggleMobileMenu}
        class="block text-center text-lg font-medium py-3 px-2  text-black border border-gray-700 rounded-lg  hover:bg-gray-700 hover:border-gray-600 w-2/4 mx-auto"
      >
        Men Items
      </a>
    </li>

    <li class="w-full">
      <a
        href="/categories/woman"
        on:click={toggleMobileMenu}
        class="block text-center text-lg font-medium py-3 px-2  text-black border border-gray-700 rounded-lg  hover:bg-gray-700 hover:border-gray-600 w-2/4 mx-auto"
      >
        Women Items
      </a>
    </li>

    <li class="w-full">
      <a
        href="/categories/newitems"
        on:click={toggleMobileMenu}
        class="block text-center text-lg font-medium py-3 px-2  text-black border border-gray-700 rounded-lg  hover:bg-gray-700 hover:border-gray-600 w-2/4 mx-auto"
      >
        Unisex
      </a>
    </li>

    <li class="w-full">
      <a
        href="/categories/Sales"
        on:click={toggleMobileMenu}
        class="block text-center text-lg font-medium py-3 px-2  text-black border border-gray-700 rounded-lg  hover:bg-gray-700 hover:border-gray-600 w-2/4 mx-auto"
      >
        Sales
      </a>
    </li>

  </ul>

  <button
    on:click={toggleMobileMenu}
    class="my-5  text-red-600"
  >
    Close
  </button>
</div>


</header>
<br />
<br />
<br />
<br />
<br />

<!-- Add your additional styles here -->
<style>
  * {
    font-family: "Jura", sans-serif; /* Ensure Noto Sans is applied universally */
  }
</style>
