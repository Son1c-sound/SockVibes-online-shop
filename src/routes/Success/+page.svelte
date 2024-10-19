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

      await updateInventory(cartItems);
      await updatePopular(cartItems);
      await updatePopular2(cartItems);
      await updatePopular3(cartItems);
      await updateSlippers(cartItems);
      await updateGifts(cartItems);
      clearLocalStorageAndResetStore();
    }
  });

  async function updateInventory(cartItems: { id: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { id, quantity } = item;

      const { data: currentData, error: fetchError } = await supabase
        .from('allitems')
        .select('storage')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      const newStorageValue = currentData.storage - quantity;

      const { error: updateError } = await supabase
        .from('allitems')
        .update({ storage: newStorageValue })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  async function updatePopular(cartItems: { id: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { id, quantity } = item;

      // Retrieve the current storage value
      const { data: currentData, error: fetchError } = await supabase
        .from('popularItems')
        .select('storage')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      const newStorageValue = currentData.storage - quantity;

      const { error: updateError } = await supabase
        .from('popularItems')
        .update({ storage: newStorageValue })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  async function updatePopular2(cartItems: { id: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { id, quantity } = item;

      const { data: currentData, error: fetchError } = await supabase
        .from('popular2')
        .select('storage')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      const newStorageValue = currentData.storage - quantity;

      const { error: updateError } = await supabase
        .from('popular2')
        .update({ storage: newStorageValue })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  async function updatePopular3(cartItems: { id: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { id, quantity } = item;

      // Retrieve the current storage value
      const { data: currentData, error: fetchError } = await supabase
        .from('popular3')
        .select('storage')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      const newStorageValue = currentData.storage - quantity;

      const { error: updateError } = await supabase
        .from('popular3')
        .update({ storage: newStorageValue })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  async function updateSlippers(cartItems: { id: string, quantity: number }[]) {
    console.log('Updating slippers inventory with:', cartItems);
    for (const item of cartItems) {
      const { id, quantity } = item;

      const { data: currentData, error: fetchError } = await supabase
        .from('slippers')
        .select('storage')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage for item ID', id, ':', fetchError.message);
        continue;
      }

      if (currentData) {
        console.log('Current storage for item ID', id, ':', currentData.storage);

        const newStorageValue = currentData.storage - quantity;
        console.log('New storage value for item ID', id, ':', newStorageValue);

        if (newStorageValue < 0) {
          console.warn('New storage value for item ID', id, 'is negative:', newStorageValue);
          continue;
        }

        const { error: updateError } = await supabase
          .from('slippers')
          .update({ storage: newStorageValue })
          .eq('id', id);

        if (updateError) {
          console.error('Error updating inventory for item ID', id, ':', updateError.message);
        } else {
          console.log('Successfully updated inventory for item ID', id);
        }
      } else {
        console.warn('No data found for item ID', id);
      }
    }
  }

  async function updateGifts(cartItems: { id: string, quantity: number }[]) {
    console.log('Updating inventory with:', cartItems);
    for (const item of cartItems) {
      const { id, quantity } = item;

      const { data: currentData, error: fetchError } = await supabase
        .from('giftboxes')
        .select('storage')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching current storage:', fetchError);
        continue;
      }

      const newStorageValue = currentData.storage - quantity;

      const { error: updateError } = await supabase
        .from('giftboxes')
        .update({ storage: newStorageValue })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating inventory:', updateError);
      }
    }
  }

  function clearLocalStorageAndResetStore() {
    localStorage.removeItem('cart');
    localStorage.removeItem('addnumber'); // Ensure to remove 'addnumber' if it was stored directly

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
