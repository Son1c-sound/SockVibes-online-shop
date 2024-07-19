<script>
  import MiddleSlider from "$lib/HeroSlider/middleSlider.svelte";
  import ThirdSlider from "$lib/HeroSlider/thirdSlider.svelte";
  import TopSlider from "$lib/HeroSlider/mainSlider.svelte";
  import MostBought from "./mostBought/aboutsection.svelte";
  import Undersection from "./UnderSection/undersection.svelte";
  import FooterSlider from "$lib/HeroSlider/footerSlider.svelte";
  // @ts-ignore
  import Footersection from '../Footer/footersection.svelte'

  </script>

<!-- top of page slider -->
  <TopSlider></TopSlider>
  <!-- second slider -->
  <MiddleSlider></MiddleSlider>
  <!-- third hero slider -->
  <ThirdSlider></ThirdSlider>
  <!-- most bought section -->
  <MostBought></MostBought>
  <FooterSlider></FooterSlider>
  <Undersection></Undersection>
  <Footersection></Footersection>