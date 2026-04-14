<script lang="ts">
  import type { PluginContext } from "#src/plugin";
  import { config } from "#src/store";
  const { vm }: PluginContext = $props();
  export const isInEditor = document.location.pathname.startsWith("/gandi/project/");
  export let noAutoSave = $state(true);
</script>

{#if isInEditor}
  <li id="overwrite">
    <label>
      替换sb3文件
      <input type="checkbox" bind:checked={$config["overwrite.enable"]} />
    </label>
  </li>
  {#if $config["overwrite.enable"]}
    <li id="autosave">
      <label>
        禁用自动保存
        <input type="checkbox" bind:checked={noAutoSave} />
      </label>
    </li>
  {/if}
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
