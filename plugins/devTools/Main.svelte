<script lang="ts">
  import type { PluginContext } from "../../src/plugin"
  let { vm }: PluginContext = $props();
  let vmKey = $state("vm");
</script>

<label>
  vm保存位置:
  <input type="text" bind:value={vmKey}>
</label>

<button
  onclick={()=>{
    window[vmKey]=$vm;
  }}
  disabled={!$vm}
>
  保存vm(vm{!$vm ? "未" : "已"}获取到)
</button>