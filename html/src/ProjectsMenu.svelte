<script lang="ts">
  import { rpcInstances } from "./rpc.store";
  import ProjectMenuItem from "./ProjectMenuItem.svelte";
</script>

{#each Object.keys($rpcInstances) as id}
  <ProjectMenuItem {id} />
{/each}
