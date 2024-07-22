<script lang='ts'>
    import Accic from "./accic.svelte";
    import Anouncment from "./Anouncment.svelte";
    import Burger from "./burger.svelte";
    import CartIc from "./cartIc.svelte";
    import SearchIc from "./searchIc.svelte";
    import { goto } from '$app/navigation'

   

  
    let isMobileMenuOpen = false;
  
    function toggleMobileMenu() {
      isMobileMenuOpen = !isMobileMenuOpen;
    }


    function menucart() {
        goto ('/Cart')
    }
</script>

<header class="bg-white  text-black  shadow-md fixed       md:block   z-50 top-0 left-0 w-full">
    <Anouncment></Anouncment>
    <div class="container mx-auto flex items-center h-24">
        <a href="/" class="flex items-center justify-center">
            <img class="h-14" src="https://i.ibb.co/9497j0z/450211942-845890467465486-8095787243396923148-n.jpg" alt="Logo" />
        </a>
        <nav class="relative hidden md:flex ml-4 flex-grow">
            <ul class="flex items-center justify-center mx-auto">
                <!-- Dropdown item 1 -->
                <li class="relative text-uppercase p-5 xl:p-8 font-bold group">
                    <a href='/categories/men' class="block mx-5">Men</a>
                    <!-- Dropdown menu -->
                    <div class="absolute left-1/2 mt-2 w-64 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2">
                        <ul class="flex flex-col items-start p-2">
                            <li class="p-2 w-full text-center hover:bg-gray-200"><a href='/categories/men'>All Items</a></li>
                            <li class="p-2 w-full text-center hover:bg-gray-200"><a href='/categories/men/menSlippers'>Men Slippers</a></li>
                            <li class="p-2 w-full text-center hover:bg-gray-200"><a href='/categories/men/menSocks'>Men Socks</a></li>
                            <!-- Add more categories here -->
                        </ul>
                    </div>
                </li>
                
                <!-- Dropdown item 2 -->
                <li class="relative text-uppercase p-5 xl:p-8 font-bold group mx-4">
                    <a href='/categories/woman' class="block mx-5">Women</a>
                    <!-- Dropdown menu -->
                    <div class="absolute left-1/2 mt-2 w-64 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2">
                        <ul class="flex flex-col items-start p-2">
                            <li class="p-2 w-full text-center hover:bg-gray-200"><a href='/categories/woman'>All Items</a></li>
                            <li class="p-2 w-full text-center hover:bg-gray-200"><a href='/categories/woman/womanSocks'>Women Socks</a></li>
                            <li class="p-2 w-full text-center hover:bg-gray-200"><a href='/categories/woman/womanSlipper'>Women Slippers</a></li>
                            <!-- Add more categories here -->
                        </ul>
                    </div>
                </li>
                
                <li class="relative text-uppercase p-5 xl:p-8 font-bold group mx-4">
                    <a href='/categories/newitems' class="block mx-5">New Items</a>
                    <!-- Dropdown menu -->
                    <div class="absolute left-1/2 mt-2 w-64 bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2">

                    </div>
                </li>
                
                <!-- Dropdown item 4 -->
                <li class="relative text-uppercase p-5 xl:p-8 font-bold group mx-4">
                    <a href='/categories/sale' class="block mx-5">Sales</a>
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
            <button class="border border-white rounded-full font-bold px-4 py-2 hidden md:block">
                <SearchIc></SearchIc>
            </button>
            <button on:click={menucart} class="border border-white rounded-full font-bold px-4 py-2 hidden md:block">
                <CartIc></CartIc>
            </button>

        </div>
    </div>

    <div class="md:hidden fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center"
     style="display: {isMobileMenuOpen ? 'flex' : 'none'}; z-index: 20;">
     <div class="md:hidden fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-start p-6"
     style="display: {isMobileMenuOpen ? 'flex' : 'none'}; z-index: 20;">

    <ul class="w-full text-center space-y-2">
        <h1 class="text-4xl font-bold mb-4 text-black my-24">Categories</h1>
        
        <!-- Men Dropdown -->
        <li class="relative text-uppercase p-4 xl:p-8 font-bold group">
            <a href='/categories/men' class="block mx-5 text-xl">Men</a>
            <div class="w-full bg-white text-black mt-2 rounded shadow-lg">
                <ul class="flex flex-col items-center p-2 space-y-2 border-2 border-gray-900 ">
                    <li class="p-2 w-full text-center hover:bg-gray-200"><a on:click={toggleMobileMenu} href='/categories/men'>All Items</a></li>
                    <li class="p-2 w-full text-center hover:bg-gray-200"><a on:click={toggleMobileMenu} href='/categories/men/menSlippers'>Men Slippers</a></li>
                    <li class="p-2 w-full text-center hover:bg-gray-200"><a on:click={toggleMobileMenu} href='/categories/men/menSocks'>Men Socks</a></li>
                </ul>
            </div>
        </li>

        <!-- Women Dropdown -->
        <li class="relative text-uppercase p-5 xl:p-8 font-bold group ">
            <a href='/categories/woman' class="block mx-5 text-xl">Women</a>
            <div class="w-full bg-white text-black mt-2 rounded shadow-lg">
                <ul class="flex flex-col items-center p-2 space-y-2 border-2 border-gray-900 ">
                    <li class="p-2 w-full text-center hover:bg-gray-200"><a on:click={toggleMobileMenu} href='/categories/woman'>All Items</a></li>
                    <li class="p-2 w-full text-center hover:bg-gray-200"><a on:click={toggleMobileMenu} href='/categories/woman/womanSocks'>Women Socks</a></li>
                    <li class="p-2 w-full text-center hover:bg-gray-200"><a on:click={toggleMobileMenu} href='/categories/woman/womanSlipper'>Women Slippers</a></li>
                </ul>
            </div>
        </li>
        <li>
            <div class="w-2/3 mx-auto p-3 bg-yellow-300 text-black  shadow-md">
            <a href="/categories/newitems" on:click={toggleMobileMenu} class=" ">New Items</a>
        </div>
            <div class="my-3 w-2/3 mx-auto p-3 bg-green-400 text-black  shadow-md">
            <a href="/categories/newitems" on:click={toggleMobileMenu} class=" ">Sales</a>
        </div>
        </li>
    </ul>

    <button on:click={toggleMobileMenu} class="mt-8 rounded-full text-red-500 font-semibold px-6 py-3 md:px-8 md:py-4 transition-colors duration-300 focus:outline-none">
        Close
    </button>
</div>








</header>
<br>
<br>
<br>
<br>
<br>


<!-- Add your additional styles here -->
<style>
    * {
        font-family: 'Jura', sans-serif; /* Ensure Noto Sans is applied universally */
    }
</style>
