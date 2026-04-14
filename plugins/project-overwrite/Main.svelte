<script lang="ts">
  import type { PluginContext } from "#src/plugin";
  import { type Fetcher, getStates } from "./preload";
  import { config } from "#src/store";
  const { vm }: PluginContext = $props();
  let isInEditor = $state(
    document.location.pathname.startsWith("/gandi/project/"),
  );
  let fetcher: Fetcher = $state.raw();
  getStates().then(({ fetcher }) => {
    fetcher = fetcher;
    debugger;
  });
  $effect(() => {
    if (fetcher) {
      const { fetchProject } = fetcher;
      fetcher.fetchProject = function (url: string) {
        debugger;
        fetchProject(url, "FETCHING_WITH_ID");
      };
    }
  });
</script>

{#if isInEditor}
  <li id="vm">
    <label>
      替换加载的sb3文件
      <input type="checkbox" bind:checked={$config["overwrite.enableLoad"]} />
    </label>
  </li>
  <li id="reload">
    <button onclick={() => document.location.reload()}>重新加载作品</button>
  </li>
{:else}
  <b>请使用gandi编辑器打开</b>
{/if}

<style>
  li {
    list-style: none;
    font-size: 12px;
  }
</style>
