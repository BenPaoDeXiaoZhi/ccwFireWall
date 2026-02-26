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
    onclick={() => {
      show = !show;
    }}
    role="button"
    tabindex="0"
    style:background-color={$vm ? 'lightgreen' : 'pink'}
  >
    CCW Check
  </header>
  <div 
    id="body"
    style:display={show ? "inline" : "none"}
    style:opacity={show ? 0 : 1}
  >
    <NavBar {plugins}/>
  </div>
</main>

<style>
  header {
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
    
    transition: width 0.5s;
    transition: height 0.5s;
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
