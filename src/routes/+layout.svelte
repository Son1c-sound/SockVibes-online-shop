<script>
    // @ts-ignore
    import FooterSection from '../lib/Footer/footersection.svelte'
  import Navbar from "$lib/Navbar/navbar.svelte";
    
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });  

import "../app.css";


</script>
<Navbar />

<slot></slot>

