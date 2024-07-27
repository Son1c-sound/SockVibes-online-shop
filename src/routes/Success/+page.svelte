<script>
   import { onMount } from 'svelte';
  import Donemark from "$lib/Icons/donemark.svelte";
  import { Button } from '$lib/components/ui/button';
  import { addnumber } from "../../routes/CheckOut/products/fresh/store";
  import { goto } from '$app/navigation';

  function cont() {
    goto('/');
  }

  onMount(() => {

    localStorage.removeItem('cart');
    
    // Reset the store value to 0
    addnumber.set(0);

    // Also update localStorage to persist the change
    try {
      localStorage.setItem('addnumber', JSON.stringify(0));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }


  });
  </script>
  
  <div class="my-40 flex flex-col items-center justify-center text-center">
    <Donemark />
    <h2 class="text-2xl font-bold mb-2">Payment Successful</h2>
    <p class="text-lg">
      Your order has been confirmed and is now being processed. We will email the receipt and shipping date.
      <br>
      Thank you for shopping with us!
    </p>
    <br>
    <Button on:click={cont}>Continue Shopping</Button>
    <br>
    <Button variant='outline'>Contact Support</Button>
  </div>
  