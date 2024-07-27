<script lang='ts'>
import { onMount } from 'svelte';
import Donemark from "$lib/Icons/donemark.svelte";
import { Button } from '$lib/components/ui/button';
import { addnumber } from "../../routes/CheckOut/products/fresh/store";
import { goto } from '$app/navigation';
import supabase from '$lib/db';
import type { CartItem } from "../../app";

let cartItems: CartItem[] = []; // Initialize empty cart state

function cont() {
goto('/');
}

onMount(async () => {
try {
// Retrieve cart items from localStorage (if available)
const storedCart = localStorage.getItem('cart');
if (storedCart) {
cartItems = JSON.parse(storedCart);
}
} catch (error) {
console.error('Error parsing localStorage cart:', error);
}

// Clear localStorage cart to prevent conflicts
localStorage.removeItem('cart');

// Reset the store value to 0 (consider handling negative values)
addnumber.set(0);

// Insert sold items only if cartItems has valid data
if (cartItems.length > 0) {
await insertSoldItems(cartItems);
} else {
console.log('No items in cart to insert');
}

// Optionally, update localStorage with a fresh state
try {
localStorage.setItem('cart', JSON.stringify([])); // Empty cart after checkout
} catch (error) {
console.error('Error saving to localStorage:', error);
}
});

async function insertSoldItems(cartItems: CartItem[]) {
const soldItems = cartItems.map((item) => ({
product_id: item.id,
quantity: item.quantity,
name: item.name,

}));
try {
const { error } = await supabase
.from('sold_items')
.insert(soldItems);

if (error) {
console.error('Error inserting sold items:', error);
} else {
console.log('Sold items inserted successfully!');
}
} catch (error) {
console.error('Error inserting sold items:', error);
}
}

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