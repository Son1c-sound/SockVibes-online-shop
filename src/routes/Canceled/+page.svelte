<script>
    import CancelMark from "$lib/Icons/canceled.svelte";
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
      <CancelMark  />
      <h2 class="text-2xl font-bold mb-2">Payment Canceled</h2>
      <p class="text-lg">Please Contact us for any issues
      <br>
      <br>
      <Button on:click={cont}>Coninue shopping</Button> 
      <br>
      <br>
      <Button variant='outline'>Contact Support</Button>
  </div>
  
      