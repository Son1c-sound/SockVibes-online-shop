<script lang="ts">
    import { addnumber, increment, decrement } from "../../routes/CheckOut/products/fresh/store";
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import Button from "$lib/components/ui/button/button.svelte";
    
    import RightArrow from '$lib/Icons/rightarrow.svelte'
    import MightLike from '../../lib/HeroSlider/braclet/MightLike/mightlike.svelte'

    import DoneMark from '$lib/Icons/donemark.svelte'
  import Cartfooter from "$lib/Footer/cartFoot/cartfooter.svelte";
    interface CartItem {
        quantity: number;
        id: number;
        name: string;
        image: string;
        description: string;
        status: string;
        price: string;
        category: string;
    }

    let cartItems: CartItem[] = [];

    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cartItems = JSON.parse(storedCart);
        }
    } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
    }

    function removeItem(itemid: number): void {
        const index = cartItems.findIndex(item => item.id === itemid);

        if (index !== -1) {
            cartItems.splice(index, 1);

            localStorage.setItem('cart', JSON.stringify(cartItems));
            window.location.reload();
        }
    }

    function clearLocalStorageAfterDelay(delay: number): void {
        setTimeout(() => {
            localStorage.removeItem('cart');
            cartItems = [];
            addnumber.set(0);
        }, delay);
    }

    onMount(() => {
        clearLocalStorageAfterDelay(21600000);
    });

    function calculateSubtotal(): number {
        return cartItems.reduce((total, item) => {

            const price = parseFloat(item.price);
            return total + (price * item.quantity);
        }, 0);
    }
</script>


<br>
<br>
<h1 class="text-2xl font-arial text-center font-bold ">Review Shopping Cart</h1>
{#if cartItems.length > 0}
  <div style="display: flex; justify-content: center; align-items: center; gap: 10px;" >
    <DoneMark />
    <h2 class="font-arial my-3">Your order qualifies for FREE returns</h2>
  </div>

  <div class="p-6 max-w-2xl mx-auto lg:border-2 lg:border-gray-900 rounded-md">

    <div class="my-4 flex justify-between items-center">
      <Button>Check Out ({cartItems.length} Items)</Button>
      <h1 class="text-xl "><span class="font-arial ">Subtotal:</span> ${calculateSubtotal().toFixed(2)}</h1>
  </div>
  
    <div class="space-y-6">
      {#each cartItems as item}
        <hr class="bg-gray-900" />
        <div class="flex items-center justify-between p-4 bg-white rounded-lg w-full">
          <img src="{item.image}" alt="{item.name}" class="w-24 h-24 object-cover rounded-md" />
          
          <div class="flex-1 ml-4">
            <h3 class="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p class="text-gray-600">Quantity: {item.quantity}</p>
            <p class="text-gray-600">Category: {item.category}</p>
            <br />
            <button on:click={(decrement)}
              on:click={() => removeItem(item.id)}
              class="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
            >
              Remove
            </button>
          </div>
          
          <h1 class="text-xl font-bold">{item.price}</h1>
        </div>
        
      {/each}
      <Button class='w-full rounded-none'>Check Out ({cartItems.length} Items)</Button>

    </div>
  </div>
  <br>
  <br>
  <br>
{:else}

<h1 class="text-md my-5 text-center text-gray-500">
  Your cart is empty. 
  <a href='/' class='text-blue-600 my-3 inline-flex items-center'>
    Start Shopping
    <RightArrow  />
    
  </a>
</h1>


{/if}

<MightLike></MightLike>