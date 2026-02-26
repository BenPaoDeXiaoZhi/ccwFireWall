import { mount } from "svelte";
import { startTrap } from "./trapVM";
import App from "./App.svelte";

const app = mount(App, {
  target: document.body,
});

const useBind = localStorage.getItem("firewall.useBind") == "true" ? true : false;
startTrap(useBind);
localStorage.setItem("firewall.useBind", useBind ? "true" : "false");

export default app;
