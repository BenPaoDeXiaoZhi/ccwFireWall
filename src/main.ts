import { mount } from "svelte";
import { startTrap } from "./trapVM";
import App from "./App.svelte";
import plugins from "../plugins/plugin-manifest";

const app = mount(App, {
  target: document.body,
  props: {
    plugins,
  },
});

const useBind = localStorage.getItem("firewall.useBind") == "true" ? true : false;
startTrap(useBind);
localStorage.setItem("firewall.useBind", useBind ? "true" : "false");

export default app;
