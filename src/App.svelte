<script lang="ts">
  import NavBar from "./NavBar.svelte";
  import { vm } from "./store";
  import { Plugin } from "./plugin";
  
  let { pages = 1 } = $props();
  const offset = $state({
    x: 20,
    y: 20,
  });
  const plugins = [
    new Plugin("test","",NavBar),
  ];
  let show = $state(true);
  const mouseOffset = {
    x: 0,
    y: 0,
  };
</script>

<main
  style:left="{offset.x}px"
  style:top="{offset.y}px"
  style:height={show ? '200px' : 'fit-content'}
  style:width={show ? '400px' : '100px'}
>
  <button
    id="close"
    onclick={() => {
      show = !show;
    }}>=</button
  >
  <header
    onpointermove={function (this: HTMLElement, e) {
      console.log(e);
      if (e.buttons !== 1 || e.target !== this) {
        return;
      }
      e.preventDefault();
      offset.x = e.pageX - mouseOffset.x;
      offset.y = e.pageY - mouseOffset.y;
      console.log(`${e.pageY - offset.y}px`);
    }}
    onpointerdown={(e) => {
      mouseOffset.x = e.offsetX;
      mouseOffset.y = e.offsetY;
      e.stopPropagation();
    }}
    role="button"
    tabindex="0"
    style="background-color: {$vm ? 'lightgreen' : 'pink'}"
  >
    CCW Check
  </header>
  {#if show}
    <div id="body">
      <NavBar {plugins}/>
    </div>
  {/if}
</main>

<style>
  header {
    width: 100%;
    height: 1.4em;
    font-weight: bold;
    text-align: center;
    cursor: move;
    user-select: none;
    transition: 0.5s;
    touch-action: none;
  }
  main {
    border-radius: 10px;
    border: gray 1px solid;
    position: fixed;
    overflow: hidden;
    z-index: 99999;
    transition: 0.2s;
  }
  #close {
    position: absolute;
    margin: 0.2em 0.3em;
    cursor: context-menu;
    width: 1.2em;
    height: 1.2em;
    text-align: center;
    border-radius: 5px;
    padding: 0px;
    background-color: transparent;
    border: 1px rgba(255, 255, 255, 0.1) solid;
    transition: 0.3s;
  }
  #close:hover {
    background-color: rgb(3, 210, 210);
  }
  #body {
    width: 100%;
    height: 100%;
    background-color: aliceblue;
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
  }
</style>
