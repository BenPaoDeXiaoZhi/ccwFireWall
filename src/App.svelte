<script lang="ts">
  import NavBar from "./NavBar.svelte";
  import { vm } from "./store";
  import type { Plugin } from "./plugin";
  
  type Props = {
    page: number,
    plugins: Plugin[],
  };
  let { page = 0, plugins }: Props = $props();
  const offset = $state({
    x: 20,
    y: 20,
  });
  let show = $state(true);
  const mouseOffset = {
    x: 0,
    y: 0,
  };
  
</script>

<main
  style:left="max({offset.x}px, 0px)"
  style:top="max({offset.y}px, 0px)"
  style:height={show ? '200px' : '1.4em'}
  style:width={show ? '400px' : '100px'}
>
  <button
    onpointermove={function (this: HTMLElement, e) {
      if (e.buttons !== 1 || e.target !== this) {
        return;
      }
      e.preventDefault();
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
    role="button"
    tabindex="0"
    style:background-color={$vm ? 'lightgreen' : 'pink'}
  >
    CCW Check
  </button>
  <div 
    id="body"
    style:opacity={show ? 1 : 0}
  >
    <NavBar {plugins} {page}/>
  </div>
</main>

<style>
  button {
    width: 100%;
    height: 1.4em;
    font-weight: bold;
    text-align: center;
    cursor: move;
    user-select: none;
    transition: background-color 0.5s;
    touch-action: none;
  }
  main {
    border-radius: 10px;
    border: gray 1px solid;
    position: fixed;
    overflow: hidden;
    z-index: 99999;
    
    transition: width 0.5s, height 0.5s;
  }
  #body {
    width: 100%;
    height: 100%;
    background-color: aliceblue;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    transition: 0.5s;
  }
</style>
