import { mount } from "svelte";
import { startTrap } from "./trapVM";
import App from "./App.svelte";
import plugins from "../plugins/plugin-manifest";

const rootContainer = document.createElement("div");
const shadowRoot = rootContainer.attachShadow({ mode: "closed" });
document.body.appendChild(rootContainer);

const app = mount(App, {
  target: shadowRoot,
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
