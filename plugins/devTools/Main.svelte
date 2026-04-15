<script lang="ts">
  import type { PluginContext } from "#src/plugin";
  import { config } from "#src/store";
  let { vm }: PluginContext = $props();

  let vmKey = $state("vm");
  let runtime = $derived(vm?.runtime);

  const emptyFunc = () => null;
  let runtimeStep: () => void = $state(emptyFunc);
  let freezed = $state(false);

  $effect(() => {
    if (!runtime) {
      return;
    }
    const { _step } = runtime;
    runtime._step = function(){
      if($config["devtools.freeze"]){
        return;
      }
      _step.call(this);
    }
    
    const { extensionManager } = runtime;
    const { _prepareExtensionInfo } = extensionManager;
    extensionManager._prepareExtensionInfo = function(name, info){
      console.log(name, info);
      return _prepareExtensionInfo.call(this, name, info);
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
    暂停执行
    <input type="checkbox" bind:checked={$config["devtools.freeze"]} />
  </label>
</li>
<li id="console">
  <label>
    console重定向(用于eruda调试)
    <input type="checkbox" bind:checked={$config.consoleRedirect} />
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
