<script lang="ts">
  import { onMount } from 'svelte';
  import supabase from '$lib/db';
  import { addnumber } from "../../routes/CheckOut/products/fresh/store";

  onMount(async () => {
    console.log('Mounted on /success route');
    
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      console.log('Stored Cart:', storedCart);
      const cartItems = JSON.parse(storedCart);
      console.log('Cart Items:', cartItems);

      // Update Supabase and ensure it completes before clearing localStorage
      await updateInventory(cartItems);
      await updatePopular(cartItems)
      await updatePopular2(cartItems)
      await updatePopular3(cartItems)
      await updateSlippers(cartItems)

      // Clear cart and reset addnumber after updating inventory
      clearLocalStorageAndResetStore();
    }
  });

  async function updateInventory(cartItems: { name: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { name, quantity } = item;

      // Retrieve the current storage value
      const { data: currentData, error: fetchError } = await supabase
        .from('allitems')
        .select('storage')
        .eq('name', name)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      // Calculate new storage value
      const newStorageValue = currentData.storage - quantity;

      // Update the storage value
      const { error: updateError } = await supabase
        .from('allitems')
        .update({ storage: newStorageValue })
        .eq('name', name);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  async function updatePopular(cartItems: { name: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { name, quantity } = item;

      // Retrieve the current storage value
      const { data: currentData, error: fetchError } = await supabase
        .from('popularItems')
        .select('storage')
        .eq('name', name)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      // Calculate new storage value
      const newStorageValue = currentData.storage - quantity;

      // Update the storage value
      const { error: updateError } = await supabase
        .from('popularItems')
        .update({ storage: newStorageValue })
        .eq('name', name);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  async function updatePopular2(cartItems: { name: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { name, quantity } = item;

      // Retrieve the current storage value
      const { data: currentData, error: fetchError } = await supabase
        .from('popular2')
        .select('storage')
        .eq('name', name)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      // Calculate new storage value
      const newStorageValue = currentData.storage - quantity;

      // Update the storage value
      const { error: updateError } = await supabase
        .from('popular2')
        .update({ storage: newStorageValue })
        .eq('name', name);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  async function updatePopular3(cartItems: { name: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { name, quantity } = item;

      // Retrieve the current storage value
      const { data: currentData, error: fetchError } = await supabase
        .from('popular3')
        .select('storage')
        .eq('name', name)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      // Calculate new storage value
      const newStorageValue = currentData.storage - quantity;

      // Update the storage value
      const { error: updateError } = await supabase
        .from('popular3')
        .update({ storage: newStorageValue })
        .eq('name', name);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }


  async function updateSlippers(cartItems: { name: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { name, quantity } = item;

      // Retrieve the current storage value
      const { data: currentData, error: fetchError } = await supabase
        .from('slippers')
        .select('storage')
        .eq('name', name)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      // Calculate new storage value
      const newStorageValue = currentData.storage - quantity;

      // Update the storage value
      const { error: updateError } = await supabase
        .from('slippers')
        .update({ storage: newStorageValue })
        .eq('name', name);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  function clearLocalStorageAndResetStore() {
    // Remove all relevant items from localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('addnumber'); // Ensure to remove 'addnumber' if it was stored directly

    // Reset the Svelte store value
    addnumber.set(0);
  }
</script>


  
  <div class="my-40 flex flex-col items-center justify-center text-center">

    <h2 class="text-2xl font-bold mb-2">Payment Successful</h2>
    <p class="text-lg">
      Your order has been confirmed and is now being processed. We will email the receipt and shipping date.
      <br>
      Thank you for shopping with us!
    </p>
    <br>
  
  </div>
  