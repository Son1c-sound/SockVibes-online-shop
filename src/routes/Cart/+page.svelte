<script lang="ts">
  import { addnumber, increment, decrement } from "../../routes/CheckOut/products/fresh/store";
  import toast, { Toaster } from 'svelte-french-toast';
  import Button from "$lib/components/ui/button/button.svelte"; 
  import RightArrow from '$lib/Icons/rightarrow.svelte';
  import DoneMark from '$lib/Icons/donemark.svelte';
  import type { CartItem } from '../../app';

  let cartItems: CartItem[] = [];
  let loading = false;
  import { onMount } from "svelte";
  // Load cart items from localStorage
  onMount(() => {
      try {
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
              cartItems = JSON.parse(storedCart);
          }
      } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
      }
  });

  // Remove an item from the cart without reloading the page
  function removeItem(itemid: number): void {
      // Update cartItems array
      cartItems = cartItems.filter(item => item.id !== itemid);

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));

      // Optionally show a toast message
    
  }

  function calculateSubtotal(): number {
      return cartItems.reduce((total, item) => {
          const price = parseFloat(item.price);
          return total + (price * item.quantity);
      }, 0);
  }

  async function checkout() {
      try {
          const response = await fetch("../Cart/checkout", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ items: cartItems }),
          });

          if (!response.ok) {
              throw new Error('Checkout failed');
          }

          const data = await response.json();
          window.location.replace(data.url);
      } catch (error) {
          console.error('Error during checkout:', error);
          toast.error('Failed to proceed with checkout.');
      }
  }

  function loadCheck() {
      loading = true;
  }
</script>

<br>
<br>
<h1 class="text-2xl font-arial text-center font-bold">Review Shopping Cart</h1>
{#if cartItems.length > 0}
  <div style="display: flex; justify-content: center; align-items: center; gap: 10px;" class="my-3">
      <DoneMark />
      <h2 class="font-arial my-2">Your order qualifies for FREE returns</h2>
  </div>

  <div class="p-6 max-w-2xl mx-auto lg:border-2 lg:border-gray-900 rounded-md">
      {#if loading}
          <Button class='my-4' disabled>Redirecting to Checkout...</Button>
          <br>
      {:else}
          <div class="my-4 flex justify-between items-center">
              <Button on:click={() => { checkout(); loadCheck(); }}>Check Out ({cartItems.length} Items)</Button>
              <h1 class="text-xl"><span class="font-arial">Subtotal:</span> ${calculateSubtotal().toFixed(2)}</h1>
          </div>
      {/if}
      <div class="space-y-6">
          {#each cartItems as item}
              <hr class="bg-gray-900" />
              <div class="flex items-center justify-between p-4 bg-white rounded-lg w-full">
                  <img src="{item.image}" alt="{item.name}" class="w-24 h-24 object-cover rounded-md" />
                  <div class="flex-1 ml-4">
                      <h3 class="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p class="text-gray-600">Quantity: {item.quantity}</p>
                      {#if item.category !== undefined}
                          <p class="text-gray-600">Category: {item.category}</p>
                      {/if}
                      <br />
                      <button on:click={() => removeItem(item.id)} class="text-red-500 hover:text-red-700">
                          <p>Remove</p>
                      </button>
                  </div>
                  <h1 class="text-xl font-bold">{item.price}$</h1>
              </div>
          {/each}
          {#if !loading}
              <Button on:click={() => { checkout(); loadCheck(); }} class='w-full'>Check Out ({cartItems.length} Items)</Button>
          {/if}
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
          <RightArrow />
      </a>
  </h1>
{/if}
