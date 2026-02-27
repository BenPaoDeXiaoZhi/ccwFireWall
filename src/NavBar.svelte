<script lang="ts">
  import type { Plugin } from "./plugin";
  type Props = {
    plugins: Plugin[];
  };
  let { plugins = [], page = $bindable(0) } = $props();
</script>

<nav>
  {#each plugins as plugin, id}
    <button
      onclick={() => {
        page = id;
      }}
    >
      <span>{plugin.name}</span>
    </button>
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

  button {
    color: black;
    width: 100%;
    border: none;
  }
</style>
