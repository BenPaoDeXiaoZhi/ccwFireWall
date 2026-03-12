<script lang="ts">
  import type { PluginContext } from "#src/plugin";
  import { config } from "#src/store";
  let { vm }: PluginContext = $props();
  let vmKey = $state("vm");

  let enableFreeze = $state(
      !!$config["devtools.freeze"]
  );
  let runtime = $derived(vm?.runtime);

  const emptyFunc = () => null;
  let runtimeStep: () => void = $derived.by(()=>{
    if(!runtime){
      return emptyFunc;
    }
    if(runtimeStep == emptyFunc && runtime){
      return runtime._step;
    }
  });


  $effect(() => {
    $config["devtools.freeze"] = enableFreeze;
    if (!runtime) {
      return;
    }
    if (enableFreeze) {
      runtime._step = emptyFunc;
    } else {
      if(runtimeStep == emptyFunc) {
        return; //等待origin正确
      }
      runtime._step = runtimeStep;
    }
  });
</script>

<li id="vm">
  <label>
    vm保存位置:
    <input type="text" bind:value={vmKey} style:width="50px" />
  </label>

  <button
    onclick={() => {
      unsafeWindow[vmKey] = vm;
    }}
    disabled={!vm}
  >
    保存vm(vm{!vm ? "未" : "已"}获取到)
  </button>
</li>
<li id="freeze">
  <label>
    暂停自动执行({runtime?._step == emptyFunc ? "已暂停" : "未暂停"})
    <input type="checkbox" bind:checked={enableFreeze} />
  </label>
</li>

<style>
  li {
    list-style: none;
    font-size: 12px;
  }
  button {
    font-size: 12px;
  }
</style>
