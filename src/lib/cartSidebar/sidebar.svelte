<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';
  import DoneMark from '$lib/Icons/donemark.svelte';
  import type { CartItem } from '../../app';

  let cartItems: CartItem[] = [];
  let loading = false;

  // Load cart items from localStorage on component mount
  onMount(() => {
    loadCartItems();
  });

  function loadCartItems() {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        cartItems = JSON.parse(storedCart);
        console.log('Loaded cart items from localStorage:', cartItems);
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
    }
  }

  // Add an item to the cart
  function addItem(newItem: CartItem): void {
    console.log('Adding item:', newItem);
    const existingItem = cartItems.find(item => item.id === newItem.id);

    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      cartItems = [...cartItems, newItem];
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Remove an item from the cart
  function removeItem(itemid: number): void {
    cartItems = cartItems.filter(item => item.id !== itemid);
    localStorage.setItem('cart', JSON.stringify(cartItems));

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
    }
  }

  // Set loading state
  function loadCheck() {
    loading = true;
  }
</script>

<Sheet.Root>
  <Sheet.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      class='hover:bg-gray-800 w-full bg:transparent rounded-3xl'
      type="button"
      on:click={loadCartItems}
    >
      Open Cart <i class="ml-2 fa-solid fa-angle-right"></i>
    </Button>
  </Sheet.Trigger>
  <Sheet.Content side="right" style="width: 400px;"> <!-- Increased width -->
    <Sheet.Header>
      <Sheet.Title>Review Shopping Cart</Sheet.Title>
      <Sheet.Description>
        {#if cartItems.length > 0}
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px;" class="my-3">
            <DoneMark />
            <h2 class="font-arial my-2">Your order qualifies for FREE returns</h2>
          </div>
        {/if}
      </Sheet.Description>
    </Sheet.Header>
    <div class="p-4 mx-auto border-t border-gray-300"> <!-- Updated padding and border -->
      {#if loading}
        <Button class='my-4 w-full' disabled>Redirecting to Checkout...</Button> <!-- Full width button -->
        <br />
      {:else}
        <div class="my-4 flex justify-between items-center">
          <h1 class="text-md font-semibold"><span class="font-arial">Subtotal:</span> ${calculateSubtotal().toFixed(2)}</h1>
        </div>
      {/if}
      <div class="space-y-4"> <!-- Adjusted spacing between items -->
        {#each cartItems as item}
          <div class="bg-white rounded-md p-4 flex items-center justify-between border border-gray-300"> <!-- Removed shadow, added border -->
            <img src="{item.image}" alt="{item.name}" class="w-20 h-20 object-cover rounded-md" /> <!-- Adjusted size -->
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
            <h1 class="text-xl font-bold">${item.price}</h1>
          </div>
          <hr class="bg-gray-300 mt-4 mb-4" /> <!-- Adjusted line color -->
        {/each}
        {#if !loading}
          <Button on:click={() => { checkout(); loadCheck(); }} class="w-full"> <!-- Full width button -->
            Check Out ({cartItems.length} Items)
          </Button>
        {/if}
      </div>
    </div>
    <Sheet.Footer>
      <Sheet.Close asChild let:builder>
        <Button builders={[builder]} type="submit" class="w-full"> <!-- Full width button -->
          Close
        </Button>
      </Sheet.Close>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
