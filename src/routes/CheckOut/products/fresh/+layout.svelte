<script>
    import Mightlike from "$lib/HeroSlider/braclet/MightLike/mightlike.svelte";
      import Description from '../../../../lib/HeroSlider/braclet/description/productdescrpt.svelte'
    // @ts-ignore
    import Footer from '../../../../lib/Footer/footersection.svelte'
      
  </script>
  <slot><!-- optional fallback --></slot>
  
  
  <Description></Description>
  <Mightlike></Mightlike>
  
  <Footer></Footer>