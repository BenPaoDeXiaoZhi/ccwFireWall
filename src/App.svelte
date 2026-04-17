<script lang="ts">
  import NavBar from "./NavBar.svelte";
  import { startTrap } from "./trapVM";
  import type { Plugin } from "./plugin";

  type Props = {
    page: number;
    plugins: Plugin[];
    root: HTMLElement;
  };
  let { page = 0, plugins, root }: Props = $props();
  let vm: GandiVM = $state.raw();
  const currentPlugin = $derived(plugins[page]);
  const offset = $state({
    x: 20,
    y: 20,
  });
  let show = $state(true);
  const mouseOffset = $state({
    x: 0,
    y: 0,
  });
  let moving = $state(false);
  let container: HTMLElement = $state();
  let headerHeight = $state(20);
  startTrap().then((gandiVM) => (vm = gandiVM));
</script>

<div
  class="moving"
  onpointermove={function (this: HTMLElement, e) {
    if (!moving) {
      return;
    }
    if (e.buttons !== 1) {
      return;
    }
    offset.x = e.clientX - mouseOffset.x;
    offset.y = e.clientY - mouseOffset.y;
  }}
  role="button"
  tabindex="-1"
  style:height={moving ? "100vw" : "0px"}
>
  <div
    class="main"
    style:left="max({offset.x}px, 0px)"
    style:top="max({offset.y}px, 0px)"
    style:height={show ? "200px" : "fit-content"}
    style:width={show ? "400px" : "100px"}
  >
    <button
      onpointerdown={(e) => {
        mouseOffset.x = e.offsetX;
        mouseOffset.y = e.offsetY;
        e.stopPropagation();
      }}
      onpointermove={function (this: HTMLElement, e) {
        if (!moving && e.buttons == 1) moving = true;
      }}
      onpointerup={() => {
        if (moving) {
          moving = false;
        } else {
          show = !show;
        }
      }}
      tabindex="0"
      style:background-color={vm ? "lightgreen" : "pink"}
      style:height="{headerHeight}px"
    >
      CCW Firewall
    </button>
    <div
      id="body"
      style:opacity={show ? 1 : 0}
      style:height={show ? "180px" : "0px"}
    >
      <NavBar {plugins} bind:page />
      <div style="height: 180px" bind:this={container}>
        <header style:height={headerHeight}>{currentPlugin.name}</header>
        {#if !("init" in currentPlugin.main)}
          <div style="overflow-y: scroll;height: 155px">
            <currentPlugin.main {vm} {container} {root} />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .moving {
    display: block;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background-color: transparent;
  }
  button {
    width: 100%;
    height: 10%;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.5s;
    touch-action: none;
    border: none;
    display: block;
    border-bottom: 1px gray solid;
    color: black;
  }
  .main {
    border-radius: 10px;
    border: gray 1px solid;
    position: fixed;
    overflow: hidden;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transition:
      width 0.5s,
      height 0.5s;
  }
  #body {
    width: 100%;
    background-color: aliceblue;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    transition: 0.5s;
    overflow: hidden;
  }
  header {
    width: 100%;
    font-weight: bold;
    border-bottom: 1px solid gray;
    height: 25px;
  }
</style>
