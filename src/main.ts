import { mount } from "svelte";
import { startTrap } from "./trapVM";
import App from "./App.svelte";
import plugins from "../plugins/plugin-manifest";

const rootContainer = document.createElement("div");
document.body.appendChild(rootContainer);
const shadowRoot = rootContainer.attachShadow({ mode: "open" });
const target = shadowRoot.createElement("div");

const app = mount(App, {
  target,
  props: {
    plugins,
    page: 0,
  },
});

const useBind =
  localStorage.getItem("firewall.useBind") == "true" ? true : false;
startTrap(useBind);
localStorage.setItem("firewall.useBind", useBind ? "true" : "false");

export default app;
