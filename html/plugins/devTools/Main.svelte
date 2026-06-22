<script lang="ts">
  import type { PluginContext } from "../../src/plugin";
  import { config } from "../../src/store";
  let { vm }: PluginContext = $props();

  let vmKey = $state("vm");
  let runtime = $derived(vm?.runtime);

  $effect(() => {
    if (!runtime) {
      return;
    }
    const { _step } = runtime;
    runtime._step = function () {
      if ($config["devtools.freeze"]) {
        return;
      }
      _step.call(this);
    };

    const { extensionManager } = runtime;
    const { _prepareExtensionInfo } = extensionManager;
    extensionManager._prepareExtensionInfo = function (name, info) {
      if ($config.showHiddenBlocks) {
        info.blocks.forEach((b) => {
          if (b.hideFromPalette) {
            b.hideFromPalette = false;
          }
        });
      }
      return _prepareExtensionInfo.call(this, name, info);
    };
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
    显示隐藏的积木
    <input
      type="checkbox"
      bind:checked={$config.showHiddenBlocks}
      onchange={(e) => {
        if (vm && $config.showHiddenBlocks) {
          vm.runtime.emit("TOOLBOX_EXTENSIONS_NEED_UPDATE");
        }
      }}
    />
  </label>
</li>
<li id="console">
  <label>
    console重定向(用于eruda调试)
    <input type="checkbox" bind:checked={$config.consoleRedirect} />
  </label>
</li>
<li id="cookie">
  <label>
    防止掉登录
    <button
      onclick={() => {
        cookieStore.set({
          name: "cookie-user-id",
          value: localStorage.getItem("gandi:lastUsedUserId"),
          expires: Date.now() + 1000 * 60 * 60 * 24 * 365,
          domain: "ccw.site",
          path: "/",
        });
      }}>修复cookie</button
    >
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
