<script lang="ts">
  import type { Plugin } from "./plugin";
  import NavBar from "./NavBar.svelte";
  import TooltipProvider from "./lib/components/ui/tooltip/tooltip-provider.svelte";
</script>

<TooltipProvider>
  <div class="w-full" role="button" tabindex="-1">
    <NavBar></NavBar>
    <div class="main">
      <div id="body"></div>
    </div>
  </div>
  <a href="./monkey">安装脚本</a>
</TooltipProvider>

<style lang="postcss">
  @reference "tailwindcss";
  .main {
    border-radius: 10px;
    border: gray 1px solid;
    position: fixed;
    overflow: hidden;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transition:
      width 0.5s,
      height 0.5s;
  }
  #body {
    width: 100%;
    background-color: aliceblue;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    transition: 0.5s;
    overflow: hidden;
  }
</style>
