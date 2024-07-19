<script>
    import Accic from "./accic.svelte";
    import Anouncment from "./Anouncment.svelte";
    import Burger from "./burger.svelte";
    import CartIc from "./cartIc.svelte";
    import SearchIc from "./searchIc.svelte";
    import { goto } from '$app/navigation'
    
    let categories = [
      { name: 'men', link: '/category1' },
      { name: 'Woman', link: '/category2' },
      { name: 'kids', link: '/category3' },
      { name: 'collections', link: '/category4' },
      { name: 'New items', link: '/category5' }
    ];
  
    let isMobileMenuOpen = false;
  
    function toggleMobileMenu() {
      isMobileMenuOpen = !isMobileMenuOpen;
    }


    function menucart() {
        goto ('/Cart/CartMenu')
    }
</script>

<header class="bg-white  text-black shadow shadow-md fixed       md:block   z-50 top-0 left-0 w-full">
    <Anouncment></Anouncment>
    <div class="container mx-auto flex items-center h-24">
        <a href="/" class="flex items-center justify-center">
            <img class="h-14" src="https://i.ibb.co/9497j0z/450211942-845890467465486-8095787243396923148-n.jpg" alt="Logo" />
        </a>
        <nav class="hidden md:flex ml-4 flex-grow">
            <ul class="flex items-center justify-center mx-auto">
                <!-- Centering the items -->
                {#each categories as category}
                <li class="text-transform: uppercase p-5 xl:p-8 active font-bold">
                    <a href={category.link}>{category.name}</a>
                </li>
                {/each}
            </ul>
        </nav>
        
        <div class="ml-auto md:hidden">
            <button class="md:hidden mx-5" on:click={toggleMobileMenu}>
                <SearchIc></SearchIc>
            </button>
            <button class="md:hidden" on:click={toggleMobileMenu}>
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
     
    <ul class="text-center space-y-6">
        <h1 class="text-4xl font-bold mb-6 text-black">Categories</h1>
        {#each categories as category}
        <li>
            
            <a href={category.link} class="block  border border-black text-black font-semibold rounded-lg py-3 px-6 md:py-4 md:px-8 transition-colors duration-300">{category.name}</a>
        </li>
        {/each}
    </ul>
    <button on:click={toggleMobileMenu} class="mt-8   rounded-full text-red-500 font-semibold px-6 py-3 md:px-8 md:py-4 transition-colors duration-300 focus:outline-none">
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
