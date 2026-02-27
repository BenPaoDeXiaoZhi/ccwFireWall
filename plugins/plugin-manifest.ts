import { Plugin } from "../src/plugin";

import DevTools from "./devTools/Main.svelte";

export default [
  new Plugin("test","",()=>(()=>null)),
  new Plugin("dev tools","",DevTools),
]