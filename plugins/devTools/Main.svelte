<script lang="ts">
  import type { PluginContext } from "../../src/plugin";
  let { vm }: PluginContext = $props();
  let vmKey = $state("vm");

  let enableFreeze = $state(
    localStorage.getItem("devtools.freeze") == "false" ? false : true,
  );
  const emptyFunc = () => null;
  let origStep_: () => void = $state(emptyFunc);
  $effect(() => {
    localStorage.setItem("devtools.freeze", String(enableFreeze));
    if (!vm) {
      return;
    }
    if (enableFreeze) {
      if(vm.runtime._step == emptyFunc){
        return;
      }
      origStep_ = vm.runtime._step;
      vm.runtime._step = emptyFunc;
    } else if (origStep_ != emptyFunc) {
      vm.runtime._step = origStep_;
      origStep_ = emptyFunc;
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
    暂停自动执行({vm?.runtime?._step == emptyFunc ? "已暂停" : "未暂停"})
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
