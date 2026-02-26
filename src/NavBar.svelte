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