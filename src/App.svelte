<script lang="ts">
  import NavBar from "./NavBar.svelte";
  import { startTrap } from "./trapVM";
  import type { Plugin } from "./plugin";

  type Props = {
    page: number;
    plugins: Plugin[];
  };
  let { page = 0, plugins }: Props = $props();
  let vm = $state.raw();
  const current = $derived(plugins[page]);
  const offset = $state({
    x: 20,
    y: 20,
  });
  let show = $state(true);
  const mouseOffset = $state({
    x: 0,
    y: 0,
  });
  let container = $state();
  let headerHeight = $state(20);
  startTrap().then((gandiVM) => vm = gandiVM);
</script>

<main
  style:left="max({offset.x}px, 0px)"
  style:top="max({offset.y}px, 0px)"
  style:height="{show ? '200' : headerHeight}px"
  style:width={show ? "400px" : "100px"}
>
  <button
    onpointermove={function (this: HTMLElement, e) {
      if (e.buttons !== 1) {
        return;
      }
      offset.x = e.clientX - mouseOffset.x;
      offset.y = e.clientY - mouseOffset.y;
    }}
    onpointerdown={(e) => {
      mouseOffset.x = e.offsetX;
      mouseOffset.y = e.offsetY;
      e.stopPropagation();
    }}
    onclick={() => {
      show = !show;
    }}
    tabindex="0"
    style:background-color={vm ? "lightgreen" : "pink"}
    style:height="{headerHeight}px"
  >
    CCW Firewall
  </button>
  <div id="body" style:opacity={show ? 1 : 0}>
    <NavBar {plugins} bind:page />
    <div bind:this={container}>
      <header style:height={headerHeight}>{current.name}</header>
      {#if current.main}
        <current.main {vm} {container} />
      {/if}
    </div>
  </div>
</main>

<style>
  button {
    width: 100%;
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
  main {
    border-radius: 10px;
    border: gray 1px solid;
    position: fixed;
    overflow: hidden;
    z-index: 99999;

    transition:
      width 0.5s,
      height 0.5s;
  }
  #body {
    width: 100%;
    height: 100%;
    background-color: aliceblue;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    transition: 0.5s;
  }
  header {
    width: 100%;
    font-weight: bold;
    border-bottom: 1px solid gray;
  }
</style>
