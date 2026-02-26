<script lang="ts">
  import type { Plugin } from "./plugin";
  type Props = {
    plugins: Plugin[]
  }
  const { plugins=[] } = $props();
</script>

<nav>
  {#each plugins as plugin}
    <ul>
      <span>{plugin.name}</span>
    </ul>
  {/each}
</nav>

<style>
  nav {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-right: 1px gray solid;
  }

  ul {
    color: black;
    width: 100%;
  }
</style>