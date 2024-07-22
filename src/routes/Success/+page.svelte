<script>
  import Donemark from "$lib/Icons/donemark.svelte";
    import {Button} from '$lib/components/ui/button' 

    import { goto } from '$app/navigation'
    function cont() {
        goto('/')
    }
</script>
<b>
    
</b>
<br>

<div class=" my-40 flex flex-col items-center justify-center  text-center">
    <Donemark  />
    <h2 class="text-2xl font-bold mb-2">Payment Successful</h2>
    <p class="text-lg">Your order has been confirmed and is now being processed. We will E-mail the receip and shipping date. <br> Thank you for shopping with us!</p>

    <br>
    <Button on:click={cont}>Coninue shopping</Button> 
    <br>
    <Button variant='outline'>Contact Support</Button>
</div>

    