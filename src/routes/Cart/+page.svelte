<script lang="ts">
    import { addnumber, increment, decrement } from "../../routes/CheckOut/products/fresh/store";
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';

    interface CartItem {
        quantity: number;
        id: number;
        name: string;
        image: string;
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
{#if cartItems.length > 0}
    {#each cartItems as item}
        <p>{item.name}</p>
        <button on:click={decrement} on:click={() => removeItem(item.id)}>remove</button>
        <p>Quantity: {item.quantity}</p>
        <img src="{item.image}" alt="" >
    {/each}
{:else}
    <p>Your cart is empty.</p>
{/if}
