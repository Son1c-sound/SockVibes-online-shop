<script lang="ts">
    import { addnumber, increment, decrement } from "../../routes/CheckOut/products/fresh/store";
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';

    interface CartItem {
        quantity: number;
        id: number;
        name: string;
        image: string;
        description: string;
        status: string;
        price: string;
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
</script>

<br>
<br>
<br>
<div class="p-6 max-w-2xl mx-auto">
  {#if cartItems.length > 0}
    <div class="space-y-6">
      {#each cartItems as item}
        <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <img src="{item.image}" alt="{item.name}" class="w-24 h-24 object-cover rounded-md border border-gray-300">
          <div class="flex-1 ml-4">
            <h3 class="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p class="text-gray-600">Quantity: {item.quantity}</p>
            <p class="text-gray-600">Quantity: {item.price}</p>
            <p class="text-gray-600">Status: <span class="text-green-500">{item.status}</span></p>
            <p class="text-gray-500 text-sm mt-1">{item.description}</p>
          </div>
          <button  on:click={decrement}
            on:click={() => removeItem(item.id)}
            class="text-red-600 hover:text-red-800 font-medium focus:outline-none"
          >
            Remove
          </button>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-500">Your cart is empty.</p>
  {/if}
</div>



