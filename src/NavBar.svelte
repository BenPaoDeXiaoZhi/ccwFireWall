<script lang="ts">
  import type { Plugin } from "./plugin";
  type Props = {
    plugins: Plugin[]
  }
  const { plugins=[], page=$bindable(0) } = $props();
</script>

<nav>
  {#each plugins as plugin, id}
    <ul onclick={(e) => {
      page = id;
    }>
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
    display: block;
  }

  ul {
    color: black;
    width: 100%;
  }
</style>