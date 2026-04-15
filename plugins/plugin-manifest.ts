import { Plugin } from "../src/plugin";

import DevTools from "./devTools/Main.svelte";
import Overwrite from "./project-overwrite/Main.svelte";
import CCWXss from "./ccwXSS/Main.svelte";

export default [
  new Plugin("dev tools", "", DevTools),
  new Plugin("Overwrite", "", Overwrite),
  new Plugin("CCWXss", "", CCWXss),
];
